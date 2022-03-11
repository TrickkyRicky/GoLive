import { userActions } from "./user-slice";

export const getUser = (jwt) => {
  return async (dispatch) => {
    const getData = async () => {
      const res = await fetch("http://localhost:8080/user/info", {
        headers: { Authorization: "Bearer " + jwt },
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
