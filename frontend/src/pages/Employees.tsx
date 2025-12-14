import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_EMPLOYEES } from "../graphql/queries";
import EmployeeGrid from "../components/grid/EmployeeGrid";
import EmployeeDetail from "../components/detail/EmployeeDetail";
import EmployeeForm from "../components/detail/EmployeeForm";
import {
  ADD_EMPLOYEE,
  UPDATE_EMPLOYEE,
  DELETE_EMPLOYEE
} from "../graphql/mutations";

export default function Employees({ role }: { role: string }) {
  const isAdmin = role === "ADMIN";

  const [page, setPage] = useState(1);
  const [viewEmp, setViewEmp] = useState<any>(null);
  const [editEmp, setEditEmp] = useState<any>(null);
  const [addOpen, setAddOpen] = useState(false);

  const limit = 20;

  const { data, loading, error, refetch } = useQuery(GET_EMPLOYEES, {
    variables: { page, limit }
  });

  const [addEmployee] = useMutation(ADD_EMPLOYEE, {
    onCompleted: () => refetch()
  });

  const [updateEmployee] = useMutation(UPDATE_EMPLOYEE, {
    onCompleted: () => refetch()
  });

  const [deleteEmployee] = useMutation(DELETE_EMPLOYEE, {
    onCompleted: () => refetch()
  });

  if (loading) return <div>Loading…</div>;
  if (error) return <div>Error loading employees</div>;
  if (!data) return null;

  const total = data.employees.total;
  const totalPages = Math.ceil(total / limit);

  const isFirstPage = page === 1;
  const isLastPage = page >= totalPages;

  return (
    <>
      {/* ADMIN TOOLBAR */}
      {isAdmin && (
        <div className="toolbar">
          <button className="btn" onClick={() => setAddOpen(true)}>
            + Add Employee
          </button>
        </div>
      )}

      {/* GRID */}
      <EmployeeGrid
        data={data.employees.data}
        canAdmin={isAdmin}
        onView={setViewEmp}
        onEdit={setEditEmp}
        onDelete={(id: string) => {
          deleteEmployee({ variables: { id } });
        }}
      />

      {/* VIEW MODAL */}
      {viewEmp && (
        <EmployeeDetail
          e={viewEmp}
          onClose={() => setViewEmp(null)}
        />
      )}

      {/* ADD / EDIT MODAL */}
      {(editEmp || addOpen) && (
        <EmployeeForm
          initial={editEmp}
          onSave={(payload: any) => {
            if (editEmp) {
              updateEmployee({
                variables: { id: editEmp.id, ...payload }
              });
            } else {
              addEmployee({ variables: payload });
            }

            setEditEmp(null);
            setAddOpen(false);
          }}
          onClose={() => {
            setEditEmp(null);
            setAddOpen(false);
          }}
        />
      )}

      {/* PAGINATION */}
      <div className="toolbar">
        <button
          className="btn"
          disabled={isFirstPage}
          onClick={() => {
            if (!isFirstPage) {
              setPage(p => p - 1);
            }
          }}
        >
          Prev
        </button>

        <span style={{ opacity: 0.7 }}>
          Page {page} of {totalPages || 1}
        </span>

        <button
          className="btn"
          disabled={isLastPage}
          onClick={() => {
            if (!isLastPage) {
              setPage(p => p + 1);
            }
          }}
        >
          Next
        </button>
      </div>
    </>
  );
}
