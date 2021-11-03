import { httpCat, httpCatSaga } from './httpCat';
import { error } from './error';
import { all } from 'redux-saga/effects';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import createSagaMiddleware from '@redux-saga/core';
import { composeWithDevTools } from 'redux-devtools-extension';

const Root = combineReducers({
  httpCat,
  error,
});

const RootSaga = function* () {
  yield all([httpCatSaga()]);
};

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  Root,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(RootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
