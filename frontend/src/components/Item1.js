import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Item1 = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [answer, setAnswer] = useState('');
  const [keyanswer, setkeyanswer] = useState('');

  const [percentage, setpercentage] = useState(0);
  const [student_id, setStudentId] = useState('');
  const [paper_id, setPaperId] = useState('');


  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file);
    }
  }

  const handleCalculateScore = async () => {
    if (uploadedFile) {
      const formData = new FormData();
      formData.append('image', uploadedFile);

      try {
        const response = await axios.post('http://localhost:4000/api/v1/extracttext', formData);
        setAnswer(response.data.data);
      } catch (error) {
        console.error('Error occurred:', error);
      }


      const finalanswers = {
        myanswer: answer,
        keyanswer: keyanswer
      }

      try {
        const response = await axios.post('http://localhost:4000/api/v1/calculatescore', finalanswers);
        setpercentage(response.data);
      } catch (err) {
        console.error('error', err);
      }
    }


  }

  useEffect(() => { // Assuming the initial value of percentage is 0
    const dataToSend = {
      student_id: student_id,
      paper_id: paper_id,
      score: percentage.data
    };
    try {
      axios.post('http://localhost:4000/api/v1/storescore', dataToSend);
    } catch (error) {
      console.error('Error sending data to API:', error);
    }
  }, [percentage]); // useEffect will run whenever `percentage` changes

  return (
    <div className='flex flex-col justify-center items-center space-y-6 p-8 bg-gray-800'>
      <h1 className='text-4xl font-bold text-white mb-6'>Calculate Score</h1>
      <label>
        Student ID:
        <input type="text" value={student_id} onChange={(e) => setStudentId(e.target.value)} />
      </label>
      <br />
      <label>
        Paper ID:
        <input type="text" value={paper_id} onChange={(e) => setPaperId(e.target.value)} />
      </label>
      <br />
      <div className='space-y-2'>
        <label className='block text-sm font-medium text-white mb-2'>Upload Answer Sheet:</label>
        <input type='file' onChange={handleFileChange} className='p-2 border border-white rounded-md bg-gray-700 text-white' />
      </div>
      <div className='space-y-2'>
        <label className='block text-sm font-medium text-white mb-2'>Enter Answer Key:</label>
        <textarea rows='10' cols='1000' value={keyanswer} onChange={e => setkeyanswer(e.target.value)} className='w-full p-2 border border-white rounded-md bg-gray-700 text-white' placeholder='Enter your answer key here'></textarea>
      </div>
      <button onClick={handleCalculateScore} className='bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md'>
        Calculate Score
      </button>
      <div>{percentage.data}</div>
    </div>
  );
}

export default Item1;




