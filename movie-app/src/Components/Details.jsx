import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Header from "./Header";

function Details() {
  const { id } = useParams(); // Get the movie ID from the URL params
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  async function getData() {
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?i=${id}&apikey=2f2d7cf`
      );
      const data = await response.json(); 

      if (data.Response) {
        setMovie(data);
      } else {
        setError(data.error);
      }
    } catch (error) {
      setError("Failed to fetch data. Please try again later.");
    }
  }

  useEffect(() => {
    getData();
  }, [id]);

  if (error) {
    return <div>Error: {error}</div>; 
  }

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <div
        className="background-image"
        style={{
          backgroundImage: `url(${movie.Poster})`,
          filter: "blur(2px)", 
          backgroundSize: "cover", 
          backgroundPosition: "center", 
          height: "120vh",
          position: "absolute",
          width: "100%", 
          zIndex: "-1",
        }}
      ></div>

      <div className="detailcard">
        <Card style={{ width: "26rem"}} className="MovieCard-details">
          <Card.Img
            variant="top"
            src={movie.Poster}
            alt={movie.Title}
            className="movie-poster"
          />
          <Card.Body className="d-flex flex-column justify-content-between">
            <div className="detail-details">
              <Card.Title>{movie.Title}</Card.Title>
              <Card.Text>Released: {movie.Year}</Card.Text>
              <Card.Text>Director: {movie.Director}</Card.Text>
              <Card.Text>Plot: {movie.Plot}</Card.Text>
              <Card.Text>Awards: {movie.Awards}</Card.Text>
            </div>
            <div className="mt-auto text-center pt-4 detail-btn">
              <Link to="/cards">
                <button
                  className="button-20"
                  style={{ width: "30%", height:"40px"}}
                  role="button">
                  Go Back
                </button>
              </Link>
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}

export default Details;
