
import img1 from '../assets/img1.jpg';
import img2 from '../assets/img2.jpg';
import img3 from '../assets/img3.jpg';
import React from 'react';

const Home = () => {
  // Placeholder images for the education theme
  const educationImages = [img1, img2, img3];

  const summaries = [
    "Handwritten Answer Script Evaluation provides an innovative way to assess students' written responses. Utilizing advanced technologies like image processing and machine learning, this method translates handwritten content into a digital format. It eliminates the traditional constraints of manual checking, offering a more efficient and unbiased evaluation process.",
    "Traditional methods of handwritten answer script evaluation often suffer from inconsistencies due to human errors, bias, or fatigue. Different evaluators might interpret answers differently, leading to variance in marks awarded. Moreover, deciphering varied handwriting styles can further complicate the process. Such challenges underline the need for a more standardized and automated approach.",
    "Automated systems have revolutionized the grading process by significantly reducing the time taken to evaluate answer scripts. Leveraging algorithms and digital tools, these systems can instantly analyze and grade written content. Besides speed, they ensure consistent and objective evaluations, making results available to students in record time."
  ];

  return (
    <div className="container mx-auto p-8 min-h-screen">
      {/* Header */}
      <header className="text-center p-6 bg-transparent text-white mb-8 rounded-lg shadow-xl">
        <h1 className="text-4xl font-bold">Handwritten Answer Script Evaluation</h1>
      </header>

      {/* Image Carousel */}
      <div className="carousel relative w-full h-1/2 md:h-1/3 mb-8 overflow-hidden">
        {educationImages.map((image, index) => (
          <img key={index} src={image} alt="Education related" className="w-full h-full absolute transition-opacity duration-500" style={{ opacity: index === 0 ? '1' : '0' }} />
        ))}
      </div>

      {/* Main content */}
      <main className="my-8">
        {/* Alternating Images and Text */}
        {educationImages.map((image, index) => (
          <div className={`flex flex-wrap mb-8 ${index % 2 === 1 ? 'flex-row-reverse' : ''}`}>
            <div className="w-full md:w-1/2 p-4">
              <img src={image} alt="Education related" className="w-full h-auto shadow-lg rounded-lg transform transition-transform duration-300 hover:scale-105" />
            </div>
            <div className="w-full md:w-1/2 p-4 flex items-center">
              <p className="bg-gray-900 text-white p-4 rounded-lg shadow-md leading-relaxed">
                {summaries[index]}
              </p>
            </div>
          </div>
        ))}
      </main>

      {/* Footer */}
      <footer className="text-center p-6 bg-transparent text-white mt-8 rounded-lg shadow-xl">
        <p className="font-medium">&copy; 2023 Smart Eval. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
