import React, { useState } from 'react';
import { ATTRIBUTE_LIST } from '../data/attributes.jsx';

const CharacterForm = ({ addCharacter }) => {
  const initialAttributes = ATTRIBUTE_LIST.reduce((acc, attr) => {
    acc[attr] = 10; // Set default value to 10
    return acc;
  }, {});

  const [character, setCharacter] = useState({
    attributes: initialAttributes,
    skills: {}
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCharacter({
      ...character,
      attributes: {
        ...character.attributes,
        [name]: parseInt(value, 10),
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addCharacter(character);
  };

  return (
    <form onSubmit={handleSubmit} className="character-form">
      {ATTRIBUTE_LIST.map((attr) => (
        <div key={attr} className="attribute-row">
          <label>
            {attr}:
            <input
              type="number"
              name={attr}
              value={character.attributes[attr]}
              onChange={handleChange}
            />
          </label>
        </div>
      ))}
      <button type="submit">Add Character</button>
    </form>
  );
};

export default CharacterForm;
