import { Action } from '@ngrx/store';
import { Configuration } from '../models/configuration';

export enum ActionTypes {
  Set = '[Configuration] Set Configuration'
}

export class SetConfiguration implements Action {
  readonly type = ActionTypes.Set;
  constructor(public payload: { configuration: Configuration }) {}
}

export type Actions = SetConfiguration;
