import React from 'react';
import HorizontalTimeline from 'react-horizontal-timeline';
import { convertYearString, dates, timelineBCFormat } from './constants';

const Timeline = ({ index, onChange }) => (
  <div className="timeline">
    <div
      style={{
        width: '100%',
        height: '100px',
        fontSize: '15px',
      }}
      className="timeline"
    >
      <HorizontalTimeline
        styles={{
          background: '#252525',
          foreground: '#64dfdf',
          outline: '#6930c3',
        }}
        index={index}
        indexClick={(newIndex) => {
          onChange(newIndex);
        }}
        getLabel={(date) =>
          convertYearString(timelineBCFormat, new Date(date, 0).getFullYear())
        }
        values={dates}
      />
    </div>
  </div>
);

export default Timeline;

