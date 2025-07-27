import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL + "/user";

/**
 * @param {*} signupFormData
 * @returns signed up response
 */
export const signUpUser = (signupFormData) => {
  const signupUrl = apiUrl + "/signup";
  return axios.post(signupUrl, signupFormData);
};

/**
 * @param {*} loginFormData
 * @returns token
 */
export const loginUser = (loginFormData) => {
  const loginUrl = apiUrl + "/signin";
  return axios.post(loginUrl, loginFormData);
};

/**
 * @returns profile details
 */
export const getUserDetails = () => {
  const userDetailURL = apiUrl + `/${localStorage.getItem("profileId")}`;
  return axios.get(userDetailURL);
};
