import axios from "axios";
import { Link, useNavigate } from "react-router";

const LOGO = "/favicon.png";
import { useState } from "react";
import { api } from "../lib/api";
import { REFERRAL_SOURCES } from "../lib/referralSources";
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

const inputClass =
  "h-10 w-full border-b border-slate-200 px-4 text-sm outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-300";

const radioLabelClass =
  "flex cursor-pointer items-center gap-2 text-sm text-slate-700";

export default function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    try {
      await api.post("/api/auth/register", data);
      navigate("/login", { replace: true });
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response?.data) {
        const payload = err.response.data as {
          message?: string;
          errors?: { msg?: string; path?: string }[];
        };
        if (payload.errors?.length) {
          setError(
            payload.errors.map((x) => x.msg || x.path || "Invalid").join(" · ")
          );
          return;
        }
        if (payload.message) {
          setError(payload.message);
          return;
        }
      }
      setError("Registration failed. Please check your details.");
    }
  };

  return (
    <main className="min-h-screen bg-[#f3f4f6] px-4 py-8 text-slate-900 flex justify-center items-center">
      <div className="mx-auto grid w-full max-w-6xl overflow-hidden bg-white shadow-xl lg:grid-cols-2">
        <section className="p-6 max-h-[calc(100vh-4rem)] overflow-y-auto lg:max-h-none">
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
              <h1 className="text-3xl font-bold text-slate-900">Sign Up</h1>
              <p className="mt-1 text-sm text-slate-500">
                Join DLPTC to practice tests, track progress, and prepare for
                certification.
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

              <input type="hidden" name="licenseCode" value="Code 2" />
              <label className="block">
                <span className="text-sm font-medium text-slate-600">
                  License code
                </span>
                <div
                  className="flex h-10 items-center border-b border-slate-200 bg-slate-50 px-4 text-sm text-slate-700"
                  aria-readonly="true"
                >
                  Code 2
                </div>
                <span className="mt-1 block text-xs text-slate-500">
                  Assigned for this programme (read-only).
                </span>
              </label>

              <label className="block">
                <span className="text-sm font-medium text-slate-600">
                  Full name
                </span>
                <input
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  required
                  className={inputClass}
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-slate-600">Email</span>
                <input
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                  className={inputClass}
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-slate-600">
                  Cellphone
                </span>
                <input
                  name="cellphone"
                  type="text"
                  placeholder="Enter your cellphone"
                  required
                  className={inputClass}
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
                    placeholder="At least 8 characters"
                    required
                    minLength={8}
                    autoComplete="new-password"
                    className={`${inputClass} pr-[4.5rem]`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-1 top-1/2 -translate-y-1/2 rounded px-2 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </label>

              <label className="block">
                <span className="text-sm font-medium text-slate-600">
                  Referral source
                </span>
                <select
                  name="referralSource"
                  required
                  defaultValue=""
                  className={`${inputClass} bg-white`}
                >
                  <option value="" disabled>
                    Select how you heard about us
                  </option>
                  {REFERRAL_SOURCES.map((src) => (
                    <option key={src} value={src}>
                      {src}
                    </option>
                  ))}
                </select>
              </label>

              <fieldset className="space-y-2">
                <legend className="text-sm font-medium text-slate-600">
                  Previous test attempts
                </legend>
                <div className="flex flex-wrap gap-4 pt-1">
                  <label className={radioLabelClass}>
                    <input
                      type="radio"
                      name="previousAttempts"
                      value="true"
                      required
                      className="h-4 w-4 accent-slate-900"
                    />
                    Yes
                  </label>
                  <label className={radioLabelClass}>
                    <input
                      type="radio"
                      name="previousAttempts"
                      value="false"
                      className="h-4 w-4 accent-slate-900"
                    />
                    No
                  </label>
                </div>
              </fieldset>

              <label className="block">
                <span className="text-sm font-medium text-slate-600">Town</span>
                <input
                  name="town"
                  type="text"
                  placeholder="Town or city"
                  required
                  className={inputClass}
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-slate-600">
                  Province
                </span>
                <input
                  name="province"
                  type="text"
                  placeholder="Province"
                  required
                  className={inputClass}
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-slate-600">
                  Organization / institution
                </span>
                <input
                  name="organization"
                  type="text"
                  placeholder="Employer, school, or institution"
                  required
                  className={inputClass}
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-slate-600">
                  Branch
                </span>
                <input
                  name="branch"
                  type="text"
                  placeholder="Branch or campus (optional)"
                  className={inputClass}
                />
              </label>

              <fieldset className="space-y-2">
                <legend className="text-sm font-medium text-slate-600">
                  Driving experience
                </legend>
                <div className="flex flex-wrap gap-4 pt-1">
                  <label className={radioLabelClass}>
                    <input
                      type="radio"
                      name="drivingExperience"
                      value="true"
                      required
                      className="h-4 w-4 accent-slate-900"
                    />
                    Yes
                  </label>
                  <label className={radioLabelClass}>
                    <input
                      type="radio"
                      name="drivingExperience"
                      value="false"
                      className="h-4 w-4 accent-slate-900"
                    />
                    No
                  </label>
                </div>
              </fieldset>

              <button
                type="submit"
                className="mt-2 h-11 w-full rounded-lg bg-slate-900 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Create account
              </button>
            </form>

            <p className="mt-4 text-sm text-slate-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-slate-900 hover:underline"
              >
                Sign in
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
              Start your driving licence preparation today
            </h2>
            <p className="mt-4 max-w-xl text-sm text-white/85 md:text-base">
              Prepare smarter with mock tests, track your progress, and get ready
              for your driving license exam with confidence.
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
