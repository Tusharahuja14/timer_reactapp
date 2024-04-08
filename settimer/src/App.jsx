import React, { useState, useEffect } from 'react';

const CountdownTimer = () => {
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [timerOn, setTimerOn] = useState(false);
  const [timeUnit, setTimeUnit] = useState("minutes");
  const [selectedTime, setSelectedTime] = useState(0);

  useEffect(() => {
    let interval;
    if (timerOn && totalSeconds > 0) {
      interval = setInterval(() => {
        setTotalSeconds(prevTotalSeconds => prevTotalSeconds - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerOn, totalSeconds]);

  const handleStartStop = () => {
    setTimerOn(!timerOn);
  };

  const handleReset = () => {
    setTotalSeconds(0);
    setSelectedTime(0);
    setTimerOn(false);
  };

  const handleTimeChange = () => {
    setTotalSeconds(selectedTime * (timeUnit === "minutes" ? 60 : 1));
  };

  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4 h-screen bg-zinc-800 text-gray-200">
      <div className="flex items-center text-zinc-600">
        <select value={timeUnit} onChange={(e) => setTimeUnit(e.target.value)} className="border border-gray-300 rounded px-2 py-1 mr-2">
          <option  value="minutes">Minutes</option>
          <option value="seconds">Seconds</option>
        </select>
        <input
          type="number"
          min="0"
          value={selectedTime}
          onChange={(e) => setSelectedTime(e.target.value)}
          className="border border-gray-500 text-zinc-600 rounded px-2 py-1 mr-2"
        />
        <button onClick={handleTimeChange} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ">Set</button>
      </div>
      <div>
        <div className='flex gap-2'>
        <button onClick={handleStartStop} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 rounded-xl ">
          {timerOn ? 'Stop' : 'Start'}
        </button>
        <button onClick={handleReset} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 rounded-xl">
          Reset
        </button>
        </div>
      </div>
      <div className="modal">
        <div className="modal-content">
          <div className='font-bold text-xl'>Current Countdown Time: {formatTime(totalSeconds)}</div>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
