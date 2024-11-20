import React, { useCallback, useState } from 'react';
import Input from "../components/loginForm/input";
import { useDispatch } from "react-redux";
import { registrationRequest } from "../store/actions/users";
import { useNavigate } from "react-router-dom";
import WrapperLogOut from "../components/WrapperLogOut";

function Login(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    password: '',
    email: '',
  });

  const handleChange = useCallback((key) => (ev) => {
    setErrors({ ...errors, [key]: null });
    setFormData({ ...formData, [key]: ev.target.value })
  }, [formData]);

  const handleSubmit = useCallback(async (ev) => {
    ev.preventDefault();
    dispatch(registrationRequest(formData, null, (err, data) => {
      if (err) {
        setErrors(err.errors);
        return
      }
      navigate('/login');
    }));
  }, [formData]);

  return (
    <WrapperLogOut>
      <div className="limiter">
        <div className="container-login100">
          <div className="wrap-login100">
            <form onSubmit={handleSubmit} className="login100-form validate-form">
              <span className="login100-form-logo">
              <i className="zmdi zmdi-landscape"></i>
              </span>
              <span className="login100-form-title p-b-34 p-t-27">
              Register
              </span>
              <Input
                value={formData.firstName}
                onChange={handleChange('firstName')}
                placeholder="First Name"
                error={errors.firstName}
                icon="user"
              />
              <Input
                value={formData.lastName}
                onChange={handleChange('lastName')}
                error={errors.lastName}
                placeholder="Last Name" icon="user" />
              <Input
                value={formData.password}
                onChange={handleChange('password')}
                error={errors.password}
                placeholder="Password" icon="key" />
              <Input
                value={formData.email}
                onChange={handleChange('email')}
                error={errors.email}
                placeholder="Email" icon="key"
              />
              <div className="container-login100-form-btn">
                <button className="login100-form-btn">
                  Login
                </button>
              </div>
              <div className="text-center p-t-90">
                <a className="txt1" href="https://colorlib.com/etc/lf/Login_v3/index.html#">
                  Forgot Password?
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </WrapperLogOut>
  );
}

export default Login;
