import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {connecting} from './../actions/connect.action';
import './Login.css';

class Login extends Component {

  componentDidMount() {
    this.setRoomValue();
  }

  setAuthorisationData() {
    let name = document.querySelector('.playerName').value;
    let room = document.querySelector('.roomName').value;
    let {roomName} = this.props;
    this.props.connecting((roomName ? roomName : room), name);
    sessionStorage.setItem('loginOk', name);
    //this.props.history.goBack()
  }

  setRoomValue() {
    let {roomName} = this.props;
    let room = document.querySelector('.roomName');
    room.value = roomName;
  }

  goToTheRabbit() {
    let {roomName} = this.props;
    window.location.href = roomName;
  }

  render () {
    let {roomName, playerName} = this.props;
    console.log(playerName + ': in :' + roomName);
    return (
      <div onLoad={this.setRoomValue.bind(this)} className="login">
        <label>Your Name<input className="playerName" type="text"/></label><br />
        <label>Room Name<input className="roomName" type="text" /></label><br />
        <button onMouseDown={this.setAuthorisationData.bind(this)} onMouseUp={this.goToTheRabbit.bind(this)}>Submit</button>
      </div>
    )
  }
};

function mapStateToProps(state) {
  return {
    roomName: state.connect.roomName,
    playerName: state.connect.playerName,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    connecting: (roomName, playerName) => dispatch(connecting(roomName, playerName)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps) (withRouter(Login));
