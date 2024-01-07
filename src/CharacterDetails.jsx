// CharacterDetails.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CharacterDetails.css'
import { useParams } from 'react-router-dom';

const CharacterDetails = () => {
  const [character, setCharacter] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchCharacterDetails = async () => {
      try {
        const response = await axios.get(`https://rickandmortyapi.com/api/character/${id}`);
        setCharacter(response.data);
      } catch (error) {
        console.error('Error fetching character details:', error);
      }
    };

    fetchCharacterDetails();
  }, [id]);

  if (!character) {
    return <div>Loading...</div>;
  }

  return (
    <div className='CardPage'>
      <h2>{character.name}</h2>
      <img src={character.image} alt={character.name} />
      <p>Status: {character.status}</p>
      <p>Origin: {character.origin.name}</p>
      <p>Gender: {character.gender}</p>
      <p>Location: {character.location.name}</p>
      <p>URL: {character.url}</p>
      <label htmlFor="episodeDropdown">Select Episode:</label>
      <select id="episodeDropdown">
        {character.episode.map((episode, index) => (
          <option key={index} value={episode}>
            {episode}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CharacterDetails;
