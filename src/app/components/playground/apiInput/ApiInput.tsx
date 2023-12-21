import { useAppDispatch, useAppSelector } from '@/app/lib/redux/hooks/redux';
import { setGraphqlApi } from '@/app/lib/redux/reducers/graphqlApi';
import TextField from '@mui/material/TextField/TextField';

export default function Playground() {
  const api = useAppSelector((state) => state.graphqlApi.graphqlApi);
  const dispatch = useAppDispatch();
  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setGraphqlApi(event.target.value));
  };
  return (
    <TextField
      sx={{ width: 500 }}
      placeholder="Enter api"
      id="outlined-basic"
      variant="outlined"
      size="small"
      value={api}
      onChange={inputHandler}
    />
  );
}
