import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector , useDispatch} from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addFeed, removeFeed}  from "../utils/feedSlice"
import  UserCard  from "./userCard"

const Feed = () => {
  const [feed, setFeed] = useState([]);  // Initialize as an empty array
  const usersFeed = useSelector((store)=> store.feed)
  const dispatch = useDispatch()

  async function fetchFeed() {
    try {
      const usersFeed = await axios.get(BASE_URL + "/user/feeds", {
        withCredentials: true,
      });
      console.log("USERS feed:", usersFeed, "feedCollections:", usersFeed.data.data, usersFeed.data.message);
      dispatch(addFeed(usersFeed.data.data))
      setFeed(usersFeed.data.data);  // Assuming `data` contains the actual feed array
    } catch (error) {
      console.error("Error fetching feed:", error);
    }
  }
  async function handleRequestStatus(status, id){
    try{
    const res = await axios.post(BASE_URL + "/request/send/"+status+"/"+id, {}, {withCredentials:  true})
    console.log("handleRequestStatus",res)
    console.log("Person id clicked=", id )
    dispatch(removeFeed(id)) 
    } catch(err){
      console.log("handleRequestsErr:", err)
    }
  }

  useEffect(() => {
    fetchFeed();
  }, []);

  return (
    <>
      <h1 className="text-3xl font-bold"> Here's your Feed: {feed?.data?.message || ""}</h1>
      {feed.length === 0 ? (
        <div>Loading...</div>
      ) : (
        <>
      {usersFeed && usersFeed.length > 0 ? (
        usersFeed.map((person, index) => (
          <div key={index} className="card card-side bg-base-100 shadow-xl flex justify-center p-4 m-4">
            <figure>
              <img src={person.photoUrl} alt="people in feed" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                Name: {person.firstName} {person.lastName}
              </h2>
              <p>Gender: {person.gender ? person.gender : "Not Mentioned" }</p>
              <p>Age: {person.age ? person.age : "Not Mentioned"  }</p>
              <div className="card-actions justify-end">
              {console.log("id=", person._id )}
                <button className="btn btn-primary" onClick={()=> handleRequestStatus("interested",person._id)}>Interested</button>
                <button className="btn" onClick={()=> handleRequestStatus("ignored", person._id)}>Ignore</button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>Feed is not available</div>
      )}
    </>
      )}
    </>
  );
};

// const Card = ({ feedData }) => {


 
//   return (
//     <>
//       {feedData && feedData.length > 0 ? (
//         feedData.map((person, index) => (
//           <div key={index} className="card card-side bg-base-100 shadow-xl flex justify-center p-4 m-4">
//             <figure>
//               <img src={person.photoUrl} alt="people in feed" />
//             </figure>
//             <div className="card-body">
//               <h2 className="card-title">
//                 Name: {person.firstName} {person.lastName}
//               </h2>
//               <p>Gender: {person.gender ? person.gender : "Not Mentioned" }</p>
//               <p>Age: {person.age ? person.age : "Not Mentioned"  }</p>
//               <div className="card-actions justify-end">
//               {console.log("id=", person._id )}
//                 <button className="btn btn-primary" onClick={()=> handleRequestStatus("interested",person._id)}>Interested</button>
//                 <button className="btn" onClick={()=> handleRequestStatus("ignored", person._id)}>Ignore</button>
//               </div>
//             </div>
//           </div>
//         ))
//       ) : (
//         <div>Feed is not available</div>
//       )}
//     </>
//   );
// };

export default Feed;
