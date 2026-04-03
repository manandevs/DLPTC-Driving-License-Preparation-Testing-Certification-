import type { Route } from "./+types/home";
import { Link } from "react-router";

/** Served from `public/favicon.png` (do not import from `public/` in Vite). */
const LOGO = "/favicon.png";

export function loader() {
  return null;
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "DLPTC — Driving Licence Preparation & Certification" },
    {
      name: "description",
      content:
        "Prepare for your driving licence with DLPTC: structured learning, practice tests, and certification support.",
    },
  ];
}

const features = [
  {
    title: "Structured preparation",
    body: "Follow clear learning paths aligned with licence theory and practical readiness.",
  },
  {
    title: "Practice & progress",
    body: "Test your knowledge, track improvement, and build confidence before exam day.",
  },
  {
    title: "Certification support",
    body: "Tools designed for programmes that need consistent tracking and reporting.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f3f4f6] text-slate-900">
      <header className="sticky top-0 z-10 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2">
            <img src={LOGO} alt="DLPTC" className="h-9 w-9 rounded-lg" />
            <div className="leading-tight">
              <span className="block text-sm font-bold tracking-tight">DLPTC</span>
              <span className="hidden text-xs text-slate-500 sm:block">
                Driving Licence Platform
              </span>
            </div>
          </Link>
          <nav className="flex items-center gap-2 sm:gap-3">
            <Link
              to="/privacy-policy"
              className="hidden text-sm font-medium text-slate-600 hover:text-slate-900 sm:inline"
            >
              Privacy
            </Link>
            <Link
              to="/login"
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
            >
              Sign in
            </Link>
            <Link
              to="/auth/register"
              className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Sign up
            </Link>
          </nav>
        </div>
      </header>

      <main>
        <section className="mx-auto max-w-6xl px-4 pb-16 pt-14 md:pt-20">
          <div className="max-w-2xl">
            <p className="inline-flex rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-sm">
              Licence preparation · Testing · Certification
            </p>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl md:leading-[1.1]">
              Prepare for your driving licence with confidence
            </h1>
            <p className="mt-5 max-w-xl text-lg text-slate-600">
              DLPTC helps learners and programmes combine structured study,
              realistic practice, and clear progress tracking—so you are ready
              when it matters.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/auth/register"
                className="inline-flex h-12 items-center justify-center rounded-xl bg-slate-900 px-6 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition hover:bg-slate-800"
              >
                Create an account
              </Link>
              <Link
                to="/login"
                className="inline-flex h-12 items-center justify-center rounded-xl border border-slate-300 bg-white px-6 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
              >
                I already have an account
              </Link>
            </div>
          </div>
        </section>

        <section className="border-t border-slate-200 bg-white py-16">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="text-xl font-bold text-slate-900 md:text-2xl">
              Why use DLPTC
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-600 md:text-base">
              Everything you need to stay organised from first lesson to
              certification-ready.
            </p>
            <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((f) => (
                <li
                  key={f.title}
                  className="rounded-2xl border border-slate-200 bg-[#f8fafc] p-6 shadow-sm"
                >
                  <h3 className="font-semibold text-slate-900">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {f.body}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-16">
          <div className="rounded-2xl bg-slate-900 px-8 py-12 text-white md:px-12 md:py-14">
            <h2 className="text-2xl font-bold md:text-3xl">Ready to start?</h2>
            <p className="mt-3 max-w-xl text-sm text-white/85 md:text-base">
              Join in a few minutes. Your profile keeps your progress and
              programme details in one place.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/auth/register"
                className="inline-flex h-11 items-center justify-center rounded-lg bg-white px-5 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
              >
                Get started
              </Link>
              <Link
                to="/login"
                className="inline-flex h-11 items-center justify-center rounded-lg border border-white/40 px-5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Sign in
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 sm:flex-row">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <img src={LOGO} alt="" className="h-8 w-8 rounded-md opacity-90" aria-hidden />
            <span>DLPTC · Driving Licence Preparation, Testing, Certification</span>
          </div>
          <div className="flex gap-6 text-sm font-medium text-slate-600">
            <Link to="/privacy-policy" className="hover:text-slate-900">
              Privacy policy
            </Link>
            <Link to="/login" className="hover:text-slate-900">
              Sign in
            </Link>
            <Link to="/auth/register" className="hover:text-slate-900">
              Register
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
