import React, { useState } from 'react';
import { SKILL_LIST } from '../data/skills';

const PartySkillCheck = ({ characters }) => {
  const [selectedSkill, setSelectedSkill] = useState(SKILL_LIST[0].name);
  const [dc, setDc] = useState(0);
  const [result, setResult] = useState(null);

  const handleRoll = () => {
    const roll = Math.floor(Math.random() * 20) + 1;
    let highestSkillValue = 0;
    let bestCharacter = null;

    characters.forEach((char) => {
      const skill = SKILL_LIST.find((s) => s.name === selectedSkill);
      const skillValue = (char.skills[selectedSkill] || 0) + skill.modifier;
      if (skillValue > highestSkillValue) {
        highestSkillValue = skillValue;
        bestCharacter = char;
      }
    });

    const isSuccess = roll + highestSkillValue >= dc;
    setResult({
      roll,
      highestSkillValue,
      isSuccess,
      bestCharacter,
    });
  };

  return (
    <div className="party-skill-check">
      <h3>Party Skill Check</h3>
      <div>
        <label>
          Skill:
          <select value={selectedSkill} onChange={(e) => setSelectedSkill(e.target.value)}>
            {SKILL_LIST.map((skill) => (
              <option key={skill.name} value={skill.name}>
                {skill.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          DC:
          <input type="number" value={dc} onChange={(e) => setDc(parseInt(e.target.value, 10))} />
        </label>
        <button onClick={handleRoll}>Roll</button>
      </div>
      {result && (
        <div>
          <p>Roll: {result.roll}</p>
          <p>Highest Skill Value: {result.highestSkillValue}</p>
          <p>Character: {result.bestCharacter ? result.bestCharacter.name : 'None'}</p>
          <p>{result.isSuccess ? 'Success' : 'Failure'}</p>
        </div>
      )}
    </div>
  );
};

export default PartySkillCheck;
