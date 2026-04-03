import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import { api } from "../lib/api";

type ProfileUser = {
  role?: string;
};

export default function RequireAdminLayout() {
  const navigate = useNavigate();
  const [gate, setGate] = useState<"pending" | "allow" | "redirected">(
    "pending"
  );

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const { data } = await api.get<{ profile?: ProfileUser }>("/api/profile");
        if (cancelled) return;
        if (data.profile?.role !== "admin") {
          navigate("/dashboard", { replace: true });
          setGate("redirected");
          return;
        }
        setGate("allow");
      } catch {
        if (cancelled) return;
        navigate("/login", { replace: true });
        setGate("redirected");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [navigate]);

  if (gate !== "allow") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f3f4f6] text-sm text-slate-600">
        Verifying admin access…
      </div>
    );
  }

  return <Outlet />;
}
