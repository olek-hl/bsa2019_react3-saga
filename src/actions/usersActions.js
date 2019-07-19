export function getUsers() {
  return {
    type: "GET_USERS"
  };
}

export function deleteUser(id) {
  return {
    type: "DELETE_USER",
    payload: id
  };
}
