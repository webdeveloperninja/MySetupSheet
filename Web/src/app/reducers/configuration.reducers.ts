import { Action } from '@ngrx/store';
import { ActionTypes, Actions } from '../actions/configuration.actions';
import { Configuration } from '../models/configuration';

export const initialState: Configuration = {
  isProduction: true
};

export function configurationReducer(state = initialState, action: Actions) {
  switch (action.type) {
    case ActionTypes.Set:
      return {
        ...state,
        isProduction: action.payload.configuration.isProduction
      };
    default:
      return state;
  }
}
