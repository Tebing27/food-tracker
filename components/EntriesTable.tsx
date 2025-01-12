import prisma from '../lib/prisma'

export async function EntriesTable() {
  const entries = await prisma.entry.findMany({
    orderBy: { date: 'desc' },
  })

  const getStatus = (glucose: number, age: number) => {
    if (age < 5 && glucose <= 100) {
      return 'Normal'
    } else if (age < 5 && glucose > 100) {
      return 'High'
    } else {
      return 'N/A'
    }
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Date</th>
            <th className="px-4 py-2 border">Food</th>
            <th className="px-4 py-2 border">Glucose (mg/dL)</th>
            <th className="px-4 py-2 border">Age</th>
            <th className="px-4 py-2 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr key={entry.id}>
              <td className="px-4 py-2 border">{entry.date.toISOString().split('T')[0]}</td>
              <td className="px-4 py-2 border">{entry.food}</td>
              <td className="px-4 py-2 border">{entry.glucose}</td>
              <td className="px-4 py-2 border">{entry.age}</td>
              <td className="px-4 py-2 border">{getStatus(entry.glucose, entry.age)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

