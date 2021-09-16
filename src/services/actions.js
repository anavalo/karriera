import axios from "axios";

const ROOT_URL = "https://ka-fe-assignment.azurewebsites.net/api";

export async function loginUser(dispatch, loginPayload) {
  const body = {
    email: loginPayload.email,
    password: loginPayload.password,
  };
  const headers = { "Content-Type": "application/json" };

  try {
    dispatch({ type: "REQUEST_LOGIN" });
    let { data } = await axios.post(`${ROOT_URL}/login`, JSON.stringify(body), {
      headers: headers,
    });

    if (data.user) {
      dispatch({ type: "LOGIN_SUCCESS", payload: data });
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", JSON.stringify(data.token));
      return data;
    }

    dispatch({ type: "LOGIN_ERROR", error: data.errors[0] });
    return;
  } catch (error) {
    dispatch({ type: "LOGIN_ERROR", error: error });
  }
}

export async function logout(dispatch) {
  dispatch({ type: "LOGOUT" });
  localStorage.removeItem("user");
  localStorage.removeItem("token");
}
