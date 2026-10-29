
import { useState } from "react";
import "./App.css";
import EmployeeCard from "./Components/Employeecard-d6";
import logo4 from "./Components/img/logo-4.png";
import logo3 from "./Components/img/logo-3.png";
import EmployeeForm from "./Components/EmployeeForm-d10";

import ApiDay11 from "./Components/Api-day11";
import UserManagement from "./Components/User-day12";


function App() {
  // DAY 6 START 
  // Existing EmployeeCard and employee details


  const initialEmployees = [
    {
      id: 1,
      name: "Jasim",
      role: "Frontend Developer",
      email: "jasim@gmail.com",
      department: "IT",
      avatar: logo3,
    },
    {
      id: 2,
      name: "Shabeer",
      role: "Backend Developer",
      email: "shabeer@gmail.com",
      department: "IT",
      avatar: logo3,
    },
    {
      id: 3,
      name: "Jasnin",
      role: "UI Designer",
      email: "jasnin@gmail.com",
      department: "Design",
      avatar: logo4,
    },
    {
      id: 4,
      name: "mukthar",
      role: "UI Designer",
      email: "mukthar@gmail.com",
      department: "Design",
      avatar: logo3,
    },
    {
      id: 5,
      name: "fasil",
      role: "Backend Developer",
      email: "fasil@gmail.com",
      department: "IT",
      avatar: logo3,
    },
    {
      id: 6,
      name: "musthafa",
      role: "Backend Developer",
      email: "fasil@gmail.com",
      department: "IT",
      avatar: logo3,
    },
  ];

  

  //  DAY 7 START 
  // Day 7: State and Events

  // 1. Counter state
  const [count, setCount] = useState(0);

  // 2. Employee list state
  const [employees, setEmployees] = useState(initialEmployees);

  // 3. Form input states
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [search, setSearch] = useState("");

  // 4. Add Employee event
  function addEmployee() {
    if (!name.trim() || !role.trim()) {
      alert("Please enter employee name and role");
      return;
    }

    const newEmployee = {
      id: Date.now(),
      name: name.trim(),
      role: role.trim(),
      email: email.trim() || "Not provided",
      department: department.trim() || "Not provided",
      avatar: logo3,
    };

    // Functional state update
    setEmployees((previous) => [...previous, newEmployee]);

    // Clear form inputs
    setName("");
    setRole("");
    setEmail("");
    setDepartment("");
  }

  // 5. Remove Employee event
  function removeEmployee(id) {
    setEmployees((previous) =>
      previous.filter((employee) => employee.id !== id)
    );
  }
//day-8//
  const filteredEmployees = employees.filter((employee) =>
    !search.trim() ||
    [employee.name, employee.role, employee.email, employee.department].some(
      (value) => value.toLowerCase().includes(search.trim().toLowerCase())
    )
  );

  return (
    <div className="app">
      <section>
        

        <h2>Counter: {count}</h2>

        <button onClick={() => setCount((prev) => prev + 1)}>
          Increase
        </button>

        <button onClick={() => setCount((prev) => prev - 1)}>
          Decrease
        </button>

        <button onClick={() => setCount(0)}>
          Reset
        </button>
      </section>

      <section>
        
        <div className="employee-controls">
          <input
            placeholder="Employee name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />

          <input
            placeholder="Employee role"
            value={role}
            onChange={(event) => setRole(event.target.value)}
          />

          <input
            placeholder="Employee email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <input
            placeholder="Department"
            value={department}
            onChange={(event) => setDepartment(event.target.value)}
          />

          <button className="add-button" onClick={addEmployee}>
            Add Employee
          </button>
        </div>
{/* search//day-8 */}
        <div className="employee-search">
          <input
            type="search"
            placeholder="Search name, role, email or department"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
      </section>

      {/* DAY 6 CARD + DAY 7 LIST */}
      <section>
        

        <div className="employee-list">
          {filteredEmployees.map((employee) => (
            <div key={employee.id}>
              {/* Reusing the original Day 6 EmployeeCard */}
              <EmployeeCard
                name={employee.name}
                role={employee.role}
                email={employee.email}
                department={employee.department}
                avatar={employee.avatar}
              />

              {/* Day 7: Remove Employee */}
              <button
                className="remove-button"
                onClick={() => removeEmployee(employee.id)} >
                 Remove
              </button>
          </div>
          ))}
        </div>

        {filteredEmployees.length === 0 && (
          <p>
            {employees.length === 0
              ? "No employees available."
              : "No employees match your search."}
          </p>
        )}
      </section>

       {/* DAY 10 START */}
      <section>
        <EmployeeForm />
      </section>
      {/* DAY 10 END */}

      {/* DAY 11 START */}
       <section>
         <ApiDay11 />
       </section>
      {/* DAY 11 END */}

      {/* DAY 12 START - CRUD Workflows */}
        <section>
        <UserManagement />
       </section>
      {/* DAY 12 END */}
      
     
    </div>
  );
}

export default App;
