import React from 'react';

const Item1 = () => {
  return (
    <div className='flex flex-col justify-center items-center space-y-6 p-8 bg-gray-800'>
      <h1 className='text-4xl font-bold text-white mb-6'>Calculate Score</h1>
      <div className='space-y-2'>
        <label className='block text-sm font-medium text-white mb-2'>Upload Answer Sheet:</label>
        <input type='file' className='p-2 border border-white rounded-md bg-gray-700 text-white' />
      </div>
      <div className='space-y-2'>
        <label className='block text-sm font-medium text-white mb-2'>Enter Answer Key:</label>
        <textarea rows='10' cols='1000' className='w-full p-2 border border-white rounded-md bg-gray-700 text-white' placeholder='Enter your answer key here'></textarea>
      </div>
      <button className='bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md'>
        Calculate Score
      </button>
    </div>
  );
}

export default Item1;
