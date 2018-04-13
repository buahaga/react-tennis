import React, {Component} from 'react';
import { connect } from 'react-redux';
import { moveBall } from './actions/ball.action';
import { movePaddle } from './actions/paddle.action'
import { editScore } from './actions/score.action'
import Field from './components/Field.jsx';
import Paddle from './components/Paddle.jsx';
import Ball from './components/Ball.jsx';
import Score from './components/Score.jsx';
import './App.css';
import {subscribeToTimer} from './server/api';

function clamp(value, min, max) {
  return Math.max(min, Math.min(value, max));
}

class App extends Component {

  constructor(props) {
    super(props);
    this.onKeyDown = this.onKeyDown.bind(this);

    subscribeToTimer((err, serverScore) => {
      this.props.editScore(serverScore);
    });
    
  }

  componentDidMount() {
    document.addEventListener('keydown', this.onKeyDown);
    this.moveEverything();

  }

  onKeyDown({ keyCode }) {
    const { padLeft } = this.props.paddle;
    if (keyCode === 39 && padLeft < 200) {
      this.props.movePaddle(padLeft + 10)
    } else if (keyCode === 37 && padLeft > 0) {
      this.props.movePaddle(padLeft - 10);
    }
  }

  moveEverything() {
    const { moveBall, editScore } = this.props;
    let { ballTop, ballLeft } = this.props.ball;
    let { yourScore } = this.props.score;

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
      const { padLeft } = this.props.paddle;
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

      if (ballLeft > padLeft &&
        ballLeft < (padLeft + paddle.width) &&
        (ballTop + ballRadius) >= 390) {
        ballTop = 390 - ballRadius;
        speedTop = -speedTop;
        editScore(++yourScore);
      }

      if (ballTop === maxTop) {
        editScore(--yourScore);
      }

      moveBall(ballTop - ballRadius, ballLeft - ballRadius);

      requestAnimationFrame(() => moveFrame());
    };

    moveFrame();
  }

  render() {
    const { ballTop, ballLeft } = this.props.ball;
    const { padLeft } = this.props.paddle;
    const { yourScore } = this.props.score;

    return (
      <div>
        <Field></Field>
        <Ball top={ballTop} left={ballLeft} />
        <Paddle className="paddle" left={padLeft} />
        <Score className="score">{yourScore}</Score>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    ball: state.ball,
    paddle: state.paddle,
    score: state.score
  };
}

function mapDispatchToProps(dispatch) {
  return {
    moveBall: (top, left) => dispatch(moveBall(top, left)),
    movePaddle: (position) => dispatch(movePaddle(position)),
    editScore: (score) => dispatch(editScore(score))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
