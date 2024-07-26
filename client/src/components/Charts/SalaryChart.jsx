// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { getSalaries } from "../../api/salaryApi";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const SalaryChart = () => {
  const [salaryData, setSalaryData] = useState([]);

  useEffect(() => {
    const fetchSalaryData = async () => {
      try {
        const response = await getSalaries();
        setSalaryData(response);
      } catch (error) {
        console.error("Error fetching salary data:", error);
      }
    };

    fetchSalaryData();
  }, []);

  const processSalaryData = () => {
    const groupedData = salaryData.reduce((acc, entry) => {
      const { date, netSalary, employeeId } = entry;
      const monthYear = new Date(date).toLocaleString("default", { month: "long", year: "numeric" });

      if (!acc[monthYear]) {
        acc[monthYear] = {};
      }

      if (!acc[monthYear][employeeId.name]) {
        acc[monthYear][employeeId.name] = 0;
      }
      acc[monthYear][employeeId.name] += netSalary;
      return acc;
    }, {});

    const labels = Object.keys(groupedData);
    const employeeNames = [...new Set(salaryData.map((entry) => entry.employeeId.name))];

    const datasets = employeeNames.map((name, index) => {
      const data = labels.map((label) => groupedData[label][name] || 0);
      const backgroundColor = `rgba(${((index + 1) * 50) % 255}, ${((index + 1) * 100) % 255}, ${((index + 1) * 150) % 255}, 0.5)`;
      const borderColor = `rgba(${((index + 1) * 50) % 255}, ${((index + 1) * 100) % 255}, ${((index + 1) * 150) % 255}, 1)`;

      return {
        label: name,
        data,
        backgroundColor,
        borderColor,
        borderWidth: 1,
      };
    });

    return { labels, datasets };
  };

  const chartData = processSalaryData();

  const options = {
    plugins: {
      title: {
        display: true,
        text: "Net Salaries Over Time",
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.raw;
            return `Net Salary: ₹${value.toLocaleString()}`;
          },
        },
      },
    },
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `₹${value.toLocaleString()}`,
        },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default SalaryChart;
