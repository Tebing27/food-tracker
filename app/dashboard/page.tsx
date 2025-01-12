"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { GlucoseChart } from "@/components/GlucoseChart";

export default function DashboardPage() {
  const [data, setData] = useState<any[]>([]);
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