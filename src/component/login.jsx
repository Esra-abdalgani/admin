import { useRef, useState, useEffect } from 'react';
import { setAuthToken ,makeRequest } from '../api/axios';
import {  useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth';


const Login = () => {
  const { setAuth } = useAuth();
  const emailRef = useRef();
  const errRef = useRef();
  let navigate = useNavigate()
  const [userinfo, setUserinfo] = useState({
    email:'',
    password:''
  })
  const [errMsg, setErrMsg] = useState('')

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [userinfo]);

  function handleChange(e){
    let { name , value } = e.target
    setUserinfo(userinfo =>({ ...userinfo ,[name]:`${value}` }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
      makeRequest('POST', '/admins/login', JSON.stringify(userinfo))
      .then(response => {
        setAuth(response.data)
        setUserinfo('')
        setAuthToken(response.data.token)
        navigate('/admin/countriesList')
      })
      .catch(err => {
        switch (err?.response?.status) {
        case 400:
          setErrMsg('Missing Username or Password')
          break
        case 401:
          setErrMsg('Unauthorized')
          break
        default:
          setErrMsg(err?.response ? 'Login Failed' : 'No Server Response')
          errRef.current.focus()
        }
      })
  
  };

  return (
    <div className='w-full  h-screen flex justify-center items-center' >
		
      <section className="bg-slate-100	 w-80 p-5 rounded  text-center">
        <p
          ref={errRef}
          className={errMsg ? 'errmsg' : 'offscreen'}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <h1 className="text-3xl mb-5">Login</h1>
        <form onSubmit={e => handleSubmit(e)} className="flex flex-col  justify-center items-center gap-2">

          <input
            className="border border-1 w-full  p-1 outline-0 border-slate-300"
            placeholder='Email'
            type="text"
            name="email"
            ref={emailRef}
            autoComplete="off"
            onChange={(e) => handleChange(e)}
            value={userinfo.email || ''}
            required
          />

          <input
            className="border border-1 w-full  p-1 outline-0 border-slate-300"
            placeholder='password'
            type="password"
            name="password"
            onChange={(e) => handleChange(e)}
            value={userinfo.password || ''}
            required
          />
          <button className="bg-cyan-600 w-full text-white p-2 mb-5">Sign In</button>
        </form>
				
      </section>
		
    </div>
  );
};

export default Login;
