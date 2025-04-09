"use client";

import type React from "react";

import { useState, type ChangeEvent } from "react";

interface EmailSelectorProps {
  emails: string[];
  selected: string[];
  onSelect: (email: string) => void;
  onRemove: (email: string) => void;
  onSend: () => Promise<void>;
  isSending: boolean;
}

export default function EmailSelector({
  emails,
  selected,
  onSelect,
  onRemove,
  onSend,
  isSending,
}: EmailSelectorProps): React.ReactElement {
  const [showAllSelected, setShowAllSelected] = useState<boolean>(false);

  return (
    <section>
      <h2 className="font-semibold text-lg mb-2">Select Emails</h2>
      <select
        onChange={(e: ChangeEvent<HTMLSelectElement>) =>
          onSelect(e.target.value)
        }
        className="border px-3 py-2 rounded w-full"
      >
        <option value="">Select email</option>
        {emails.map((email, i) => (
          <option key={i} value={email}>
            {email}
          </option>
        ))}
      </select>

      <SelectedEmailsList
        selected={selected}
        showAllSelected={showAllSelected}
        onRemove={onRemove}
        onToggleShow={() => setShowAllSelected(!showAllSelected)}
      />

      <div className="relative group inline-block mt-3">
        <button
          onClick={onSend}
          disabled={selected.length < 3 || isSending}
          className="bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {isSending ? "Sending..." : "🛒 Send Emails"}
        </button>
        {selected.length < 3 && (
          <div className="absolute left-0 mt-1 text-xs bg-black text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
            Select at least 3 emails
          </div>
        )}
      </div>
    </section>
  );
}

interface SelectedEmailsListProps {
  selected: string[];
  showAllSelected: boolean;
  onRemove: (email: string) => void;
  onToggleShow: () => void;
}

function SelectedEmailsList({
  selected,
  showAllSelected,
  onRemove,
  onToggleShow,
}: SelectedEmailsListProps): React.ReactElement {
  return (
    <div className="flex gap-2 flex-wrap mt-2 items-center">
      {(showAllSelected ? selected : selected.slice(0, 3)).map((email, i) => (
        <span
          key={i}
          className="bg-pink-200 text-pink-800 px-3 py-1 rounded-full"
        >
          {email} <button onClick={() => onRemove(email)}>×</button>
        </span>
      ))}

      {selected.length > 3 && (
        <button
          className="text-blue-600 text-sm underline"
          onClick={onToggleShow}
        >
          {showAllSelected ? "Show less" : "...and more"}
        </button>
      )}
    </div>
  );
}
