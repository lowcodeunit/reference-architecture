import { BaseResponse } from './base-response';

export class BaseModeledResponse<TModel> extends BaseResponse {
  public Model: TModel;
}
