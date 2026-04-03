import { Link, useNavigate } from "react-router";
import { api } from "../lib/api";
import { AUTH_TOKEN_STORAGE_KEY } from "../lib/authStorage";

export default function AdminDashboard() {
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
        <h1 className="text-2xl font-bold text-slate-900">Admin dashboard</h1>
        <p className="mt-2 text-sm text-slate-600">
          Manage learner records and export data for certification workflows.
        </p>
        <Link
          to="/admin/users"
          className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-lg bg-slate-900 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          User list and CSV export
        </Link>
        <button
          type="button"
          onClick={() => void signOut()}
          className="mt-4 block w-full text-center text-sm font-medium text-slate-600 underline hover:text-slate-900"
        >
          Sign out
        </button>
      </div>
    </main>
  );
}
