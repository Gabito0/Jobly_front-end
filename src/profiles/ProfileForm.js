import React, { useState, useContext } from "react";
import AppAlert from "../common/AppAlert";
import JoblyApi from "../api/api";
import UserContext from "../auth/UserContext";

/** Profile editing form.
 *
 *  Displays profile form and handles changes to local form state.
 *  Submitting the form calls the API to save, and triggers user reloading
 *  throughout the site.
 *
 *  Confirmation of a succesful save is normally a simple <Alert>, but
 *  you can opt in to our fancy limited-time display message hook,
 *  `useTimedMessage`, but switching the lines below.
 *
 *  Routed as /profile
 *  Routes -> ProfileForm -> Alert
 */

const ProfileForm = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    email: currentUser.email,
    username: currentUser.username,
    password: "",
  });

  const [formsErrors, setFormErrors] = useState([]);

  // switch to use our fancy limited-time-display message hook
  const [saveConfirmed, setSaveConfirmed] = useState(false);
  // const [saveConfirmed, setSaveConfirmed] = useTimeMessage(false);

  console.debug(
    "ProfileForm",
    "currentUser=",
    currentUser,
    "formData=",
    formData,
    "formErrors=",
    formsErrors,
    "saveConfirmed=",
    saveConfirmed
  );

  /** On form submit:
   *  - attempt save to backend & report any errors
   *  if succesful
   *  - clear previous error message and password
   *  - show save-confirmed message
   *  - set current user info throughout the site
   */

  async function handleSubmit(evt) {
    evt.preventDefault();

    let profileData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
    };

    let username = formData.username;
    let updateduser;

    try {
      updateduser = await JoblyApi.saveProfile(username, profileData);
    } catch (errors) {
      setFormErrors(errors);
      return;
    }

    setFormData((f) => ({ ...f, password: "" }));
    setFormErrors([]);
    setSaveConfirmed(true);

    // trigger reloading of user information throughout the site
    setCurrentUser(updateduser);
  }

  /** Handle form data changing */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((f) => ({
      ...f,
      [name]: value,
    }));
    setFormErrors([]);
  }

  return (
    <div className="col-md-6 col-lg-4 offset-md-3 offset-lg-4">
      <h3>Profile</h3>
      <div className="card">
        <div className="card-body">
          <form>
            <div className="form-group">
              <label>Username</label>
              <p className="form-control-plaintext">{formData.username}</p>
            </div>
            <div className="form-group">
              <label>First Name</label>
              <input
                name="firstName"
                className="form-control"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input
                name="lastName"
                className="form-control"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Confirm password to make changes:</label>
              <input
                type="password"
                name="password"
                className="form-control"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            {formsErrors.length ? (
              <AppAlert type="danger" messages={formsErrors} />
            ) : null}

            {saveConfirmed ? (
              <AppAlert type="success" messages={["Updated successfully."]} />
            ) : null}

            <button
              className="btn btn-primary btn-block mt-4"
              onClick={handleSubmit}
            >
              Change
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default ProfileForm;
