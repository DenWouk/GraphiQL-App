import './ApiInput.css';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks/redux';
import { setGraphqlApi } from '@/lib/redux/reducers/graphqlApi';

export default function Playground() {
  const api = useAppSelector((state) => state.graphqlApi.graphqlApi);
  const dispatch = useAppDispatch();
  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setGraphqlApi(event.target.value));
  };

  return (
    <input
      className="api-input"
      placeholder="Enter API URL"
      value={api}
      onChange={inputHandler}
    />
  );
}
