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
      console.log(response);

      dispatch(userActions.getUserInfo(response));
      dispatch(contentActions.listShow(true));

      return response;
    } catch (e) {
      console.log("Error getting user data: " + e);
    }
  };
};

export const getLikedVideos = (jwt) => {
  return async (dispatch) => {
    const getData = async () => {
      const res = await fetch("http://localhost:8080/user/likedvideos", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + jwt,
        },
      });
      if (res.status !== 200) {
        throw new Error("Failed to fetch liked videos");
      }
      return res.json();
    };
    try {
      const response = await getData();
      console.log(response);

      dispatch(contentActions.setLikedVideos(response));

      return response;
    } catch (e) {
      console.log("Error getting user data: " + e);
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
          Accept: "application/json",
          Authorization: "Bearer " + jwt,
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
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + jwt,
        },
        body: JSON.stringify({
          videoId: videoId,
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
      dispatch(contentActions.liked(true));
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
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + jwt,
        },
        body: JSON.stringify({
          videoId: videoId,
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
      dispatch(contentActions.liked(false));
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
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + jwt,
        },
        body: JSON.stringify({
          comment: comment,
          videoId: videoId,
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

export const deleteComment = (jwt, commentId) => {
  return async (dispatch) => {
    const deleteComment = async () => {
      const response = await fetch(
        "http://localhost:8080/user/video/comment/" + commentId,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + jwt,
          },
        }
      );

      if (response.status !== 200) {
        throw new Error("Failed to delete comment");
      }
      return response.json();
    };
    try {
      const deletedComment = await deleteComment();

      dispatch(contentActions.deleteComment(deletedComment));
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
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + jwt,
        },
        body: JSON.stringify({
          followId: followId,
        }),
      });

      if (response.status !== 200) {
        throw new Error("Failed to subscribe");
      }
      return response.json();
    };

    try {
      const response = await subscribeTo();
      console.log(response);
      dispatch(contentActions.addVideoInfo(response));
      dispatch(contentActions.subscribed(true));
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
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + jwt,
        },
        body: JSON.stringify({
          unfollowId: unfollowId,
        }),
      });

      if (response.status !== 200) {
        throw new Error("Failed to unsubscribe");
      }
      return response.json();
    };

    try {
      const response = await unsubscribeFrom();
      console.log(response);
      dispatch(contentActions.addVideoInfo(response));
      dispatch(contentActions.subscribed(false));
    } catch (e) {
      console.log(e);
    }
  };
};

export const postLiveComment = (jwt, comment) => {
  return async (dispatch) => {
    const postData = async () => {
      const response = await fetch(
        "http://localhost:8080/comment/liveComment",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + jwt,
          },
          body: JSON.stringify({
            liveComment: comment,
          }),
        }
      );

      if (response.status !== 200) {
        throw new Error("Failed to send comment");
      }
      return response.json();
    };

    try {
      await postData();
    } catch (e) {
      console.log(e);
    }
  };
};
