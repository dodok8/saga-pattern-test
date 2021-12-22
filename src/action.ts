export class Action<ActionType extends string, requirePayload, SuccessPayload> {
  ACTION: ActionType;
  SUCCESS: `${ActionType}_SUCCESS`;
  FAILURE: `${ActionType}_FAILURE`;
  constructor(type: ActionType) {
    this.ACTION = type;
    this.FAILURE = `${type}_FAILURE`;
    this.SUCCESS = `${type}_SUCCESS`;
  }
  dispatch(payload: requirePayload) {
    return {
      type: this.ACTION,
      payload,
    };
  }
  success(payload: SuccessPayload) {
    return {
      type: this.SUCCESS,
      payload,
    };
  }
  fail(payload?: any) {
    return {
      type: this.FAILURE,
      payload,
    };
  }
}
