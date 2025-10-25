import { useState } from "react";
import "./sidebar.css";
import { NavLink } from "react-router-dom";

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
        className={`sidebar-card ${isOpen ? "sidebar-open" : ""} ${
          className || ""
        }`}
      >
        <div className="sidebar-header">
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

        <ul className="sidebar-list">
          {items.map((item) => {
            const Icon = item.icon;

            return (
              <li key={item.id} className="sidebar-item">
                {useLink && item.to ? (
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `sidebar-link ${isActive ? "sidebar-link-active" : ""}`
                    }
                    end={false}
                  >
                    <div className="sidebar-item-content">
                      {Icon && <Icon className="sidebar-icon" />}
                      <span className="sidebar-text">{item.name}</span>
                    </div>
                    <svg
                      className="sidebar-arrow"
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
                  <button onClick={item.onClick} className="sidebar-link">
                    <div className="sidebar-item-content">
                      {Icon && <Icon className="sidebar-icon" />}
                      <span className="sidebar-text">{item.name}</span>
                    </div>
                    <svg
                      className="sidebar-arrow"
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
