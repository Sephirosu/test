"use client";

import type React from "react";

import { useState, useEffect, type ChangeEvent } from "react";

interface EmailInputProps {
  onAddEmail: (email: string) => Promise<boolean>;
}

export default function EmailInput({
  onAddEmail,
}: EmailInputProps): React.ReactElement {
  const [input, setInput] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (input) {
      const validate = (value: string): void => {
        const isValid = /^[\w-.]+@[\w-]+\.[a-z]{2,}$/i.test(value);
        setError(isValid ? "" : "Invalid email");
      };

      const debounced = setTimeout(() => validate(input), 300);
      return () => clearTimeout(debounced);
    } else {
      setError("");
    }
  }, [input]);

  const handleAdd = async (): Promise<void> => {
    const success = await onAddEmail(input);
    if (success) {
      setInput("");
    } else {
      setError("Failed to add email");
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
        placeholder="Enter email"
        className="border border-pink-400 px-3 py-2 rounded w-full"
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      <button
        onClick={handleAdd}
        disabled={!input || error !== ""}
        className="mt-2 bg-pink-500 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        Add Email →
      </button>
    </section>
  );
}
