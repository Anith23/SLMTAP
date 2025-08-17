// src/components/TreatmentChart.js
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
Chart.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ['General Consultation', 'Dental Care', 'Eye Care', 'ENT'],
  datasets: [
    {
      label: 'Treatment Distribution',
      data: [40, 25, 20, 15],
      backgroundColor: ['#1a1a40', '#4a47a3', '#6a67ce', '#8c8ffc'],
      borderWidth: 1,
    },
  ],
};

function TreatmentChart() {
  return (
    <div className="chart-box">
      <h3>Treatment Types</h3>
      <Doughnut
        data={data}
        options={{
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'right',
            },
          },
        }}
        width={80}
        height={80}
      />

    </div>
  );
}

export default TreatmentChart;
