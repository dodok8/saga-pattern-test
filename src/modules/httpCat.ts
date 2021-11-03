import { call, put, takeEvery } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import * as api from '../lib/api';
import { alertError, alertSuccess } from './error';

const GET_HTTP_CAT = 'httpCat/GET_HTTP_CAT' as const;
const GET_HTTP_CAT_SUCCESS = 'httpCat/GET_HTTP_CAT_SUCCESS' as const;
const GET_HTTP_CAT_FAILURE = 'httpCat/GET_HTTP_CAT_FAILURE' as const;

export const getHttpCat = (payload: number) => ({
  type: GET_HTTP_CAT,
  payload,
});

export function* getHttpCatSaga(action: ReturnType<typeof getHttpCat>) {
  try {
    const response: AxiosResponse<string> = yield call(
      api.getHttpCat,
      action.payload
    );

    yield put({
      type: GET_HTTP_CAT_SUCCESS,
      payload: {
        statusCode: action.payload,
        image: URL.createObjectURL(response.data),
      },
    });
    yield put(alertSuccess(GET_HTTP_CAT));
  } catch (error) {
    yield put({ type: GET_HTTP_CAT_FAILURE, payload: error });
    yield put(alertError(GET_HTTP_CAT, error));
  }
}

type GetCatAction =
  | { type: typeof GET_HTTP_CAT; payload: number }
  | {
      type: typeof GET_HTTP_CAT_SUCCESS;
      payload: { statusCode: number; image: string };
    }
  | { type: typeof GET_HTTP_CAT_FAILURE; error: unknown };

type GetCatState = {
  statusCode: number | null;
  image: any | null;
};

const initialState: GetCatState = {
  statusCode: null,
  image: null,
};

export const httpCatSaga = function* () {
  yield takeEvery(GET_HTTP_CAT, getHttpCatSaga);
};

export const httpCat = function (
  state: GetCatState = initialState,
  action: GetCatAction
): GetCatState {
  switch (action.type) {
    case GET_HTTP_CAT_SUCCESS:
      return {
        ...state,
        statusCode: action.payload.statusCode,
        image: action.payload.image,
      };
    case GET_HTTP_CAT_FAILURE:
      return initialState;
    default:
      return state;
  }
};
