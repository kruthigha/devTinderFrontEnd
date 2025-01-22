import { useSelector, useDispatch } from "react-redux";
import { useNavigate , Link } from "react-router-dom"
import { removeUser } from  "../utils/userSlice"
import axios from "axios"
import {BASE_URL} from "../utils/constants"

function NavBar() {
  const user = useSelector(store => store.user)
  console.log("Reading Subscribing via redux store", user)
  
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogout = async() =>{
    try {
      const res = await axios.post(BASE_URL+"/logout",{},{ withCredentials : true})
      console.log("logging out",res)
      dispatch(removeUser())
      return navigate("/login") 
    } catch(err){
      console.log("Error Handle Logout: "+err)
    }
  }
  return (
    <>
      <div className="navbar bg-base-300">
        <div className="flex-1">
          <Link to="/feed" className="btn btn-ghost text-xl">DevTinder</Link>
        </div>
        <div className="flex-none gap-2">
        { user && <><div className="form-control">
            <p>Welcome, {user.firstName}</p>
          </div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
           <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={user.photoUrl}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link to="/connections" className="justify-between">
                  Connections
                </Link>
              </li>
              <li>
                <Link to="/requests" className="justify-between">
                  Requests
                </Link>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
          </>
        }
        </div>
      </div>
    </>
  );
}
export default NavBar;
