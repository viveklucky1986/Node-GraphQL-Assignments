import { useState } from "react";

export default function Header({
  onNavigate
}: {
  onNavigate: (page: string) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-left">
        <span
          className="hamburger"
          onClick={() => setOpen(o => !o)}
        >
          ☰
        </span>
        <span className="header-title">Dashboard | Employees</span>
      </div>

      {open && (
        <div className="hamburger-menu">
          <div onClick={() => { setOpen(false); onNavigate("employees"); }}>
            Employees
          </div>
          <div onClick={() => { setOpen(false); onNavigate("profile"); }}>
            Profile
          </div>
          <div onClick={() => { setOpen(false); onNavigate("preferences"); }}>
            Preferences
          </div>
        </div>
      )}
    </header>
  );
}