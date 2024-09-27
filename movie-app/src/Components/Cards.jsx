import { useState, useEffect } from "react";
import { Pagination, Card } from "react-bootstrap";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import './style.css'

function Cards() {
  const [movies, setMovies] = useState([]); // Store the list of movies
  const [searchText, setSearchText] = useState(""); // Search text state
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [itemsPerPage] = useState(5); // Number of movies per page

  // Fetch movie data on initial render
  useEffect(() => {
    const storedSearchText = localStorage.getItem("searchText");
    const storedMovies = localStorage.getItem("movies");

    if (storedSearchText && storedMovies) {
      setSearchText(storedSearchText);
      setMovies(JSON.parse(storedMovies)); // Load the movies from localStorage
    } else {
      getMovies(); // Fetch movies for the first time
    }
  }, []);

  // Fetch movie data from the OMDb API
  async function getMovies(query = "batman") { // Default query to fetch some initial movies
    const response = await fetch(
      `https://www.omdbapi.com/?s=${query}&apikey=2f2d7cf`
    );
    const json = await response.json();
    return json.Search || []; // Return the movies found or an empty array
  }

  const handleSearch = async () => {
    if (searchText.trim() === "") return; // Stops execution if input is empty
  
    // Otherwise, continue with the search operation, e.g., fetching search results
    const fetchedMovies = await getMovies(searchText); // Fetch new movies based on search text
    setMovies(fetchedMovies); // Update the displayed movies
    setCurrentPage(1); // Reset to the first page after search

    // Save the search result to localStorage
    localStorage.setItem("searchText", searchText);
    localStorage.setItem("movies", JSON.stringify(fetchedMovies));
  };

  // Get current page's movies
  const indexOfLastMovie = currentPage * itemsPerPage;
  const indexOfFirstMovie = indexOfLastMovie - itemsPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  // Calculate total pages
  const totalPages = Math.ceil(movies.length / itemsPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="whole">
      <Navbar />
      {/* Search Input and Button */}
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search Movies"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value); // Update search text as user types
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch(); // Call handleSearch when Enter is pressed
            }
          }}
        />
        <button className="search-btn" onClick={handleSearch}>
          Search
        </button>
      </div>

      {/* Movie Cards */}
      <div className="MovieCard-list">
        {currentMovies.map((movie) => {
          const { imdbID, Poster, Title, Year } = movie; // Destructure movie data

          return (
            
            <Link to={`/details/${imdbID}`} key={imdbID} style={{ textDecoration: 'none' }}>
              
              <Card style={{ width: '16rem', cursor: 'pointer' }} className="MovieCard">
                <div className="card-image">
                <Card.Img variant="top" src={Poster} />
                </div>
                <Card.Body className="d-flex flex-column justify-content-between">
                  <div>
                    <Card.Title>{Title}</Card.Title>
                    <Card.Text>Released: {Year}</Card.Text>
                  </div>
                </Card.Body>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Pagination Component */}
      {totalPages > 1 && (
        <Pagination className="pagination">
          <Pagination.First onClick={() => paginate(1)} disabled={currentPage === 1} />
          <Pagination.Prev onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} />

          {[...Array(totalPages)].map((_, index) => (
            <Pagination.Item
              key={index + 1}
              active={index + 1 === currentPage}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}

          <Pagination.Next onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} />
          <Pagination.Last onClick={() => paginate(totalPages)} disabled={currentPage === totalPages} />
        </Pagination>
      )}
    </div>
  );
}

export default Cards;

