'use client';

import React from 'react';
import { usePomodoro } from './usePomodoro';

const FIVE_MINUTES_IN_SECONDS = 300;

export const PomodoroTimer = () => {
  // Constants for SVG circle dimensions and calculations
  const CIRCLE_RADIUS = 90; // Radius of the timer circle

  // Get all timer state and functions from the hook
  const {
    mounted, // Hydration state
    timeLeft, // Current time in seconds
    isRunning, // Timer running state
    minutes, // Current minutes
    seconds, // Current seconds
    startTimer, // Start function
    pauseTimer, // Pause function
    addTime, // Add time function
    decreaseTime, // Decrease time function
  } = usePomodoro();

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return null;
  }

  // Calculate the rotation angle for the minute hand
  const getMinuteHandRotation = () => {
    const minutesLeft = timeLeft / 60; // Convert seconds to minutes
    const degrees = minutesLeft * 6; // Each minute = 6 degrees (360/60)
    return degrees + 90; // Add 90 to start from top
  };

  // Get current hand rotation
  const minuteHandRotation = getMinuteHandRotation();

  return (
    <div className="flex flex-col items-center gap-8">
      {/* Timer Circle Container */}
      <div className="relative w-[200px] h-[200px]">
        <svg
          className="w-full h-full -rotate-90 transform" // Rotate SVG to start at top
          viewBox="0 0 200 200" // SVG coordinate system
        >
          {/* Background circle */}
          <circle
            cx="100"
            cy="100" // Center point
            r={CIRCLE_RADIUS} // Circle radius
            className="stroke-gray-200 fill-none" // Circle styling
            strokeWidth="4" // Circle line width
          />
          {/* Tick marks - 60 lines for minutes */}
          {[...Array(60)].map((_, i) => {
            // Calculate tick mark positions using trigonometry
            const angle = (i * 6 * Math.PI) / 180; // Convert degrees to radians
            const x1 = 100 + (CIRCLE_RADIUS - 5) * Math.cos(angle);
            const y1 = 100 + (CIRCLE_RADIUS - 5) * Math.sin(angle);
            const x2 =
              100 + (CIRCLE_RADIUS + (i % 5 === 0 ? 2 : 0)) * Math.cos(angle);
            const y2 =
              100 + (CIRCLE_RADIUS + (i % 5 === 0 ? 2 : 0)) * Math.sin(angle);

            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                className={`stroke-gray-400 ${
                  i % 5 === 0 ? 'stroke-[2px]' : 'stroke-[1px]'
                }`}
              />
            );
          })}
          {/* Minute hand */}
          <line
            x1="100"
            y1="100"
            x2="100"
            y2="30"
            className="stroke-blue-500 stroke-[3px]"
            style={{
              transformOrigin: 'center',
              transform: `rotate(${minuteHandRotation}deg)`,
            }}
          />
          {/* Center dot */}
          <circle cx="100" cy="100" r="4" className="fill-gray-800" />
        </svg>
      </div>

      {/* Digital time display */}
      <div className="text-3xl font-medium text-gray-800">
        {minutes.toString().padStart(2, '0')}:
        {seconds.toString().padStart(2, '0')}
      </div>

      {/* Control buttons */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => decreaseTime(FIVE_MINUTES_IN_SECONDS)} // Decrease 5 minutes (300 seconds)
          aria-label="Decrease time by 5 minutes"
          className="w-12 h-12 rounded-full bg-gray-200 text-gray-800 flex items-center justify-center hover:bg-gray-300"
        >
          -5
        </button>
        <button
          onClick={isRunning ? pauseTimer : startTimer} // Toggle timer state
          aria-label={isRunning ? 'Pause timer' : 'Start timer'}
          className="px-6 py-2 bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 min-w-[140px]"
        >
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button
          onClick={() => addTime(FIVE_MINUTES_IN_SECONDS)} // Add 5 minutes (300 seconds)
          aria-label="Increase time by 5 minutes"
          className="w-12 h-12 rounded-full bg-gray-200 text-gray-800 flex items-center justify-center hover:bg-gray-300"
        >
          +5
        </button>
      </div>
    </div>
  );
};
