import { Copy } from "lucide-react";

interface Props {
  code: string;
}

export const CodeBlock: React.FC<Props> = ({ code }) => {
  return (
    <pre>
      <div className="bg-black rounded-md mb-4">
        <div className="flex items-center relative text-gray-200 bg-gray-800 px-4 py-2 text-xs font-sans justify-between rounded-t-md">
          <span>mermaid</span>
          <button className="flex ml-auto gap-2">
            <Copy className="mr-2 h-4 w-4" />
            Copy code
          </button>
        </div>
        <div className="p-4 overflow-y-auto">
          <code className="!whitespace-pre text-white">{code}</code>
        </div>
      </div>
    </pre>
  );
};
