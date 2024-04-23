import { useState } from 'react'
import '../App.css'

function App() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
  })
  const [alerts, setAlerts] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
  })
  const [FocusState, setFocusState] = useState({
    firstName: false,
    lastName: false,
    email: false,
    phoneNumber: false,
  })

  const [registrationSuccess, setRegistrationSuccess] = useState(false)

  const handleChange = (e) =>{
    const{name,value}= e.target;
    setFormData((prevData) => ({...prevData,[name]:value}) )
  };
  const handleFocus = (name)=>{
    setFocusState((prevfocusState)=>({...prevfocusState,[name]: true}))

  }

  const handleSubmit = (e)=>{
    e.preventDefault();

    const newAlerts = {};

    if(formData.firstName === ''){
      newAlerts.firstName = 'please enter your first name.';

    }
    else{
      newAlerts.firstName ='';
    }

    if(formData.lastName === ''){
      newAlerts.lastName = 'please enter your last name.';

    }
    else{
      newAlerts.lastName ='';
    }

    if(formData.phoneNumber === ''){
      newAlerts.phoneNumber = 'please enter your phone number.';

    }
    else{
      newAlerts.phoneNumber ='';
    }

    if(formData.email === ''){
      newAlerts.email = 'please enter your email.';

    }
    else{
      newAlerts.email ='';
    }

    setAlerts(newAlerts)

    if(
      newAlerts.firstName === '' && newAlerts.lastName === '' && newAlerts.phoneNumber ==='' && newAlerts.email===''
    ){
      setRegistrationSuccess(true)
    }
    
  }
  return (
    <>
      <div className="App">
        {registrationSuccess && (
          <div style={{marginLeft:'25.5vw',width: '40%',backgroundColor: 'blue', color:'white',padding:'10px',marginTop:'10px',borderRadius:'8px',textAlign:'center'}}>
            Registration Successfull !
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <label>
            <input type='text' name="firstName" value={formData.firstName} onChange={handleChange} placeholder="Enter your firts name" onFocus={() => handleFocus('firstName')} style={{ borderColor: FocusState.firstName ? 'navy' : '#ccc' }} />
            <div className="alert">{alerts.firstName}</div>
          </label>
          <br />
          {/* For last name  */}
          <label>
            <input type='text' name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Enter your last name" onFocus={() => handleFocus('lastName')} style={{ borderColor: FocusState.lastName ? 'navy' : '#ccc' }} />
            <div className="alert">{alerts.lastName}</div>
          </label>
          <br />
          {/* For email */}
          <label>
            <input type='email' name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" onFocus={() => handleFocus('email')} style={{ borderColor: FocusState.email ? 'navy' : '#ccc' }} />
            <div className="alert">{alerts.email}</div>
          </label>
          <br />
          {/* For phone number */}
          <label>
            <input type='tel' name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="Enter your phoneNumber" onFocus={() => handleFocus('phoneNumber')} style={{ borderColor: FocusState.phoneNumber ? 'navy' : '#ccc' }} />
            <div className="alert">{alerts.phoneNumber}</div>
          </label>
          <br />
          {/* submit button  */}
          <button type='submit' style={{width:'10vw',marginTop:'2vw',borderRadius:'2px', backgroundColor: 'green', color: 'white', padding: '10px', border: 'none', cursor: 'pointer' }}>Register</button>
        </form>
      </div>
    </>
  )

}

export default App