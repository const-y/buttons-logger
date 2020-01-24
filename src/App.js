import React from 'react';
import './App.css';
import Log from './Log';

const buttons = [...Array(3)];

class App extends React.Component {
  state = {
    logState: [],
    queue: [],
  };

  currentTimer = null;

  log = (index, timeout) => {
    const timestamp = new Date();
    const logItem = {
      timestamp,
      index,
      timeout,
    };

    this.setState(state => ({
      logState: [...state.logState, logItem]
    }));
  };

  /**
   * Добавление в очередь
   * @param index
   * @param cb
   */
  enqueue = (index, cb) => {
    this.setState( state => ({
      queue: [...state.queue, index]
    }), cb);
  };

  /**
   *
   * @returns {*}
   */
  dequeue = () => {
    const { queue } = this.state;
    if (queue.length === 0) {
      return null;
    }

    const _queue = [...queue];
    const el = _queue.shift();

    this.setState({ queue: _queue });

    return el;
  };

  delayedExec = index => {
    const timeout = Math.floor(Math.random() * 10) + 1; // s

    this.currentTimer = setTimeout(() => {

      this.log(index, timeout); // s

      const next = this.dequeue();

      debugger

      if (next !== null) {
        this.delayedExec(next);
        debugger
      }
    }, timeout * 1000); // ms
  };

  clear = () => {
    clearTimeout(this.currentTimer);
    this.setState({
      logState: [],
      queue: [],
    });
  };

  makeBtnHandler = index => () => {
    const { queue } = this.state;

    if (queue.length === 0) { // queue is empty
      this.enqueue(index, () => {
        this.delayedExec(index);
      });
    } else {
      this.enqueue(index);
    }
  };


  render() {
    const { logState } = this.state;

    return (
      <div className="App">
        <div className="container">
          <div className="toolbar main">
            {
              buttons.map((btn, index) => (
                <button
                  key={index}
                  onClick={this.makeBtnHandler(index)}
                >
                  Button {index + 1}
                </button>
              ))
            }
          </div>
          <Log log={logState}/>
          <div className="toolbar secondary">
            <button onClick={this.clear}>
              Clear
            </button>
          </div>

        </div>

      </div>
    );
  }
}

export default App;
