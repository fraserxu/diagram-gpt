"use client";

import { useAtom } from "jotai";
import { type ChangeEvent } from "react";
import { Button } from "@/components/ui/button";

import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { apiKeyAtom } from "@/lib/atom";

export const APIKeyInput = () => {
  const [apiKey, setApiKey] = useAtom(apiKeyAtom);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setApiKey(e.target.value);
  const handleSave = () => {
    localStorage.setItem("apiKey", apiKey);
  };

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="api key">OpenAI API key</Label>
      <Input
        type="password"
        id="api-key"
        placeholder="OpenAI API Key"
        value={apiKey}
        onChange={handleChange}
      />
      <Button onClick={handleSave}>Save</Button>
    </div>
  );
};
