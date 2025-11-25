import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/userSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store?.user?.connections);
  const fetchConnections = async () => {
    try {
      const myConnections = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(myConnections.data.connections));
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;
  if (connections.length == 0) {
    return (
      <div className="text-center font-semibold">
        You don't have any connection...
      </div>
    );
  }
  return (
    <div className="flex flex-col max-w-5xl rounded-box shadow-md gap-2 mx-auto">
      <div className="p-4 pb-2 my-2  text-xl text-center opacity-60 tracking-wide">
        My Connections
      </div>

      {connections.map((connection) => {
        const { firstName, lastName, photoUrl, about, skills } = connection;
        return (
          <div className="flex bg-base-300 gap-2 sm:gap-4 rounded-2xl p-4 ">
            <div>
              <img className="size-16 rounded-full" src={photoUrl} />
            </div>
            <div>
              <div>{firstName + " " + lastName}</div>
              <div className="text-xs uppercase font-semibold opacity-60">
                {about}
              </div>
              <p className="list-col-wrap text-xs font-semibold uppercase mt-2">
                {skills}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
