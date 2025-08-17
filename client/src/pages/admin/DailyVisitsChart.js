// src/components/DailyVisitsChart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const data = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  datasets: [
    {
      label: 'Visits',
      data: [200, 300, 250, 150, 270, 400],
      backgroundColor: '#5d3fd3',
    },
  ],
};

function DailyVisitsChart() {
  return (
    <div className="daily-visits-box">
      <h3>Daily Visits</h3>
      <Bar
        data={data}
        options={{
          maintainAspectRatio: false,
          scales: {
            y: { beginAtZero: true },
          },
          plugins: {
            legend: {
              display: true,
              position: 'top',
            },
          },
        }}
        width={840}
        height={730}
      />

    </div>
  );
}

export default DailyVisitsChart;
