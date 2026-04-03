import axios from "axios";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const LOGO = "/favicon.png";
import { api } from "../lib/api";
import { AUTH_TOKEN_STORAGE_KEY } from "../lib/authStorage";

const chartData = [
  { month: "Jan", value: 62 },
  { month: "Feb", value: 48 },
  { month: "Mar", value: 71 },
  { month: "Apr", value: 54 },
  { month: "May", value: 76 },
  { month: "Jun", value: 58 },
  { month: "Jul", value: 66 },
  { month: "Aug", value: 81 },
  { month: "Sep", value: 69 },
  { month: "Oct", value: 74 },
];

function redirectAfterLogin(
  navigate: ReturnType<typeof useNavigate>,
  consentAccepted: boolean,
  role: string
) {
  if (!consentAccepted) {
    navigate("/consent", { replace: true });
    return;
  }
  if (role === "admin") {
    navigate("/admin/dashboard", { replace: true });
    return;
  }
  navigate("/dashboard", { replace: true });
}

export default function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const form = e.currentTarget;
    const emailRaw = (form.elements.namedItem("email") as HTMLInputElement)
      .value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;
    const email = emailRaw.trim().toLowerCase();

    try {
      const { data } = await api.post<{
        success?: boolean;
        role?: string;
        consentAccepted?: boolean;
      }>("/api/auth/login", { email, password });

      if (!data?.success) {
        setError("Invalid response from server.");
        return;
      }

      localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
      redirectAfterLogin(
        navigate,
        !!data.consentAccepted,
        String(data.role ?? "user")
      );
    } catch (err: unknown) {
      const msg =
        axios.isAxiosError(err) &&
        err.response?.data &&
        typeof err.response.data === "object" &&
        "message" in err.response.data
          ? String((err.response.data as { message?: string }).message)
          : "Sign in failed. Check your details and try again.";
      setError(msg);
    }
  };

  return (
    <main className="min-h-screen bg-[#f3f4f6] px-4 py-8 text-slate-900 flex justify-center items-center">
      <div className="mx-auto grid w-full max-w-6xl overflow-hidden bg-white shadow-xl lg:grid-cols-2">
        <section className="p-6">
          <div className="flex items-center gap-1 leading-[0.9]">
            <img src={LOGO} alt="DLPTC logo" className="h-10 w-10 rounded-md" />
            <div>
              <p
                className="text-lg font-bold text-slate-900"
                title="Driving License Preparation, Testing, Certification"
              >
                DLPTC
              </p>
              <p className="text-xs text-slate-500">Driving License Platform</p>
            </div>
          </div>

          <div className="p-6">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-slate-900">Sign in</h1>
              <p className="mt-1 text-sm text-slate-500">
                Welcome back. Enter your email and password to continue.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <p
                  className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-800"
                  role="alert"
                >
                  {error}
                </p>
              )}

              <label className="block">
                <span className="text-sm font-medium text-slate-600">Email</span>
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Enter your email"
                  required
                  className="h-10 w-full border-b border-slate-200 px-4 text-sm outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-300"
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-slate-600">
                  Password
                </span>
                <div className="relative">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    required
                    className="h-10 w-full border-b border-slate-200 py-0 pl-4 pr-[4.5rem] text-sm outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-300"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-0 top-1/2 -translate-y-1/2 rounded px-2 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </label>

              <button
                type="submit"
                className="mt-2 h-11 w-full rounded-lg bg-slate-900 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Sign in
              </button>
            </form>

            <p className="mt-4 text-sm text-slate-500">
              Need an account?{" "}
              <Link
                to="/auth/register"
                className="font-semibold text-slate-900 hover:underline"
              >
                Create one
              </Link>
            </p>
          </div>
        </section>

        <section className="relative overflow-hidden bg-slate-900 p-6 text-white md:p-10">
          <div className="relative z-10 flex h-full flex-col">
            <p className="mb-3 inline-flex w-fit rounded-full border border-white/30 px-3 py-1 text-xs font-medium text-white/90">
              DLPTC Learning Dashboard
            </p>
            <h2 className="max-w-lg text-3xl font-bold leading-tight md:text-5xl">
              Practice tests and progress, all in one place
            </h2>
            <p className="mt-4 max-w-xl text-sm text-white/85 md:text-base">
              Prepare for your driving license exam with structured learning and
              mock tests tailored to your journey.
            </p>

            <div className="text-slate-400 shadow-lg md:mt-auto">
              <p className="mb-3 text-sm font-semibold">Performance Overview</p>
              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={chartData}
                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#e2e8f0"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="month"
                      tick={{ fontSize: 11, fill: "#475569" }}
                    />
                    <YAxis tick={{ fontSize: 11, fill: "#475569" }} />
                    <Tooltip />
                    <Bar dataKey="value">
                      {chartData.map((entry) => (
                        <Cell
                          key={entry.month}
                          fill={entry.month === "Aug" ? "#111827" : "#94a3b8"}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
