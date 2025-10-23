import type { Category } from "../../types/category";
import "./sidebar.css";

interface SideBarProps {
  categories: Category[];
}
export function SideBar({ categories }: SideBarProps) {
  return (
    <div className="sidebar-card">
      <div className="sidebar-header">Danh mục</div>

      <ul className="sidebar-list">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <li key={category.id} className="sidebar-item">
              {Icon && <Icon className="sidebar-icon" />}
              <span className="sidebar-text">{category.name}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
