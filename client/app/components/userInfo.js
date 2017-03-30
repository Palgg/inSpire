import React from 'react';
import Modal from './modal';
import {getStudentInfo, getEnrolledCourses} from '../server';
import {ResetDatabase} from '../resetdb';
import {Link} from 'react-router';

export default class UserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = props;
    getStudentInfo(this.props.params.id, (userInfo) => {
      this.setState({user:userInfo});
    });
		this.refresh();
  }

	componentDidMount() {
		this.props.subscribe(this, 'UserInfo', 'reload');
	}

	refresh() {
    getEnrolledCourses(this.props.params.id, (courses) => {
      this.setState({enrolled: courses});
    });
	}

  render() {
    var studentId = this.props.params.id.substring(16);
    var FModal = (this.state.enrolled !== undefined) ? <Modal data={this.state.enrolled} type="FinalExamSchedule" id={"FinalExamModal" + studentId} /> : undefined;

    if (this.state.user !== undefined) {
      var studentName = this.state.user.firstName + " " + this.state.user.lastName;
      var TModal = <Modal data={this.state.user.completedCourses} type="UnofficialTranscript" id={"UnofficialTranscriptModal" + studentId} />;
    }

    return (
      <div className="panel panel-default" id="userinfo">
        <div className="panel-heading">
          <span><img src="img/umass_logo.png" alt="UMass Logo" id="logo"></img></span><strong>{studentName} ({studentId})</strong>
        </div>
        <div className="panel-body">
          {TModal}
          {FModal}
          <ul style={{listStyleType: 'none'}}>
            <li>  <a data-toggle="modal" href={"#FinalExamModal" + studentId}>Final Exam Schedule</a>               </li>
            <li>  <a data-toggle="modal" href={"#UnofficialTranscriptModal" + studentId}>Unofficial Transcript</a>  </li>
            <li>  <Link to="blankPage" target='/blankPage' activeClassName="active">Logout</Link>                   </li>
          </ul>
          <ResetDatabase />
        </div>
      </div>
    );
  }
}
