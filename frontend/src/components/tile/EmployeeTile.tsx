import { useEffect, useRef, useState } from "react";

type Employee = {
  id: string;
  name: string;
  className: string;
};

type Props = {
  employee: Employee;
  canAdmin: boolean;
  onView: (e: Employee) => void;
  onEdit: (e: Employee) => void;
  onDelete: (id: string) => void;
};

export default function EmployeeTile({
  employee,
  canAdmin,
  onView,
  onEdit,
  onDelete
}: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  /* 🔴 CLOSE MENU ON OUTSIDE CLICK */
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="employee-tile" ref={ref}>
      <div className="tile-header">
        <div>
          <div style={{ fontWeight: 600 }}>{employee.name}</div>
          <div className="muted">{employee.className}</div>
        </div>

        <div className="menu-wrapper">
          <span
            className="menu-trigger"
            onClick={() => setOpen(o => !o)}
          >
            ⋮
          </span>

          {open && (
            <div className="menu">
              <div
                onClick={() => {
                  setOpen(false);
                  onView(employee);
                }}
              >
                View
              </div>

              {canAdmin && (
                <>
                  <div
                    onClick={() => {
                      setOpen(false);
                      onEdit(employee);
                    }}
                  >
                    Edit
                  </div>

                  <div
                    className="danger"
                    onClick={() => {
                      setOpen(false);
                      if (window.confirm("Delete this employee?")) {
                        onDelete(employee.id);
                      }
                    }}
                  >
                    Delete
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
