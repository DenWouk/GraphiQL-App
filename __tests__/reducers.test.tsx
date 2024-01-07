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
  it('should handle the setAuthUser action', () => {
    const initialState = {
      authUser: null,
    };
    const action = setAuthUser('user123');
    const newState = authReducer(initialState, action);
    expect(newState.authUser).toBe('user123');
  });

  it('shouldreturn the initial state for a non-existent action', () => {
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
  it('should handle setGraphqlApi action and update localStorage', () => {
    const initialState = {
      graphqlApi: 'initialApi',
    };

    const updatedApi = 'updatedApi';
    const action = setGraphqlApi(updatedApi);
    const result = graphqlApiReducer(initialState, action);

    expect(result.graphqlApi).toBe(updatedApi);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'graphql-api',
      updatedApi
    );
  });

  it('should return the initial state for a non-existent action', () => {
    const initialState = {
      graphqlApi: 'initialApi',
    };

    const action = { type: 'NON_EXISTING_ACTION' };
    const result = graphqlApiReducer(initialState, action);
    expect(result).toEqual(initialState);
  });
});

describe('httpHeadersSlice reducer', () => {
  it('should handle the setHttpHeaders action and update localStorage', () => {
    const initialState = {
      httpHeaders: 'initialHeaders',
    };

    const updatedHeaders = 'updatedHeaders';
    const action = setHttpHeaders(updatedHeaders);
    const result = httpHeadersReducer(initialState, action);
    expect(result.httpHeaders).toBe(updatedHeaders);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'http-headers',
      updatedHeaders
    );
  });

  it('should return the initial state for a non-existent action', () => {
    const initialState = {
      httpHeaders: 'initialHeaders',
    };

    const action = { type: 'NON_EXISTING_ACTION' };
    const result = httpHeadersReducer(initialState, action);
    expect(result).toEqual(initialState);
  });
});

describe('queryVariablesSlice reducer', () => {
  it('should handle the setQueryVariables action and update the state', () => {
    const initialState = {
      queryVariables: 'initialQueryVariables',
    };

    const updatedVariables = 'updatedQueryVariables';
    const action = setQueryVariables(updatedVariables);
    const result = queryVariablesReducer(initialState, action);
    expect(result.queryVariables).toBe(updatedVariables);
  });

  it('should return the initial state for a non-existent action', () => {
    const initialState = {
      queryVariables: 'initialQueryVariables',
    };
    const action = { type: 'NON_EXISTING_ACTION' };
    const result = queryVariablesReducer(initialState, action);
    expect(result).toEqual(initialState);
  });
});

describe('requestJsonSlice reducer', () => {
  it('should handle the setRequestJson action and update the state', () => {
    const initialState = {
      requestJson: 'initialRequestJson',
    };

    const updatedJson = 'updatedRequestJson';
    const action = setRequestJson(updatedJson);
    const result = requestJsonReducer(initialState, action);

    expect(result.requestJson).toBe(updatedJson);
  });

  it('should return the initial state for a non-existent action', () => {
    const initialState = {
      requestJson: 'initialRequestJson',
    };

    const action = { type: 'NON_EXISTING_ACTION' };
    const result = requestJsonReducer(initialState, action);

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
    const result = responseValueReducer(initialState, action);

    expect(result.responseValue).toBe(updatedValue);
  });

  it('should return the initial state for a non-existing action', () => {
    const initialState = {
      responseValue: 'initialResponseValue',
    };

    const action = { type: 'NON_EXISTING_ACTION' };
    const result = responseValueReducer(initialState, action);

    expect(result).toEqual(initialState);
  });

  afterEach(() => {
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
