"use client";

import { useEffect, useState } from "react";

import { Mermaid } from "@/components/mermaid";
import { APIKeyInput } from "@/components/APIKeyInput";
import { ChatInput } from "@/components/ChatInput";
import type { Message, RequestBody } from "@/types/type";

const chart = `graph TD
      Start --> Stop
    `;

export default function Home() {
  const [apiKey, setApiKey] = useState<string>("");
  const [draftMessage, setDraftMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [outputCode, setOutputCode] = useState<string>("");
  const model = "gpt-3.5-turbo";

  const handleApiKeyChange = (value: string) => {
    setApiKey(value);
    localStorage.setItem("apiKey", value);
  };

  const handleSubmit = async () => {
    if (!apiKey) {
      alert("Please enter an API key.");
      return;
    }

    if (!draftMessage) {
      alert("Please enter a message.");
      return;
    }

    setMessages((currenMessage) => {
      return [
        ...currenMessage,
        {
          role: "user",
          content: draftMessage,
        },
      ];
    });
    setDraftMessage("");

    const controller = new AbortController();
    const body: RequestBody = { messages, model, apiKey };

    const response = await fetch("/api/openai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      signal: controller.signal,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      alert("Something went wrong.");
      return;
    }

    const data = response.body;

    if (!data) {
      alert("Something went wrong.");
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;
    let responseText = "";

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);

      responseText += chunkValue;

      setOutputCode((prevCode) => prevCode + chunkValue);
    }
  };

  useEffect(() => {
    const apiKey = localStorage.getItem("apikey");

    if (apiKey) {
      setApiKey(apiKey);
    }
  }, []);

  return (
    <main className="mx-auto max-w-screen-xl flex flex-wrap">
      <div className="border border-red-500 w-full md:w-1/2">
        <pre>{JSON.stringify(messages, null, 2)}</pre>
        <APIKeyInput apiKey={apiKey} onChange={handleApiKeyChange} />
        <ChatInput
          messageCotent={draftMessage}
          onChange={setDraftMessage}
          onSubmit={handleSubmit}
        />
      </div>
      <div className="border border-red-500 w-full md:w-1/2">
        <pre>{outputCode}</pre>
        <Mermaid chart={chart} />
      </div>
    </main>
  );
}
