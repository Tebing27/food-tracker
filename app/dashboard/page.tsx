"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { GlucoseChart } from "@/components/GlucoseChart";
import { BloodSugarRecord } from "@/types";

export default function DashboardPage() {
  const [data, setData] = useState<BloodSugarRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/blood-sugar');
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(Array.isArray(result) ? result : []);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error instanceof Error ? error.message : 'Gagal memuat data');
        setData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 pt-28">
          <div className="max-w-4xl mx-auto space-y-8">
            <Card className="p-6">
              <h1 className="text-2xl font-bold mb-6">Ringkasan Gula Darah</h1>
              {isLoading ? (
                <p>Memuat data...</p>
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : data.length === 0 ? (
                <p>Data belum tersedia.</p>
              ) : (
                <p>Data tersedia: {data.length} entri</p>
              )}
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Grafik Gula Darah</h2>
              <div className="h-[400px]">
                <GlucoseChart data={data} />
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}