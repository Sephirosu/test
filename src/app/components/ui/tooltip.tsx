import type { TooltipProps } from "@/types/ui";

export default function Tooltip({ children, message }: TooltipProps) {
  return (
    <div className="relative group inline-block">
      {children}
      <div className="absolute left-0 mt-1 text-xs bg-black text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-10">
        {message}
      </div>
    </div>
  );
}
