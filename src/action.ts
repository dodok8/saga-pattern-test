import { ThunkAction } from 'redux-thunk';

export class Action<ActionType extends string, StoreType, Payload> {
  ACTION: ActionType;
  SUCCESS: `${ActionType}_SUCCESS`;
  FAILURE: `${ActionType}_FAILURE`;
  fn: (...arg: any) => any;
  extract: (
    response: Awaited<ReturnType<typeof this.fn>>,
    ...args: Parameters<typeof this.fn>
  ) => Payload;

  constructor(
    type: ActionType,
    fn: (...args: any) => any,
    extract: (
      response: Awaited<ReturnType<typeof fn>>,
      ...args: Parameters<typeof fn>
    ) => Payload
  ) {
    this.ACTION = type;
    this.SUCCESS = `${type}_SUCCESS`;
    this.FAILURE = `${type}_FAILURE`;
    this.fn = fn;
    this.extract = extract;
  }
  // this 바인딩 문제 때문에 이렇게 정의함. ㅆㅂ
  dispatch: (...args: Parameters<typeof this.fn>) => ThunkAction<
    void,
    StoreType,
    null,
    | { type: ActionType; args: typeof args }
    | {
        type: `${ActionType}_SUCCESS`;
        payload: Payload;
      }
    | { type: `${ActionType}_FAILURE` }
    | {
        type: 'error/ALERT_SUCCESS';
      }
    | {
        type: 'error/ALERT_ERROR';
        requestType: ActionType;
        payload: unknown;
      }
  > = (...args) => {
    const ACTION = this.ACTION;
    const SUCCESS = this.SUCCESS;
    const FAILURE = this.FAILURE;

    return async (dispatch) => {
      dispatch({ type: ACTION, args: args });
      try {
        const raw = await this.fn(...args);
        dispatch({ type: SUCCESS, payload: this.extract(raw, args) });
        dispatch({ type: 'error/ALERT_SUCCESS' });
      } catch (e) {
        dispatch({ type: FAILURE });
        dispatch({
          type: 'error/ALERT_ERROR',
          requestType: ACTION,
          payload: e,
        });
      }
    };
  };
}

export type ActionType<T extends Action<any, any, any>> =
  | {
      type: T['ACTION'];
    }
  | {
      type: `${T['ACTION']}_SUCCESS`;
      payload: ReturnType<T['extract']>;
    }
  | { type: `${T['ACTION']}_FAILURE` };
