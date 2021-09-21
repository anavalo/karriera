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
    .catch(function loginError(error) {
      if (error.response) {
        alert(`${error.response.statusText}, please try again`);
        dispatch({ type: "LOGOUT" });
        return;
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
  dispatch({ type: "LOGOUT" });
  localStorage.removeItem("user");
  localStorage.removeItem("token");
}

export async function getJobs(pageNum) {
  const { tokenType, accessToken } = JSON.parse(localStorage.getItem("token"));
  const config = {
    headers: { Authorization: `${tokenType} ${accessToken}` },
    params: {
      page: pageNum,
      sizePerPage: 5,
    },
  };
  let { data } = await axios.get(`${ROOT_URL}/job-posts`, config);
  return data;
}

export async function getJob(id) {
  const { tokenType, accessToken } = JSON.parse(localStorage.getItem("token"));
  const config = {
    headers: { Authorization: `${tokenType} ${accessToken}` },
  };
  let { data } = await axios.get(`${ROOT_URL}/job-posts/${id}`, config);
  return data;
}

export async function applyJob(id, yearsOfExperience) {
  const { tokenType, accessToken } = JSON.parse(localStorage.getItem("token"));
  const config = {
    headers: { Authorization: `${tokenType} ${accessToken}` },
    params: {
      id: id,
      yearsOfExperience: yearsOfExperience,
    },
  };
  let data = await axios
    .post(`${ROOT_URL}/job-posts/apply`, config.params, {
      headers: config.headers,
    })
    .catch(function (error) {
      if (error.response) {
        alert(`${error.response.statusText}, please try again`);
        return;
      }
    });
  return data;
}
