import React from 'react';
import './App.css';

const buttons = [...Array(3)];

function App() {
  const makeBtnHandler = index => () => {
    alert('Кнопка ' + index);
  };

  return (
    <div className="App">
      <div className="container">
        <div className="buttons">
          {
            buttons.map((btn, index) => (
              <button onClick={makeBtnHandler(index)}>Кнопка {index}</button>
            ))
          }
        </div>
      </div>

    </div>
  );
}

export default App;
