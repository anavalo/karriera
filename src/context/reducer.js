let user = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : "";
let token = localStorage.getItem("token")
  ? JSON.parse(localStorage.getItem("token"))
  : "";

export const initialState = {
  userDetails: "" || user,
  token: "" || token,
  loading: false,
  errorMessage: null,
};

export const AuthReducer = (initialState, action) => {
  switch (action.type) {
    case "REQUEST_LOGIN":
      return {
        ...initialState,
        loading: true,
      };
    case "LOGIN_SUCCESS":
      return {
        ...initialState,
        user: action.payload.user,
        token: action.payload.auth_token,
        loading: false,
      };
    case "LOGOUT":
      return {
        ...initialState,
        user: "",
        token: "",
        loading: false,
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
