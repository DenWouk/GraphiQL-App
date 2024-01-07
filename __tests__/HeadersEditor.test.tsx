import { renderPage } from './Header.test';
import { screen, act } from '@testing-library/react';
import HeadersEditor from '@/components/playground/headersEditor/HeadersEditor';

test('renders QueryVariablesEditor component', async () => {
  act(() => {
    renderPage(<HeadersEditor />);
  });

  const codeMirrorElement = screen.getByRole('textbox') as HTMLTextAreaElement;
  expect(codeMirrorElement).toBeInTheDocument();
  expect(screen.queryByText('Error')).not.toBeInTheDocument();
});
