import React, { useState } from 'react';
import './App.css';
import Log from './Log';

const buttons = [...Array(3)];

function App() {
  let currentTimer = null;

  /**
   * Содержимое лога
   */
  const [logState, setLog] = useState([]);

  /**
   * Очередь ызовов
   */
  const [queue, setQueue] = useState([]);

  const log = (index, timeout) => {
    const timestamp = new Date();
    const logItem = {
      timestamp,
      index,
      timeout,
    };

    setLog(state => [...state, logItem]);
  };

  /**
   * Добавление в очередь
   * @param index
   */
  const enqueue = index => {
    setQueue([...queue, index]);

    console.log('queue = ', queue);
  };

  const dequeue = queue => {
    const _queue = [...queue];
    const el = _queue.shift();

    setQueue(_queue);

    return el;
  };

  const delayedExec = index => {
    const timeout = Math.floor(Math.random() * 10) + 1; // s

    currentTimer = setTimeout(() => {
      log(index, timeout); // s

      const next = dequeue(queue);

      if (next) {
        delayedExec(next);
      }
    }, timeout * 1000); // ms
  };

  const clear = () => {
    clearTimeout(currentTimer);
    setLog([]);
    setQueue([]);
  };

  const makeBtnHandler = index => () => {
    if (queue.length === 0) { // queue is empty
      enqueue(index);
      delayedExec(index);
    } else {
      enqueue(index);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <div className="toolbar main">
          {
            buttons.map((btn, index) => (
              <button
                key={index}
                onClick={makeBtnHandler(index)}
              >
                Button {index + 1}
              </button>
            ))
          }
        </div>
        <Log log={logState} />
        <div className="toolbar secondary">
          <button onClick={clear}>
            Clear
          </button>
        </div>

      </div>

    </div>
  );
}

export default App;
