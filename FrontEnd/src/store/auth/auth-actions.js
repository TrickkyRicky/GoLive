import { authActions } from "./auth-slice";

export const postRegister = (username, email, password) => {
  return async (dispatch) => {
    const postData = async () => {
      const response = await fetch("http://localhost:8080/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password
        })
      });

      return await response.json();
    }

    try {
      const result = await postData();

      if (result.userId) {
        return result
      }
      // else {
      //   throw new Error("could not get data");
      // }
    } catch (e) {
      console.log(e);
    }
  };
};

export const postLogin = (username, password) => {
  return async (dispatch) => {

    const postData = async () => {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      }); 

      if (response.status === 401) {
        //   could be wrong
        throw new Error(response.statusText);
      }
      if (response.status !== 200 && response.status !== 201) {
        throw new Error("Could not authenticate");
      }
      return await response.json();
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

        return result;
      } else {
        throw new Error("could not get data");
      }
    } catch (e) {
      console.log(e);
    }

  };
};
