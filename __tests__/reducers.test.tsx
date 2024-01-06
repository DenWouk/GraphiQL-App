import authReducer, { setAuthUser } from '@/lib/redux/reducers/auth';
import graphqlApiReducer, {
  setGraphqlApi,
} from '@/lib/redux/reducers/graphqlApi';
import httpHeadersReducer, {
  setHttpHeaders,
} from '@/lib/redux/reducers/httpHeaders';
import queryVariablesReducer, {
  setQueryVariables,
} from '@/lib/redux/reducers/queryVariables';
import requestJsonReducer, {
  setRequestJson,
} from '@/lib/redux/reducers/requestJson';
import responseValueReducer, {
  setResponseValue,
} from '@/lib/redux/reducers/responseValue';
import schemaReducer, { setSchema } from '@/lib/redux/reducers/schema';

describe('authSlice reducer', () => {
  it('должен обрабатывать действие setAuthUser', () => {
    const initialState = {
      authUser: null,
    };
    const action = setAuthUser('user123');
    const newState = authReducer(initialState, action);
    expect(newState.authUser).toBe('user123');
  });

  it('должен возвращать начальное состояние для несуществующего действия', () => {
    const initialState = {
      authUser: 'user123',
    };
    const action = { type: 'NON_EXISTING_ACTION' };
    const newState = authReducer(initialState, action);
    expect(newState).toEqual(initialState);
  });
});

describe('graphqlApiSlice reducer', () => {
  beforeEach(() => {
    jest.spyOn(window.localStorage.__proto__, 'setItem');
  });
  it('должен обрабатывать действие setGraphqlApi и обновлять localStorage', () => {
    const initialState = {
      graphqlApi: 'initialApi',
    };

    const updatedApi = 'updatedApi';
    const action = setGraphqlApi(updatedApi);

    // Спецификация действия
    const result = graphqlApiReducer(initialState, action);

    // Проверка, что состояние после действия соответствует ожиданиям
    expect(result.graphqlApi).toBe(updatedApi);

    // Проверка, что localStorage был обновлен
    expect(localStorage.setItem).toHaveBeenCalledWith('graphq-api', updatedApi);
  });

  it('должен возвращать начальное состояние для несуществующего действия', () => {
    const initialState = {
      graphqlApi: 'initialApi',
    };

    const action = { type: 'NON_EXISTING_ACTION' };
    const result = graphqlApiReducer(initialState, action);

    // Проверка, что состояние не изменилось для несуществующего действия
    expect(result).toEqual(initialState);
  });
});

describe('httpHeadersSlice reducer', () => {
  it('должен обрабатывать действие setHttpHeaders и обновлять localStorage', () => {
    const initialState = {
      httpHeaders: 'initialHeaders',
    };

    const updatedHeaders = 'updatedHeaders';
    const action = setHttpHeaders(updatedHeaders);

    // Спецификация действия
    const result = httpHeadersReducer(initialState, action);

    // Проверка, что состояние после действия соответствует ожиданиям
    expect(result.httpHeaders).toBe(updatedHeaders);

    // Проверка, что localStorage был обновлен
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'http-headers',
      updatedHeaders
    );
  });

  it('должен возвращать начальное состояние для несуществующего действия', () => {
    const initialState = {
      httpHeaders: 'initialHeaders',
    };

    const action = { type: 'NON_EXISTING_ACTION' };
    const result = httpHeadersReducer(initialState, action);

    // Проверка, что состояние не изменилось для несуществующего действия
    expect(result).toEqual(initialState);
  });
});

describe('queryVariablesSlice reducer', () => {
  it('должен обрабатывать действие setQueryVariables и обновлять состояние', () => {
    const initialState = {
      queryVariables: 'initialQueryVariables',
    };

    const updatedVariables = 'updatedQueryVariables';
    const action = setQueryVariables(updatedVariables);

    // Спецификация действия
    const result = queryVariablesReducer(initialState, action);

    // Проверка, что состояние после действия соответствует ожиданиям
    expect(result.queryVariables).toBe(updatedVariables);
  });

  it('должен возвращать начальное состояние для несуществующего действия', () => {
    const initialState = {
      queryVariables: 'initialQueryVariables',
    };

    const action = { type: 'NON_EXISTING_ACTION' };
    const result = queryVariablesReducer(initialState, action);

    // Проверка, что состояние не изменилось для несуществующего действия
    expect(result).toEqual(initialState);
  });
});
describe('requestJsonSlice reducer', () => {
  it('должен обрабатывать действие setRequestJson и обновлять состояние', () => {
    const initialState = {
      requestJson: 'initialRequestJson',
    };

    const updatedJson = 'updatedRequestJson';
    const action = setRequestJson(updatedJson);

    // Спецификация действия
    const result = requestJsonReducer(initialState, action);

    // Проверка, что состояние после действия соответствует ожиданиям
    expect(result.requestJson).toBe(updatedJson);
  });

  it('должен возвращать начальное состояние для несуществующего действия', () => {
    const initialState = {
      requestJson: 'initialRequestJson',
    };

    const action = { type: 'NON_EXISTING_ACTION' };
    const result = requestJsonReducer(initialState, action);

    // Проверка, что состояние не изменилось для несуществующего действия
    expect(result).toEqual(initialState);
  });
});

describe('responseValueSlice reducer', () => {
  it('should handle the setResponseValue action and update the state', () => {
    const initialState = {
      responseValue: 'initialResponseValue',
    };

    const updatedValue = 'updatedResponseValue';
    const action = setResponseValue(updatedValue);

    // Action specification
    const result = responseValueReducer(initialState, action);

    // Check that the state after the action matches expectations
    expect(result.responseValue).toBe(updatedValue);
  });

  it('should return the initial state for a non-existing action', () => {
    const initialState = {
      responseValue: 'initialResponseValue',
    };

    const action = { type: 'NON_EXISTING_ACTION' };
    const result = responseValueReducer(initialState, action);

    // Check that the state did not change for a non-existing action
    expect(result).toEqual(initialState);
  });

  afterEach(() => {
    // Clear the state after each test
    responseValueReducer(undefined, { type: 'NON_EXISTING_ACTION' });
  });
});
describe('schemaReducer', () => {
  it('should set the schema in the state', () => {
    const initialState = { schema: undefined };
    const newSchema = {
      queryType: {
        name: 'Query',
      },
      mutationType: {
        name: 'Mutation',
      },
      subscriptionType: {
        name: 'Subscription',
      },
    };

    const newState = schemaReducer(initialState, setSchema(newSchema));

    expect(newState.schema).toBe(newSchema);
  });
});
