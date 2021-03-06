import { contentActions } from "./content-slice";
import queryString from "query-string";

const authId = localStorage.getItem("userId");

const checkSubscribed = (user) => {
  const match = user.subscribers.users.some((subscriber) => {
    return subscriber == authId
  })

  return match
}

const checkLiked = (likes) => {
  const match = likes.indexOf(authId) != -1;

  return match
}

//get users channel
export const getUserProfile = (userId, params) => {
  return async (dispatch) => {
    dispatch(contentActions.profileLoader(true)); 

    const getData = async () => {

      const query = queryString.stringify(params);
      console.log(query)

      const res = await fetch("http://localhost:8080/content/profile/" + userId + "?" + query, {
        method: "GET"
      });
 
      if (res.status !== 200) {
        throw new Error("Failed to fetch user data");
      }
      return res.json();
    };

    try {
      const response = await getData();

      let following = checkSubscribed(response);

      dispatch(contentActions.userProfile(response));
      dispatch(contentActions.subscribed(following)); 
      dispatch(contentActions.profileLoader(false)); 

    } catch (e) {
      console.log(e);
    }
  };
};

export const getPopularUploads = (userId, params) => {
  return async (dispatch) => {

    const getData = async () => {

      const query = queryString.stringify(params);
      console.log(query)

      const res = await fetch("http://localhost:8080/content/profile/" + userId + "/popular", {
        method: "GET"
      });

      if (res.status !== 200) {
        throw new Error("Failed to fetch user data");
      }
      return res.json();
    };

    try {
      const response = await getData();
      dispatch(contentActions.setPopularUploads(response.media.videos));

    } catch (e) {
      console.log(e);
    }
  };
};

//For the edit video info only
export const getVideoData = async (videoId) => {
      
  const res = await fetch("http://localhost:8080/content/info/" + videoId, {
    method: "GET"
  });

  if(res.status !== 200) {
    throw new Error("Failed to fetch video");
  }

  return res.json();
}

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
      console.log(response)
      dispatch(contentActions.setVideoInfo(response)); 

      let following = checkSubscribed(response.userId);
      let hasLiked = checkLiked(response.likes);

      dispatch(contentActions.subscribed(following)); 
      dispatch(contentActions.liked(hasLiked)); 
      
      return response;
    } catch (e) {
      console.log(e)
    }
  }
}

//get other videos
export const getOtherVideos = (videoId) => {
  return async (dispatch) => {
    const getVideos = async () => {
      const res = await fetch("http://localhost:8080/content/other/" + videoId, {
        method: "GET"
      });

      if(res.status !== 200) {
        throw new Error("Failed to fetch videos");
      }

      return res.json();
    }

    try {
      const response = await getVideos();

      dispatch(contentActions.setOtherVideos(response)); 

      return response;
    } catch (e) {
      console.log(e)
    }
  }
}

export const getVideoComments = (videoId) => {
  return async (dispatch) => {
    const getVideo = async () => {
      const res = await fetch("http://localhost:8080/comment/comments/" + videoId, {
        method: "GET"
      });

      if(res.status !== 200) {
        throw new Error("Failed to fetch comments");
      }

      return res.json();
    }

    try {
      const response = await getVideo();

      dispatch(contentActions.setVideoComments(response)); 
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

      dispatch(contentActions.setCategories(response)); 
    } catch (e) {
      console.log(e)
    }
  }
}

//List latest videos
export const listLatestVideos = () => {
  return async (dispatch) => {
    const getVideos = async () => {
      const res = await fetch("http://localhost:8080/content/latestvideos", {
        method: "GET"
      });

      if(res.status !== 200) {
        throw new Error("Failed to fetch videos");
      }
 
      return res.json();
    }

    try {
      const videos = await getVideos();

      dispatch(contentActions.setLatestVideos(videos)); 
    } catch (e) {
      console.log(e)
    }
  }
}

//Get all videos or under a specific category
export const listVideos = (params) => {
  return async (dispatch) => {
    const getVideos = async () => {
      const query = queryString.stringify(params);
      console.log(query)
      const res = await fetch("http://localhost:8080/content/all/videos?" + query, {
        method: "GET"
      });

      if(res.status !== 200) {
        throw new Error("Failed to fetch videos");
      }
 
      return res.json();
    }

    try {
      const response = await getVideos();

      dispatch(contentActions.setVideos(response)); 
    } catch (e) {
      console.log(e)
    }
  }
}