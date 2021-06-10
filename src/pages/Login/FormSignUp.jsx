import React from "react";
import { Link } from "react-router-dom";
import {signup} from "../../redux/actions/auth" ;
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import FacebookIcon from '@material-ui/icons/Facebook';
import * as yup from "yup";
import axios from "axios";

const SignUpSchema = yup.object().shape({
  name: yup.string().min(3, "At least 3 characters").required("This field is required"),
  email: yup.string().email('Please input the right email format').required("This field is required"),
  password: yup
    .string()
    .min(6, "Password must have at least 6 characters")
    .required("This field is required"),
  re_password: yup
    .string()
    .oneOf([yup.ref("password")], "Password doesn't match")
});

const FormSignUp = ({ setIsSubmitted, signup }) => {
  const { register, handleSubmit, formState: { errors }, } = useForm({
    mode: "onBlur",
    resolver: yupResolver(SignUpSchema),
  });

  const onSubmitSignUp = (data) => {
    const {name, email, password, re_password} = data;
    
    if(password === re_password){
      signup({ name, email, password, re_password });
      setIsSubmitted(true)
    }
  }
  const continueWithFacebook = async () => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_API}/auth/o/facebook/?redirect_uri=${process.env.REACT_APP_BACKEND_API}/facebook`)

        window.location.replace(res.data.authorization_url);
    } catch (err) {

    }
};

  return (
    <div className='form-content-right'>
      <form onSubmit={handleSubmit(onSubmitSignUp)} className='form' >
        <h1>
          Get started with us today! Create your account by filling out the
          information below.
        </h1>
        <div className='form-inputs'>
          <label className='form-label'>Name</label>
          <input
            className='form-input'
            type='text'
            name='name'
            placeholder='Enter your name'
            {...register("name", { required: true })}
          />
          {errors.name && <p>{errors.name.message}</p>}
        </div>
        <div className='form-inputs'>
          <label className='form-label'>Email</label>
          <input
            className='form-input'
            type='email'
            name='email'
            placeholder='Enter your email'
            {...register("email", { required: true })}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div className='form-inputs'>
          <label className='form-label'>Password</label>
          <input
            className='form-input'
            type='password'
            name='password'
            placeholder='Enter your password'
            {...register("password", { required: true })}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <div className='form-inputs'>
          <label className='form-label'>Confirm Password</label>
          <input
            className='form-input'
            type='password'
            name='re_password'
            placeholder='Confirm your password'
            {...register("re_password", { required: true })}
          />
          {errors.re_password && <p>{errors.re_password.message}</p>}
        </div>
        <button className='form-input-btn' type='submit'>
          Sign up
        </button>
        <span className='form-input-login'>
          Already have an account? <Link to="/login">Sign In</Link> 
        </span>
        
      </form>
      <button className='btn btn-primary mt-3' onClick={continueWithFacebook}>
        <FacebookIcon />
      </button>
    </div>
  );
};

const mapStateToProps = state => ({
  
});

export default  connect(mapStateToProps, { signup })(FormSignUp);
