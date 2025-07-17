import React, { useState, useRef, useEffect } from "react";

const Modal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    phone: "",
    dob: "",
  });

  const modalRef = useRef(null);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const {email, phone, dob } = formData;

    if(!email.includes("@"&&".com")){
        return alert("Invalid email")
    }

    if (phone.length < 10) {
      alert("Invalid phone number");
      return;
    }

    const selectedDate = new Date(dob);
    const presentDate = new Date();
    if (selectedDate > presentDate) {
      return alert("Invalid date of birth");
    }

    setFormData({ userName: "", email: "", ph: "", dob: "" });
    setIsModalOpen(false);
  };

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);

  return (
    <div
      style={
        isModalOpen
          ? {
              height: "100vh",
              width: "100vw",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "gray",
            }
          : {
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }
      }
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
        }}
      >
        <h1>User Detail Form</h1>
        <button 
          style={{
            all: "unset",
            height: "40px",
            width: "100px",
            borderRadius: "8px",
            color: "white",
            backgroundColor: "#007BFF",
            textAlign: "center",
          }}
          onClick={() => setIsModalOpen(true)}
        >
          Open Form
        </button>
      </div>

      {isModalOpen && (
        <div className="modal">
          <div
            className="modal-content"
            ref={modalRef}
            style={{ height: "100px", width: "60vw", fontSize: "10px" }}
          >
            <form
              onSubmit={handleSubmit}
              style={{
                backgroundColor: "white",
                borderRadius: "2%",

                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: "20px",
                marginBottom: "30px",
                padding: "20px",
              }}
            >
              <h2>Fill Details</h2>

              <h4>User Name: </h4>
              <input
                type="text"
                id="username"
                required
                value={formData.userName}
                onChange={handleChange}
                style={{ display: "block", width: "20rem", height: "30px" }}
              />

              <h4>Email Address: </h4>
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={handleChange}
                style={{ display: "block", width: "20rem", height: "30px" }}
              />

              <h4>Phone Number: </h4>
              <input
                type="text"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                style={{ display: "block", width: "20rem", height: "30px" }}
              />

              <h4>Date of Birth: </h4>
              <input
                type="date"
                id="dob"
                value={formData.dob}
                onChange={handleChange}
                style={{ display: "block", width: "20rem", height: "30px" }}
              />

              <button
              
                type="submit"
                className="submit-button"
                style={{
                  all: "unset",
                  height: "40px",
                  width: "100px",
                  borderRadius: "8px",
                  color: "white",
                  backgroundColor: "#007BFF",
                  textAlign: "center",
                  marginTop: "10px",
                  marginBottom: "10px",
                }}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
