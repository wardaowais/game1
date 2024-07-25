import React, { useState } from 'react';
import CharacterForm from './components/CharacterForm';
import ClassDisplay from './components/ClassDisplay';
import SkillAllocation from './components/SkillAllocation';
import SkillCheck from './components/SkillCheck';
import PartySkillCheck from './components/PartySkillCheck';
import { ATTRIBUTE_LIST } from './data/attributes.jsx';
import { CLASS_LIST } from './data/classes.jsx';
import { SKILL_LIST } from './data/skills.jsx';
import './App.css';

function App() {
  const [characters, setCharacters] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);

  const addCharacter = (character) => {
    setCharacters([...characters, character]);
  };

  return (
    <div className="App">
      <h1>RPG Character Sheet</h1>
      <CharacterForm addCharacter={addCharacter} />
      <div>
        {characters.map((char, index) => (
          <div key={index} className="character-section">
            <h2>Character {index + 1}</h2>
            <AttributeControl character={char} setCharacters={setCharacters} characters={characters} index={index}/>
            <SkillAllocation character={char} setCharacters={setCharacters} characters={characters} index={index}/>
            <SkillCheck character={char} />
          </div>
        ))}
      </div>
      <ClassDisplay classes={CLASS_LIST} setSelectedClass={setSelectedClass} />
      {selectedClass && (
        <div>
          <h2>Class Requirements</h2>
          <pre>{JSON.stringify(CLASS_LIST[selectedClass], null, 2)}</pre>
        </div>
      )}
      <PartySkillCheck characters={characters} />
    </div>
  );
}

export default App;
