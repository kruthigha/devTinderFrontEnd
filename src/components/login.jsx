import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [userInput, setUserInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  1;
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [err, setErr] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let messageflag = false;
  function handleMail(e) {
    setUserInput((t) => {
      return {
        ...t,
        email: e.target.value,
      };
    });
  }
  function handlePassword(e) {
    setUserInput((t) => {
      return {
        ...t,
        password: e.target.value,
      };
    });
  }
  function handlefName(e) {
    setUserInput((t) => {
      return {
        ...t,
        firstName: e.target.value,
      };
    });
  }
  function handlelName(e) {
    setUserInput((t) => {
      return {
        ...t,
        lastName: e.target.value,
      };
    });
  }
  async function handleSignUp(){
    try{
      if (userInput.email && userInput.password && userInput.firstName && userInput.lastName) {
    const res = await axios.post(BASE_URL+"/signup",
      {
        firstName : userInput.firstName ,
        lastName : userInput.lastName ,
        emailId: userInput.email, 
        password: userInput.password,
      },{ withCredentials : true})
      dispatch(addUser(res.data));
      console.log("Generate_result:", JSON.stringify(res)); 
      if (res) {
        return navigate("/profile");
      }
    }
    } catch(err){
      console.log("HandleSignUp Err:" + err)
    }
  }

  async function checkLogin() {
    if (userInput.email && userInput.password) {
      console.log("Login Button clicked", userInput);
      try {
        const res = await axios.post(
          BASE_URL+"/login",
          {
            emailId: userInput.email,
            password: userInput.password,
          },
          { withCredentials: true }
        );
        dispatch(addUser(res.data));
        console.log("Generate_result:", JSON.stringify(res));
        if (res) {
          return navigate("/feed");
        }
      } catch (err) {
        console.log("Login error:" + err.data);
        setErr(err.message);
      }
    } else {
      messageflag = true;
      console.log(
        "Both mail and password are required for logging in",
        userInput
      );
    }
  }
  return (
    <>
      <div className="card bg-base-300 w-96 shadow-xl flex justify-center my-10 mx-auto">
        <div className="card-body">
          <h2 className="card-title justify-center">
            {isLoginForm ? "Login" : "SignUp"}
          </h2>
          {!isLoginForm && (
            <>
              <label>First Name</label>
              <input onChange={handlefName} value={userInput.firstName} />
              <label>Last Name</label>
              <input onChange={handlelName} value={userInput.lastName} />
            </>
          )}
          <label>Email</label>
          <input onChange={handleMail} value={userInput.email} />
          <label>Password</label>
          <input onChange={handlePassword} value={userInput.password} />
          {err && (
            <p className="text-red-500  mx-auto flex justify-centre my-4">
              {"Invalid credentials"}
            </p>
          )}
          <div className="card-actions mx-auto flex justify-centre my-4">
            <button
              className="btn btn-primary border-r-8 flex-coloumn"
              onClick={ isLoginForm ? checkLogin : handleSignUp}
            >
             {isLoginForm ? "Login" : "signUp" }
            </button>
            <p className="m-auto cursor-pointer" onClick={()=>{
              setIsLoginForm((t)=> !t)
            }}> {isLoginForm ? "New User SignUp" :"Existing User Login"}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
