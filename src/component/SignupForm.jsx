import React, { useState } from "react";

export default function SignUpForm() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirm_password: "",
    mobile: "",
    gender: "",
    dob: "",
    age: "",
    interest: [],
  });

  const [error, setError] = useState({});

  // Validate email
  const validateEmail = (email) => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    return emailRegex.test(email);
  };

  // Validate password
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*(),.?":{}])(?=.*[0-9]).{8,24}$/;
    return passwordRegex.test(password);
  };

  // Validate mobile
  const validateMobile = (mobile) => {
    const mobileRegex = /^\d{10}$/;
    return mobileRegex.test(mobile);
  };

  // Validate age
  const validateAge = (age) => {
    return parseInt(age) >= 18 && parseInt(age) < 100;
  };

  // Validate form
  const validate = () => {
    const newError = {};

    if (!formData.firstname) {
      newError.firstname = "Firstname is required";
    }

    if (!formData.lastname) {
      newError.lastname = "Lastname is required";
    }

    if (!formData.email) {
      newError.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newError.email = "Email is invalid";
    }

    if (!formData.password) {
      newError.password = "Password is required";
    } else if (!validatePassword(formData.password)) {
      newError.password =
        "Password must be at least 8 characters long and contain at least one symbol, one number, one uppercase letter, and one lowercase letter";
    }

    if (!formData.confirm_password) {
      newError.confirm_password = "Confirm Password is required";
    } else if (formData.password !== formData.confirm_password) {
      newError.confirm_password = "Password should match";
    }

    if (!formData.age) {
      newError.age = "Age is required";
    } else if (!validateAge(formData.age)) {
      newError.age = "Age should be at least 18 and below 100";
    }

    if (!formData.mobile) {
      newError.mobile = "Mobile Number is Required";
    } else if (!validateMobile(formData.mobile)) {
      newError.mobile = "Mobile number should be 10 digits";
    }

    if (!formData.dob) {
      newError.dob = "Date of birth is required";
    }

    if (!formData.gender) {
      newError.gender = "Gender is required";
    }

    if (formData.interest.length === 0) {
      newError.interest = "Select at least one interest";
    }

    setError(newError);

    return Object.keys(newError).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (isValid) {
      console.log("Form Submitted Successfully", formData);
      console.log(formData);
    } else {
      console.log("Form submission failed");
    }
    setFormData({
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirm_password: "",
      mobile: "",
      gender: "",
      dob: "",
      age: "",
      interest: [],

    })
   
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError({ ...error, [name]: "" });
  };

  const handleChecked = (e) => {
    const { checked, value } = e.target;
    let updatedInterest = [...formData.interest];
    if (checked) {
      updatedInterest.push(value);
    } else {
      updatedInterest = updatedInterest.filter((interest) => interest !== value);
    }
    setFormData({ ...formData, interest: updatedInterest });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <h1>Signup Form</h1>
      <form
        style={{
          border: "1px solid black",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          width: "450px",
          gap: "0.5rem",
        }}
        onSubmit={handleSubmit}
      >
        {/* firstname */}
        <div>
          <label htmlFor="firstname">First Name:</label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            placeholder="Enter First Name"
          />
          {error.firstname && <div style={{color:"red"}}>{error.firstname}</div>}
        </div>
        {/* lastname */}
        <div>
          <label htmlFor="lastname">Last Name:</label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            placeholder="Enter Last Name"
          />
          {error.lastname && <div style={{color:"red"}}>{error.lastname}</div>}
        </div>
        {/* email */}
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter Email"
          />
          {error.email && <div style={{color:"red"}}>{error.email}</div>}
        </div>
        {/* password */}
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter Your Password"
          />
          {error.password && <div style={{color:"red"}}>{error.password}</div>}
        </div>
        {/* confirmpassword */}
        <div>
          <label htmlFor="confirm_password">Confirm Password:</label>
          <input
            type="password"
            id="confirm_password"
            name="confirm_password"
            value={formData.confirm_password}
            onChange={handleChange}
            placeholder="Re-enter Your Password"
          />
          {error.confirm_password && <div style={{color:"red"}}>{error.confirm_password}</div>}
        </div>
        {/* mobilenumbwe */}
        <div>
          <label htmlFor="mobile">Mobile Number:</label>
          <input
            type="text"
            id="mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            placeholder="Enter Your Phone Number"
          />
          {error.mobile && <div style={{color:"red"}}>{error.mobile}</div>}
        </div>
        {/* gender */}
        <div>
          <label>Gender:</label>
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {error.gender && <div style={{color:"red"}}>{error.gender}</div>}
        </div>
        {/* dob */}
        <div>
          <label htmlFor="dob">Date of Birth:</label>
          <input type="date" id="dob" name="dob" value={formData.dob} onChange={handleChange} />
          {error.dob && <div style={{color:"red"}}>{error.dob}</div>}
        </div>
        {/* age */}
        <div>
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            placeholder="Enter Age"
            onChange={handleChange}
          />
          {error.age && <div style={{color:"red"}}>{error.age}</div>}
        </div>
        {/* interests */}
        <div>
          <label htmlFor="interest">Interests:</label>
          <label>
            <input
              type="checkbox"
              name="coding"
              value="coding"
              checked={formData.interest.includes("coding")}
              onChange={handleChecked}
            />{" "}
            Coding
          </label>
          <label>
            <input
              type="checkbox"
              name="sports"
              value="sports"
              checked={formData.interest.includes("sports")}
              onChange={handleChecked}
            />{" "}
            Sports
          </label>
          <label>
            <input
              type="checkbox"
              name="reading"
              value="reading"
              checked={formData.interest.includes("reading")}
              onChange={handleChecked}
            />{" "}
            Reading
          </label>
          {error.interest && <div style={{color:"red"}}>{error.interest}</div>}
        </div>
        <div>
          <button type="submit">Sign Up</button>
        </div>
      </form>
    </div>
  );
}
