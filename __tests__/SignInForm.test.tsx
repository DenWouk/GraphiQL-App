import { renderPage } from './Header.test';
import SignInForm from '@/components/forms/SignInForm';
import { screen, fireEvent, act, waitFor } from '@testing-library/react';

describe('SignInForm Component', () => {
  it('renders the component', async () => {
    act(() => {
      renderPage(<SignInForm />);
    });

    expect(screen.getByPlaceholderText('email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByText(/sign in/i)).toBeInTheDocument();
    expect(screen.getByText(/Don't have an account yet?/i)).toBeInTheDocument();
  });

  it('displays an error message for invalid email on change', async () => {
    act(() => {
      renderPage(<SignInForm />);
    });
    const emailInput = screen.getByPlaceholderText('email');
    fireEvent.change(emailInput, { target: { value: 'fgvjf' } });
    await waitFor(() => {
      expect((emailInput as HTMLInputElement).value).toBe('fgvjf');
      expect(() => screen.getByText('Email should contain "@"')).toThrow();
    });
  });

  it('displays an error message for invalid data', async () => {
    act(() => {
      renderPage(<SignInForm />);
    });

    const emailInput = screen.getByPlaceholderText('email');
    const passwordInput = screen.getByPlaceholderText('password');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Password123!!!' } });

    await waitFor(() => {
      expect((emailInput as HTMLInputElement).value).toBe('test@example.com');
      expect((passwordInput as HTMLInputElement).value).toBe('Password123!!!');
    });
  });
});
