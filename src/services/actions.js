import axios from "axios";

const ROOT_URL = "https://ka-fe-assignment.azurewebsites.net/api";

export async function loginUser(dispatch, loginPayload) {
  const body = {
    email: loginPayload.email,
    password: loginPayload.password,
  };
  const headers = { "Content-Type": "application/json" };

  dispatch({ type: "REQUEST_LOGIN" });
  let { data } = await axios
    .post(`${ROOT_URL}/login`, JSON.stringify(body), {
      headers: headers,
    })
    .catch(function (error) {
      if (error.response) {
        if (error.response.status === 422) {
          alert("wrong credentials");
          dispatch({ type: "LOGOUT" });
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          return;
        }
      }
    });

  if (data.user) {
    dispatch({ type: "LOGIN_SUCCESS", payload: data });
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("token", JSON.stringify(data.token));
    return data;
  }
}

export function logout(dispatch) {
  console.log("log me out bitch");
  dispatch({ type: "LOGOUT" });
  localStorage.removeItem("user");
  localStorage.removeItem("token");
}
