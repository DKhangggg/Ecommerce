"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./sidebar.css";

export interface SidebarItem {
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
  const pathname = usePathname();

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="sidebar-mobile-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={`Toggle ${title}`}
      >
        {/* Thêm lại icon cho mobile */}
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
          {/* Thêm lại icon header */}
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
            <rect x="3" y="3" width="7" height="7" />{" "}
            <rect x="14" y="3" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" />{" "}
            <rect x="3" y="14" width="7" height="7" />
          </svg>
          <span>{title}</span>
        </div>

        <ul className="sidebar-list">
          {items.map((item) => {
            const Icon = item.icon;

            const isActive =
              item.to === "/"
                ? pathname === item.to
                : pathname.startsWith(item.to || "___");

            return (
              <li key={item.id} className="sidebar-item">
                {useLink && item.to ? (
                  <Link
                    href={item.to}
                    className={`sidebar-link ${
                      isActive ? "sidebar-link-active" : ""
                    }`}
                    onClick={handleClose}
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
                  </Link>
                ) : (
                  // Thêm lại nội dung cho button
                  <button
                    onClick={() => {
                      item.onClick?.();
                      handleClose();
                    }}
                    className="sidebar-link"
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
