import React from 'react';
import {getStudentInfo, getEnrolledCourses, getAvailableCourses, dropClass, enrollInClass} from '../server';
import {hhMMToString, meridiemToString} from '../util';
import Modal from './modal';

var days = ["Monday","Tuesday","Wednesday","Thursday","Friday"];

var default55Times = [
  new Date(0,0,0, 8, 0), new Date(0,0,0, 8,50),
  new Date(0,0,0, 9, 5), new Date(0,0,0, 9,55),
  new Date(0,0,0,10,10), new Date(0,0,0,11, 0),
  new Date(0,0,0,11,15), new Date(0,0,0,12, 5),
  new Date(0,0,0,12,20), new Date(0,0,0,13,10),
  new Date(0,0,0,13,25), new Date(0,0,0,14,15)
];

var default75Times = [
  new Date(0,0,0, 8,30), new Date(0,0,0, 9,45),
  new Date(0,0,0,10, 0), new Date(0,0,0,11,15),
  new Date(0,0,0,11,30), new Date(0,0,0,12,45),
  new Date(0,0,0,13, 0), new Date(0,0,0,14,15),
  new Date(0,0,0,14,30), new Date(0,0,0,15,45),
  new Date(0,0,0,16, 0), new Date(0,0,0,17,15),
  new Date(0,0,0,17,30), new Date(0,0,0,18,45)
];

class CourseButton extends React.Component {
  render() {
    var course = this.props.enrolledcourse;
    return(
      <button type="button" className="btn btn-block btn-primary cal-btn" data-toggle="modal" data-target={"#"+this.props.target}>
        <span>{hhMMToString(course.start) + " - " + meridiemToString(course.end)}</span>
        <span>{course.courseTag} {course.courseNumber}</span>
        <br/>
        <span>{course.location}</span>
      </button>
    );
  }
}

class CalendarBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = props;
    getAvailableCourses(this.state.day, this.state.start, this.state.end, (available) => {
      this.setState({available});
    });
  }

  render() {
    var content = this.state.text;
    var type = "thumbnail " + this.state.type;
    var modal;

    if(this.state.available !== undefined) {
      var data = this.state.available;
      var buttonType;
      var conflict;
      modal =
        <div>
          {this.state.available.map((course, i) => {
            buttonType = 'add';
            this.props.enrolled.map((enrolledCourse) => {
              if (enrolledCourse.days.filter(function (n) { return course.days.indexOf(n) != -1;}).length !== 0
                    && ((course.start >=  enrolledCourse.start && course.start <= enrolledCourse.end)
                    ||  (course.end   >=  enrolledCourse.start && course.end   <= enrolledCourse.end)
                    ||  (course.start <= enrolledCourse.start  && course.end   >= enrolledCourse.end))) 
              {
                buttonType = 'conflict';
                conflict = <span style={{fontWeight: 'bold'}}>Conflicts with {enrolledCourse.courseTag} {enrolledCourse.courseNumber}</span>;
              } 
            });
            if (this.state.id === undefined) return(<span/>);
            return(<Modal key={"modal"+i} type="ClassInformation" data={course} id={this.state.id+i} addClass={this.props.addClass} button={buttonType} conflict={conflict}/>)
          })}
          <Modal data={data} enrolled={this.props.enrolled} type="AvailableCourses" id={this.state.id} conflict={buttonType}/>
        </div>
    }

    if (content === undefined) {
      var start = this.state.start;
      var end   = this.state.end;
      this.props.enrolled.map((enrolled) => {
        if (this.state.available !== undefined)
          this.state.available.map((available) => {
            if (enrolled.courseNumber === available.courseNumber) {
              content = <CourseButton enrolledcourse={enrolled} target={this.state.id}/>;
              modal = <Modal type="ClassInformation" data={enrolled} id={this.state.id} button='drop' removeClass={this.props.removeClass}/>;
            }
          })
      })
      content = (content === undefined) ? hhMMToString(start) + " - " + meridiemToString(end) : content;
    }

    return (
      <div className={type}>
        {modal}
        {content}
        <div style={{height: "80%", width: "100%"}} data-toggle="modal" data-target={"#"+this.state.id}/>
      </div>
    );
  }
}

export default class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = props;

    getStudentInfo(this.props.params.id, (userInfo) => {
      this.setState({userInfo});
    });

    this.refresh();
  }

  componentDidMount() {
    this.props.subscribe(this, 'Calendar', 'reload');
  }

  refresh() {
    if (this.props.params.id !== undefined) {
      getEnrolledCourses(this.props.params.id, (enrolled) => {
        this.setState({enrolled});
      });
    }
  }

  removeClass(course) {
    dropClass(this.props.params.id, course, () => {
      this.refresh();
    });
    this.props.reload();
  }

  addClass(course) {
    enrollInClass(this.props.params.id, course, () => {
      this.refresh();
    });
    this.props.reload();
  }

  render() {
    return (
      <div className="row" style={{height: '100%'}}>
        {days.map((d, i) => {
          switch(i) {
            case 0: case 2: case 4:
              return (
                <div key={"col" + i} className="col-md-3" id={d} style={{height: '100%'}}>
                  <CalendarBlock type="day" text={d} />
                  {default55Times.map((time, i) => {
                    if (this.state.enrolled !== undefined && i%2 === 0) {
                      return(
                        <CalendarBlock userId={this.props.params.id} key={"MWF" + i/2} id={"MWF" + i/2} type="time-55"
                          start={default55Times[i]} end={default55Times[i+1]} day={d} enrolled={this.state.enrolled}
                          removeClass={(c) => this.removeClass(c)} addClass={(c) => this.addClass(c)}/>
                      );
                    }
                  })}

                  {default75Times.map((time, i) => {
                    if (i > 6) {
                      if (this.state.enrolled !== undefined && i%2 === 0) {
                        return(
                          <CalendarBlock userId={this.props.params.id} key={"MWF-Long" + i/2} id={"MWF-Long" + i/2} type="time-75"
                            start={default75Times[i]} end={default75Times[i+1]} day={d} enrolled={this.state.enrolled}
                            removeClass={(c) => this.removeClass(c)} addClass={(c) => this.addClass(c)}/>
                        );
                      }
                    }
                  })}
                </div>
              );
            case 1: case 3:
              return (
                <div key={"col" + i} className="col-md-3" id={d}>
                  <CalendarBlock type="day" text={d} />
                  {default75Times.map((time, i) => {
                    if (this.state.enrolled !== undefined && i%2 === 0) {
                      return(
                        <CalendarBlock userId={this.props.params.id} key={"TTh" + i/2} id={"TTh" + i/2} type="time-75"
                          start={default75Times[i]} end={default75Times[i+1]} day={d}  enrolled={this.state.enrolled}
                          removeClass={(c) => this.removeClass(c)} addClass={(c) => this.addClass(c)}/>
                      );
                    }
                  })}
                </div>
              );
            default:
              break;
          }
        })}
      </div>
    );
  }
}
