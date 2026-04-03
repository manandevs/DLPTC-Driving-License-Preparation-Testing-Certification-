import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route(
    "/.well-known/appspecific/com.chrome.devtools.json",
    "routes/well-known.chrome-devtools.tsx"
  ),
  route("/auth/register", "routes/register.tsx"),
  route("/login", "routes/login.tsx"),
  route("/consent", "routes/consent.tsx"),
  route("/privacy-policy", "routes/privacy-policy.tsx"),
  layout("layouts/require-consent.tsx", [
    route("dashboard", "routes/dashboard.tsx"),
    layout("layouts/require-admin.tsx", [
      route("admin/dashboard", "routes/admin.dashboard.tsx"),
      route("admin/users", "routes/admin/users.tsx"),
    ]),
  ]),
] satisfies RouteConfig;
