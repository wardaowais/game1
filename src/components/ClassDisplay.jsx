import React from 'react';
import { ATTRIBUTE_LIST } from '../data/attributes';

const ClassDisplay = ({ classes, setSelectedClass }) => {
  return (
    <div className="class-display">
      <h3>Classes</h3>
      {Object.keys(classes).map((className) => (
        <button key={className} onClick={() => setSelectedClass(className)}>
          {className}
        </button>
      ))}
    </div>
  );
};

export default ClassDisplay;
