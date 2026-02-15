const evidence = [
  { id: 1, label: "ID Front", type: "image" },
  { id: 2, label: "ID Back", type: "image" },
  { id: 3, label: "Selfie", type: "image" },
  { id: 4, label: "Liveness Video", type: "video" },
];

export default function EvidenceViewer() {
  return (
    <div className="bg-white rounded-lg border p-4 h-full">
      <h3 className="text-sm font-semibold mb-3">Evidence</h3>

      <div className="grid grid-cols-2 gap-3">
        {evidence.map((item) => (
          <div
            key={item.id}
            className="border rounded-md p-2 hover:shadow cursor-pointer"
          >
            <div className="h-28 bg-gray-100 flex items-center justify-center text-xs text-gray-500">
              {item.type === "video" ? "Video Preview" : "Image Preview"}
            </div>
            <p className="mt-2 text-xs font-medium text-center">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
