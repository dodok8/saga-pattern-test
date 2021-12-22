import { httpCat } from './httpCat';
import { error } from './error';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const Root = combineReducers({
  httpCat,
  error,
});

export const store = createStore(
  Root,
  composeWithDevTools(applyMiddleware(thunk))
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
