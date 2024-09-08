import React, { useEffect, useState } from "react";
import "./Row.css";
import axios from "../../../utils/axios";
import movieTrailer from "movie-trailer";
import YouTube from "react-youtube";

// Define the Row functional component
const Row = ({ title, fetchurl, isLargeRow }) => {
  // State to store the list of movies
  // movies: State variable to store the list of movies fetched from the API.
  const [movies, setMovie] = useState([]);

  // trailerUrl: State variable to store the URL of the YouTube trailer
  const [trailerUrl, setTrailerUrl] = useState("");

  // Base URL for fetching images from The Movie Database (TMDB).
  const base_url = "https://image.tmdb.org/t/p/original";

  // useEffect hook to fetch movie data when the component mounts or fetchurl changes
  // useEffect: Runs after the component mounts or when fetchurl changes.
  useEffect(() => {
    // Async Function: Fetches movie data from the API and updates the movies state.
    (async () => {
      try {
        console.log(fetchurl);

        // Make an API request to fetch movies using the fetchurl prop
        const request = await axios.get(fetchurl);

        console.log(request);

        // Update the movies state with the fetched data
        setMovie(request.data.results);
      } catch (error) {
        // Log any errors encountered during the API request
        console.log("error", error);
      }
    })(); // Immediately invoke the async function
  }, [fetchurl]); // Dependency array: runs the effect when fetchurl changes

  // Function to handle clicking on a movie poster
  const handleClick = (movie) => {
    // If a trailer URL is already set, clear it
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      // Otherwise, fetch the trailer URL
      movieTrailer(movie?.title || movie?.name || movie.original_name).then(
        (url) => {
          // Log the trailer URL for debugging
          console.log(url);

          // Extract the video ID from the trailer URL
          const urlParams = new URLSearchParams(new URL(url).search);
          console.log(urlParams);
          console.log(urlParams.get("v"));

          // Update the trailer URL state with the video ID
          setTrailerUrl(urlParams.get("v"));
        }
      );
    }
  };

  // Options for the YouTube player
  const opts = {
    height: "390", // Height of the YouTube player
    width: "100%", // Width of the YouTube player
    playerVars: {
      autoplay: 1, // Autoplay the video
    },
  };

  // Render the component
  return (
    <div className="row">
      {/* Display the section title */}
      <h1>{title}</h1>

      {/* Container for movie posters */}
      <div className="row_posters">
        {/* Map over the movies array and render an image for each movie */}
        {movies?.map((movie, index) => (
          <img
            // Handle click event to toggle trailer
            onClick={() => handleClick(movie)}
            key={index}
            // Set the image source based on whether it's a large row or not
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name} // Alt text for the image
            // Apply a class for styling based on whether it's a large row
            className={`row_poster ${isLargeRow && "row_posterLarge"}`}
          />
        ))}
      </div>

      {/* Container for displaying the YouTube video player */}
      <div style={{ padding: "40px" }}>
        {/* Render the YouTube player if a trailer URL is set */}
        {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
      </div>
    </div>
  );
};

export default Row;
