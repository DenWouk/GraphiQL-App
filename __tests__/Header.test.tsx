import { render, screen } from '@testing-library/react';
import Header from '@/app/components/header/Header';

describe('Tests for the Header component', () => {
  it('Renders the relevant data', () => {
    render(<Header />);
    expect(
      screen.getByRole('heading', { name: 'GraphiQL' })
    ).toBeInTheDocument();
  });
});
