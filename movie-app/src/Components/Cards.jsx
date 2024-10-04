import { useState, useEffect } from "react";
import { Pagination, Card } from "react-bootstrap";
import { Link } from "react-router-dom"; 
import Header from "./Header";

function Cards() {
  const [movies, setMovies] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1); 
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    const storedSearchText = localStorage.getItem("searchText");
    const storedMovies = localStorage.getItem("movies");

    if (storedSearchText && storedMovies) {
      setSearchText(storedSearchText);
      setMovies(JSON.parse(storedMovies)); 
    } else {
      getMovies(); 
    }
  }, []);

  async function getMovies(query = "batman") {
    const response = await fetch(
      `https://www.omdbapi.com/?s=${query}&apikey=2f2d7cf`
    );
    const json = await response.json();
    return json.Search || []; 
  }

  const handleSearch = async () => {
    if (searchText.trim() === "") return;
    const fetchedMovies = await getMovies(searchText); 
    setMovies(fetchedMovies); 
    setCurrentPage(1); 

    localStorage.setItem("searchText", searchText);
    localStorage.setItem("movies", JSON.stringify(fetchedMovies));
  };

  const indexOfLastMovie = currentPage * itemsPerPage;
  const indexOfFirstMovie = indexOfLastMovie - itemsPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  const totalPages = Math.ceil(movies.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Header />
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search Movies"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value); 
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch(); 
            }
          }}
        />
        <button className="search-btn" onClick={handleSearch}>
          Search
        </button>
      </div>
  
      <div className="MovieCard-list">
        {currentMovies.length > 0 ? (
          currentMovies.map((movie) => {
            const { imdbID, Poster, Title, Year } = movie; 
  
            return (
              <Link to={`/details/${imdbID}`} key={imdbID} style={{ textDecoration: 'none' }}>
                <Card style={{ width: '16rem' }} className="MovieCard">
                  <Card.Img variant="top" src={Poster} />
                  <Card.Body className="title-card">
                    <Card.Title>{Title}</Card.Title>
                    <Card.Text>Released: {Year}</Card.Text>
                  </Card.Body>
                </Card>
              </Link>
            );
          })
        ) : (
          <div className="no-results" style={{ textAlign: 'center', padding: '20px' }}>
            <h5>No movies found.</h5>
          </div>
        )}
      </div>

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
    </>
  );
}

export default Cards;
