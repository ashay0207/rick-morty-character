// CharacterPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './CharacterPage.css';

const CharacterPage = () => {
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await axios.get(`https://rickandmortyapi.com/api/character?page=${currentPage}`);
        setCharacters(response.data.results);
        setTotalPages(response.data.info.pages);
      } catch (error) {
        console.error('Error fetching characters:', error);
      }
    };

    fetchCharacters();
  }, [currentPage]);

  useEffect(() => {
    const filteredResults = characters.filter(
      (character) =>
        character.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        character.location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        character.episode.some((episode) => episode.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    setFilteredCharacters(filteredResults);
  }, [searchTerm, characters]);

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return (
    <div>
      <h2>Rick and Morty Characters</h2>
      <input
        type="text"
        placeholder="Search by name, location, or episode"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="character-list">
        {filteredCharacters.map((character) => (
          <Link key={character.id} to={`/characters/${character.id}`} className="character-card">
            <img src={character.image} alt={character.name} />
            <div>
              <h3>{character.name}</h3>
              <p>Type: {character.type || 'Unknown'}</p>
              <p>Total Episodes: {character.episode.length}</p>
              <p>Location: {character.location.name}</p>
            </div>
          </Link>
        ))}
      </div>
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span> Page {currentPage} of {totalPages} </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default CharacterPage;
