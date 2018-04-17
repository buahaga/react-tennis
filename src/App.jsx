import React, {Component} from 'react';
import {connect} from 'react-redux';
import {moveBall} from './actions/ball.action';
import {movePaddle} from './actions/paddle.action';
import {moveEnemyPaddle} from './actions/enemyPaddle.action'
import {editScore} from './actions/score.action';
import Field from './components/Field.jsx';
import Paddle from './components/Paddle.jsx';
import Ball from './components/Ball.jsx';
import Score from './components/Score.jsx';
import './App.css';
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:3005');

function clamp(value, min, max) {
  return Math.max(min, Math.min(value, max));
}

class App extends Component {

  constructor(props) {
    super(props);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.socket = socket;
  }

  componentDidMount() {
    document.addEventListener('keydown', this.onKeyDown);
    this.moveEverything();

    socket.on('score_server', message => {
      this.props.editScore(message);
      console.log(message);
    });
    socket.on('ball_server', message => {
      this.props.moveBall(message);
    });
    socket.on('paddle_server', message => {
      this.props.movePaddle(message);
    });
  }

  onKeyDown({keyCode}) {
    const {padLeft} = this.props.paddle;
    const {enemyPadLeft} = this.props.enemy;
    if (keyCode === 39 && padLeft < 200) {
      this.props.movePaddle(padLeft + 10)
    } else if (keyCode === 37 && padLeft > 0) {
      this.props.movePaddle(padLeft - 10);
    }
    if (keyCode === 68 && enemyPadLeft < 200) {
      this.props.moveEnemyPaddle(enemyPadLeft + 10)
    } else if (keyCode === 65 && enemyPadLeft > 0) {
      this.props.moveEnemyPaddle(enemyPadLeft - 10);
    }
  }

  moveEverything() {
    const {moveBall, editScore} = this.props;
    let {ballTop, ballLeft} = this.props.ball;
    let {yourScore} = this.props.score;

    let speedTop = 3;
    let speedLeft = 3;
    const ballRadius = 5;

    const field = {
      width: 300,
      height: 400
    };

    const moveFrame = () => {
      const paddleElem = document.querySelector('.paddle');
      const paddleStyle = getComputedStyle(paddleElem);
      const {padLeft} = this.props.paddle;
      const {enemyPadLeft} = this.props.enemy;
      const paddle = {
        width: parseInt(paddleStyle.width, 10),
        height: parseInt(paddleStyle.height, 10)
      };

      const minLeft = ballRadius;
      const maxLeft = field.width - ballRadius;

      const minTop = ballRadius;
      const maxTop = field.height - ballRadius;

      ballLeft = clamp(ballLeft + speedLeft, minLeft, maxLeft);
      ballTop = clamp(ballTop + speedTop, minTop, maxTop);

      if (ballLeft === minLeft || ballLeft === maxLeft) {
        speedLeft = -speedLeft;
      }

      if (ballTop === minTop || ballTop === maxTop) {
        speedTop = -speedTop;
      }

      if (ballLeft > padLeft && ballLeft < (padLeft + paddle.width) && (ballTop + ballRadius) >= 390) {
        ballTop = 390 - ballRadius;
        speedTop = -speedTop;
        editScore(++yourScore);
      }

      if (ballTop === maxTop) {
        editScore(--yourScore);
      }

      if (ballLeft > enemyPadLeft && ballLeft < (enemyPadLeft + paddle.width) && (ballTop - ballRadius) <= 10) {
        ballTop = 10 + ballRadius;
        speedTop = -speedTop;
        editScore(--yourScore);
      }

      if (ballTop === minTop) {
        editScore(++yourScore);
      }

      // if (yourScore >= 3) {
      //   window.alert('First Player Won!');
      //   yourScore = 0;
      //   editScore(yourScore);
      //   if(!window.confirm('Another Game?')) {
      //     return false;
      //   }
      // }
      //
      // if (yourScore <= -3) {
      //   window.alert('Second Player Won!');
      //   yourScore = 0;
      //   editScore(yourScore);
      //   if(!window.confirm('Another Game?')) {
      //     return false;
      //   }
      // }

      moveBall(ballTop - ballRadius, ballLeft - ballRadius);
      requestAnimationFrame(() => moveFrame());
    };
    moveFrame();
  }

  render() {
    const {ballTop, ballLeft} = this.props.ball;
    const {padLeft} = this.props.paddle;
    const {enemyPadLeft} = this.props.enemy;
    const {yourScore} = this.props.score;
    return (<div>
      <Field></Field>
      <Paddle className="enemyPaddle" left={enemyPadLeft}/>
      <Ball top={ballTop} left={ballLeft}/>
      <Paddle className="paddle" left={padLeft}/>
      <Score className="score">{yourScore}</Score>
    </div>);
  }
}

function mapStateToProps(state) {
  return {ball: state.ball, paddle: state.paddle, enemy: state.enemyPaddle, score: state.score};
}

function mapDispatchToProps(dispatch) {
  return {
    moveBall: (top, left) => dispatch(moveBall(top, left)),
    movePaddle: (position) => dispatch(movePaddle(position)),
    moveEnemyPaddle: (enemyPosition) => dispatch(moveEnemyPaddle(enemyPosition)),
    editScore: (score) => dispatch(editScore(score))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
