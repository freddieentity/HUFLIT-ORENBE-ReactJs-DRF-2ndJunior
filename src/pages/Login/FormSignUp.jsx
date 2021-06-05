import React from "react";
import { Link } from "react-router-dom";
import {signup} from "../../redux/actions/auth" ;
import { connect } from 'react-redux';

// import validate from "./validateSignUpInfo";
import "./Form.css";
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Email should have correct format")
    .required("Email is a required field"),
});

const FormSignUp = ({ setIsSubmitted, signup }) => {
  const { register, handleSubmit } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const onSubmitSignUp = (data) => {
    const {name, email, password, password2} = data;
    
    signup({ name, email, password, password2 });
    setIsSubmitted(true);
  }

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
          {/* {errors.username && <p>{errors.username}</p>} */}
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
          {/* {errors.email && <p>{errors.email}</p>} */}
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
          {/* {errors.password && <p>{errors.password}</p>} */}
        </div>
        <div className='form-inputs'>
          <label className='form-label'>Confirm Password</label>
          <input
            className='form-input'
            type='password'
            name='password2'
            placeholder='Confirm your password'
            {...register("password2", { required: true })}
          />
          {/* {errors.password2 && <p>{errors.password2}</p>} */}
        </div>
        <button className='form-input-btn' type='submit'>
          Sign up
        </button>
        <span className='form-input-login'>
          Already have an account? <Link to="/login">Sign In</Link> 
        </span>
      </form>
    </div>
  );
};

// FormSignUp.propTypes = {
//   login: PropTypes.func.isRequired,
// }

const mapStateToProps = state => ({
  
});

export default  connect(mapStateToProps, { signup })(FormSignUp);
