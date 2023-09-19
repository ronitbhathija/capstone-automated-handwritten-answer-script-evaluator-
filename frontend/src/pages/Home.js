// import React from 'react'

// const Home = ({ isLoggedIn }) => {
//   return (
//     <div className='flex justify-center items-center text-white text-3xl h-full'>
//       Home
//     </div>
//   )
// }

// export default Home


import img1 from '../assets/img1.jpg';
import img2 from '../assets/img2.jpg';
import img3 from '../assets/img3.jpg';
import React from 'react';

const Home = () => {
  // Placeholder images for the education theme
  const educationImages = [
    img1, img2, img3
  ];

  return (
    <div className="container mx-auto p-4">
      {/* Header */}
      <header className="text-center p-4 bg-blue-600 text-white">
        <h1 className="text-3xl">Handwritten Answer Script Evaluation</h1>
      </header>

      {/* Main content */}
      <main className="my-8">
        {/* Images */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {educationImages.map((image, index) => (
            <img key={index} src={image} alt="Education related" className="w-full h-auto shadow-md rounded-lg" />
          ))}
        </div>

        {/* Summary */}
        <div className="mt-8 p-4 bg-gray-100 rounded-lg shadow-md">
          <p>An automated paper evaluation solution that utilizes machine learning algorithms, image processing, and natural language processing to streamline the grading of subjective handwritten answers. By automating the conversion of scanned documents to text and employing a transformer model for answer comparison, the system aims to save time for educators, enhance grading accuracy and consistency. This innovative approach addresses the challenges of manual evaluation, ensuring a faster, fairer, and more efficient grading process while promoting student learning and growth.</p>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center p-4 bg-blue-600 text-white mt-8">
        <p>&copy; 2023 YourCompanyName. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;


