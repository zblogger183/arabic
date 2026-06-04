import Link from "next/link";

interface ToolCardProps {
  icon: string;
  title: string;
  description: string;
  href: string;
  anchorText: string;
  badge?: string;
  accentColor?: "blue" | "pink" | "green" | "orange";
}

const accentColorMap = {
  blue: "border-s-blue-500 bg-blue-50",
  pink: "border-s-pink-500 bg-pink-50",
  green: "border-s-green-500 bg-green-50",
  orange: "border-s-orange-500 bg-orange-50",
};

const accentTextMap = {
  blue: "text-blue-600",
  pink: "text-pink-600",
  green: "text-green-600",
  orange: "text-orange-600",
};

export default function ToolCard({
  icon,
  title,
  description,
  href,
  anchorText,
  badge,
  accentColor,
}: ToolCardProps) {
  return (
    <Link href={href} className="group block">
      <div
        className={`tool-card h-full bg-white rounded-xl p-5 border border-slate-200 hover:shadow-md hover:border-blue-300 transition-all duration-200 ${
          accentColor
            ? `border-s-4 ${accentColorMap[accentColor]}`
            : ""
        }`}
      >
        <div className="flex items-start justify-between mb-3">
          <span className="text-2xl" role="img" aria-hidden="true">
            {icon}
          </span>
          {badge && (
            <span className="text-xs font-medium px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full border border-blue-200">
              {badge}
            </span>
          )}
        </div>
        <h3 className="text-base font-semibold text-slate-800 mb-1.5 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-sm text-slate-500 leading-relaxed mb-4">
          {description}
        </p>
        <span
          className={`text-sm font-medium transition-colors duration-200 ${
            accentColor
              ? accentTextMap[accentColor]
              : "text-primary"
          } group-hover:underline`}
        >
          {anchorText}
        </span>
      </div>
    </Link>
  );
}
