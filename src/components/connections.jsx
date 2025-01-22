import axios from "axios"
import { useEffect, useState } from "react"
import { BASE_URL } from "../utils/constants"

const Connections = ()=>{
    const [feedData, setFeedData] = useState([])

    const fetchConnections = (async()=>{
        try{
         const res = await axios.get(BASE_URL+"/user/connection", {
            withCredentials: true,
          });
          console.log("response connections:" , res.data.data)
          setFeedData(res.data.data)
        } catch (err) {
            console.error("response connections:" + err)
        }
    })

    useEffect(() => {
        fetchConnections()
    },[])

    return(<>
     <h1 className="text-3xl font-bold">Xplore your Connections</h1>
     {feedData && feedData.length > 0 ? (
          feedData.map((person, index) => (
            <div key={index} className="card card-side bg-base-100 shadow-xl flex justify-center p-4 m-4">
            <figure>
            <img src={person.photoUrl} alt="Profile Pic"/>
            </figure>
              <div className="card-body">
                <h2 className="card-title">
                  Name: {person.firstName} {person.lastName}
                </h2>
                <p>Gender: {person.gender ? person.gender : "Not Mentioned" }</p>
                <p>Age: {person.age ? person.age : "Not Mentioned"  }</p>
              </div>
            </div>
          ))
        ) : (
          <div>No Connections available</div>
        )}
      </>
    );
};

export default Connections