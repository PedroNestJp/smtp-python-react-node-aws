import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [formData, setFormData] = useState({
    receiver: '',
    subject: '',
    text: ''
  });
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const clearFields = () => {
    setFormData({
      receiver: '',
      subject: '',
      text: ''
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios.post('http://localhost:3001/send-email', formData)
      .then(response => {
        console.log(response.data);
        clearFields();
        setShowModal(true);
        setLoading(false);
      })
      .catch(error => {
        console.error('There was an error sending the email!', error);
        setLoading(false);
      });
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="app">
      <form onSubmit={handleSubmit} className="form">
        <h1>Enviar Email</h1>
        <input
          type="email"
          name="receiver"
          placeholder="Email do Destinatário"
          value={formData.receiver}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="subject"
          placeholder="Assunto"
          value={formData.subject}
          onChange={handleChange}
          required
        />
        <textarea
          name="text"
          placeholder="Mensagem"
          value={formData.text}
          onChange={handleChange}
          required
        ></textarea>
        <button type="submit" disabled={loading} >
          {loading ? (<span className="spinner" />) : ('Enviar Email')}
        </button>
      </form>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Sucesso</h2>
            <p>Email enviado com sucesso!</p>
            <button onClick={closeModal}>Fechar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
