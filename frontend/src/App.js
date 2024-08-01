import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [formData, setFormData] = useState({
    receiver: '',
    subject: '',
    text: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const ClearFields = () => {
    setFormData({
      receiver: '',
      subject: '',
      text: ''
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/send-email', formData)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error('There was an error sending the email!', error);
      });

    ClearFields();
  };



  return (
    <form onSubmit={handleSubmit} className="form">
      <h1>Enviar Email</h1>
      <input type="email" name="receiver" placeholder="Email do Destinatário" onChange={handleChange} required autoComplete='on' />
      <input type="text" name="subject" placeholder="Assunto" onChange={handleChange} required />
      <textarea name="text" placeholder="Mensagem" onChange={handleChange} required></textarea>
      <button type="submit">Enviar Email</button>
    </form>
  );
};

export default App;
