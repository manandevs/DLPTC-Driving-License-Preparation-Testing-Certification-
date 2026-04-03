import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router";
import { api } from "../../lib/api";
import { downloadTextFile, rowsToCsv } from "../../lib/csv";

type AdminExportUser = {
  name?: string;
  email?: string;
  cellphone?: string;
  town?: string;
  affiliation?: string;
};

export default function AdminUsers() {
  const [users, setUsers] = useState<AdminExportUser[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      const { data } = await api.get<{
        success?: boolean;
        data?: AdminExportUser[];
      }>("/api/admin/export");
      setUsers(Array.isArray(data.data) ? data.data : []);
    } catch (e) {
      if (axios.isAxiosError(e) && e.response?.status === 403) {
        setError("You do not have permission to view this data.");
      } else {
        setError("Could not load users. Try again later.");
      }
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const downloadCsv = () => {
    const header = ["Name", "Email", "Cellphone", "Town", "Affiliation"];
    const rows: string[][] = [
      header,
      ...users.map((u) => [
        u.name ?? "",
        u.email ?? "",
        u.cellphone ?? "",
        u.town ?? "",
        u.affiliation ?? "",
      ]),
    ];
    const csv = `\ufeff${rowsToCsv(rows)}`;
    const stamp = new Date().toISOString().slice(0, 10);
    downloadTextFile(`dlptc-users-${stamp}.csv`, csv, "text/csv;charset=utf-8");
  };

  return (
    <main className="min-h-screen bg-[#f3f4f6] px-4 py-10 text-slate-900">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">User management</h1>
            <p className="mt-1 text-sm text-slate-600">
              All registered learners (export includes cellphone numbers for outreach
              such as WhatsApp groups).
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={downloadCsv}
              disabled={loading || users.length === 0}
              className="h-10 rounded-lg bg-slate-900 px-4 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Download CSV
            </button>
            <Link
              to="/admin/dashboard"
              className="inline-flex h-10 items-center rounded-lg border border-slate-300 bg-white px-4 text-sm font-medium text-slate-800 hover:bg-slate-50"
            >
              Admin home
            </Link>
          </div>
        </div>

        {error && (
          <p className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">
            {error}
          </p>
        )}

        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-600">
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Cellphone</th>
                  <th className="px-4 py-3">Town</th>
                  <th className="px-4 py-3">Affiliation</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-12 text-center text-slate-500">
                      Loading users…
                    </td>
                  </tr>
                ) : users.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-12 text-center text-slate-500">
                      No users found.
                    </td>
                  </tr>
                ) : (
                  users.map((u, i) => (
                    <tr
                      key={`${u.email ?? "row"}-${i}`}
                      className="border-b border-slate-100 last:border-0 hover:bg-slate-50/80"
                    >
                      <td className="px-4 py-3 font-medium text-slate-900">
                        {u.name ?? "—"}
                      </td>
                      <td className="px-4 py-3 text-slate-700">{u.email ?? "—"}</td>
                      <td className="px-4 py-3 tabular-nums text-slate-700">
                        {u.cellphone ?? "—"}
                      </td>
                      <td className="px-4 py-3 text-slate-700">{u.town ?? "—"}</td>
                      <td className="px-4 py-3 text-slate-700">{u.affiliation || "—"}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
