// import React from 'react'

// // id,email,client,password,purpose,created_date,updated_date,updated_by

// const EmailService = () => {
//   return (
//     <div>
      
//     </div>
//   )
// }

// export default EmailService
import React, { useState } from 'react';
import './EmailService.css'; // Import CSS file for styling

function Form() {
  const [formData, setFormData] = useState({
    id: '',
    email: '',
    client: '',
    password: '',
    purpose: '',
    created_date: '',
    updated_date: '',
    updated_by: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can handle form submission, for example, sending data to the server
    console.log(formData);
    // Reset form after submission if needed
    setFormData({
      id: '',
      email: '',
      client: '',
      password: '',
      purpose: '',
      created_date: '',
      updated_date: '',
      updated_by: ''
    });
  };

  return (
    <div className="form-container"
    style={{display:"flex",margin:"2rem",padding:"20px"}}
    >
        <div style={{marginTop:"2rem"}}>
      <h1 style={{fontStyle:'bold'}}>EmailService</h1>
      <form onSubmit={handleSubmit} className="form"
      style={{display:"flex"}}
      >
        <label>
          ID:
          <input type="text" name="id" value={formData.id} onChange={handleChange} />
        </label>
        {/* <br /> */}
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </label>
        {/* <br /> */}
        <label>
          Client:
          <input type="text" name="client" value={formData.client} onChange={handleChange} />
        </label>
        {/* <br /> */}
        <label>
          Password:
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </label>
        {/* <br /> */}
        <label>
          Purpose:
          <input type="text" name="purpose" value={formData.purpose} onChange={handleChange} />
        </label>
        {/* <br /> */}
        <label>
          Created Date:
          <input type="date" name="created_date" value={formData.created_date} onChange={handleChange} />
        </label>
        {/* <br /> */}
        <label>
          Updated Date:
          <input type="date" name="updated_date" value={formData.updated_date} onChange={handleChange} />
        </label>
        {/* <br /> */}
        <label>
          Updated By:
          <input type="text" name="updated_by" value={formData.updated_by} onChange={handleChange} />
        </label>
        {/* <br /> */}
        <button type="submit">Submit</button>
      </form>
      </div>
    </div>
  );
}

export default Form;

