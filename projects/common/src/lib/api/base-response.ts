import { Status, isStatusSuccess } from '../status';

export class BaseResponse {
  public Status: Status;
}

export function isResultSuccess(result: BaseResponse) {
  return result && isStatusSuccess(result.Status);
}
