"use client";

import type React from "react";
import type { SelectedEmailsListProps } from "@/types/email";
import { Button } from "../ui";

export default function SelectedEmailsList({
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
        <Button
          className="text-blue-600 text-sm underline"
          onClick={onToggleShow}
        >
          {showAllSelected ? "Show less" : "...and more"}
        </Button>
      )}
    </div>
  );
}
