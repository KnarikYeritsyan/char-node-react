import React, { useCallback, useState } from 'react';
import Input from "../components/loginForm/input";
import { loginRequest, registrationRequest } from "../store/actions/users";
import { useDispatch } from "react-redux";
import WrapperLogOut from "../components/WrapperLogOut";

function Login(props) {
  const dispatch = useDispatch();

  const [rememberMe, setRememberMe] = useState(true);
  const [formData, setFormData] = useState({
    password: '',
    email: '',
  });

  const handleChange = useCallback((key) => (ev) => {
    setFormData({ ...formData, [key]: ev.target.value })
  }, [formData]);

  const handleSubmit = useCallback(async (ev) => {
    ev.preventDefault();
    dispatch(loginRequest(formData, rememberMe));
  }, [formData, rememberMe]);

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
              Log in
              </span>

              <Input
                value={formData.email}
                onChange={handleChange('email')}
                placeholder="Email" icon="key"
                name="email"
              />
              <Input
                value={formData.password}
                onChange={handleChange('password')}
                placeholder="Password" icon="key" />
              <div className="contact100-form-checkbox">
                <input
                  className="input-checkbox100"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  id="ckb1" type="checkbox"
                  name="remember-me" />
                <label className="label-checkbox100" htmlFor="ckb1">
                  Remember me
                </label>
              </div>
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
