import { type KeyboardEvent } from "react";

interface Props {
  messageCotent: string;
  onChange: (messageCotent: string) => void;
  onSubmit: () => void;
}

export const ChatInput: React.FC<Props> = ({
  messageCotent,
  onChange,
  onSubmit,
}) => {
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onSubmit();
    }
  };
  return (
    <input
      className="mt-1 h-[24px] w-[280px] rounded-md border border-gray-300 px-3 py-2 text-black shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
      type="text"
      placeholder="Describe the diagram in nature language."
      value={messageCotent}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={handleKeyDown}
    />
  );
};
