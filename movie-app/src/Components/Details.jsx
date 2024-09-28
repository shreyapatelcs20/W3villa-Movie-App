import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Header from "./Header";

function Details() {
  const { id } = useParams(); // Get the movie ID from the URL params
  const [movie, setMovie] = useState(null); // Initially, movie is null
  const [error, setError] = useState(null); // State to handle error

  // Function to fetch movie details from OMDb API
  async function getData() {
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?i=${id}&apikey=2f2d7cf`
      );
      const data = await response.json(); // Parse the response as JSON

      if (data.Response === "True") {
        setMovie(data); // Set the movie data if successful
      } else {
        setError(data.error); // Handle error message from API
      }
    } catch (error) {
      setError("Failed to fetch data. Please try again later.");
    }
  }

  useEffect(() => {
    getData(); // Fetch movie data when component mounts
  }, [id]); // Run when the id from URL changes

  if (error) {
    return <div>Error: {error}</div>; // Display error message if there's an issue
  }

  if (!movie) {
    return <div>Loading...</div>; // Display loading while data is being fetched
  }

  return (
    <>
      <Header />
      <div className="detailcard">
        {/* Display movie details inside Bootstrap Card */}
        <Card style={{ width: '24rem' }} className="MovieCard-details">
          <Card.Img 
            variant="top" 
            src={movie.Poster} 
            alt={movie.Title} 
            className="movie-poster" // Added custom class for image control
          />
          <Card.Body className="d-flex flex-column justify-content-between">
            <div className="detail-details">
              <Card.Title>{movie.Title}</Card.Title>
              <Card.Text>Released: {movie.Year}</Card.Text>
              <Card.Text>Director: {movie.Director}</Card.Text>
              <Card.Text>Plot: {movie.Plot}</Card.Text>
              <Card.Text>Awards: {movie.Awards}</Card.Text>
            </div>
            {/* Centering the button */}
            <div className="mt-auto text-center pt-4">
              <Link to='/cards'> 
                <Button variant="primary">Go back</Button>
              </Link>
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}

export default Details;
