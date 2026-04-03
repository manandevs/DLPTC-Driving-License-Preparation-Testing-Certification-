import { useNavigate } from "react-router";
import { api } from "../lib/api";
import { AUTH_TOKEN_STORAGE_KEY } from "../lib/authStorage";

export default function Dashboard() {
  const navigate = useNavigate();

  async function signOut() {
    try {
      await api.post("/api/auth/logout");
    } catch {
      /* still clear client-side state */
    }
    localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
    navigate("/login", { replace: true });
  }

  return (
    <main className="min-h-screen bg-[#f3f4f6] px-4 py-16 text-slate-900">
      <div className="mx-auto max-w-lg rounded-xl bg-white p-8 shadow-lg">
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="mt-2 text-sm text-slate-600">
          Your learner dashboard will appear here.
        </p>
        <button
          type="button"
          onClick={() => void signOut()}
          className="mt-6 block text-sm font-semibold text-slate-900 underline"
        >
          Sign out
        </button>
      </div>
    </main>
  );
}
