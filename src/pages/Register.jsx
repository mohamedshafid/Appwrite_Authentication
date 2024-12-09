import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {getUser, RegisterUser} from '../lib/appwrite.config';

// css import
import './style.css';
import { useNavigate } from 'react-router-dom';

const RegisterSchema = z.object({
  name: z.string().min(2, { message: "Name should be atleast 2 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password should be atleast 8 characters long" })
});

const Register = () => {
  const navigate=useNavigate();

  useEffect(() => {
    const user = getUser();
    console.log(user);
    if(user)
      navigate('/');
  })


  const {
    register,
    getValues,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm(
    {
      resolver: zodResolver(RegisterSchema)
    }
  );

  // onSubmitting the form
  const onSubmit = async (data) => {
    console.log(data);
    const response=await RegisterUser(data);
    console.log(response);
    reset();
  }


  return (
    <div className='register-container'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1
        style={{
          color:"pink",
          textAlign:"center",
          fontSize:"45px",
          fontWeight:"bold",
          marginBottom:"10px"
        }}
        >Register</h1>
        <div className='inputs'>
          <label htmlFor="name">Name</label><br /> 
          <input type="text" name="name" id="name" placeholder="Enter your name:"
            {...register('name')}
          />
          {
            errors.name && (
              <p className='error-message'>{errors.name.message}</p>
            )
          }
        </div>
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
        <button type="submit">Register</button>
      </form>
    </div>
  )
}

export default Register;