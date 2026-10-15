import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import DashboardShell from "@/components/DashboardShell";
import PipelineClient from "./PipelineClient";

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret";

async function handleLogout() {
  "use server";
  const cookieStore = await cookies();
  cookieStore.delete("token");
  redirect("/login");
}

export default async function PipelinePage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  let decoded: any = null;
  try {
    decoded = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    redirect("/login");
  }

  const username = decoded?.name || "User";
  const userInitials = username
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);

  return (
    <DashboardShell
      username={username}
      userInitials={userInitials}
      activePath="/dashboard/pipeline"
      onLogout={handleLogout}
    >
      <PipelineClient />
    </DashboardShell>
  );
}
