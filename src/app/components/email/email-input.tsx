"use client";

import React, { useState, type ChangeEvent, type KeyboardEvent } from "react";
import { Button } from "../ui";
import { useDebounce } from "@/src/app/hooks";
import type { EmailInputProps } from "@/types/email";

export default function EmailInput({
  onAddEmail,
}: EmailInputProps): React.ReactElement {
  const [input, setInput] = useState<string>("");
  const [error, setError] = useState<string>("");

  const debouncedInput = useDebounce(input, 300);

  React.useEffect(() => {
    if (!debouncedInput) {
      setError("");
      return;
    }

    const isValid = /^[\w-.]+@[\w-]+\.[a-z]{2,}$/i.test(debouncedInput);
    setError(isValid ? "" : "Invalid email");
  }, [debouncedInput]);

  const handleAdd = async (): Promise<void> => {
    const success = await onAddEmail(input);
    if (success) {
      setInput("");
    } else {
      setError("Failed to add email");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter" && input && error === "") {
      void handleAdd();
    }
  };

  return (
    <section>
      <h2 className="font-semibold text-lg mb-2">Add Emails to Database</h2>
      <input
        value={input}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setInput(e.target.value)
        }
        onKeyDown={handleKeyDown}
        placeholder="Enter email"
        className="border border-pink-400 px-3 py-2 rounded w-full"
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      <Button
        onClick={handleAdd}
        disabled={!input || error !== ""}
        className="mt-2 text-white px-4 py-2 rounded disabled:opacity-50"
        variant="pink"
      >
        Add Email →
      </Button>
    </section>
  );
}
