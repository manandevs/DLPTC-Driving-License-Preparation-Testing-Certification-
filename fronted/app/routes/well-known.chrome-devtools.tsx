/** Satisfies Chrome DevTools’ optional probe so the app router does not error. */
export function loader() {
  return Response.json({}, { status: 200 });
}

export default function WellKnownChromeDevtools() {
  return null;
}
