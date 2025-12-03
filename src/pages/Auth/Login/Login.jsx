import React from 'react';
import { useForm } from 'react-hook-form';
import UseAuth from '../../../hooks/UseAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';

const Login = () => {
    const {register,handleSubmit, formState:{errors}} = useForm();
    const {signInUser} = UseAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogin =(data)=>{
        console.log(data)
        signInUser(data.email, data.password)
        .then(result=>{
            console.log(result);
            navigate(location?.state || '/')
        })
        .catch(errors=>{
            console.log(errors)
        })
    }
    return (
       <div className="card w-full max-w-sm shadow-xl bg-base-100 p-8 rounded-2xl">
      <h2 className="font-bold text-2xl ">Login Now</h2>
      <form onSubmit={handleSubmit(handleLogin)}>
        <fieldset className="fieldset">
          <label className="label">Email</label>
          <input type="email" {...register('email',{required:true})} className="input" placeholder="Email" />
          {
            errors.email ?. type==='required' && <p className="text-red-500">Email is required</p>
          }
          <label className="label">Password</label>
          <input type="password" {...register('password',{required:true,minLength:6})} className="input" placeholder="Password" />
          {
            errors.password ?. type==='minLength' && <p className="text-red-500">password must be 6 characters</p>
          }
          <div><a className="link link-hover">Forgot password?</a></div>
          <button className="btn btn-neutral mt-4">Login</button>
        </fieldset>
        <p>have an account?please <Link className="text-blue-600 underline"  
        state={location.state}
        to='/register'>Register</Link></p>
       
      </form>
       <SocialLogin></SocialLogin>
    </div>
    );
};

export default Login;