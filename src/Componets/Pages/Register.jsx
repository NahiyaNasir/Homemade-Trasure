import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthProvider";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
import 'react-toastify/dist/ReactToastify.css';
const Register = () => {
  const { createUser, updateUser } = useContext(AuthContext);
  const [registerSuccess, setSuccess] = useState("");
  const [registerError, setRegisterError] = useState("");
  const handleRegister = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = form.get("name");
    const photoUrl = form.get("photoUrl");
    const email = form.get("email");
    const password = form.get("password");
    console.log(name,password,photoUrl,email);
    if (password.length < 6) {
      setRegisterError("password should be at least 6 character");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      setRegisterError("password should be at least one upper case");
      return;
    }
    if (!/[a-z]/.test(password)) {
      setRegisterError("password should be at least one lower case");
      return;
    }

    setSuccess("");
    setRegisterError("");
    createUser(email, password)
      .then(() => {
        updateUser(name, photoUrl).then(() => {
          // window.location.href = "/";
         
          Swal.fire({
            title: 'Success!',
            text: 'User Created Successfully',
            icon: 'success',
            confirmButtonText: 'Okay'
          })
         
        });
      })
      .catch((error) =>toast.error(error));
  };
  return (
    <div>
       <Helmet>
       <title> Register Page</title>
       </Helmet>
      <div className=" flex items-center justify-center my-3">
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100  border-2 border-blue-800">
          <form className="card-body" onSubmit={handleRegister}>
            <h1 className="text-2xl"> Please Register</h1>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Name"
                name="name"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                name="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo URl</span>
              </label>
              <input
                type="text"
                placeholder="Photo URL"
                name="photoUrl"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                name="password"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-accent">Register</button>
            </div>
          </form>

          <p className="mx-10 mb-5">
            Already have an account? To login, click{" "}
            <Link to="/login">
              <span className="underline text-teal-400">Here</span>
            </Link>
          </p>
          {registerError && (
            <p className=" text-red-700 mb-6 mx-6">{registerError}</p>
          )}
          {registerSuccess && (
            <p className="text-green-400 mb-6 mx-6">{registerSuccess}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
