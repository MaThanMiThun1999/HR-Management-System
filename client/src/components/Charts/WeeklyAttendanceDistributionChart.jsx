// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale } from 'chart.js';
import { getWeeklyAttendanceData } from '../../api/attendanceApi';

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale);

const WeeklyAttendanceDistributionChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
  });

  useEffect(() => {
    const fetchWeeklyAttendanceData = async () => {
      try {
        const response = await getWeeklyAttendanceData();
        const data = response;
        processWeeklyAttendanceData(data);
      } catch (error) {
        console.error('Error fetching weekly attendance data', error);
      }
    };

    fetchWeeklyAttendanceData();
  }, []);

  const processWeeklyAttendanceData = (data) => {
    const weeks = data.map(record => record.week);
    const presentCounts = data.map(record => record.present || 0);
    const absentCounts = data.map(record => record.absent || 0);
    const casualLeaveCounts = data.map(record => record.casual_leave || 0);
    const medicalLeaveCounts = data.map(record => record.medical_leave || 0);

    setChartData({
      labels: weeks,
      datasets: [
        {
          label: 'Present',
          data: presentCounts,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          fill: true,
        },
        {
          label: 'Absent',
          data: absentCounts,
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          fill: true,
        },
        {
          label: 'Casual Leave',
          data: casualLeaveCounts,
          borderColor: 'rgba(255, 206, 86, 1)',
          backgroundColor: 'rgba(255, 206, 86, 0.2)',
          fill: true,
        },
        {
          label: 'Medical Leave',
          data: medicalLeaveCounts,
          borderColor: 'rgba(153, 102, 255, 1)',
          backgroundColor: 'rgba(153, 102, 255, 0.2)',
          fill: true,
        }
      ]
    });
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(tooltipItem) {
            return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
          }
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Week'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Count'
        }
      }
    }
  };

  return (
    <div>
      <h2>Weekly Attendance Status Distribution</h2>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default WeeklyAttendanceDistributionChart;
