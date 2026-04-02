import axios from "axios";
import logo from "../../public/favicon.png";
import { Link } from "react-router";
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

export default function Register() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formentries = Object.fromEntries(formData)
    console.log(formentries);
    try {
      const responce = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/register`, formentries)
      console.log(responce)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <main className="min-h-screen bg-[#f3f4f6] px-4 py-8 text-slate-900 flex justify-center items-center">
      <div className="mx-auto grid w-full max-w-6xl overflow-hidden bg-white shadow-xl lg:grid-cols-2">
        <section className="p-6">
          <div className="flex items-center gap-1 leading-[0.9]">
            <img src={logo} alt="DLPTC logo" className="h-10 w-10 rounded-md" />
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
                Join DLPTC to practice tests, track progress, and prepare for certification.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <label className="block">
                <span className="text-sm font-medium text-slate-600">Name</span>
                <input
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  required
                  className="h-10 w-full border-b border-slate-200 px-4 text-sm outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-300"
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-slate-600">Email</span>
                <input
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                  className="h-10 w-full border-b border-slate-200 px-4 text-sm outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-300"
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-slate-600">Cellphone</span>
                <input
                  name="cellphone"
                  type="text"
                  placeholder="Enter your cellphone"
                  required
                  className="h-10 w-full border-b border-slate-200 px-4 text-sm outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-300"
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-slate-600">Password</span>
                <input
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  required
                  minLength={8}
                  className="h-10 w-full border-b border-slate-200 px-4 text-sm outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-300"
                />
              </label>

              <button
                type="submit"
                className="mt-2 h-11 w-full rounded-lg bg-slate-900 text-sm font-semibold text-white transition hover:bg-slate-800 mr-auto"
              >
                Create account
              </button>
            </form>

            <p className="mt-3 text-sm text-slate-500">
              Already have an account?{" "}
              <Link to="/login" className="font-semibold text-slate-900 hover:underline">
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
              Welcome back! Please sign in to your DLPTC account
            </h2>
            <p className="mt-4 max-w-xl text-sm text-white/85 md:text-base">
              Prepare smarter with mock tests, track your progress, and get ready for your driving
              license exam with confidence.
            </p>

            <div className="text-slate-400 shadow-lg md:mt-auto">
              <p className="mb-3 text-sm font-semibold">Performance Overview</p>
              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                    <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#475569" }} />
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
