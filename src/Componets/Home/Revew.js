// import React from 'react';
// const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
// const [currentSlide, setCurrentSlide] = useState(0);

// useEffect(() => {
//   const handleResize = () => {
//     setIsMobile(window.innerWidth <= 768);
//   };

//   window.addEventListener('resize', handleResize);

//   return () => {
//     window.removeEventListener('resize', handleResize);
//   };
// }, []);

// const goToSlide = (index) => {
//   setCurrentSlide(index);
// };

// const CustomerReviews = () => {
//   const reviews = [
//     {
//       id: 1,
//       author: 'John Doe',
//       rating: 5,
//       comment: 'Amazing service! Quick delivery and excellent customer support.',
//       imageUrl: 'https://via.placeholder.com/150', // Placeholder image URL
//     },
//     {
//       id: 2,
//       author: 'Jane Smith',
//       rating: 4,
//       comment: 'I love the quality of the products. Shipping was faster than expected.',
//       imageUrl: 'https://via.placeholder.com/150', // Placeholder image URL
//     },
//     {
//       id: 3,
//       author: 'Sam Johnson',
//       rating: 5,
//       comment: 'Outstanding experience. Will definitely order again.',
//       imageUrl: 'https://via.placeholder.com/150', // Placeholder image URL
//     },
//   ];



// return (
// <div>
// <div className="bglightcustomer">
//   <div className="container">
//     <div className="pypc ">
//       <h2 className="fw-bold text-center py-5 textinfo">Voice of Our Customers</h2>
//       {isMobile ? (
//         <div className="slider-container">
//           {reviews.map((review, index) => (
//             <div
//               key={review.id}
//               className={`slide ${index === currentSlide ? 'active' : ''}`}
//             >
//               <div className="card h-100 border-0 shadow-sm" 
//                onTouchStart={() => goToSlide(index)}
               
//                >
                
//                 <div className="text-center my-3">
//                   <img
//                     src={review.imageUrl}
//                     className="card-img-top rounded-circle"
//                     alt={`Customer ${review.id}`}
//                     style={{ width: '70px', height: '70px', objectFit: 'cover' }}
//                   />
//                 </div>
//                 <div className="card-body text-center">
//                   <p className="card-text">{review.comment}</p>
//                   <h5 className="card-title">{review.author}</h5>
//                   <div className="rating pt-2 pb-5">
//                     {Array.from({ length: review.rating }, (_, index) => (
//                       <span key={index} className="text-warning">&#9733;</span>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//           <div className="dots">
//             {reviews.map((_, index) => (
//               <span
//                 key={index}
//                 className={`dot ${index === currentSlide ? 'active' : ''}`}
//                 onClick={() => goToSlide(index)}
//               ></span>
//             ))}
//           </div>
//         </div>
//       ) : (
//         <div className="row">
//           {reviews.map((review) => (
//             <div key={review.id} className="col-md-4 mb-4">
//               <div className="card h-100 border-0 shadow-sm">
//                 <div className="text-center my-3">
//                   <img
//                     src={review.imageUrl}
//                     className="card-img-top rounded-circle"
//                     alt={`Customer ${review.id}`}
//                     style={{ width: '70px', height: '70px', objectFit: 'cover' }}
//                   />
//                 </div>
//                 <div className="card-body text-center">
//                   <p className="card-text">{review.comment}</p>
//                   <h5 className="card-title">{review.author}</h5>
//                   <div className="rating pt-2 pb-5">
//                     {Array.from({ length: review.rating }, (_, index) => (
//                       <span key={index} className="text-warning">&#9733;</span>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   </div>
// </div>

// </div>
//   );
  
// };

// export default CustomerReviews;
