import { useState } from 'react';
import axios from 'axios';
import './Quotes.css';
import { useNavigate } from 'react-router-dom';

function Form({ onNewForm }) {
  const [formData, setFormData] = useState({
    ranking: 0,
    quote: '',
    image: '',
    author: '',
    created_by: sessionStorage.getItem('username')
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://qirky-quotes-2.onrender.com/add', formData);
      console.log(response);
      navigate('/');
    } catch (error) {
      console.log('Error adding quote:', error);
    }
  };

  return (
    <div className="entity-form-container">
      <h1><b>Add New Quote</b></h1>
      <form onSubmit={handleSubmit}>
        <input type="number" name="ranking" placeholder="Ranking" value={formData.ranking} onChange={handleChange} />
        <input type="text" name="quote" placeholder="Quote" value={formData.quote} onChange={handleChange} />
        <input type="text" name="image" placeholder="Image URL" value={formData.image} onChange={handleChange} />
        <input type="text" name="author" placeholder="Author" value={formData.author} onChange={handleChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Form;