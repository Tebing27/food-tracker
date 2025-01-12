"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BloodSugarRecord } from "@/types";

export function ExportImportButtons() {
  const [isImporting, setIsImporting] = useState(false);

  const exportData = async () => {
    try {
      const response = await fetch('/api/blood-sugar');
      const data: BloodSugarRecord[] = await response.json();

      // Format data untuk CSV
      const csvContent = [
        // Header
        ['Tanggal', 'Gula Darah (mg/dL)', 'Catatan'].join(','),
        // Data rows
        ...data.map(record => [
          new Date(record.date).toLocaleDateString('id-ID'),
          record.bloodSugar,
          record.notes || ''
        ].join(','))
      ].join('\n');

      // Buat dan download file
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `gula-darah-export-${new Date().toISOString().split('T')[0]}.csv`;
      link.click();
    } catch (error) {
      console.error('Error exporting data:', error);
      alert('Gagal mengekspor data');
    }
  };

  const importData = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) return;

    setIsImporting(true);
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = async (e) => {
      try {
        const text = e.target?.result as string;
        const rows = text.split('\n').slice(1); // Skip header row

        const records = rows.map(row => {
          const [dateStr, bloodSugarStr, notes] = row.split(',');
          return {
            date: new Date(dateStr),
            bloodSugar: parseFloat(bloodSugarStr),
            notes: notes?.trim() || null
          };
        });

        // Kirim data ke API
        const response = await fetch('/api/blood-sugar/import', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ records })
        });

        if (!response.ok) throw new Error('Import gagal');

        alert('Data berhasil diimpor');
        window.location.reload();
      } catch (error) {
        console.error('Error importing data:', error);
        alert('Gagal mengimpor data');
      } finally {
        setIsImporting(false);
      }
    };

    reader.readAsText(file);
  };

  return (
    <div className="flex gap-4">
      <Button
        onClick={exportData}
        variant="outline"
      >
        Export CSV
      </Button>
      
      <div className="relative">
        <Input
          type="file"
          accept=".csv"
          onChange={importData}
          disabled={isImporting}
          className="hidden"
          id="import-input"
        />
        <Button
          onClick={() => document.getElementById('import-input')?.click()}
          variant="outline"
          disabled={isImporting}
        >
          {isImporting ? 'Mengimpor...' : 'Import CSV'}
        </Button>
      </div>
    </div>
  );
} 