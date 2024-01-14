export const dates = [
    "Pre_transit",
    1938,
    1945,
    1994,
  ];
  
  export const convertYearString = (format, year) => {
    if (year < 0) {
      return format(year);
    }
    return year.toString();
  };
  
  export const mapBCFormat = (value) => `bc${(value * -1).toString()}`;
  
  export const timelineBCFormat = (value) =>
    `${(value * -1).toString()} BC`;
  

// export const dates = [
//   "delivery complete",
//   1938,
//   "delivery complete",
//   1994,
// ];

// export const convertYearString = (format, year) => {
//   // Check if the year is a string (e.g., "delivery complete")
//   if (typeof year === 'string') {
//     return year;
//   }

//   if (year < 0) {
//     return format(year);
//   }

//   return year.toString();
// };

// export const mapBCFormat = (value) => `bc${(value * -1).toString()}`;

// export const timelineBCFormat = (value) =>
//   `${(value * -1).toString()} BC`;    