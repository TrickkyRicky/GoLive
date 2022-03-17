import { contentActions } from "./content-slice";

export const getUserProfile = (userId) => {
  return async (dispatch) => {
      dispatch(contentActions.profileLoader(true)); 
    const getData = async () => {

      const res = await fetch("http://localhost:8080/content/profile/" + userId, {
        method: "GET"
      });

      if (res.status !== 200) {
        throw new Error("Failed to fetch user data");
      }
      return res.json();
    };

    try {
      const response = await getData();

      dispatch(contentActions.userProfile(response));
      dispatch(contentActions.profileLoader(false)); 

    } catch (e) {
      console.log(e);
    }
  };
};

//get video information
export const getSingleVideo = (videoId) => {
  return async (dispatch) => {
    const getVideo = async () => {
      const res = await fetch("http://localhost:8080/content/info/" + videoId, {
        method: "GET"
      });

      if(res.status !== 200) {
        throw new Error("Failed to fetch video");
      }

      return res.json();
    }

    try {
      const response = await getVideo();

      dispatch(contentActions.setVideoInfo(response)); 
    } catch (e) {
      console.log(e)
    }
  }
}

//get category names
export const listCategories = () => {
  return async (dispatch) => {
    const getNames = async () => {
      const res = await fetch("http://localhost:8080/content/categories", {
        method: "GET"
      });

      if(res.status !== 200) {
        throw new Error("Failed to fetch video");
      }

      return res.json();
    }

    try {
      const response = await getNames();

      dispatch(contentActions.setCategoryNames(response)); 
    } catch (e) {
      console.log(e)
    }
  }
}