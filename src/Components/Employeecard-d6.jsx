import "./Empoloyeecard-d6.css";

function EmployeeCard({ name, role, email, department, avatar }) {
  return (
    <div className="employee-card">
      <div className="avatar">
        {avatar ? (
          <img src={avatar} alt={`${name}'s avatar`} />
        ) : (
          <span aria-hidden="true">{name.charAt(0).toUpperCase()}</span>
        )}
      </div>

      <h2>{name}</h2>
      <p className="role">{role}</p>
      <p>Email: {email}</p>
      <p>Department: {department}</p>
    </div>
  );
}

export default EmployeeCard;