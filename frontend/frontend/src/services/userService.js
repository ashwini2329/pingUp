import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL + "/user";
console.log(`apiurl = ${import.meta.env.VITE_API_URL}`); // Should log: http://localhost:5000/user

export const signUpUser = (signupFormData) => {
  const signupUrl = apiUrl + "/signup";
  return axios.post(signupUrl, signupFormData);
};
