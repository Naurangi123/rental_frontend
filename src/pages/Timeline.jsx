const events = [
  "Account created",
  "ID uploaded",
  "Liveness check completed",
  "Human review started",
];

export default function Timeline() {
  return (
    <div className="bg-white border rounded-lg p-4">
      <h3 className="text-sm font-semibold mb-3">Timeline</h3>

      <ul className="space-y-3 text-sm">
        {events.map((event, index) => (
          <li key={index} className="flex gap-3 items-start">
            <span className="mt-1 h-2 w-2 rounded-full bg-blue-500" />
            <span>{event}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
