import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL + "/user";
console.log(`apiurl = ${import.meta.env.VITE_API_URL}`);

export const signUpUser = (signupFormData) => {
  const signupUrl = apiUrl + "/signup";
  return axios.post(signupUrl, signupFormData);
};

export const loginUser = (loginFormData) => {
  const loginUrl = apiUrl + "/signin";
  return axios.post(loginUrl, loginFormData);
};
