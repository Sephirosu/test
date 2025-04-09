"use client";

import type React from "react";
import { useState, useRef } from "react";
import type { EmailSelectorProps } from "@/types/email";
import SelectedEmailsList from "./selected-emails-list";
import { Button, Tooltip } from "../ui";
import { useClickOutside } from "@/src/app/hooks";
import EmailDropdown from "../dropdown/email-dropdown";

export default function EmailSelector({
  emails,
  selected,
  onSelect,
  onRemove,
  onSend,
  isSending,
}: EmailSelectorProps): React.ReactElement {
  const [showAllSelected, setShowAllSelected] = useState<boolean>(false);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, () => setShowDropdown(false));

  return (
    <section>
      <h2 className="font-semibold text-lg mb-2">Email Search & Send</h2>

      <div>
        <Button
          className="border px-3 py-2 rounded w-full text-left"
          onClick={() => setShowDropdown(!showDropdown)}
          variant="default"
        >
          {selected.length > 0
            ? `${selected.length} selected`
            : "Select emails"}
        </Button>

        {showDropdown && (
          <EmailDropdown
            emails={emails}
            selected={selected}
            onChange={(email, checked) =>
              checked ? onSelect(email) : onRemove(email)
            }
            onClose={() => setShowDropdown(false)}
          />
        )}
      </div>

      <SelectedEmailsList
        selected={selected}
        showAllSelected={showAllSelected}
        onRemove={onRemove}
        onToggleShow={() => setShowAllSelected(!showAllSelected)}
      />

      <Tooltip message="Select at least 3 emails">
        <Button
          onClick={onSend}
          disabled={selected.length < 3 || isSending}
          className="mt-3"
        >
          {isSending ? "Sending..." : "🛒 Send Emails"}
        </Button>
      </Tooltip>
    </section>
  );
}
