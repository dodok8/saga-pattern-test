import { Action, ActionType } from '../action';
import * as api from '../lib/api';

const GetHttpCat = new Action<
  'httpCat/GET_HTTP_CAT',
  GetCatState,
  { statusCode: number; image: string }
>('httpCat/GET_HTTP_CAT', api.getHttpCat, (response, ...args) => {
  return { statusCode: args[0], image: URL.createObjectURL(response.data) };
});

export const getHttpCat = GetHttpCat.dispatch;

export const get200Cat = () => {
  return GetHttpCat.dispatch(200);
};

type GetCatAction = ActionType<typeof GetHttpCat>;

type GetCatState = {
  statusCode: number | null;
  image: any | null;
};

const initialState: GetCatState = {
  statusCode: null,
  image: null,
};

export const httpCat = function (
  state: GetCatState = initialState,
  action: GetCatAction
): GetCatState {
  switch (action.type) {
    case GetHttpCat.SUCCESS:
      return {
        ...state,
        statusCode: action.payload.statusCode,
        image: action.payload.image,
      };
    case GetHttpCat.FAILURE:
      return initialState;
    default:
      return state;
  }
};
