import { useSelector , useDispatch } from "react-redux"
import axios from "axios"
import { useEffect, useState } from "react"
import { BASE_URL } from "../utils/constants"
import { addRequests, removeRequests } from "../utils/requestSlice"

const Requests = () => {
  const dispatch = useDispatch()
  const req = useSelector((store)=>store.request)
  const fetchRequests =(async()=>{
    try{
     const res = await axios.get(BASE_URL+"/user/requests/recieved", {
        withCredentials: true,
      });
      console.log("recieved connections:" , res.data.data, res.data.data[0]._id)
      dispatch(addRequests(res.data.data))
    } catch (err) {
        console.error("response connections:" + err)
    }
  })
  useEffect(()=>{
    fetchRequests()
  },[])
  const reviewRequests = (async(status,id)=>{
    try{
        console.log("Review Requests Clicked")
        const res = await axios.post(BASE_URL + "/request/review/"+status+"/"+id , {}, {withCredentials : true})
        console.log("Review Status :"+ status ,res)
        dispatch(removeRequests(id))
    } catch (err) {
      console.error("Error in review Requests:", err)
    }
  })
  return (
    <>
    <h1 className="flex justify-center font-bold ">
      Requests recieved
    </h1>
    <>
      {req && req.length > 0 ? (
        req.map((person, index) => (
          <div key={index} className="card card-side bg-base-100 shadow-xl flex justify-center p-4 m-4">
            <figure>
              <img src={person.fromUserId.photoUrl} alt="people in feed" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                Name: {person.fromUserId.firstName} {person.fromUserId.lastName}
              </h2>
              <div className="card-actions justify-end">
                <button className="btn btn-primary" onClick={()=>reviewRequests("accepted",person._id)}>Accept</button>
                <button className="btn" onClick={()=>reviewRequests("rejected",person._id)}>Reject</button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>No Requests available</div>
      )}
    </>
    </>

  )
}

export default Requests
