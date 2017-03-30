import React from 'react';

class NavbarExtendButton extends React.Component {
  render() {
    var faceOut = {
      transition: 'transform .5s'
    };

    if (this.props.face !== undefined) {
      faceOut.transform = (this.props.face) ? 'rotate(0deg)' : 'rotate(180deg)';
    }

    return(
      <div id="rotate-container">
        <div id="trapezoid" onClick={(e)=>this.props.onClick(e)}>
          <div id="rotate-chevron-container" style={faceOut}>
            <span className="glyphicon glyphicon-chevron-down" id="glyph-scaling"></span>
          </div>
        </div>
      </div>
    );
  }
}

class NavbarButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = props;
  }

  render()
  {
    var text = this.props.data;
    return(
      <li><a href={'../../BlankHTML.html'}>{text}</a></li>
    );
  }
}

export default class SideNav extends React.Component {
  constructor(props) {
    super(props);
    this.state=props;
  }

  expand(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({expand: !this.state.expand});
    this.setState({collapse: this.state.expand});
  }

  render() {
    var shift;
    var sz = {width: '95%'};

    if (this.state.expand == true) {
      shift = {animation: 'expand .5s forwards'};
      sz = {width: '100%'};
    }

    if (this.state.collapse == true) {
      shift = {animation: 'collapse .5s forwards'};
    }

    return (
      <div id="sidebar-container" style={shift}>
        <img src="img/umass_logo.png" alt="UMass Logo" id="logo"></img>
        <span id="spire"> InSPIRE</span>
        <ul className="nav" style={sz}>
          <NavbarButton data={"Final Exam Schedule"} />
          <NavbarButton data={"Logout"} />
        </ul>
        <NavbarExtendButton onClick={(e)=>this.expand(e)} face={this.state.expand}/>
      </div>
    )
  }

  componentDidMount() {
    this.setState({expand: false});
    this.setState({collapse: false});
  }
}
