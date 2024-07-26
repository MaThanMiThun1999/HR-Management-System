// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { getEmployees } from "../../api/employeeApi";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const EmployeeChart = () => {
  const [employeeData, setEmployeeData] = useState([]);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await getEmployees();
        setEmployeeData(response.data.employees);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    fetchEmployeeData();
  }, []);

  const processEmployeeData = () => {
    const roleCounts = employeeData.reduce((acc, employee) => {
      const { role } = employee;
      acc[role] = (acc[role] || 0) + 1;
      return acc;
    }, {});

    const labels = Object.keys(roleCounts);
    const data = Object.values(roleCounts);

    return {
      labels,
      datasets: [
        {
          label: "Number of Employees",
          data,
          backgroundColor: "rgba(75, 192, 192, 0.5)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    };
  };

  const chartData = processEmployeeData();

  const options = {
    plugins: {
      title: {
        display: true,
        text: "Employee Distribution by Role",
      },
    },
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default EmployeeChart;
