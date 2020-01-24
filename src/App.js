import React, { useState } from 'react';
import './App.css';
import Log from './Log';

const buttons = [...Array(3)];

function App() {
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

    setLog([...logState, logItem]);
  };

  const delayedExec = index => {
    const timeout = Math.floor(Math.random() * 10) + 1; // s

    setTimeout(() => {
      log(index, timeout); // s
    }, timeout * 1000); // ms
  };

  /**
   * Добавление в очередь
   * @param index
   */
  const enqueue = index => {
    setQueue([...queue, index]);
  };

  const makeBtnHandler = index => () => {
    delayedExec(index);
  };

  const clear = () => {
    setLog([]);
    setQueue([]);
  };

  return (
    <div className="App">
      <div className="container">
        <div className="toolbar main">
          {
            buttons.map((btn, index) => (
              <button onClick={makeBtnHandler(index)}>Кнопка {index}</button>
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
