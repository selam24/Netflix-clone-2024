import React, { useEffect, useState } from "react";
import axios from "../../utils/axios";
import requests from "../../utils/requests";  // contains endpoints for API requests
import "./Banner.css";

// Define the Banner functional component
const Banner = () => {
  // Initialize state to store movie data
 //   movie: State variable to hold the movie data.
// setmovie: Function to update the movie state.
  const [movie, setmovie] = useState({});

  // useEffect hook runs after the component mounts
  useEffect(() => {
    // Define an async function to fetch movie data
    (async () => {
      try {

        // Make an API request to fetch Netflix Originals
        const request = await axios.get(requests.fetchNetflixOriginals);

        console.log(request);

        // Select a random movie from the results and update the state
        setmovie(
          request.data.results[
            Math.floor(Math.random() * request.data.results.length)
          ]
        );
      } catch (error) {
        // Log any errors encountered during the API request
        console.log("error", error);
      }
    })(); // Immediately invoke the async function
  }, []); // Empty dependency array ensures this runs only once after the initial render

  // Function to truncate text if it's too long
  function truncate(str, n) {
    // If the string length exceeds `n`, truncate and add ellipsis
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  // Render the component
  return (
    <div
      className="banner"
      style={{
        backgroundSize: "cover", // Ensure the background image covers the div
        backgroundImage: `url('https://image.tmdb.org/t/p/original${movie?.backdrop_path}')`, // Set dynamic background image
        backgroundPosition: "center", // Center the background image
        backgroundRepeat: "no-repeat", // Prevent the background image from repeating
      }}
    >
      <div className="banner_contents">
        {/* Display the movie title, or fallback to name or original_name */}
        <h1 className="banner_title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner_buttons">
          {/* Play button */}
          <button className="banner_button play">Play</button>
          {/* List button */}
          <button className="banner_button">List</button>
        </div>
        {/* Display a truncated version of the movie overview */}
        <h1 className="banner_description">{truncate(movie?.overview, 150)}</h1>
      </div>
      {/* Optional gradient effect at the bottom of the banner */}
      <div className="banner_fadeBottom"></div>
    </div>
  );
};

export default Banner;
