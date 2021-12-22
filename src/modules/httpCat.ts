import { call, put, takeEvery } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import * as api from '../lib/api';
import { alertError, alertSuccess } from './error';
import { Action } from '../action';

export type ApiType<T extends (...args: any) => any> = Awaited<ReturnType<T>>;

export const getHttpCat = new Action<
  'httpCat/GET_HTTP_CAT',
  number,
  { statusCode: number; image: string }
>('httpCat/GET_HTTP_CAT');

export function* getHttpCatSaga(
  action: ReturnType<typeof getHttpCat.dispatch>
) {
  try {
    const response: ApiType<typeof api.getHttpCat> = yield call(
      api.getHttpCat,
      action.payload
    );
    yield put(
      getHttpCat.success({
        statusCode: action.payload,
        image: URL.createObjectURL(response.data),
      })
    );
    yield put(alertSuccess(getHttpCat.ACTION));
  } catch (error) {
    yield put(getHttpCat.fail());
    yield put(alertError(getHttpCat.ACTION, error));
  }
}

type GetCatAction = ReturnType<
  typeof getHttpCat['dispatch' | 'fail' | 'success']
>;

type GetCatState = {
  statusCode: number | null;
  image: any | null;
};

const initialState: GetCatState = {
  statusCode: null,
  image: null,
};

export const httpCatSaga = function* () {
  yield takeEvery(getHttpCat.ACTION, getHttpCatSaga);
};

export const httpCat = function (
  state: GetCatState = initialState,
  action: GetCatAction
): GetCatState {
  switch (action.type) {
    case getHttpCat.SUCCESS:
      return {
        ...state,
        statusCode: action.payload.statusCode,
        image: action.payload.image,
      };
    case getHttpCat.FAILURE:
      return initialState;
    default:
      return state;
  }
};
