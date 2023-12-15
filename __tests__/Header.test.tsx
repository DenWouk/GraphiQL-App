import { render, screen } from '@testing-library/react';
import Header from '@/app/components/header/Header';
import setupStore from '@/app/lib/store';
import { Provider } from 'react-redux';
import { ReactElement } from 'react';

const store = setupStore();

export const renderPage = async (
  children: ReactElement,
  additionalChildren?: ReactElement
): Promise<void> => {
  render(
    <Provider store={store}>
      {children}
      {additionalChildren}
    </Provider>
  );
};

describe('Tests for the Header component', () => {
  it('Renders the relevant data', () => {
    renderPage(<Header />);
    expect(
      screen.getByRole('heading', { name: 'GraphiQL' })
    ).toBeInTheDocument();
  });
});
