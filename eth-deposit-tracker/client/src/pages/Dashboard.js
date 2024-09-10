import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import './Dashboard.css';

const Dashboard = () => {
  const [deposits, setDeposits] = useState([]);

  useEffect(() => {
    const fetchDeposits = async () => {
      try {
        const response = await axios.get('http://localhost:5000/deposits');
        if (response.data) {
          setDeposits(response.data);
        }
      } catch (error) {
        console.error('Error fetching deposits:', error);
      }
    };

    fetchDeposits();
  }, []);

  // Total and average deposits calculation
  const validDeposits = deposits.filter(deposit => !isNaN(parseFloat(deposit.amount)));
  const totalDeposits = validDeposits.reduce((sum, deposit) => sum + parseFloat(deposit.amount), 0);
  const averageDeposit = validDeposits.length ? totalDeposits / validDeposits.length : 0;

  // Data for last 7 days
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const recentDeposits = validDeposits.filter(deposit => new Date(deposit.blockTimestamp) >= sevenDaysAgo);

  // Aggregating deposits by day
  const depositsByDay = recentDeposits.reduce((acc, deposit) => {
    const date = new Date(deposit.blockTimestamp).toLocaleDateString();
    acc[date] = (acc[date] || 0) + parseFloat(deposit.amount);
    return acc;
  }, {});

  const depositsByDayData = Object.entries(depositsByDay).map(([date, amount]) => ({ date, amount }));

  // Ensure data for PieChart (e.g., top 5 deposits by amount)
  const topDeposits = validDeposits
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 5)
    .map((deposit, index) => ({
      name: `Deposit ${index + 1}`,
      amount: parseFloat(deposit.amount),
    }));

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="stats-container">
        <div className="stat-card">
          <h2>Total Deposits</h2>
          <p>{totalDeposits.toFixed(5)} ETH</p>
        </div>
        <div className="stat-card">
          <h2>Average Deposit</h2>
          <p>{averageDeposit.toFixed(5)} ETH</p>
        </div>
      </div>
      <div className="chart-container">
        <h2>Deposits by Day (Last 7 Days)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={depositsByDayData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="amount" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="chart-container">
        <h2>Deposit Distribution</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={topDeposits}
              dataKey="amount"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            >
              {topDeposits.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={`hsl(${index * 70}, 70%, 50%)`} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
