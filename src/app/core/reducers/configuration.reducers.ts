import { Action, createSelector } from '@ngrx/store';
import { ActionTypes, Actions } from '../actions/configuration.actions';

export interface State {
  isProduction: boolean;
}

export const initialState: State = {
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

export const getCoreState = (state: any) => state.core;

export const getIsProduction = createSelector(
  getCoreState,
  state => state.isProduction
);
