import React from 'react';
import { calculateModifier } from '../utils/modifiers';
import { ATTRIBUTE_LIST } from '../data/attributes.jsx';

const AttributeControl = ({ character, setCharacters, characters, index }) => {

  const handleAttributeChange = (attr, value) => {
    const updatedAttributes = {
      ...character.attributes,
      [attr]: Math.max(0, character.attributes[attr] + value),
    };

    const totalAttributes = Object.values(updatedAttributes).reduce((acc, val) => acc + val, 0);
    if (totalAttributes > 70) return; // Prevent increasing if total attributes exceed 70

    const updatedCharacter = {
      ...character,
      attributes: updatedAttributes,
    };

    const updatedCharacters = [...characters];
    updatedCharacters[index] = updatedCharacter;
    setCharacters(updatedCharacters);
  };

  return (
    <div>
      <h3>Attributes</h3>
      {ATTRIBUTE_LIST.map((attr) => (
        <div key={attr} className="attribute-control">
          <label>{attr}: {character.attributes[attr]}</label>
          <button onClick={() => handleAttributeChange(attr, 1)}>+</button>
          <button onClick={() => handleAttributeChange(attr, -1)}>-</button>
          <span>Modifier: {calculateModifier(character.attributes[attr])}</span>
        </div>
      ))}
    </div>
  );
};

export default AttributeControl;
