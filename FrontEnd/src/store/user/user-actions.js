import { userActions } from "./user-slice";

export const getUser = (jwt) => {
  return async (dispatch) => {
    const getData = async () => {
      const res = await fetch("http://localhost:8080/user/info", {
        method: "GET",
        headers: { 
          Authorization: "Bearer " + jwt 
        }
      });
      if (res.status !== 200) {
        throw new Error("Failed to fetch user data");
      }
      return res.json();
    };
    try {
      const response = await getData();
      console.log(response);
      dispatch(userActions.getUserInfo(response));
    } catch (e) {
      console.log(e);
    }
  };
};

export const updateUser = (jwt, updatedUser) => {
  return async (dispatch)  => {
    const updateData = async () => {
      const response = await fetch("http://localhost:8080/user/updateinfo", {
        method: "PUT",
        headers: {
          Accept: 'application/json',
          Authorization: "Bearer " + jwt 
        },
        body: updatedUser
      });
      if (response.status !== 200) {
        throw new Error("Failed to update user data");
      }
      return response.json();
    }
    try {
      const response = await updateData();
      console.log(response);
      // dispatch(userActions.getUserInfo(response));
    } catch (e) {
      console.log(e);
    }
  }
}
