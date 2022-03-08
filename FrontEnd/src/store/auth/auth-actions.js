import { authActions } from "./auth-slice";

export const postRegister = (username, email, password) => {
  return async (dispatch) => {};
};

export const postLogin = (username, password) => {
  return async (dispatch) => {
    const postData = async () => {
      const result = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (result.status === 401) {
        //   could be wrong
        throw new Error(result.error);
      }
      if (result.status !== 200 && result.status !== 201) {
        throw new Error("Could not authenticate");
      }
      return await result.json();
    };
    try {
      const result = await postData();
      if (result.token && result.userId) {
        dispatch(
          authActions.LoggedIn({
            jwt: result.token,
            userIdLogin: result.userId,
          })
        );
        // save to local
      } else {
        throw new Error("could not get data");
      }
    } catch (e) {
      console.log(e);
    }
  };
};
