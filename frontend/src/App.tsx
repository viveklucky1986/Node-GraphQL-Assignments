import { useState } from "react";
import Header from "./components/layout/Header";
import Employees from "./pages/Employees";

function Profile() {
  return <div style={{ padding: 16 }}>Admin Profile (placeholder)</div>;
}

function Preferences() {
  return <div style={{ padding: 16 }}>Preferences (placeholder)</div>;
}

export default function App() {
  const [page, setPage] = useState("employees");

  return (
    <>
      <Header onNavigate={setPage} />

      {page === "employees" && <Employees role="ADMIN" />}
      {page === "profile" && <Profile />}
      {page === "preferences" && <Preferences />}
    </>
  );
}
