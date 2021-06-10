import React from "react";
import { Link, Redirect } from "react-router-dom";
import { login } from "../../redux/actions/auth";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import "./Form.css";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";

const LoginSchema = yup.object().shape({
  email: yup.string().email().required("This field is required"),
  password: yup
    .string()
    .min(6, "Password must have at least 6 characters")
    .required("This field is required"),
});

const Login = ({ login, isAuthenticated, user }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginSchema),
  });

  const onSubmitLogin = (data) => {
    const { email, password } = data;
    login({ email, password });
  };

  const continueWithFacebook = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/auth/o/facebook/?redirect_uri=${process.env.REACT_APP_API_URL}/facebook`
      );

      window.location.replace(res.data.authorization_url);
    } catch (err) {}
  };

  if (isAuthenticated && !user.is_partner) return <Redirect to="/" />;
  if (isAuthenticated && user.is_partner) return <Redirect to="/partners" />;

  return (
    <div className="form-container">
      <span className="close-btn">×</span>
      <div className="form-content-left">
        <img
          className="form-img"
          src="https://vuigo.vn/images/icon-service-hotel.svg"
          alt="spaceship"
        />
      </div>
      <div className="form-content-right">
        <form onSubmit={handleSubmit(onSubmitLogin)} className="form">
          <h1>
            Login into our site to experience all the convenience with ORENBE.
          </h1>
          <div className="form-inputs">
            <label className="form-label">Email</label>
            <input
              className="form-input"
              type="email"
              name="email"
              placeholder="Enter your email"
              {...register("email", { required: true })}
            />
            {errors.email && <p>{errors.email.message}</p>}
          </div>
          <div className="form-inputs">
            <label className="form-label">Password</label>
            <input
              className="form-input"
              type="password"
              name="password"
              placeholder="Enter your password"
              {...register("password", { required: true })}
            />
            {errors.password && <p>{errors.password.message}</p>}
          </div>
          <button className="form-input-btn" type="submit">
            Log in
          </button>
          <span className="form-input-login">
            Don't have an account yet? <Link to="/signup">Sign Up</Link>
          </span>
          <span className="form-input-login">
            Forget Password? <Link to="/reset_password">Reset</Link>
          </span>
          <span className="btn btn-primary mt-3" onClick={continueWithFacebook}>
            Continue With Facebook
          </span>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps, { login })(Login);
