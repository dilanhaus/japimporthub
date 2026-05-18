"use client";

import { useState } from "react";
import { MOCK_MESSAGE_THREADS } from "@/lib/marketplace/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";

export default function BuyerMessagesPage() {
  const [activeId, setActiveId] = useState(MOCK_MESSAGE_THREADS[0]?.id);
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<Record<string, { from: string; body: string }[]>>({
    "thread-1": [
      { from: "dealer", body: "I've attached the auction sheet and inspection photos for your review." },
      { from: "you", body: "Thanks — can you confirm the grade and any rust on the rear quarters?" },
    ],
    "thread-2": [
      { from: "dealer", body: "Happy to adjust the shipping timeline if you need delivery by end of Q3." },
    ],
  });

  const active = MOCK_MESSAGE_THREADS.find((t) => t.id === activeId);
  const threadMessages = activeId ? (messages[activeId] ?? []) : [];

  function send() {
    if (!draft.trim() || !activeId) return;
    setMessages((prev) => ({
      ...prev,
      [activeId]: [...(prev[activeId] ?? []), { from: "you", body: draft.trim() }],
    }));
    setDraft("");
  }

  return (
    <div className="mx-auto grid max-w-5xl gap-4 lg:grid-cols-[280px_1fr]">
      <Card className="h-fit">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Conversations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1 p-2">
          {MOCK_MESSAGE_THREADS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveId(t.id)}
              className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                activeId === t.id ? "bg-muted" : "hover:bg-muted/60"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-medium">{t.participantName}</span>
                {t.unread > 0 ? <Badge variant="secondary">{t.unread}</Badge> : null}
              </div>
              <p className="mt-0.5 truncate text-xs text-muted-foreground">{t.lastMessage}</p>
            </button>
          ))}
        </CardContent>
      </Card>

      <Card className="flex min-h-[420px] flex-col">
        <CardHeader className="border-b border-border/80 pb-3">
          <CardTitle className="text-base">{active?.participantName ?? "Select a thread"}</CardTitle>
          {active ? (
            <p className="text-xs text-muted-foreground">
              Updated {formatDistanceToNow(new Date(active.updatedAt), { addSuffix: true })}
            </p>
          ) : null}
        </CardHeader>
        <CardContent className="flex flex-1 flex-col gap-4 p-4">
          <div className="flex-1 space-y-3 overflow-y-auto">
            {threadMessages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${
                  m.from === "you" ? "ml-auto bg-primary text-primary-foreground" : "bg-muted"
                }`}
              >
                {m.body}
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Type a message…"
              onKeyDown={(e) => e.key === "Enter" && send()}
            />
            <Button type="button" onClick={send}>
              Send
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
