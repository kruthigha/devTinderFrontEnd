import { useSelector, useDispatch } from "react-redux";
import { useNavigate , Link } from "react-router-dom"
import { BASE_URL } from "../utils/constants"
import { useState } from "react";
import axios from "axios";
import { addUser } from "../utils/userSlice";

const Toast = () => {
  return (<div className="toast toast-center toast-middle">
  <div className="alert alert-success">
    <span>Profile saved successfully</span>
  </div>
</div>)
}

const Profile = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(store => store.user)
  const [showToast, setShowToast] = useState(false)
  const [userInput, setUserInput] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    photoUrl: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = async () => {
    try {
      // Validate input (e.g., ensure required fields are filled)
      if (!userInput.firstName || !userInput.lastName || !userInput.age) {
        alert("Please fill out all required fields.");
        return;
      }

      const response = await axios.patch(
        `${BASE_URL}/profile/edit`,
        userInput,
        { withCredentials: true } // Automatically include cookies
      );

      console.log("Profile updated successfully:", response.data);
      if(response.data){
        dispatch(addUser(response.data))
        setShowToast(true)
        console.log("Saved Profile successfully!")
      }
      } catch (err) {
      console.error("Error updating profile:", err.response?.data || err);
      }
  };

  return (
    <div>
      <div className="card bg-base-300 w-96 shadow-xl flex justify-center my-10 mx-auto">
      
        <div className="card-body">
          <h2 className="card-title justify-center">Edit Profile</h2>
          <label>First Name</label>
          <input
            name="firstName"
            onChange={handleInputChange}
            value={userInput.firstName}
            type="text"
          />
          <label>Last Name</label>
          <input
            name="lastName"
            onChange={handleInputChange}
            value={userInput.lastName}
            type="text"
          />
          <label>Age</label>
          <input
            name="age"
            onChange={handleInputChange}
            value={userInput.age}
            type="number"
          />
          <label>Gender</label>
          <input
            name="gender"
            onChange={handleInputChange}
            value={userInput.gender}
            type="text"
          />
          <label>PhotoUrl</label>
          <input
            name="photoUrl"
            onChange={handleInputChange}
            value={userInput.photoUrl}
            type="text"
          />
          <div className="card-actions mx-auto flex justify-center my-4">
            <button
              className="btn btn-primary"
              onClick={handleSaveProfile}
            >
              Save Profile
            </button>
             
             {showToast && <Toast />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;