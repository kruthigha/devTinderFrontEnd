import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
  });
  const [err,setErr] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate();
  let messageflag = false
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
  async function checkLogin() {
    if(userInput.email && userInput.password){
        console.log("Login Button clicked", userInput);
        try{
         const res = await axios.post('http://localhost:7777/login', {
          emailId: userInput.email,
          password: userInput.password
        },{withCredentials : true})
         dispatch(addUser(res.data))
         console.log("Generate_result:",JSON.stringify(res))
         if(res){return navigate('/feed')}
        } catch(err) {
            console.log("Login error:"+ err.data)
            setErr(err.message)
        }
    } else {
        messageflag = true
        console.log("Both mail and password are required for logging in", userInput);
    }
  }
  return (
    <>
      <div className="card bg-base-300 w-96 shadow-xl flex justify-center my-10 mx-auto">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <label>Email</label>
          <input onChange={handleMail} value={userInput.email} />
          <label>Password</label>
          <input onChange={handlePassword} value={userInput.password} />
          {err && <p className="text-red-500  mx-auto flex justify-centre my-4">{"Invalid credentials"}</p>}
          <div className="card-actions mx-auto flex justify-centre my-4">
            
            <button className="btn btn-primary border-r-8 flex-coloumn" onClick={checkLogin}>
            Login
            </button>
            
            

          </div>
         
        </div>
      </div>
    </>
  );
};
export default Login;
