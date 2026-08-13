import { useReducer } from "react";
import type { Action, State } from "../types/page-type";

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "initialize":
      return {
        page: 1,
      };
    case "next":
      return {
        ...state,
        page: state.page + 1,
      };
    case "prev":
      return {
        ...state,
        page: state.page - 1,
      };
    case "setPage":
      return {
        ...state,
        page: action.payload,
      };
    default:
      return state;
  }
}

export const usePage = () => {
  return useReducer(reducer, {
    page: 1,
  });
};
