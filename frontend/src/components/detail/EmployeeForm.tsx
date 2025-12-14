import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_SUBJECTS } from "../../graphql/subjects";

export default function EmployeeForm({ initial, onSave, onClose }: any) {
    const { data } = useQuery(GET_SUBJECTS);

    const [subjectsOpen, setSubjectsOpen] = useState(false);
    const [form, setForm] = useState({
        name: "",
        age: "",
        className: "",
        subjects: [] as string[],
        attendance: "",
        role: "EMPLOYEE"
    });

    /* 🔴 CRITICAL: RE-HYDRATE FORM ON EDIT */
    useEffect(() => {
        if (initial) {
            setForm({
                name: initial.name ?? "",
                age: String(initial.age ?? ""),
                className: initial.className ?? "",
                subjects: Array.isArray(initial.subjects)
                    ? [...initial.subjects]
                    : [],
                attendance: String(initial.attendance ?? ""),
                role: initial.role ?? "EMPLOYEE"
            });
        } else {
            // Add mode → reset cleanly
            setForm({
                name: "",
                age: "",
                className: "",
                subjects: [],
                attendance: "",
                role: "EMPLOYEE"
            });
        }
    }, [initial]);

    if (!data) return null;

    function toggleSubject(subject: string) {
        setForm(prev => ({
            ...prev,
            subjects: prev.subjects.includes(subject)
                ? prev.subjects.filter(s => s !== subject)
                : [...prev.subjects, subject]
        }));
    }

    function submit() {
        if (!form.name || !form.className || form.subjects.length === 0) {
            alert("Please fill all required fields");
            return;
        }

        onSave({
            name: form.name,
            age: Number(form.age),
            className: form.className,
            subjects: [...form.subjects], // 🔴 ALWAYS ARRAY
            attendance: Number(form.attendance),
            role: form.role
        });
    }

    return (
        <div className="modal" onClick={onClose}>
            <div onClick={e => e.stopPropagation()}>
                <h3>{initial ? "Edit Employee" : "Add Employee"}</h3>

                <input
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    placeholder="Name"
                />

                <input
                    type="number"
                    value={form.age}
                    onChange={e => setForm({ ...form, age: e.target.value })}
                    placeholder="Age"
                />

                <input
                    value={form.className}
                    onChange={e => setForm({ ...form, className: e.target.value })}
                    placeholder="Department"
                />

                {/* SUBJECT DROPDOWN */}
                <div className="subject-dropdown">
                    <div
                        className="subject-dropdown-toggle"
                        onClick={() => setSubjectsOpen(o => !o)}
                    >
                        {form.subjects.length
                            ? form.subjects.join(", ")
                            : "Select subjects"}
                    </div>

                    {subjectsOpen && (
                        <div className="subject-dropdown-menu">
                            {data.subjects.map((s: string) => (
                                <div
                                    key={s}
                                    className="subject-dropdown-item"
                                    onClick={() => toggleSubject(s)}
                                >
                                    <input
                                        type="checkbox"
                                        checked={form.subjects.includes(s)}
                                        readOnly
                                    />
                                    <span>{s}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <input
                    type="number"
                    value={form.attendance}
                    onChange={e => setForm({ ...form, attendance: e.target.value })}
                    placeholder="Attendance %"
                />

                <select
                    value={form.role}
                    onChange={e => setForm({ ...form, role: e.target.value })}
                >
                    <option value="EMPLOYEE">EMPLOYEE</option>
                    <option value="ADMIN">ADMIN</option>
                    <option value="MANAGER">MANAGER</option>
                    <option value="TEAM_LEAD">TEAM_LEAD</option>
                </select>

                <div className="toolbar">
                    <button className="btn" onClick={submit}>Save</button>
                    <button className="btn" onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
}
