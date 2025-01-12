"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { BloodSugarRecord } from "@/types";

export default function SummaryPage() {
  const [data, setData] = useState<BloodSugarRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/blood-sugar');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const calculateStats = () => {
    if (data.length === 0) return null;

    const sortedValues = [...data].sort((a, b) => a.bloodSugar - b.bloodSugar);
    const average = data.reduce((acc, curr) => acc + curr.bloodSugar, 0) / data.length;
    const lowest = sortedValues[0].bloodSugar;
    const highest = sortedValues[sortedValues.length - 1].bloodSugar;
    const median = sortedValues[Math.floor(sortedValues.length / 2)].bloodSugar;

    return {
      average: Math.round(average),
      lowest,
      highest,
      median,
      total: data.length
    };
  };

  const stats = calculateStats();

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-xl font-bold mb-4">Statistik Gula Darah</h2>
        {isLoading ? (
          <p>Memuat data...</p>
        ) : !stats ? (
          <p>Belum ada data untuk dianalisis</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-gray-500">Rata-rata</p>
              <p className="text-2xl font-bold">{stats.average} mg/dL</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Terendah</p>
              <p className="text-2xl font-bold">{stats.lowest} mg/dL</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Tertinggi</p>
              <p className="text-2xl font-bold">{stats.highest} mg/dL</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Median</p>
              <p className="text-2xl font-bold">{stats.median} mg/dL</p>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
} 