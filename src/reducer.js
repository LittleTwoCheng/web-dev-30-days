import { useReducer, useCallback } from "react";
import { cache } from "./core";
import { fetchItems } from "./requests";

const CLIENT_NAME = "TodoList";
const { load, save, clear } = cache(CLIENT_NAME);

const DEFAULT_CLIENT_STATE = {
  doneMap: {},
  openMap: {}
};

let initialClientState = load(DEFAULT_CLIENT_STATE);

try {
  Object.keys(DEFAULT_CLIENT_STATE).forEach(key => {
    if (!initialClientState[key]) throw new Error(`${key} not found`);
  });
} catch (e) {
  clear();
  initialClientState = DEFAULT_CLIENT_STATE;
}

console.log({ initialClientState });

const initialState = {
  items: [],
  loading: true,
  ...initialClientState
};

function reducer(state, action) {
  switch (action.type) {
    case "done":
      console.log("done?");
      return save({
        ...state,
        doneMap: {
          ...state.doneMap,
          [action.key]: true
        }
      });

    case "undone":
      return save({
        ...state,
        doneMap: {
          ...state.doneMap,
          [action.key]: false
        }
      });

    case "open":
      return save({
        ...state,
        openMap: {
          [action.key]: true
        }
      });

    case "close":
      return save({
        ...state,
        openMap: {
          ...state.openMap,
          [action.key]: false
        }
      });
    case "fetchItems.request":
      return {
        ...state,
        error: null,
        loading: true
      };
    case "fetchItems.success":
      return {
        ...state,
        items: action.data,
        error: null,
        loading: false
      };
    case "fetchItems.fail":
      return {
        ...state,
        items: [],
        error: action.error,
        loading: false
      };
    default:
      return state;
  }
}

const sideEffect = (action, dispatch) => {
  switch (action.type) {
    case "fetchItems":
      dispatch({ type: "fetchItems.request" });

      fetchItems()
        .then(data => {
          dispatch({ type: "fetchItems.success", data });
        })
        .catch(error => {
          dispatch({ type: "fetchItems.fail", error: error.message });
        });
      break;
    default:
      return;
  }
};

function useAppReducer(initialState) {
  const [state, rawDispatch] = useReducer(reducer, initialState);

  const dispatch = useCallback(
    action => {
      rawDispatch(action);
      setTimeout(() => {
        sideEffect(action, rawDispatch);
      }, 0);
    },
    [rawDispatch]
  );
  return [state, dispatch];
}

export { initialState };
export default useAppReducer;
