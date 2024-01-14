import './timeline.css';
import React, { useState } from 'react';

import { convertYearString, dates, mapBCFormat } from './constants';

import Timeline from './timelineChild';

export default function TimeLine() {
  const [index, setIndex] = useState(0);

  return (
    <>
      
      <Timeline index={index} onChange={setIndex} />
    </>
  );
}