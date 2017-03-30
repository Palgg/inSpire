import React from 'react';
import Modal from './modal';
import {getShoppingCart, enrollInClass, dropCourseFromCart, getEnrolledCourses} from '../server';
import {hhMMToString, meridiemToString} from '../util';

export default class ShoppingCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = props;
    this.refresh();
  }

  componentDidMount() {
    this.props.subscribe(this, 'ShoppingCart', 'reload');
    this.setState({selected: []});
  }

  refresh() {
    getEnrolledCourses(this.props.params.id, (enrolled) => {
      this.setState({enrolled});
      getShoppingCart(this.props.params.id, (cart) => {
        this.setState({cart});
      });
    });
  }

  handleClick(e, id, isDisabled) {
    e.preventDefault();
    if (isDisabled === true) { return; }
    var idx = this.state.selected.indexOf(id);
    var selected = this.state.selected;
    (idx === -1) ? selected.push(id) : selected.splice(idx, 1);
    this.setState({selected});
  }

  handleRemoveClick(e, courseId) {
    e.preventDefault();
    e.stopPropagation();
    dropCourseFromCart(this.props.params.id, courseId, (cart) => {
      this.setState({cart});
    });
    if (this.state.selected.indexOf(courseId) !== -1) {
      selected.splice(this.state.selected.indexOf(courseId, 1));
      this.setState({selected});
    }
  }

  addClass(course) {
    enrollInClass(this.props.params.id, course, () => {
      dropCourseFromCart(this.props.params.id, course, (cart) => {
        this.setState({cart});
      });
    });
    this.props.reload();
  }

  batchAddClass() {
    if (this.state.selected.length !== 0) {
      this.state.selected.map((course) => {
        this.addClass(course);
      });
    }
    this.setState({selected: []});
  }

  render() {
    var body;
    var englyph;
    var selected;
    var enroll =
      <button name="singlebutton" className="btn btn-primary center-block" style={{backgroundColor:'#354066', marginTop:'5px'}} onClick={()=>this.batchAddClass()}>
        Enroll
      </button>;

    /* colors for glyphicons go here
     * can enroll (green) - #348531
     * class full (red) - #C9363E
     * restrictions (yellow) - #D9D762
     */

    if (this.state.cart !== undefined) {
      if (this.state.cart.length !== 0) {
        body =
          this.state.cart.map((course) => {
            var start = hhMMToString(new Date(course.start));
            var end = meridiemToString(new Date(course.end));
            var days = [];
            for (var i = 0; i < course.days.length; i++) {
                days[i] = course.days[i].substring(0,1);
            }

            var timeOrConflict = <span>{days} / {start} - {end}</span>;
            var buttonType = 'add';
            var isDisabled = 'false';

            var courseId = course._id;
            selected = (this.state.selected.indexOf(courseId) !== -1) ? "selected" : "";
            if (course.enrolled.length >= course.capacity) {
              englyph = <span className="glyphicon glyphicon-asterisk pull-right" style={{color: '#C9363E', fontSize: '1.2em'}} />;
            } else if (course.restrictions !== "") {
              englyph = <span className="glyphicon glyphicon-asterisk pull-right" style={{color: '#D9D762', fontSize: '1.2em'}} />;
            } else {
              englyph = <span className="glyphicon glyphicon-asterisk pull-right" style={{color: '#348531', fontSize: '1.2em'}} />;
            }

            if (this.state.enrolled !== undefined) {
              this.state.enrolled.map((enrolledCourse) => {
                // Crazy array intersection code
                if (enrolledCourse.days.filter(function (n) { return course.days.indexOf(n) != -1;}).length !== 0
                    && ((course.start >= enrolledCourse.start && course.start <= enrolledCourse.end)
                    ||  (course.end   >= enrolledCourse.start && course.end   <= enrolledCourse.end)
                    ||  (course.start <= enrolledCourse.start && course.end   >= enrolledCourse.end))) 
                {
                  timeOrConflict = <span style={{fontWeight: 'bold'}}>Conflicts with {enrolledCourse.courseTag} {enrolledCourse.courseNumber}</span>;
                  buttonType = 'conflict';
                  isDisabled = true;
                }
              });
            }

            return (
              <li className={"list-group-item shop-cart-item " + selected} key={courseId} onClick={(e) => this.handleClick(e, courseId, isDisabled)}>
                <span>{course.courseNumber} - {course.courseName}</span>
                <span className="glyphicon glyphicon-remove pull-right glyph-show-hover" style={{color: '#FFFFFF', display: 'none'}} 
                      onClick={(e) => this.handleRemoveClick(e, course._id)}/>
                <span className="glyph-hide-hover" style={{marginLeft: '10px'}}>{englyph}</span>
                <Modal type="ClassInformation" data={course} id={"CourseInfoModal" + courseId} addClass={(c) => this.addClass(c)} 
                       button={buttonType} conflict={timeOrConflict} reload={this.props.reload}/>
                <br/><br/>
                {timeOrConflict}
                <a key={courseId} data-toggle="modal" href={"#CourseInfoModal" + courseId}>More info</a>
              </li>
            );
          })
      } else {
        body = <div style={{textAlign: 'center', padding: '10px'}}>Your shopping cart is empty!</div>;
        enroll = undefined;
      }
    }

    return(
      <div id="shopping-cart" className="panel panel-default">
        <div className="panel-heading" style={{color:'#354066'}}>
          Shopping Cart
        </div>
        <div className="panel-body" style={{padding: '0px'}}>
          <ul className="list group">
            {body}
          </ul>
        </div>
        {enroll}
      </div>
    );
  }
}
