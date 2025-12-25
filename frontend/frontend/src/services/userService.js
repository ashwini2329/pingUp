import api from "./verifyJWT";

const apiUrl = import.meta.env.VITE_API_URL + "/user";

/**
 * @param {*} signupFormData
 * @returns signed up response
 */
export const signUpUser = (signupFormData) => {
  const signupUrl = apiUrl + "/signup";
  return api.post(signupUrl, signupFormData);
};

/**
 * @param {*} loginFormData
 * @returns token
 */
export const loginUser = (loginFormData) => {
  const loginUrl = apiUrl + "/signin";
  return api.post(loginUrl, loginFormData);
};

/**
 * @param {*} newPassword
 * @returns updated Password response
 */
export const updatePassword = (newPassword) => {
  const updatePasswordUrl = apiUrl + "/updatePassword";
  console.log(
    `newPassword data - ${JSON.stringify(
      newPassword
    )} and formed url is ${updatePasswordUrl}`
  );
  return api.post(updatePasswordUrl, newPassword);
};

/**
 * @returns profile details
 */
export const getUserDetails = () => {
  const userDetailURL = apiUrl + `/${localStorage.getItem("profileId")}`;
  return api.get(userDetailURL);
};

/**
 *
 * @param {*} updateDetailsData
 * @returns updated user details
 */
export const updateUser = (updateDetailsData) => {
  console.log("update user service hit");
  const userUpdateUrl = apiUrl + `/${localStorage.getItem("profileId")}`;
  return api.put(userUpdateUrl, updateDetailsData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

/**
 *
 * @returns All User Details List
 */
export const getAllUserDetails = () => {
  const getAllUserDetailsURL =
    apiUrl + `/allUsers/${localStorage.getItem("profileId")}`;
  return api.get(getAllUserDetailsURL);
};
