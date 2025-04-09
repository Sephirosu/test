"use client";

import type React from "react";
import { useRef } from "react";
import { Button } from "../ui";
import { useClickOutside } from "@/src/app/hooks";
import type { EmailDropdownProps } from "@/types/email";

export default function EmailDropdown({
  emails,
  selected,
  onChange,
  onClose,
}: EmailDropdownProps): React.ReactElement {
  const dropdownRef = useRef<HTMLDivElement>(null);
  useClickOutside(dropdownRef, onClose);

  return (
    <div
      ref={dropdownRef}
      className="border rounded p-2 max-h-60 overflow-y-auto bg-white shadow mt-2"
    >
      {emails.map((email, i) => (
        <label key={i} className="flex items-center gap-2 py-1">
          <input
            type="checkbox"
            value={email}
            checked={selected.includes(email)}
            onChange={(e) => onChange(email, e.target.checked)}
            className="accent-pink-500"
          />
          <span className="text-sm">{email}</span>
        </label>
      ))}
      <Button
        className="mt-2 text-sm text-blue-600 underline"
        onClick={onClose}
      >
        Done
      </Button>
    </div>
  );
}
