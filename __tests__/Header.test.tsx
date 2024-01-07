import { render, screen } from '@testing-library/react';
import Header from '@/components/header/Header';
import setupStore from '@/lib/redux/store';
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
    expect(screen.getByText('GraphiQL')).toBeInTheDocument();
    const signInButton = screen.getByText('Sign In');
    expect(signInButton).toBeInTheDocument();

    // Найти селект по data-testid
    const languageSelect = screen.getByTestId('language-select');
    expect(languageSelect).toBeInTheDocument();

    const enOption = screen.getByText(/EN/i);
    const byOption = screen.getByText(/BY/i);
    const ruOption = screen.getByText(/RU/i);
    const uaOption = screen.getByText(/UA/i);

    expect(enOption).toBeInTheDocument();
    expect(byOption).toBeInTheDocument();
    expect(ruOption).toBeInTheDocument();
    expect(uaOption).toBeInTheDocument();
  });
});
