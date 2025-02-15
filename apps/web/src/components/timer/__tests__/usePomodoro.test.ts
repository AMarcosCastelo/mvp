import { renderHook, act } from '@testing-library/react';
import { usePomodoro } from '../usePomodoro';

describe('usePomodoro', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => usePomodoro());

    expect(result.current).toEqual({
      mounted: true,
      timeLeft: 25 * 60, // 25 minutes in seconds
      isRunning: false,
      minutes: 25,
      seconds: 0,
      startTimer: expect.any(Function),
      pauseTimer: expect.any(Function),
      addTime: expect.any(Function),
      decreaseTime: expect.any(Function),
    });
  });

  it('should start and stop timer', () => {
    const { result } = renderHook(() => usePomodoro());

    // Start timer
    act(() => {
      result.current.startTimer();
    });
    expect(result.current.isRunning).toBe(true);

    // Advance timer by 1 second
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(result.current.timeLeft).toBe(25 * 60 - 1);

    // Pause timer
    act(() => {
      result.current.pauseTimer();
    });
    expect(result.current.isRunning).toBe(false);

    // Timer should not advance when paused
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(result.current.timeLeft).toBe(25 * 60 - 1);
  });

  it('should add time correctly', () => {
    const { result } = renderHook(() => usePomodoro());

    act(() => {
      result.current.addTime(300); // Add 5 minutes
    });

    expect(result.current.timeLeft).toBe(30 * 60); // 30 minutes
    expect(result.current.minutes).toBe(30);
    expect(result.current.seconds).toBe(0);
  });

  it('should decrease time correctly', () => {
    const { result } = renderHook(() => usePomodoro());

    act(() => {
      result.current.decreaseTime(300); // Decrease 5 minutes
    });

    expect(result.current.timeLeft).toBe(20 * 60); // 20 minutes
    expect(result.current.minutes).toBe(20);
    expect(result.current.seconds).toBe(0);
  });

  it('should not go below 0 when decreasing time', () => {
    const { result } = renderHook(() => usePomodoro());

    act(() => {
      result.current.decreaseTime(26 * 60); // Try to decrease more than available
    });

    expect(result.current.timeLeft).toBe(0);
    expect(result.current.minutes).toBe(0);
    expect(result.current.seconds).toBe(0);
  });

  it('should stop at 0 when timer completes', () => {
    const { result } = renderHook(() => usePomodoro());

    act(() => {
      result.current.decreaseTime(24 * 60); // Leave 1 minute
      result.current.startTimer();
    });

    // Advance timer by more than remaining time
    act(() => {
      jest.advanceTimersByTime(70 * 1000);
    });

    expect(result.current.timeLeft).toBe(0);
    expect(result.current.isRunning).toBe(true);
  });
});
