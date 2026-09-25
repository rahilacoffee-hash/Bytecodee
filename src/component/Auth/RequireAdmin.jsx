import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getCurrentAdmin } from "../../Services/admin.api";

export default function RequireAdmin({ children }) {
  const [status, setStatus] = useState("checking");
  useEffect(() => { let active = true; getCurrentAdmin().then(() => active && setStatus("authenticated")).catch(() => active && setStatus("unauthenticated")); return () => { active = false; }; }, []);
  if (status === "checking") return <div className="grid min-h-screen place-items-center bg-[#050605] text-[#4ade80]">Checking secure admin session…</div>;
  return status === "authenticated" ? children : <Navigate to="/admin/login" replace />;
}
