'use client';
import { Provider } from 'react-redux';
import { setupStore } from './lib/redux/store';
const store = setupStore();

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider store={store}>{children}</Provider>;
}
