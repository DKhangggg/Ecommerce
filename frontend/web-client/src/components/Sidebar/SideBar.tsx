import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

interface SidebarItem {
  id: string | number;
  name: string;
  icon?: React.ElementType;
  onClick?: () => void;
  to?: string;
}

interface SideBarProps {
  title?: string;
  items: SidebarItem[];
  useLink?: boolean;
  className?: string;
}
export function SideBar({
  title = "Menu",
  items,
  useLink = false,
  className,
}: SideBarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="sidebar-mobile-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={`Toggle ${title}`}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M3 12h18M3 6h18M3 18h18" />
        </svg>
        <span>{title}</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          style={{
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.3s ease",
          }}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {/* Sidebar Card */}
      <div
        className={`sticky top-[100px] flex flex-col w-[260px] bg-gradient-to-br from-[#f5f0eb] to-[#ffffff] rounded-[20px] shadow-[0_15px_40px_rgba(0,0,0,0.08)] overflow-hidden transition-all max-h-[calc(100vh-120px)] ${
          isOpen ? "sidebar-open" : ""
        } ${className || ""}`}
      >
        <div className="flex items-center gap-3 p-6 bg-gradient-to-br from-[#b97b48] to-[#a06a3e] text-white font-bold text-lg">
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" />
          </svg>
          <span>{title}</span>
        </div>

        <ul className="list-none m-0 p-5 flex flex-col gap-2 overflow-y-auto scrollbar-thin scrollbar-thumb-gradient">
          {items.map((item) => {
            const Icon = item.icon;
            const location = useLocation();
            const isActive = item.to
              ? location.pathname.startsWith(String(item.to))
              : false;

            return (
              <li
                key={item.id}
                className={`group relative rounded-[15px] bg-[rgba(255,255,255,0.6)] border-2 border-transparent overflow-hidden transition-all ${
                  isActive
                    ? "bg-[rgba(185,123,72,0.12)] border-[rgba(185,123,72,0.3)] shadow-[0_4px_15px_rgba(185,123,72,0.15)]"
                    : "hover:bg-[rgba(249,240,227,0.8)] hover:border-[rgba(185,123,72,0.2)] hover:shadow-[0_4px_15px_rgba(185,123,72,0.15)]"
                }`}
              >
                {/* Accent bar replacing ::before pseudo-element */}
                <span
                  aria-hidden
                  className={`absolute left-0 top-0 bottom-0 w-[4px] bg-gradient-to-br from-[#b97b48] to-[#a06a3e] transform origin-top transition-transform ${
                    isActive
                      ? "scale-y-100"
                      : "scale-y-0 group-hover:scale-y-100"
                  }`}
                />

                {useLink && item.to ? (
                  <NavLink
                    to={item.to}
                    className="flex items-center justify-between w-full p-3 min-h-[52px]"
                    end={false}
                  >
                    <div className="flex items-center gap-3">
                      {Icon && (
                        <Icon className="w-10 h-10 flex-shrink-0 text-[#b97b48] bg-[rgba(185,123,72,0.1)] rounded-[10px] p-2 transition-transform group-hover:scale-105" />
                      )}
                      <span
                        className={`text-[16px] leading-[1.5] font-medium text-[#2b2b2b] transition-colors ${
                          isActive ? "text-[#1a1a1a] font-semibold" : ""
                        }`}
                      >
                        {item.name}
                      </span>
                    </div>
                    <svg
                      className="w-4 h-4 text-[#b97b48] opacity-0 transform -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </NavLink>
                ) : (
                  <button
                    onClick={item.onClick}
                    className="flex items-center justify-between w-full p-3 min-h-[52px]"
                  >
                    <div className="flex items-center gap-3">
                      {Icon && (
                        <Icon className="w-10 h-10 flex-shrink-0 text-[#b97b48] bg-[rgba(185,123,72,0.1)] rounded-[10px] p-2 transition-transform group-hover:scale-105" />
                      )}
                      <span className="text-[16px] leading-[1.5] font-medium text-[#2b2b2b] transition-colors">
                        {item.name}
                      </span>
                    </div>
                    <svg
                      className="w-4 h-4 text-[#b97b48] opacity-0 transform -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
