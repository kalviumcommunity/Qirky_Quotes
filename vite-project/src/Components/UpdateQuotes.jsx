import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function UpdateQuotes() {
  const { id } = useParams();
  const [quote, setQuote] = useState({
    ranking: "",
    quote: "",
    image: "",
    author: ""
  });
  const navigate = useNavigate();

  const [userData, setUserData] = useState([])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuote(prevQuote => ({
      ...prevQuote,
      [name]: value
    }));
  };

  const getData = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/data/${id}`);
      const responseData = res.data.data;
      console.log('Retrieved data:', responseData);
      setUserData(responseData);
      console.log('ho',userData)
      setQuote({
        ranking: responseData.ranking,
        quote: responseData.quote,
        image: responseData.image,
        author: responseData.author
      });
    } catch (error) {
      console.log('Error fetching quote data:', error);
    }
  };
  


  useEffect(() => {
    getData()
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/update/${id}`, quote);
      navigate('/'); // Redirect to home page after successful update
      console.log(quote,'youuu')
    } catch (error) {
      console.log('Error updating quote:', error);
    }
  };

  return (
    <div className="login-container">
      {console.log(quote)}
      <h2>Update Quote</h2>
      {<form onSubmit={handleSubmit} className='text' style={{ padding: '20px' }}>
        <label style={{ marginBottom: '10px' }}>
          Ranking:
          {quote.ranking && <input type="text" name="ranking" value={quote.ranking} onChange={handleChange} />}
        </label>
        <label style={{ marginBottom: '10px' }}>
          Quote:
          <input type="text" name="quote" value={quote.quote} onChange={handleChange} />
        </label>
        <label style={{ marginBottom: '10px' }}>
          Image URL:
          <input type="text" name="image" value={quote.image} onChange={handleChange} />
        </label>
        <label style={{ marginBottom: '10px' }}>
          Author:
          <input type="text" name="author" value={quote.author} onChange={handleChange} />
        </label>
        <button className="loginbtn" type="submit">Update Quote</button>
      </form>}
    </div>
  );
}

export default UpdateQuotes;
