import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { getUser, LoginUser } from '../lib/appwrite.config';


// css import
import './style.css';
import { useNavigate } from 'react-router-dom';

const LoginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password should be atleast 8 characters long" })
});

const Login = () => {

  useEffect(()=>{
   const user= getUser();
   if(user)
      navigate('/');
  })

  const  navigate=useNavigate();
  const {
    register,
    getValues,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm(
    {
      resolver: zodResolver(LoginSchema)
    }
  );

  // onSubmitting the form
  const onSubmit = async (data) => {
    try{
      const response=await LoginUser(data);
      console.log(response);
      navigate('/');
    }catch(error)
    {
      console.log(error);
    }
    reset();
    
  }


  return (
    <div className='register-container'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1
          style={{
            color: "pink",
            textAlign: "center",
            fontSize: "45px",
            fontWeight: "bold",
            marginBottom: "10px"
          }}
        >Login</h1>
        <div className='inputs'>
          <label htmlFor="email">Email</label><br />
          <input type="email" name="email" id="email" placeholder="Enter your email:"
            {...register('email')}
          />
          {
            errors.email && (
              <p className='error-message'>{errors.email.message}</p>
            )
          }
        </div>
        <div className='inputs'>
          <label htmlFor="password">Password</label><br />
          <input type="password" name="password" id="password" placeholder="Enter your password:"
            {...register('password')}
          />
          {
            errors.password && (
              <p className='error-message'>{errors.password.message}</p>
            )
          }
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login;