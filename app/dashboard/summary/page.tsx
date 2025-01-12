"use client";

import { useEffect, useState, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { GlucoseChart } from "@/components/GlucoseChart";
import { BloodSugarRecord } from "@/types";

export default function SummaryPage() {
  const [data] = useState<BloodSugarRecord[]>([]);
  const [loading] = useState(true);
  const [error] = useState<string | null>(null);
  const [stats, setStats] = useState({
    average: 0,
    highest: 0,
    lowest: 999,
    normalCount: 0,
    highCount: 0,
    lowCount: 0,
  });

  const processData = useCallback(() => {
    if (data.length === 0) return;

    let total = 0;
    let highest = 0;
    let lowest = 999;
    let normalCount = 0;
    let highCount = 0;
    let lowCount = 0;

    data.forEach(record => {
      total += record.value;
      if (record.value > highest) highest = record.value;
      if (record.value < lowest) lowest = record.value;

      if (record.value < 70) {
        lowCount++;
      } else if (record.value > 140) {
        highCount++;
      } else {
        normalCount++;
      }
    });

    setStats({
      average: total / data.length,
      highest,
      lowest,
      normalCount,
      highCount,
      lowCount,
    });
  }, [data]);

  useEffect(() => {
    processData();
  }, [processData]);

  return (
    <div>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 pt-28">
          <div className="max-w-4xl mx-auto space-y-8">
            <Card className="p-6">
              <h1 className="text-2xl font-bold mb-6">Ringkasan Gula Darah</h1>
              {loading ? (
                <p>Loading...</p>
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h2 className="text-lg font-semibold mb-2">Rata-rata</h2>
                    <p className="text-2xl text-green-600">{stats.average.toFixed(1)} mg/dL</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h2 className="text-lg font-semibold mb-2">Tertinggi</h2>
                    <p className="text-2xl text-red-600">{stats.highest} mg/dL</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h2 className="text-lg font-semibold mb-2">Terendah</h2>
                    <p className="text-2xl text-blue-600">{stats.lowest} mg/dL</p>
                  </div>
                </div>
              )}
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Grafik Gula Darah</h2>
              <div className="h-[400px]">
                <GlucoseChart data={data} />
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Distribusi Hasil</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-700">Normal</h3>
                  <p className="text-2xl text-green-600">{stats.normalCount}</p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-red-700">Tinggi</h3>
                  <p className="text-2xl text-red-600">{stats.highCount}</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-700">Rendah</h3>
                  <p className="text-2xl text-blue-600">{stats.lowCount}</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
} 