import { searchActions } from "./search-slice";
import queryString from "query-string";
    

export const searchSuggestions = (params) => {
  return async (dispatch) => {
    const getVideos = async () => {
      const query = queryString.stringify(params);
      
      console.log(query)
      const res = await fetch("http://localhost:8080/content/search/videos?" + query, {
        method: "GET"
      });

      if(res.status !== 200) {
        throw new Error("Failed to fetch videos");
      }
 
      return res.json();
    }

    try {
      const videos = await getVideos();

      dispatch(searchActions.setSearchSuggestions(videos)); 
    } catch (e) {
      console.log(e)
    }
  }
}

export const searchResults = (params) => {
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
      
      dispatch(searchActions.setSearchResults(response)); 
    } catch (e) {
      console.log(e)
    }
  }
}