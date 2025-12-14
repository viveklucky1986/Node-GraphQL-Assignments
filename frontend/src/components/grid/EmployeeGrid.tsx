import EmployeeTile from "../tile/EmployeeTile";

export default function EmployeeGrid({
  data,
  canAdmin,
  onView,
  onEdit,
  onDelete
}: any) {
  return (
    <div className="grid">
      {data.map((emp: any) => (
        <EmployeeTile
          key={emp.id}
          employee={emp}      // 🔴 THIS IS CRITICAL
          canAdmin={canAdmin}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
