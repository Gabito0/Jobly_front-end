import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppAlert from "../common/AppAlert";
import UserContext from "./UserContext";
/** Login form
 *
 * Shows form and manages update to state on changes.
 * On submission:
 *  - calls login function prop
 *  - redirects to /companies route
 *
 *  Routes -> LoginForm -> Alert
 *  Routed as /login
 */

const LoginForm = ({ login }) => {
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState([]);

  useEffect(() => {
    if (currentUser) {
      navigate("/companies");
    }
  }, [currentUser, navigate]);
  console.debug(
    "LoginForm",
    "login=",
    typeof login,
    "formData=",
    formData,
    "formErrors=",
    formErrors
  );

  /** Handle form submit:
   *
   *  Calls login func and, if successful, redirect to /companies.
   */

  async function handleSubmit(evt) {
    evt.preventDefault();
    let result = await login(formData);
    console.debug("results=", result.success);
    if (!result.success) {
      setFormErrors(result.errors);
    }
  }

  /**Update form data field */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((l) => ({ ...l, [name]: value }));
  }
  return (
    <div className="LoginForm">
      <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
        <h3 className="mb-3">Log In</h3>
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Username</label>
                <input
                  name="username"
                  className="form-control"
                  value={formData.username}
                  onChange={handleChange}
                  autoComplete="username"
                  required
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  required
                />
              </div>

              {formErrors.length ? (
                <AppAlert type="danger" messages={formErrors} />
              ) : null}

              <button className="btn btn-primary float-right mt-3">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
