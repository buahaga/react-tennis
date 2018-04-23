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
    const name = document.querySelector('.playerName').value;
    const room = document.querySelector('.roomName').value;
    this.props.connecting(room, name);
    sessionStorage.setItem('loginOk', name);
    this.goToTheRoom(room);
  }

  setRoomValue() {
    const {roomName} = this.props;
    const room = document.querySelector('.roomName');
    room.value = roomName;
  }

  goToTheRoom(room) {
    this.props.history.push(room);
  }

  render () {
    return (
      <div className="login">
        <label>Your Name<input className="playerName" type="text"/></label><br />
        <label>Room Name<input className="roomName" type="text" /></label><br />
        <button onClick={this.setAuthorisationData.bind(this)}>Submit</button>
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
