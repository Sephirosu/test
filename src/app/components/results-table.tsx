"use client";

import type React from "react";

import type { EmailStat } from "@/types/email";

interface ResultsTableProps {
  results: EmailStat[];
}

export default function ResultsTable({
  results,
}: ResultsTableProps): React.ReactElement {
  const isFibonacci = (n: number): boolean => {
    const isPerfectSquare = (x: number): boolean => {
      const s = Math.floor(Math.sqrt(x));
      return s * s === x;
    };
    return isPerfectSquare(5 * n * n + 4) || isPerfectSquare(5 * n * n - 4);
  };

  return (
    <section>
      <h2 className="font-semibold text-lg mb-2">
        Most Frequently Sent Emails
      </h2>
      <table className="w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">No</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Count</th>
          </tr>
        </thead>
        <tbody>
          {results.map((r, i) => (
            <tr key={i} className="even:bg-pink-50">
              <td className="border p-2">{i + 1}</td>
              <td
                className={`border p-2 ${
                  isFibonacci(r.email.length) ? "text-red-600 font-bold" : ""
                }`}
              >
                {r.email}
              </td>
              <td className="border p-2">{r.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
