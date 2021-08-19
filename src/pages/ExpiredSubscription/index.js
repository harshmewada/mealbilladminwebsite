import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { expireSubScription, logoutUser } from "../../redux/action/userActions";
import { CONTACTUSURL, SMALLLOGO } from "../../redux/types/index";
const ExpiredSubscription = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogin = () => {
    dispatch(expireSubScription());
    dispatch(logoutUser());

    history.push("/login");
  };

  const handleContact = () => {
    window.open(CONTACTUSURL);
  };

  return (
    <div className="account-body accountbg">
      <div className="container">
        <div class="row vh-100 ">
          <div class="col-12 align-self-center">
            <div class="auth-page">
              <div class="card auth-card shadow-lg">
                <div class="card-body">
                  <div class="px-3">
                    <div class="auth-logo-box">
                      <a
                        href="/analytics/analytics-index"
                        class="logo logo-admin"
                      >
                        <img
                          src={SMALLLOGO}
                          height="55"
                          alt="logo"
                          className="auth-logo"
                        />
                      </a>
                    </div>
                    <img
                      src="/images/expiredsubscription.png"
                      alt=""
                      class="d-block mx-auto mt-4"
                      height="250"
                    />
                    <div class="text-center auth-logo-text mb-4">
                      <h6>Oh snap!</h6>

                      <h4 class="mt-0 mb-3 mt-2">
                        Looks like your subscription has been expired.
                      </h4>

                      <button
                        onClick={() => {
                          handleLogin();
                        }}
                        class="btn btn-sm btn-outline-primary"
                      >
                        Back to Login
                      </button>
                    </div>
                    <div class="text-center auth-logo-text mb-4">
                      <button
                        onClick={() => {
                          handleContact();
                        }}
                        class="btn btn-lg btn-gradient-primary "
                      >
                        Contact Mealbill
                      </button>
                    </div>
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

export default ExpiredSubscription;
