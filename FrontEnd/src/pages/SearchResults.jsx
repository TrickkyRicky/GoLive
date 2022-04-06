import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";

import { useLocation } from "react-router-dom";

import { searchResults } from "../store/content/content-actions";

function SearchResults() {
    const location = useLocation();
    const dispatch = useDispatch();

    const content = useSelector((state) => state.content);

    useEffect(() => {
      dispatch(searchResults({
          search_query: location.state
      }));
    }, [location.state]);

    return (
        <div>
            {
                (!location.state) ? (
                    <div>No Results Found</div>
                ) : (
                    <div>
                        {
                            content.searchResults.map((video, i) => {
                                return (
                                    <div key={i} className="video-item">{ video.title}</div>
                                )
                            })
                        }
                    </div>
                )
            }
        </div>
    )
}

export default SearchResults;
