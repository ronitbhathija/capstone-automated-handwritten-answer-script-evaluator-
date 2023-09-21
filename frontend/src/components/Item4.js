
// import React from 'react';

// const Item4 = () => {
//   return (
//     <div className='flex justify-center items-center text-white text-3xl h-full'>
//       Item4
//     </div>
//   );
// }

// export default Item4;


import React, { useState } from 'react';
import axios from 'axios';

const Item4 = () => {
  // Form state
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    role: '',
    review: ''
  });

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send form data to your API endpoint
      await axios.post('http://localhost:4000/api/v1/submitreview', formData);

      // Reset the form after successful submission
      setFormData({
        firstname: '',
        lastname: '',
        role: '',
        review: ''
      });
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <div className='flex flex-col justify-center items-center p-8 h-full bg-gray-900 bg-opacity-70 bg-cover' style={{ backgroundImage: "url('/path/to/forgpt.jpg')" }}>
      <h2 className='text-3xl font-bold mb-6 text-white'>Submit Your Review</h2>

      <form onSubmit={handleSubmit} className='w-full md:w-1/2 bg-gray-800 bg-opacity-80 p-6 rounded-lg shadow-lg'>
        <div className='mb-4'>
          <label className='block text-sm font-medium mb-2 text-white' htmlFor='firstname'>First Name</label>
          <input
            type='text'
            id='firstname'
            name='firstname'
            value={formData.firstname}
            onChange={handleChange}
            className='w-full p-2 border rounded-md bg-gray-700 text-white'
          />
        </div>

        <div className='mb-4'>
          <label className='block text-sm font-medium mb-2 text-white' htmlFor='lastname'>Last Name</label>
          <input
            type='text'
            id='lastname'
            name='lastname'
            value={formData.lastname}
            onChange={handleChange}
            className='w-full p-2 border rounded-md bg-gray-700 text-white'
          />
        </div>

        <div className='mb-4'>
          <label className='block text-sm font-medium mb-2 text-white' htmlFor='role'>Role</label>
          <select
            id='role'
            name='role'
            value={formData.role}
            onChange={handleChange}
            className='w-full p-2 border rounded-md bg-gray-700 text-white'>
            <option value=''>Select Role</option>
            <option value='student'>Student</option>
            <option value='instructor'>Instructor</option>
          </select>
        </div>

        <div className='mb-4'>
          <label className='block text-sm font-medium mb-2 text-white' htmlFor='review'>Review</label>
          <textarea
            id='review'
            name='review'
            value={formData.review}
            onChange={handleChange}
            rows='4'
            className='w-full p-2 border rounded-md bg-gray-700 text-white'
          ></textarea>
        </div>

        <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600'>
          Submit Review
        </button>
      </form>
    </div>
  );
}

export default Item4;


