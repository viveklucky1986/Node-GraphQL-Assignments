import { useState } from "react";

export default function HamburgerMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="hamburger-wrap">
      <div className="hamburger-icon" onClick={() => setOpen(o => !o)}>
        <span /><span /><span />
      </div>

      {open && (
        <div className="hamburger-menu">
          <div className="menu-item" onClick={() => alert("Employees")}>
            Employees
          </div>
          <div className="menu-item" onClick={() => alert("Profile")}>
            Profile
          </div>
          <div className="menu-item" onClick={() => alert("Preferences")}>
            Preferences
          </div>
        </div>
      )}
    </div>
  );
}
