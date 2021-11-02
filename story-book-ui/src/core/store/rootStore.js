import {
  createStore,
  compose,
  applyMiddleware
} from 'redux';
// middleware
import thunkMiddleware from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'connected-react-router';
import { all, fork } from 'redux-saga/effects';
// reducers
import rootReducer from './reducers';
import { CLEAR_STATE } from './actions';
import { bootStrapSaga } from '../sideEffect';
import { createLogger } from 'redux-logger';

const loggerMiddleware = createLogger();

const rootStore = ({
  authProvider = null,
  dataProvider,
  history,
  customReducers = {},
  customSagas = [],
  initialState,
}) => {
  const appReducer = rootReducer(customReducers, history);

  const resettableAppReducer = (state, action) =>
    appReducer(
      action.type !== CLEAR_STATE
        ? state : {
          ...state,
          admin: {
            ...state.admin,
            resources: {},
          },
        },
      action
    );
  const saga = function* rootSaga() {
    yield all(
      [bootStrapSaga(dataProvider, authProvider), ...customSagas].map(fork)
    );
  };
  const sagaMiddleware = createSagaMiddleware();
  const typedWindow = typeof window !== 'undefined' && (window);

  const composeEnhancers =
    (process.env.NODE_ENV === 'development' &&
      typeof typedWindow !== 'undefined' &&
      typedWindow.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
      typedWindow.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        trace: true,
        traceLimit: 25,
      })) ||
    compose;

  const store = createStore(
    resettableAppReducer,
    typeof initialState === 'function' ? initialState() : initialState,
    composeEnhancers(
      applyMiddleware(
        thunkMiddleware,
        loggerMiddleware,
        sagaMiddleware,
        routerMiddleware(history)
      )
    )
  );
  sagaMiddleware.run(saga);
  return store;
};

export default rootStore;