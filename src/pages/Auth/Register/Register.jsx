import React from "react";
import { useForm } from "react-hook-form";
import UseAuth from "../../../hooks/UseAuth";
import SocialLogin from "../SocialLogin/SocialLogin";
import { Link, useLocation, useNavigate } from "react-router";
import axios from "axios";
import { RiErrorWarningLine } from "react-icons/ri";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { registerUser, updateUserProfile } = UseAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const handleRegister = (data) => {
    console.log(data);
    const profileImg = data.photo[0];

    registerUser(data.email, data.password)
      .then((result) => {
        console.log(result);
        // 1. store the image in form data
        const formData = new FormData();
        formData.append("image", profileImg);

        // 2. send the photo to store

        const image_API_URL = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMAGE_HOST_KEY
        }`;

        axios.post(image_API_URL, formData).then((res) => {
          const photoUrl = res.data.data.url;

          // create user in the data base
          const userInfo = {
            email: data.email,
            displayName: data.name,
            photoURL: photoUrl,
          };
          axiosSecure.post("/users", userInfo)
          .then(res=>{
            if(res.data.insertedId){
             console.log('user created in the database')
            }
          })
          // update profile to firebase
          const userProfile = {
            displayName: data.name,
            photoURL: photoUrl,
          };

          updateUserProfile(userProfile)
            .then(() => {
              console.log("User profile updated successfully");
              navigate(location?.state || "/");
            })
            .catch((error) => console.log(error));
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="card w-full max-w-sm shadow-xl bg-base-100 p-8 rounded-2xl">
      <h2 className="font-bold text-2xl ">Register Now</h2>
      <form onSubmit={handleSubmit(handleRegister)}>
        <fieldset className="fieldset">
          {/* name field */}
          <label className="label">Name</label>
          <input
            type="text"
            {...register("firsName", { required: true, maxLength: 15 })}
            className="input"
            placeholder="Name"
          />
          {errors.firstName?.type === "required" && (
            <p className="text-red-500">First name is required</p>
          )}
          {/* photo field */}
          <label className="label">Photo</label>
          <input
            type="file"
            {...register("photo", { required: true })}
            className="file-input"
            placeholder="Photo"
          />
          {errors.photo?.type === "required" && (
            <p className="text-red-500">Photo is required</p>
          )}
          {/* Email field */}
          <label className="label">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="input"
            placeholder="Email"
          />
          {errors.email?.type === "required" && (
            <p className="text-red-500">Email is required</p>
          )}
          {/* password field */}
          <label className="label">Password</label>
          <input
            type="password"
            {...register("password", { required: true, minLength: 6 })}
            className="input"
            placeholder="Password"
          />
          {errors.password?.type === "minLength" && (
            <p className="text-red-500">password must be 6 characters</p>
          )}
          <button className="btn btn-neutral mt-4">Register</button>
        </fieldset>
        <p>
          Already have an account?please{" "}
          <Link
            className="text-blue-600 underline"
            state={location.state}
            to="/login"
          >
            Login
          </Link>
        </p>
      </form>
      <SocialLogin></SocialLogin>
    </div>
  );
};

export default Register;
