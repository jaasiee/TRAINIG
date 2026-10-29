
import { useState } from "react";
import "./EmployeeForm-d10.css";

function EmployeeForm() {
  // Day 10: Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
  });

  // Day 10: Validation errors
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  // Handle input changes
  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));

    setSuccess("");
  }

  // Validate and submit form
  function handleSubmit(event) {
    event.preventDefault();

    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!/^\d{10}$/.test(formData.phone.trim())) {
      newErrors.phone = "Enter a 10-digit phone number";
    }

    if (!formData.department) {
      newErrors.department = "Please select a department";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setSuccess("");
      return;
    }

    setSuccess("Employee form submitted successfully!");

    console.log("Submitted employee:", formData);

    setFormData({
      name: "",
      email: "",
      phone: "",
      department: "",
    });
  }

return (
  <div className="employee-form-container">
    <h2>Employee Registration day10</h2>

    <form className="employee-form" onSubmit={handleSubmit} noValidate>
      {/* Name */}
      <label htmlFor="employee-name">Name</label>
      <input
        id="employee-name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Enter employee name"
      />
      {errors.name && <p className="error">{errors.name}</p>}

      {/* Email */}
      <label htmlFor="employee-email">Email</label>
      <input
        id="employee-email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Enter email"
      />
      {errors.email && <p className="error">{errors.email}</p>}

      {/* Phone */}
      <label htmlFor="employee-phone">Phone</label>
      <input
        id="employee-phone"
        name="phone"
        type="tel"
        value={formData.phone}
        onChange={handleChange}
        placeholder="10-digit phone number"
      />
      {errors.phone && <p className="error">{errors.phone}</p>}

      {/* Department */}
      <label htmlFor="employee-department">Department</label>
      <select
        id="employee-department"
        name="department"
        value={formData.department}
        onChange={handleChange}
      >
        <option value="">Select department</option>
        <option value="IT">IT</option>
        <option value="Design">Design</option>
        <option value="Backend">Backend</option>
        <option value="HR">HR</option>
      </select>
      {errors.department && (
        <p className="error">{errors.department}</p>
      )}

      <button type="submit">Submit Employee</button>
    </form>

    {success && <p className="success">{success}</p>}
  </div>
);
}

export default EmployeeForm;

