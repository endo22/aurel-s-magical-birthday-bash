import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Undangan Ulang Tahun Aurel ke-7" },
      { name: "description", content: "Undangan ulang tahun Aurel ke-7 — 20 Juli 2026 di Bandung." },
      { property: "og:title", content: "Undangan Ulang Tahun Aurel ke-7" },
      { property: "og:description", content: "Yuk hadir di pesta ulang tahun Aurel yang ke-7!" },
    ],
  }),
  component: Index,
});

function Index() {
  useEffect(() => {
    window.location.replace("/undangan.html");
  }, []);
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <p className="text-muted-foreground">Membuka undangan...</p>
    </div>
  );
}
