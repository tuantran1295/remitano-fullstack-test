import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/register.css'

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('')
  const [isError, setItError] = useState(false)

  useEffect(() => {
    // Perform any side effect here that needs to be done after the component has mounted
    // Then update the state with the new message
    setItError()
    setMessage();
  }, []);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/funny-api/register`, formData)
        localStorage.setItem('token', response.data.token)
        setMessage(response.data.message)
        setItError(false);
    } catch (error) {
        setItError(true)
        setMessage(error.response.data);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const closePopUp = () => {
    setMessage('')
    setItError(false);
  } 


  return (
    <div className='bg-gray-50 register-page items-center justify-center'>
      <div className='register-box'>
        <form onSubmit={handleSubmit}>
            <div className='register-form bg-gray-100'>
                <div className='font-bold text-5xl text-[#002D74] mb-4'>
                    <h2>
                        Register
                    </h2>
                </div>
                <div className='input-effect-div input-effect'>
                <input
                    type="text"
                    name="username"
                    className="effect-20"
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                    placeholder='username'
                />
                    <label>Your username</label>
                    <span className="focus-border">
                        <i></i>
                    </span>
                </div>
                <div className='input-effect-div input-effect'>
                    <input
                        type="email"
                        name="email"
                        className="effect-20"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder='email'
                    />
                     <label>youremail@funnymovies.com</label>
                     <span className="focus-border">
                        <i></i>
                    </span>
                </div>
                <div className='input-effect-div input-effect'>
                    <input
                        type="password"
                        name="password"
                        className="effect-20"
                        autoComplete='true'
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                        placeholder='password'
                    />
                    <label>Your password</label>
                        <span className="focus-border">
                            <i></i>
                        </span>
                </div>
                <div className='flex justify-center items-center flex-col gap-3'>
                    <button type="submit">Register</button>
                    <p>
                        Already have an account?  <a href="/login" className='underline text-[blue]'>Login here!</a>
                    </p>
                </div>
            </div>
        </form>
      </div>
      {
        message && 

        <div className='register-overlay'>
            <div className={'popup-register grid bg-white min-[786px]:w-[450px] min-h-[300px] h-fit justify-center items-center p-4 rounded-lg shadow-lg ' + `${ message ? 'popup-register': ''}`}>
                <div className='text-center text-[18px]'>
                    {
                        message
                    }
                </div>
                <div className='flex gap-3 justify-center'>
                    <button onClick={closePopUp} className='bg-transparent p-3 border rounded-md min-w-[150px] hover:bg-[#E8E8E8E8]'>Cancel</button>
                    { !isError &&
                        <a href="/login">
                            <button className='bg-[blue] p-3  border-none rounded-md text-white min-w-[150px] hover:bg-[darkblue]'>Login now</button>
                        </a>
                    }
                </div>
            </div>
        </div>

      }
    </div>
  );
};

export default RegisterPage;
