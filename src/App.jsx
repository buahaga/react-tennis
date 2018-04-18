import React, {Component} from 'react';
import {connect} from 'react-redux';
import {moveBall} from './actions/ball.action';
import {movePaddle} from './actions/paddle.action';
import {moveEnemyPaddle} from './actions/enemy.action'
import {editScore} from './actions/score.action';
import {playerConnect} from './actions/playerConnect.action';
import Field from './components/Field.jsx';
import Paddle from './components/Paddle.jsx';
import Ball from './components/Ball.jsx';
import Score from './components/Score.jsx';
import Wait from './components/Wait.jsx';

function clamp(value, min, max) {
  return Math.max(min, Math.min(value, max));
}

class App extends Component {

  constructor(props) {
    super(props);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  componentDidMount() {
    this.props.playerConnect();
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.playerID !== nextProps.playerID) {
      document.addEventListener('keydown', this.onKeyDown);
      if (nextProps.playerID % 2) {
        this.moveEverything();
      }
    }
  }

  onKeyDown(event) {
    event.preventDefault();

    const {keyCode} = event;
    const {playerID} = this.props;
    let padLeft = this.props.paddle.padLeft;
    let movePaddle = this.props.movePaddle;

    if (playerID % 2) {
      if (keyCode === 39 && padLeft < 200) {
        movePaddle(padLeft + 10)
      } else if (keyCode === 37 && padLeft > 0) {
        movePaddle(padLeft - 10);
      }
    } else {
      padLeft = this.props.enemy.enemyPadLeft;
      movePaddle = this.props.moveEnemyPaddle;
      if (keyCode === 39 && padLeft < 200) {
        movePaddle(padLeft + 10)
      } else if (keyCode === 37 && padLeft > 0) {
        movePaddle(padLeft - 10);
      }
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
      //   yourScore = 0;
      //   editScore(yourScore);
      //   if(!window.confirm(`FIRST PLAYER WON!
      //   Another Game?`)) {
      //     return false;
      //   }
      // }
      //
      // if (yourScore <= -3) {
      //   yourScore = 0;
      //   editScore(yourScore);
      //   if(!window.confirm(`SECOND PLAYER WON!
      //   Another Game?`)) {
      //     return false;
      //   }
      // }

      moveBall(ballTop - ballRadius, ballLeft - ballRadius);
      requestAnimationFrame(() => moveFrame());
    };
    moveFrame();
  }

  renderWaitingOverlay() {
    if (!this.props.playerID) {
      return <Wait className="wait"/>;
    } else {
      return null
    }
  }

  render() {
    const {ballTop, ballLeft} = this.props.ball;
    const {padTop, padLeft} = this.props.paddle;
    const {enemyPadTop, enemyPadLeft} = this.props.enemy;
    const {yourScore} = this.props.score;
    return (
      <div>
        <Field></Field>
        <Paddle top={enemyPadTop} left={enemyPadLeft}/>
        <Ball top={ballTop} left={ballLeft}/>
        <Paddle top={padTop} left={padLeft}/>
        <Score>{yourScore}</Score>
        {this.renderWaitingOverlay()}
      </div>
  );
  }
}

function mapStateToProps(state) {
  return {
    ball: state.ball,
    paddle: state.paddle,
    enemy: state.enemy,
    score: state.score,
    playerID: state.connect.playerID,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    moveBall: (top, left) => dispatch(moveBall(top, left)),
    movePaddle: (position) => dispatch(movePaddle(position)),
    moveEnemyPaddle: (enemyPosition) => dispatch(moveEnemyPaddle(enemyPosition)),
    editScore: (score) => dispatch(editScore(score)),
    playerConnect: () => dispatch(playerConnect()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
