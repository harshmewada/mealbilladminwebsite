import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  showErrorSnackBar,
  showSnackBar,
} from "../../redux/action/snackActions";
import { loginUser } from "../../redux/action/userActions";
import checkDispatch from "../../helpers/checkdispatch";
import { useHistory } from "react-router-dom";
import { mobileRegex } from "../../helpers/regex";
import { useForm } from "react-hook-form";
import { SMALLLOGO } from "../../redux/types";
const styles = {
  logoContainer: {
    backgroundColor: "red",
  },
};
const Login = () => {
  const history = useHistory();
  const { register, handleSubmit, watch, errors } = useForm();
  const isLoading = useSelector((state) => state.util.spinner);

  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    dispatch(loginUser(data))
      .then((res) => {
        if (res.payload.status === 200) {
          dispatch(showSnackBar("Login Success", "success"));
          history.push("/");
        }
      })
      .catch((err) => {
        dispatch(showErrorSnackBar(err));
      });
  };
  const handleForgot = async (data) => {
    history.push("/forgotpassword");
  };
  return (
    <div className="account-body accountbg">
      <div className="container">
        <div className="row vh-100">
          <div className="col-12 align-self-center">
            <div className="auth-page">
              <div className="card auth-card shadow-lg">
                <div className="card-body">
                  <div className="px-3">
                    <div className="auth-logo-box">
                      <a
                        href="/"
                        className="logo logo-admin"
                        style={styles.logoContainer}
                      >
                        <img
                          src={SMALLLOGO}
                          height="55"
                          alt="logo"
                          className="auth-logo"
                        />
                      </a>
                    </div>
                    <div className="text-center auth-logo-text">
                      <h4 className="mt-0 mb-3 mt-5">Let's Get Started </h4>
                      <p className="text-muted mb-0">Sign in to continue</p>
                    </div>

                    <form
                      className="form-horizontal auth-form my-4"
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      <div className="form-group">
                        <label htmlFor="username">Mobile</label>
                        <div className="input-group mb-3">
                          <span className="auth-form-icon">
                            <i className="dripicons-user"></i>
                          </span>
                          <input
                            type="text"
                            placeholder="mobile"
                            className="form-control"
                            name="mobile"
                            required
                            // value={data.mobile}
                            ref={register({
                              pattern: {
                                value: mobileRegex,
                                message: "Invalid mobile number",
                              },
                            })}
                            // disabled={isLoading}
                          />
                        </div>
                        {errors.mobile && (
                          <div class="form-text-error">
                            {errors.mobile.message || "Invalid mobile number"}
                          </div>
                        )}
                      </div>
                      <div className="form-group">
                        <label htmlFor="userpassword">Password</label>
                        <div className="input-group mb-3">
                          <span className="auth-form-icon">
                            <i className="dripicons-lock"></i>
                          </span>

                          <input
                            id="password"
                            type="password"
                            placeholder="Password"
                            className="form-control"
                            name="password"
                            // value={data.password}
                            required
                            // autoComplete="current-password"
                            ref={register}
                            // disabled={isLoading}
                          />
                        </div>
                      </div>
                      <div className="form-group row mt-4">
                        {/* <div className="col-sm-6">
                        <div className="custom-control custom-switch switch-success">
                          <input
                            className="custom-control-input"
                            type="checkbox"
                            name="remember"
                            id="customSwitchSuccess"
                          />

                          <label
                            className="custom-control-label text-muted"
                            for="customSwitchSuccess"
                          >
                            Remember me
                          </label>
                        </div>
                      </div> */}

                        <div className="col-sm-12 text-right">
                          <button
                            type="button"
                            onClick={() => history.push("/forgotpassword")}
                            className="btn text-muted font-13"
                          >
                            <i className="dripicons-lock"></i>
                            Forgot password?
                          </button>
                        </div>
                      </div>

                      <div className="form-group mb-0 row">
                        <div className="col-12 mt-2">
                          <button
                            type="submit"
                            // disabled={isLoading}
                            className="btn btn-gradient-primary btn-round btn-block waves-effect waves-light"
                          >
                            {/* {isLoading && (
                              <span
                                class="spinner-border spinner-border-sm"
                                role="status"
                                aria-hidden="true"
                                style={{ marginRight: "20px" }}
                              ></span>
                            )} */}
                            Log In
                            <i className="fas fa-sign-in-alt ml-1"></i>
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
