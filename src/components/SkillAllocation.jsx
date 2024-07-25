import React, { useState } from 'react';
import { SKILL_LIST } from '../data/skills';
import { calculateModifier } from '../utils/modifiers';

const SkillAllocation = ({ character, setCharacters, characters, index }) => {
  const [points, setPoints] = useState(10 + 4 * calculateModifier(character.attributes.Intelligence));

  const handleSkillChange = (skill, value) => {
    const updatedSkills = {
      ...character.skills,
      [skill]: Math.max(0, (character.skills[skill] || 0) + value),
    };

    const totalPointsSpent = Object.values(updatedSkills).reduce((acc, val) => acc + val, 0);
    if (totalPointsSpent > points) return; // Prevent exceeding total points

    const updatedCharacter = {
      ...character,
      skills: updatedSkills,
    };

    const updatedCharacters = [...characters];
    updatedCharacters[index] = updatedCharacter;
    setCharacters(updatedCharacters);
  };

  return (
    <div>
      <h3>Skills</h3>
      {SKILL_LIST.map((skill) => {
        const modifier = calculateModifier(character.attributes[skill.attributeModifier]);
        const skillPoints = character.skills[skill.name] || 0;
        const total = skillPoints + modifier;
        return (
          <div key={skill.name} className="skill-allocation">
            {skill.name} - points: {skillPoints}
            <button onClick={() => handleSkillChange(skill.name, 1)}>+</button>
            <button onClick={() => handleSkillChange(skill.name, -1)}>-</button>
            modifier ({skill.attributeModifier}): {modifier}
            total: {total}
          </div>
        );
      })}
    </div>
  );
};

export default SkillAllocation;
