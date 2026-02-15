

export default function DecisionPane() {
  return (
    <div className="bg-white border rounded-lg p-4 h-full flex flex-col">
      <h3 className="text-sm font-semibold mb-3">Decision</h3>

      <div className="space-y-2 text-sm">
        <label className="flex items-center gap-2">
          <input type="radio" name="decision" />
          Verified
        </label>

        <label className="flex items-center gap-2">
          <input type="radio" name="decision" />
          Reject
        </label>

        <label className="flex items-center gap-2">
          <input type="radio" name="decision" />
          Escalate
        </label>
      </div>

      <textarea
        placeholder="Reviewer notes (required)"
        className="mt-4 border rounded-md p-2 text-sm resize-none h-24"
      />

      <div className="mt-auto flex gap-2 pt-4">
        <button className="flex-1 bg-green-600 text-white text-sm py-2 rounded">
          Approve
        </button>
        <button className="flex-1 bg-red-600 text-white text-sm py-2 rounded">
          Reject
        </button>
      </div>
    </div>
  );
}
