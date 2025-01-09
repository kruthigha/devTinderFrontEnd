import NavBar from "./navBar"
import { Outlet, useNavigate } from "react-router-dom"
import Footer from "./Footer"
import { useSelector, useDispatch }  from "react-redux"
import axios from "axios"
import {addUser } from "../utils/userSlice"
import { useEffect } from "react"
import {BASE_URL} from "../utils/constants"

const Body = () =>{
    const userData = useSelector(store => store.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // if(!userData) return navigate("/login")
    try{
    const fetchUser = async()=>{
        const user = await axios.get(BASE_URL + "/profile/view",{
            withCredentials : true
        }).catch((err)=>{
            return navigate("/login")
        })
        console.log(BASE_URL + "/profile/view",user.data)
        dispatch(addUser(user.data))
        return user.data
    }
    useEffect(()=>{
     fetchUser()
    },[])
    } catch(err) {
     console.error(err)
    }
    return(
    <>
        <NavBar/>
        <Outlet />
        <Footer />
    </>)
}

export default Body