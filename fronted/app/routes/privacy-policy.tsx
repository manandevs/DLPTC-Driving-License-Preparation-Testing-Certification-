import { Link } from "react-router";

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-[#f3f4f6] px-4 py-12 text-slate-900">
      <article className="mx-auto max-w-2xl rounded-xl bg-white p-8 shadow-lg">
        <h1 className="text-2xl font-bold text-slate-900">Privacy policy</h1>
        <p className="mt-2 text-sm text-slate-500">
          Summary of personal data stored by DLPTC (section 1.3.2).
        </p>

        <section className="mt-8 space-y-6 text-sm text-slate-700">
          <div>
            <h2 className="text-base font-semibold text-slate-900">
              What we store
            </h2>
            <p className="mt-2">
              DLPTC stores the following categories of personal data that you
              provide at registration or through your account:
            </p>
            <ul className="mt-3 list-inside list-disc space-y-2">
              <li>
                <strong>Name</strong> — your full name, used for identity on
                your learner profile and certification-related records.
              </li>
              <li>
                <strong>Email address</strong> — used for account access,
                communication, and account recovery where applicable.
              </li>
              <li>
                <strong>Location</strong> — town and province, used for
                regional reporting, programme tracking, and compliance with
                certification context.
              </li>
              <li>
                <strong>Affiliation</strong> — organization or institution and
                branch (where provided), used to associate your participation
                with your employer, school, or other body as part of tracking
                and certification workflows.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-base font-semibold text-slate-900">
              Why we use it
            </h2>
            <p className="mt-2">
              These data are used to operate the service, track progress and
              participation, and support certification-related processes as
              described at consent. We do not use this page to list every
              technical log; it lists the personal data categories you supply for
              the programme.
            </p>
          </div>

          <div>
            <h2 className="text-base font-semibold text-slate-900">
              Your consent
            </h2>
            <p className="mt-2">
              Where required, you must accept the consent gateway before using
              protected areas of the application.
            </p>
            <Link
              to="/consent"
              className="mt-2 inline-block font-semibold text-slate-900 underline"
            >
              Back to consent
            </Link>
          </div>
        </section>
      </article>
    </main>
  );
}
