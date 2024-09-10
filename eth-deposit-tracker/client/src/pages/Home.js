import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { debounce } from 'lodash';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './Home.css';

const Home = () => {
  const [deposits, setDeposits] = useState([]);
  const [filteredDeposits, setFilteredDeposits] = useState([]);
  const [filter, setFilter] = useState('all'); // Default filter is 'all'

  // Fetch deposits with a specific filter
  const fetchDeposits = debounce((filter) => {
    let url = 'http://localhost:5000/deposits';
    if (filter !== 'all') {
      // Add filter parameters to URL
      const now = new Date();
      const startDate = new Date();
      if (filter === '24h') {
        startDate.setHours(now.getHours() - 24);
      } else if (filter === '7d') {
        startDate.setDate(now.getDate() - 7);
      }
      url += `?startDate=${startDate.toISOString()}`;
    }

    axios.get(url)
      .then(response => {
        const uniqueDeposits = response.data.reduce((acc, deposit) => {
          if (!acc.find(item => item.hash === deposit.hash)) {
            acc.push(deposit);
          }
          return acc;
        }, []);

        uniqueDeposits.sort((a, b) => new Date(b.blockTimestamp) - new Date(a.blockTimestamp));
        setDeposits(uniqueDeposits);
        setFilteredDeposits(uniqueDeposits);
      })
      .catch(error => console.error(error));
  }, 1000);

  useEffect(() => {
    fetchDeposits(filter);
    const intervalId = setInterval(() => fetchDeposits(filter), 10000);
    return () => clearInterval(intervalId);
  }, [filter]);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    fetchDeposits(newFilter);
  };

  return (
    <div className="home">
      <h1>Ethereum Deposit Tracker</h1>
      <div className="filter-buttons">
        <button onClick={() => handleFilterChange('24h')}>Last 24 Hours</button>
        <button onClick={() => handleFilterChange('7d')}>Last 7 Days</button>
        <button onClick={() => handleFilterChange('all')}>All Time</button>
      </div>
      <div className="chart-container">
        <h2>Recent Deposits</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={filteredDeposits.slice(0, 10)}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="blockNumber" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="amount" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="table-container">
        <h2>Deposit Table</h2>
        <table>
          <thead>
            <tr>
              <th>Block Number</th>
              <th>Timestamp</th>
              <th>Fee</th>
              <th>Hash</th>
              <th>Public Key</th>
              <th>Sender</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {filteredDeposits.map(deposit => (
              <tr key={deposit.hash}>
                <td>{deposit.blockNumber}</td>
                <td>{new Date(deposit.blockTimestamp).toLocaleString()}</td>
                <td>{deposit.fee}</td>
                <td>{deposit.hash}</td>
                <td>{deposit.pubkey}</td>
                <td>{deposit.sender}</td>
                <td>{deposit.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
