import { Mermaid } from "@/components/mermaid";

const chart = `graph TD
      Start --> Stop
    `;

export default function Home() {
  return (
    <main className="mx-auto max-w-screen-xl flex flex-wrap">
      <div className="border border-red-500 w-full md:w-1/2">chat</div>
      <div className="border border-red-500 w-full md:w-1/2">
        <Mermaid chart={chart} />
      </div>
    </main>
  );
}
