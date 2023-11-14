import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Item1 = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [answer, setAnswer] = useState('');
  const [keyanswer, setKeyAnswer] = useState('');

  const [percentage, setPercentage] = useState(0);
  const [student_id, setStudentId] = useState('');
  const [paper_id, setPaperId] = useState('');

  const [items, setItems] = useState([]); // Array to store added answers
  const [equations, setEquations] = useState([]); // Array to store added equations

  const [questionNumber, setQuestionNumber] = useState('');
  const [answerText, setAnswerText] = useState('');
  const [maxMarks, setMaxMarks] = useState('');

  const [equationQuestionNumber, setEquationQuestionNumber] = useState('');
  const [equationText, setEquationText] = useState('');
  const [equationMaxMarks, setEquationMaxMarks] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file);
    }
  }

  const handleAddAnswer = () => {
    const newItem = [questionNumber, answerText, maxMarks];
    setItems([...items, newItem]);
    clearAnswerFields();
  }

  const handleAddEquation = () => {
    const newEquation = [equationQuestionNumber, equationText, equationMaxMarks];
    setEquations([...equations, newEquation]);
    clearEquationFields();
  }

  const handleDeleteAnswer = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  }

  const handleDeleteEquation = (index) => {
    const updatedEquations = [...equations];
    updatedEquations.splice(index, 1);
    setEquations(updatedEquations);
  }

  // const handleCalculateScore = async () => {
  //   if (uploadedFile) {
  //     const formData = new FormData();
  //     formData.append('image', uploadedFile);

  //     try {
  //       const response = await axios.post('http://localhost:4000/api/v1/extracttext', formData);
  //       setAnswer(response.data.data);
  //     } catch (error) {
  //       console.error('Error occurred:', error);
  //     }

  //     const finalAnswers = {
  //       myanswer: answer,
  //       items: items,
  //       equations: equations,
  //     };

  //     try {
  //       const response = await axios.post('http://localhost:4000/api/v1/calculatescore', finalAnswers);
  //       console.log(response);
  //       setPercentage(response.data);

  //       // const dataToSend = {
  //       //   student_id: student_id,
  //       //   paper_id: paper_id,
  //       //   score: response.data,
  //       // };

  //       // try {
  //       //   axios.post('http://localhost:4000/api/v1/storescore', dataToSend);
  //       // } catch (error) {
  //       //   console.error('Error sending data to API:', error);
  //       // }
  //     } catch (err) {
  //       console.error('error', err);
  //     }
  //   }
  // }


  const handleCalculateScore = async () => {
    if (uploadedFile) {
      const formData = new FormData();
      formData.append('image', uploadedFile);

      try {
        const response = await axios.post('http://localhost:4000/api/v1/extracttext', formData);
        setAnswer(response.data.data);

        const finalAnswers = {
          myanswer: response.data.data,
          items: items,
          equations: equations,
        };

        try {
          const scoreResponse = await axios.post('http://localhost:4000/api/v1/calculatescore', finalAnswers);
          console.log(scoreResponse);

          if (scoreResponse.data.success) {
            const dataToSend = {
              student_id: student_id,
              paper_id: paper_id,
              score: scoreResponse.data.data, // Extracting the numeric value
            };

            try {
              const storeScoreResponse = await axios.post('http://localhost:4000/api/v1/storescore', dataToSend);
              console.log(storeScoreResponse);
              // Additional handling if needed
            } catch (storeScoreError) {
              console.error('Error storing score:', storeScoreError);
            }
          } else {
            console.error('Error calculating score:', scoreResponse.data.message);
          }

        } catch (scoreError) {
          console.error('Error calculating score:', scoreError);
        }

      } catch (error) {
        console.error('Error occurred:', error);
      }
    }
  };


  // useEffect(() => {
  //   const dataToSend = {
  //     student_id: student_id,
  //     paper_id: paper_id,
  //     score: percentage.data,
  //   };
  //   try {
  //     axios.post('http://localhost:4000/api/v1/storescore', dataToSend);
  //   } catch (error) {
  //     console.error('Error sending data to API:', error);
  //   }
  // }, [percentage]);

  const clearAnswerFields = () => {
    setQuestionNumber('');
    setAnswerText('');
    setMaxMarks('');
  }

  const clearEquationFields = () => {
    setEquationQuestionNumber('');
    setEquationText('');
    setEquationMaxMarks('');
  }

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
        <label className='block text-sm font-medium text-white mb-2'>Add Answer:</label>
        <input
          type='text'
          placeholder='Question Number'
          value={questionNumber}
          onChange={e => setQuestionNumber(e.target.value)}
          style={{ width: '25%', height: '90px', padding: '8px', fontSize: '16px' }}
        />
        <input
          type='text'
          placeholder='Enter Answer'
          value={answerText}
          onChange={e => setAnswerText(e.target.value)}
          style={{ width: '40%', height: '90px', padding: '8px', fontSize: '16px' }}
        />
        <input
          type='text'
          placeholder='Max Marks'
          value={maxMarks}
          onChange={e => setMaxMarks(e.target.value)}
          style={{ width: '35%', height: '90px', padding: '8px', fontSize: '16px' }}
        />
        <button onClick={handleAddAnswer} className='bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md'>
          Add Answer
        </button>
      </div>
      <div className='space-y-2'>
        <label className='block text-sm font-medium text-white mb-2'>Add Equation:</label>
        <input
          type='text'
          placeholder='Question Number'
          value={equationQuestionNumber}
          onChange={e => setEquationQuestionNumber(e.target.value)}
          style={{ width: '25%', height: '90px', padding: '8px', fontSize: '16px' }}
        />
        <input
          type='text'
          placeholder='Enter Equation'
          value={equationText}
          onChange={e => setEquationText(e.target.value)}
          style={{ width: '40%', height: '90px', padding: '8px', fontSize: '16px' }}
        />
        <input
          type='text'
          placeholder='Max Marks'
          value={equationMaxMarks}
          onChange={e => setEquationMaxMarks(e.target.value)}
          style={{ width: '35%', height: '90px', padding: '8px', fontSize: '16px' }}
        />
        <button onClick={handleAddEquation} className='bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md'>
          Add Equation
        </button>
      </div>
      <button onClick={handleCalculateScore} className='bg-blue-500 hover-bg-blue-600 text-white font-semibold py-2 px-4 rounded-md'>
        Calculate Score
      </button>
      <div>{percentage.data}</div>
      <div>
        <h2>Added Answers:</h2>
        <ul>
          {items.map((item, index) => (
            <li key={index}>
              Question {item[0]}: {item[1]} (Max Marks: {item[2]})
              <button onClick={() => handleDeleteAnswer(index)} className='text-red-500 ml-2'>Delete</button>
            </li>
          ))}
        </ul>
        <h2>Added Equations:</h2>
        <ul>
          {equations.map((equation, index) => (
            <li key={index}>
              Question {equation[0]}: {equation[1]} (Max Marks: {equation[2]})
              <button onClick={() => handleDeleteEquation(index)} className='text-red-500 ml-2'>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Item1;
