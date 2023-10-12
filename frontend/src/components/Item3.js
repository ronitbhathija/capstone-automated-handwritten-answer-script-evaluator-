import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axios from 'axios';

const Item3 = () => {
  const [data, setData] = useState([]);  // Data fetched from the API
  const [selectedPaperId, setSelectedPaperId] = useState('');  // Currently selected paper_id from the dropdown
  const [graphData, setGraphData] = useState([]);  // Data for the graph

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/v1/getallmarks');
        setData(response.data.data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, []);

  const handlePaperIdChange = (event) => {
    const paperId = event.target.value;
    setSelectedPaperId(paperId);

    const filteredData = data.filter(item => item.paper_id === paperId);
    const intervals = Array(10).fill(0).map((_, index) => ({ range: `${index * 10}-${(index + 1) * 10}`, students: 0 }));
    filteredData.forEach(item => {
      const index = Math.floor(item.marks / 10);
      if (index < 10) {
        intervals[index].students += 1;
      }
    });
    setGraphData(intervals);
  };

  return (
    <div>
      <select onChange={handlePaperIdChange} style={{ top: '5px', right: '5px' }}>
        <option value="">Select Paper ID</option>
        {[...new Set(data.map(item => item.paper_id))].map(paperId => (
          <option key={paperId} value={paperId}>{paperId}</option>
        ))}
      </select>
      <br />
      <br />
      <br />
      <br />
      {selectedPaperId && (
        <BarChart width={600} height={300} data={graphData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="range" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="students" fill="#8884d8" />
        </BarChart>
      )}
    </div>
  );
};

export default Item3;
