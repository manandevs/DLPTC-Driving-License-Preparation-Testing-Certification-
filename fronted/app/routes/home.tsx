import type { Route } from "./+types/home";

export function loader() {
  return null;
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "DLPTC - Driving License Preparation, Testing, Certification" },
    { name: "description", content: "Your comprehensive platform for driving license preparation, testing, and certification. Master the rules of the road, traffic signs, and vehicle controls with our engaging courses and practice tests." },
  ];
}

export default function Home() {
  return (
    <div className=""></div>
  );
}
