import React, { useState, useRef } from 'react';
import './App.css';

const App = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const timerRef = useRef(null);

  const formatTime = (time) => {
    const minutes = String(Math.floor(time / 60000)).padStart(2, '0');
    const seconds = String(Math.floor((time % 60000) / 1000)).padStart(2, '0');
    const milliseconds = String(time % 1000).padStart(3, '0');
    return `${minutes}:${seconds}:${milliseconds}`;
  };

  const startTimer = () => {
    if (!isRunning) {
      timerRef.current = setInterval(() => {
        setTime((prev) => prev + 10);
      }, 10);
      setIsRunning(true);
    }
  };

  const pauseTimer = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
  };

  const resetTimer = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  };

  const recordLap = () => {
    setLaps([...laps, time]);
  };

  return (
    <div className="stopwatch-container">
      <h1 className="header-text">STOPWATCH</h1>
      <h2 className="time-display">{formatTime(time)}</h2>
      <div className="button-group">
        <button onClick={startTimer}>START</button>
        <button onClick={pauseTimer}>PAUSE</button>
        <button onClick={recordLap}>LAP</button>
        <button onClick={resetTimer}>RESET</button>
      </div>
      <ul className="lap-list">
        {laps.map((lapTime, index) => (
          <li key={index}>Lap {index + 1}: {formatTime(lapTime)}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;