import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: () => <h1 style={{ color: "red", fontSize: 48 }}>FUNCIONA</h1>,
});
