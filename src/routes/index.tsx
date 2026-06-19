import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Undangan Ulang Tahun Mikhayla Junindya ke-9" },
      { name: "description", content: "Undangan ulang tahun Mikhayla Junindya ke-9 — 27 Juni 2026 di Playtopia, Summarecon Mall Bekasi 2." },
      { property: "og:title", content: "Undangan Ulang Tahun Mikhayla Junindya ke-9" },
      { property: "og:description", content: "Yuk hadir di pesta ulang tahun Mikhayla Junindya yang ke-9!" },
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
