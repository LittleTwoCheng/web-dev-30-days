import { cache } from "../../core";
const NAME = "TodoList";
const { load, save, clear } = cache(NAME);

const DEFAULT_STATE = {
  doneMap: {},
  openMap: {}
};

let initialState = load(DEFAULT_STATE);

try {
  Object.keys(DEFAULT_STATE).forEach(key => {
    if (!initialState[key]) throw new Error(`${key} not found`);
  });
} catch (e) {
  clear();
  initialState = DEFAULT_STATE;
}

function reducer(state, action) {
  switch (action.type) {
    case "done":
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

    default:
      throw new Error();
  }
}

function middleware(reducer) {
  return (state, action) => {
    const newState = reducer(state, action);
    console.log(NAME, "Action", action);
    console.log(NAME, "New state", newState);
    return newState;
  };
}

export { initialState };
export default middleware(reducer);
