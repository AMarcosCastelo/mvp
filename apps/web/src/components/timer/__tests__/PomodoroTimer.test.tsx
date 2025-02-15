import { render, screen, fireEvent } from '@testing-library/react';
import { PomodoroTimer } from '../PomodoroTimer';
import { act } from 'react-dom/test-utils';

describe('PomodoroTimer', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should render timer with initial state', () => {
    render(<PomodoroTimer />);

    // Check if timer display is present
    expect(screen.getByText('25:00')).toBeInTheDocument();

    // Check if control buttons are present
    expect(screen.getByText('-5')).toBeInTheDocument();
    expect(screen.getByText('Start')).toBeInTheDocument();
    expect(screen.getByText('+5')).toBeInTheDocument();
  });

  it('should start and pause timer', () => {
    render(<PomodoroTimer />);

    const startButton = screen.getByText('Start');
    fireEvent.click(startButton);

    // Button should now show "Pause"
    expect(screen.getByText('Pause')).toBeInTheDocument();

    // Advance timer by 1 second
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    // Timer should show 24:59
    expect(screen.getByText('24:59')).toBeInTheDocument();

    // Click pause
    fireEvent.click(screen.getByText('Pause'));
    expect(screen.getByText('Start')).toBeInTheDocument();

    // Timer should not advance when paused
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(screen.getByText('24:59')).toBeInTheDocument();
  });

  it('should add 5 minutes when clicking +5', () => {
    render(<PomodoroTimer />);

    const addButton = screen.getByText('+5');
    fireEvent.click(addButton);

    expect(screen.getByText('30:00')).toBeInTheDocument();
  });

  it('should decrease 5 minutes when clicking -5', () => {
    render(<PomodoroTimer />);

    const decreaseButton = screen.getByText('-5');
    fireEvent.click(decreaseButton);

    expect(screen.getByText('20:00')).toBeInTheDocument();
  });

  it('should not go below 00:00', () => {
    render(<PomodoroTimer />);

    // Click -5 button 6 times (more than 25 minutes)
    const decreaseButton = screen.getByText('-5');
    for (let i = 0; i < 6; i++) {
      fireEvent.click(decreaseButton);
    }

    expect(screen.getByText('00:00')).toBeInTheDocument();
  });

  it('should rotate hand based on time', () => {
    render(<PomodoroTimer />);

    // Get the minute hand element
    const hand = document.querySelector('line.stroke-blue-500');
    expect(hand).toHaveStyle({
      transform: expect.stringContaining('rotate(240deg)'), // 25 minutes position
    });

    // Add 5 minutes
    fireEvent.click(screen.getByText('+5'));
    expect(hand).toHaveStyle({
      transform: expect.stringContaining('rotate(270deg)'), // 30 minutes position
    });
  });
});
