import { IdeState } from './state';
import { IdeStateChangeTypes } from './state-change-types';

export class IdeStateChange {
  public Types: IdeStateChangeTypes[];

  public State: IdeState;
}
