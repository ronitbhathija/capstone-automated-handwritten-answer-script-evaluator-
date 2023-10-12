import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axios from 'axios';

const Item6 = (props) => {
    const userData = props.tokenPayload;
    const sid = userData.id;

    const [data, setData] = useState([]);  // Data fetched from the API
    const [selectedPaperId, setSelectedPaperId] = useState('');  // Currently selected paper_id from the dropdown
    const [graphData, setGraphData] = useState([]);  // Data for the graph
    const [studentMarks, setStudentMarks] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/v1/getallmarks');
                const studentData = response.data.data.filter(item => item.id === sid);
                setData(studentData);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };

        fetchData();
    }, [sid]);

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

        const studentEntry = filteredData.find(item => item.id === sid);
        if (studentEntry) {
            setStudentMarks(studentEntry.marks);
        }
    };

    return (
        <div>
            <select onChange={handlePaperIdChange} style={{ position: 'absolute', top: '10px', right: '10px' }}>
                <option value="">Select Paper ID</option>
                {data.map(item => (
                    <option key={item.paper_id} value={item.paper_id}>{item.paper_id}</option>
                ))}
            </select>
            {selectedPaperId && (
                <>
                    <BarChart width={600} height={300} data={graphData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="range" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="students" fill="#8884d8" />
                    </BarChart>
                    <p>Marks obtained by student {sid} in paper {selectedPaperId}: {studentMarks}</p>
                </>
            )}
        </div>
    );
};

export default Item6;
