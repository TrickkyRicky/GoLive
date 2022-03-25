import { userActions } from "./user-slice";
import { contentActions } from "../content/content-slice";

export const getUser = (jwt) => {
  return async (dispatch) => {
    const getData = async () => {
      const res = await fetch("http://localhost:8080/user/info", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + jwt,
        },
      });
      if (res.status !== 200) {
        throw new Error("Failed to fetch user data");
      }
      return res.json();
    };
    try {
      const response = await getData();
      //console.log(response);
      const {
        avatar,
        media,
        subscribed,
        subscribers,
        email,
        username,
        streamKey,
      } = response;

      dispatch(
        userActions.getUserInfo({
          avatar: avatar,
          media: media,
          subscribed: subscribed,
          subscribers: subscribers,
          email: email,
          username: username,
          streamKey: streamKey,
        })
      );

      return response;
    } catch (e) {
      console.log('Error getting user data: ' + e);
    }
  };
};

export const updateUser = (jwt, updatedUser) => {
  return async (dispatch) => {
    const updateData = async () => {
      const response = await fetch("http://localhost:8080/user/updateinfo", {
        method: "PUT",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + jwt,
        },
        body: updatedUser,
      });
      if (response.status !== 200) {
        throw new Error("Failed to update user data");
      }
      return response.json();
    };
    try {
      const response = await updateData();
      console.log(response);
      // dispatch(userActions.getUserInfo(response));
    } catch (e) {
      console.log(e);
    }
  };
};

export const uploadVideo = (jwt, newVideo) => {
  return async (dispatch) => {
    const uploadVideo = async () => {
      const response = await fetch("http://localhost:8080/user/uploadvideo", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Authorization": "Bearer " + jwt,
        },
        body: newVideo,
      });
      if (response.status !== 200) {
        throw new Error("Failed to upload video");
      }
      return response.json();
    };
    try {
      const response = await uploadVideo();
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };
};

export const likeVideo = (jwt, videoId) => {
  return async (dispatch) => {
    const like = async () => {

      const response = await fetch("http://localhost:8080/user/video/like", {
        method: "PUT",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": "Bearer " + jwt,
        },
        body: JSON.stringify({
          videoId: videoId
        }),
      });
      if (response.status !== 200) {
        throw new Error("Failed to like video");
      }
      return response.json();
    };
    try {
      const response = await like();

      dispatch(contentActions.addVideoLikes(response)); 
    } catch (e) {
      console.log(e);
    }
  };
};

export const unlikeVideo = (jwt, videoId) => {
  return async (dispatch) => {
    const unlike = async () => {

      const response = await fetch("http://localhost:8080/user/video/unlike", {
        method: "PUT",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": "Bearer " + jwt,
        },
        body: JSON.stringify({
          videoId: videoId
        }),
      });
      if (response.status !== 200) {
        throw new Error("Failed to unlike video");
      }
      return response.json();
    };
    try {
      const response = await unlike();

      dispatch(contentActions.removeVideoLikes(response)); 
    } catch (e) {
      console.log(e);
    }
  };
};

export const postComment = (jwt, comment, videoId) => {
  return async (dispatch) => {
    const postComment = async () => {

      const response = await fetch("http://localhost:8080/user/video/comment", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": "Bearer " + jwt,
        },
        body: JSON.stringify({
          comment: comment,
          videoId: videoId
        }),
      });
      if (response.status !== 200) {
        throw new Error("Failed to post comment");
      }
      return response.json();
    };
    try {
      const response = await postComment();

      dispatch(contentActions.addComment(response)); 
    } catch (e) {
      console.log(e);
    }
  };
};

export const subscribe = (jwt, followId) => {
  return async (dispatch) => {
    const subscribeTo = async () => {

      const response = await fetch("http://localhost:8080/user/subscribe", {
        method: "PUT",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": "Bearer " + jwt,
        },
        body: JSON.stringify({
          followId: followId
        }),
      });

      if (response.status !== 200) {
        throw new Error("Failed to subscribe");
      }
      return response.json();
    };

    try {
      const response = await subscribeTo();

      dispatch(contentActions.addVideoInfo(response)); 
    } catch (e) {
      console.log(e);
    }
  };
};

export const unsubscribe = (jwt, unfollowId) => {
  return async (dispatch) => {
    const unsubscribeFrom = async () => {

      const response = await fetch("http://localhost:8080/user/unsubscribe", {
        method: "PUT",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": "Bearer " + jwt,
        },
        body: JSON.stringify({
          unfollowId: unfollowId
        }),
      });

      if (response.status !== 200) {
        throw new Error("Failed to unsubscribe");
      }
      return response.json();
    };

    try {
      const response = await unsubscribeFrom();

      dispatch(contentActions.addVideoInfo(response)); 
    } catch (e) {
      console.log(e);
    }
  };
};