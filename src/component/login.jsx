import { useRef, useState, useEffect } from 'react';
import axios, { setAuthToken } from '../api/axios';
import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth';


const Login = () => {
	
  const { setAuth } = useAuth();
  const emailRef = useRef();
  const errRef = useRef();
  let navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');


  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        '/admins/login',{
          "email": `${email}`,
          "password" : `${password}`
        }
      );

			
      console.log(response.data.data)
		 const token = response.data.data.token
		 const id = response.data.data.id
		 const name = response.data.data.name
      setAuth({id,name, email, password,token });
      setEmail('');
      setAuthToken(token)
      setPassword('');
      navigate('/admin/countriesList');
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 400) {
        setErrMsg('Missing Username or Password');
      } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg('Login Failed');
      }
      errRef.current.focus();
    }


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
        <h1 className="text-3xl mb-5">Login In</h1>
        <form onSubmit={handleSubmit} className="flex flex-col  justify-center items-center gap-2">

          <input
            className="border border-1 w-full  p-1 outline-0 border-slate-300"
            placeholder='Email'
            type="text"
            id="Email"
            ref={emailRef}
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />

          <input
            className="border border-1 w-full  p-1 outline-0 border-slate-300"
            placeholder='password'
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
          <button className="bg-cyan-600 w-full text-white p-2 mb-5">Sign In</button>
        </form>
				
      </section>
		
    </div>
  );
};

export default Login;
