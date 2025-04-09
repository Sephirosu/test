"use client";

import type React from "react";

import { useState, useEffect } from "react";
import {
  EmailInput,
  EmailSelector,
  ResultsTable,
} from "@/src/app/components/email";
import type { EmailStat } from "@/types/email";

export default function Home(): React.ReactElement {
  const [emails, setEmails] = useState<string[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [result, setResult] = useState<EmailStat[]>([]);
  const [isSending, setIsSending] = useState<boolean>(false);

  useEffect(() => {
    fetchEmails();
  }, []);

  const fetchEmails = async (): Promise<void> => {
    const res = await fetch("/api/emails");
    const data = await res.json();
    if (data.success) {
      const allEmails: string[] = data.data
        .map((e: { email: string }) => e.email)
        .sort();
      setEmails(allEmails);
    }
  };

  const handleAdd = async (email: string): Promise<boolean> => {
    const res = await fetch("/api/add-email", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    if (data.success) {
      fetchEmails();
      return true;
    } else {
      return false;
    }
  };

  const handleSelect = (value: string): void => {
    if (!selected.includes(value)) {
      setSelected([...selected, value]);
    }
  };

  const handleRemove = (email: string): void => {
    setSelected(selected.filter((e) => e !== email));
  };

  const handleSend = async (): Promise<void> => {
    setIsSending(true);
    const res = await fetch("/api/send", {
      method: "POST",
      body: JSON.stringify({ emails: selected }),
    });
    const data = await res.json();
    if (data.success) {
      setResult(data.data);
    }
    setIsSending(false);
  };

  return (
    <main className="max-w-xl mx-auto p-6 space-y-6">
      <EmailInput onAddEmail={handleAdd} />

      <EmailSelector
        emails={emails}
        selected={selected}
        onSelect={handleSelect}
        onRemove={handleRemove}
        onSend={handleSend}
        isSending={isSending}
      />

      {result.length > 0 && <ResultsTable results={result} />}
    </main>
  );
}
