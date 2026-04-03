import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import { api } from "../lib/api";

type ProfileUser = {
  consentAccepted?: boolean;
};

export default function RequireConsentLayout() {
  const navigate = useNavigate();
  const [gate, setGate] = useState<"pending" | "allow" | "redirected">(
    "pending"
  );

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const { data } = await api.get<{
          success?: boolean;
          profile?: ProfileUser;
        }>("/api/profile");
        if (cancelled) return;
        const accepted = !!data.profile?.consentAccepted;
        if (!accepted) {
          navigate("/consent", { replace: true });
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
        Checking your account…
      </div>
    );
  }

  return <Outlet />;
}
