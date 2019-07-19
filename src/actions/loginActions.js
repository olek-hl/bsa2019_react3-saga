export function loginUser(userInfo) {
  return {
    type: "LOGIN_USER",
    payload: userInfo
  };
}
