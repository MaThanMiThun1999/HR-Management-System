// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import {getEmployees} from '../../api/employeeApi';
import { Bubble } from 'react-chartjs-2';
import 'chart.js/auto'; 
import 'chartjs-adapter-date-fns'; 

const EmployeeBubbleChart = () => {
  const [employeeData, setEmployeeData] = useState([]);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await getEmployees();
        setEmployeeData(response.data.employees);
        
      } catch (error) {
        console.error('Error fetching employee data:', error);
     
      }
    };

    fetchEmployeeData();
  }, []);

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const processEmployeeData = () => {
    const roleColorMap = {};
    employeeData.forEach(employee => {
      if (!roleColorMap[employee.role]) {
        const randomColor = getRandomColor();
        roleColorMap[employee.role] = {
          backgroundColor: `${randomColor}80`,
          borderColor: randomColor,
        };
      }
    });

    const datasets = employeeData.map(employee => {
      const { role, joinedDate, contactNumber } = employee;
      const joinDate = new Date(joinedDate).getTime();
      const contactLength = contactNumber.length;

      return {
        label: employee.name,
        backgroundColor: roleColorMap[role].backgroundColor,
        borderColor: roleColorMap[role].borderColor,
        data: [{
          x: joinDate,
          y: contactLength,
          r: 20
        }],
      };
    });

    return {
      datasets,
    };
  };

  const chartData = processEmployeeData();

  const options = {
    plugins: {
      title: {
        display: true,
        text: 'Employee Distribution by Role, Join Date',
      },
    },
    responsive: true,
    scales: {
      x: {
        type: 'time',
        title: {
          display: true,
          text: 'Join Date',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Employee Detail',
        },
      },
    },
  };

  return (
    <Bubble data={chartData} options={options} />
  );
};

export default EmployeeBubbleChart;
