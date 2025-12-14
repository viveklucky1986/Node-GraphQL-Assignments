export default function EmployeeDetail({ e, onClose }:{ e:any; onClose:()=>void }){
  return (
    <div className="modal" onClick={onClose}>
      <div onClick={ev=>ev.stopPropagation()}>
        <h3>{e.name}</h3>
        <p>Age: {e.age}</p>
        <p>Class: {e.className}</p>
        <p>Attendance: {e.attendance}%</p>
        <button className="btn" onClick={onClose}>Back</button>
      </div>
    </div>
  );
}
