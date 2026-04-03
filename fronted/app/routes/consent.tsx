import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { api } from "../lib/api";

type Profile = {
  consentAccepted?: boolean;
  role?: string;
};

function postAcceptRedirect(
  profile: Profile | undefined,
  navigate: ReturnType<typeof useNavigate>
) {
  if (profile?.role === "admin") {
    navigate("/admin/dashboard", { replace: true });
    return;
  }
  navigate("/dashboard", { replace: true });
}

export default function Consent() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { data } = await api.get<{ profile?: Profile }>("/api/profile");
        if (cancelled) return;
        if (data.profile?.consentAccepted) {
          postAcceptRedirect(data.profile, navigate);
        }
      } catch (e) {
        if (axios.isAxiosError(e) && e.response?.status === 401) {
          navigate("/login", { replace: true });
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [navigate]);

  const handleAccept = async () => {
    setError(null);
    setBusy(true);
    try {
      await api.post("/api/consent/accept", {});
      const { data } = await api.get<{ profile?: Profile }>("/api/profile");
      postAcceptRedirect(data.profile, navigate);
    } catch {
      setError("Could not record your consent. Please try again or sign in.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f3f4f6] px-4 py-12 text-slate-900">
      <div className="mx-auto max-w-xl rounded-xl bg-white p-8 shadow-lg">
        <h1 className="text-2xl font-bold text-slate-900">
          Consent to data processing
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Before you use DLPTC, please review how we use your information for
          compliance, tracking, and certification.
        </p>

        <div className="mt-6 space-y-4 rounded-lg border border-slate-200 bg-slate-50 p-5 text-sm text-slate-700">
          <p>
            <span className="font-semibold text-slate-900">Purpose.</span> DLPTC
            collects and processes your{" "}
            <strong>name</strong>, your <strong>location</strong> (town and
            province), and your <strong>affiliation</strong> (organization /
            institution and branch) to operate the platform, to{" "}
            <strong>track</strong> your progress and participation in licence
            preparation activities, and to support{" "}
            <strong>certification-related</strong> records and reporting as
            required for the programme.
          </p>
          <p>
            By accepting, you confirm that you understand this use and consent
            to processing for these purposes. You can read a concise summary of
            stored personal data in our{" "}
            <Link
              to="/privacy-policy"
              className="font-semibold text-slate-900 underline"
            >
              Privacy policy
            </Link>
            .
          </p>
        </div>

        {error && (
          <p className="mt-4 text-sm text-red-700" role="alert">
            {error}
          </p>
        )}

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleAccept}
            disabled={busy}
            className="h-11 rounded-lg bg-slate-900 px-6 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-60"
          >
            {busy ? "Saving…" : "Accept"}
          </button>
          <Link
            to="/privacy-policy"
            className="text-sm font-medium text-slate-600 underline hover:text-slate-900"
          >
            Read privacy policy
          </Link>
        </div>
      </div>
    </main>
  );
}
