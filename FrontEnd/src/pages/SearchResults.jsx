import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";

import { Link, useLocation } from "react-router-dom";

import { searchResults } from "../store/search/search-actions";
import { searchActions } from "../store/search/search-slice";

import Image from 'react-bootstrap/Image';
import { Buffer } from "buffer";

function SearchResults() {
    const location = useLocation();
    const dispatch = useDispatch();

    const search = useSelector((state) => state.search);

    useEffect(() => {
      dispatch(searchResults({
          search_query: location.state
      }));

      return () => {
        dispatch(searchActions.setSearchResults([])); 
      }
    }, [location.state]);

    return (
        <div>
            {
                (!location.state) ? (
                    <div>No Results Found</div>
                ) : (
                    <div>
                        <div>
                            <h2>Search Results for "{location.state}"</h2>
                        </div>
                        <div className="results-list">
                        {
                            search.searchResults.map((video, i) => {
                                return (
                                    <div className="video-item" key={i}>
                                        <div className="video-row">
                                            <div className="video-thumbnail-container">
                                                <Image
                                                className="video-thumbnail"
                                                src={
                                                    video.thumbnail
                                                    ? `data:${video.thumbnail.contentType};base64,${Buffer.from(
                                                        video.thumbnail.data.data
                                                        ).toString("base64")}`
                                                    : "http://localhost:8080/user/defaultAvatar"
                                                    }
                                                />
                                            </div>
                                            <div className="video-details">
                                                <Link to={"/Watch/" + video._id} className="video-title">{video.title}</Link>
                                                <div className="video-owner">
                                                <Image
                                                    className="video-user-avatar"
                                                    src={
                                                    video.userId.avatar
                                                        ? `data:${video.userId.avatar.contentType};base64,${Buffer.from(
                                                        video.userId.avatar.data.data
                                                        ).toString("base64")}`
                                                        : "http://localhost:8080/user/defaultAvatar"
                                                    }
                                                />
                                                <div>
                                                    <p className="video-username">{video.userId.username}</p>
                                                    <p className="video-category">{ video.category }</p>
                                                </div>
                                                </div>
                                                <div className="video-stats">
                                                <p className="video-views">{video.views} views</p>
                                                <p className="video-timestamp">{new Date(video.createdAt).toDateString()}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default SearchResults;
