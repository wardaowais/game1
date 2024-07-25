import React, { useState } from 'react';
import { SKILL_LIST } from '../data/skills';

const SkillCheck = ({ character }) => {
  const [selectedSkill, setSelectedSkill] = useState(SKILL_LIST[0].name);
  const [dc, setDc] = useState(0);
  const [result, setResult] = useState(null);

  const handleRoll = () => {
    const roll = Math.floor(Math.random() * 20) + 1;
    const skill = SKILL_LIST.find((s) => s.name === selectedSkill);
    const skillValue = (character.skills[selectedSkill] || 0) + skill.modifier;
    const isSuccess = roll + skillValue >= dc;
    setResult({
      roll,
      skillValue,
      isSuccess,
    });
  };

  return (
    <div className="skill-check">
      <h3>Skill Check</h3>
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
          <p>Total Skill Value: {result.skillValue}</p>
          <p>{result.isSuccess ? 'Success' : 'Failure'}</p>
        </div>
      )}
    </div>
  );
};

export default SkillCheck;
