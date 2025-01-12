'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function AddEntryForm() {
  const [date, setDate] = useState('')
  const [food, setFood] = useState('')
  const [glucose, setGlucose] = useState('')
  const [age, setAge] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const response = await fetch('/api/entries', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        date,
        food,
        glucose: Number(glucose),
        age: Number(age),
      }),
    })

    if (response.ok) {
      setDate('')
      setFood('')
      setGlucose('')
      setAge('')
      router.refresh()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="border p-2 rounded"
        />
        <input
          type="text"
          value={food}
          onChange={(e) => setFood(e.target.value)}
          placeholder="Food"
          required
          className="border p-2 rounded"
        />
        <input
          type="number"
          value={glucose}
          onChange={(e) => setGlucose(e.target.value)}
          placeholder="Glucose (mg/dL)"
          required
          className="border p-2 rounded"
        />
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Age"
          required
          className="border p-2 rounded"
        />
      </div>
      <button type="submit" className="mt-2 bg-blue-500 text-white p-2 rounded">
        Add Entry
      </button>
    </form>
  )
}

