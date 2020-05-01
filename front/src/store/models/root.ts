import { AnyAction } from "redux";
import immutable from "immutable";

const initialState = {
  locale: "zhCN",
  isLogin: false,
  userInfo: {
    role: "admin",
  },
};

/*

*/

const immutableState = immutable.fromJS(initialState);

export default (state = immutableState, action: AnyAction) => {
  switch (action.type) {
    case "set_language":
      return state.set("locale", action.data);
    case "set_login":
      return state.set("isLogin", action.data);
    case "set_role":
      return state.setIn(["userInfo", "role"], action.data);
    default:
      return state;
  }
};
