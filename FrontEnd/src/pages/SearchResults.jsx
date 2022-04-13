import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";

import { Link, useLocation } from "react-router-dom";

import { searchResults } from "../store/search/search-actions";
import { searchActions } from "../store/search/search-slice";

import Image from 'react-bootstrap/Image';

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
                                                <Image className="video-thumbnail"
                                                    src={
                                                        video._id
                                                            ? "http://localhost:8080/content/thumbnail/" + video._id
                                                            : "http://localhost:8080/content/defaultThumbnail"
                                                    }
                                                    alt="thumbnail"
                                                />
                                            </div>
                                            <div className="video-details">
                                                <Link to={"/watch/" + video._id} className="video-title">{video.title}</Link>
                                                <div className="video-owner">
                                                <Image className="video-user-avatar"
                                                    src={
                                                        video.userId._id
                                                          ? "http://localhost:8080/user/avatar/" + video.userId._id
                                                          : "http://localhost:8080/user/defaultAvatar"
                                                    }
                                                    alt="avatar"
                                                />
                                                <div>
                                                    <Link to={"/profile/" + video.userId._id} className="video-username">{video.userId.username}</Link>
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
