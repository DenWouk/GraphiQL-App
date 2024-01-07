import { renderPage } from './Header.test';
import { screen, act } from '@testing-library/react';
import QueryVariablesEditor from '@/components/playground/queryVariablesEditor/QueryVariablesEditor';

test('renders QueryVariablesEditor component', async () => {
  act(() => {
    renderPage(<QueryVariablesEditor />);
  });

  const codeMirrorElement = screen.getByRole('textbox') as HTMLTextAreaElement;
  expect(codeMirrorElement).toBeInTheDocument();
  expect(screen.queryByText('Error')).not.toBeInTheDocument();
});
