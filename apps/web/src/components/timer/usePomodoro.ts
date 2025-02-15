'use client';

import { useState, useEffect } from 'react';

export const usePomodoro = () => {
  // Initial duration of 25 minutes converted to seconds (25 * 60 = 1500 seconds)
  const START_TIMER_DURATION = 25 * 60;

  // mounted: prevents hydration mismatch by delaying initial render
  // timeLeft: tracks remaining time in seconds
  // isRunning: controls timer's active state
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(START_TIMER_DURATION);
  const [isRunning, setIsRunning] = useState(false);

  // Set mounted to true after initial render to handle hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // Timer interval effect
  useEffect(() => {
    let interval: NodeJS.Timeout;

    // Only run timer if it's active and there's time remaining
    if (isRunning && timeLeft > 0) {
      // Create interval that decrements timeLeft every second
      interval = setInterval(() => {
        setTimeLeft((prevTime) => Math.max(0, prevTime - 1));
      }, 1000);
    }

    // Cleanup interval on component unmount or when dependencies change
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  // Timer control functions
  const startTimer = () => setIsRunning(true); // Start the timer
  const pauseTimer = () => setIsRunning(false); // Pause the timer

  // Add time in seconds (e.g., 300 seconds = 5 minutes)
  const addTime = (seconds: number) => {
    const newTime = timeLeft + seconds;
    setTimeLeft(newTime);
  };

  // Decrease time in seconds, preventing negative values
  const decreaseTime = (seconds: number) => {
    setTimeLeft(Math.max(0, timeLeft - seconds));
  };

  // Convert timeLeft into minutes and seconds for display
  const minutes = Math.floor(timeLeft / 60); // Get whole minutes
  const seconds = timeLeft % 60; // Get remaining seconds

  // Return all necessary values and functions
  return {
    mounted, // For hydration handling
    timeLeft, // Current time in seconds
    isRunning, // Timer state
    minutes, // Formatted minutes
    seconds, // Formatted seconds
    startTimer, // Start function
    pauseTimer, // Pause function
    addTime, // Add time function
    decreaseTime, // Decrease time function
  };
};
