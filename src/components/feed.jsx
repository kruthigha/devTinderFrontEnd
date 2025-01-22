import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector , useDispatch} from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addFeed, removeFeed}  from "../utils/feedSlice"
import  UserCard  from "./userCard"

const Feed = () => {
  const [feed, setFeed] = useState([]);  // Initialize as an empty array
  const userFeed = useSelector((store)=> store.feed)
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

  useEffect(() => {
    fetchFeed();
  }, []);

  return (
    <>
      <h1 className="text-3xl font-bold">Here's your Feed: {feed?.data?.message || ""}</h1>
      {feed.length === 0 ? (
        <div>Loading...</div>
      ) : (
        <Card  feedData={feed}/>
      )}
    </>
  );
};

const Card = ({ feedData }) => {
  return (
    <>
      {feedData && feedData.length > 0 ? (
        feedData.map((person, index) => (
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
                <button className="btn btn-primary">Interested</button>
                <button className="btn">Ignore</button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>No data available</div>
      )}
    </>
  );
};

export default Feed;
