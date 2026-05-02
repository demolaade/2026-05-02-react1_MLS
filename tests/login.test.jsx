import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import Login from '../src/pages/Auth/Login';

describe('Login Component', () => {
  it('renders email and password fields', () => {
    render(<Login />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('captures input correctly', async () => {
    const user = userEvent.setup();
    render(<Login />);
    
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');

    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('password123');
  });

  it('submits correctly with user data', async () => {
    const user = userEvent.setup();
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    // Mock alert since Login.jsx uses it
    vi.spyOn(window, 'alert').mockImplementation(() => {});

    render(<Login />);
    
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitBtn = screen.getByRole('button', { name: /submit/i });

    await user.type(emailInput, 'user@test.com');
    await user.type(passwordInput, 'securePass');
    await user.click(submitBtn);

    expect(consoleSpy).toHaveBeenCalledWith('email', 'user@test.com');
    expect(consoleSpy).toHaveBeenCalledWith('password', 'securePass');
    expect(window.alert).toHaveBeenCalledWith('Success');

    consoleSpy.mockRestore();
  });
});
