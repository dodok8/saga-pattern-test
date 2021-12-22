const ALERT_SUCCESS = 'error/ALERT_SUCCESS' as const;
const ALERT_ERROR = 'error/ALERT_ERROR' as const;
const RESET_ERROR = 'error/RESET_ERROR' as const;

export const alertError = (
  requestType: keyof ErrorState,
  payload: unknown
) => ({
  type: ALERT_ERROR,
  requestType: requestType,
  payload,
});

export const alertSuccess = (requestType: keyof ErrorState) => ({
  type: ALERT_SUCCESS,
  requestType: requestType,
});

export const resetError = (requestType: keyof ErrorState) => ({
  type: RESET_ERROR,
  requestType: requestType,
});

type ErrorAction =
  | ReturnType<typeof alertError>
  | ReturnType<typeof alertSuccess>
  | ReturnType<typeof resetError>;

type ErrorState = {
  'httpCat/GET_HTTP_CAT': Error | false;
};

const initialState: ErrorState = {
  'httpCat/GET_HTTP_CAT': false,
};

export function error(
  state: ErrorState = initialState,
  action: ErrorAction
): ErrorState {
  switch (action.type) {
    case ALERT_ERROR:
      return {
        ...state,
        [action.requestType]: action.payload,
      };
    case ALERT_SUCCESS:
      return {
        ...state,
        [action.requestType]: false,
      };
    case RESET_ERROR:
      return {
        ...state,
        [action.requestType]: undefined,
      };
    default:
      return state;
  }
}
