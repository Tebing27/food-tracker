'use client'

import { Line } from "react-chartjs-2";
import { BloodSugarRecord } from "@/types";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface GlucoseChartProps {
  data: BloodSugarRecord[];
}

export function GlucoseChart({ data }: GlucoseChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        Belum ada data untuk ditampilkan
      </div>
    );
  }

  const chartData = {
    labels: data.map(record => new Date(record.date).toLocaleDateString('id-ID')),
    datasets: [
      {
        label: 'Gula Darah (mg/dL)',
        data: data.map(record => record.bloodSugar),
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.5)',
        tension: 0.3
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'mg/dL'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Tanggal'
        }
      }
    }
  };

  return (
    <div className="w-full h-full">
      <Line options={options} data={chartData} />
    </div>
  );
}

