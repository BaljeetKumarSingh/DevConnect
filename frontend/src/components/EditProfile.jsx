import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [emailId, setEmailId] = useState(user.emailId);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [about, setAbout] = useState(user.about);
  const [skills, setSkills] = useState(user.skills);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const saveProfile = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          age,
          gender,
          emailId,
          photoUrl,
          about,
          skills,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      toast(res.data.message);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <div className="flex justify-center items-center gap-2 sm:gap-4">
      <div className="flex items-center justify-center my-15 sm:my-20 lg:my-24">
        <div className="bg-base-200 rounded-4xl flex flex-col items-center shadow-xl/20">
          <h1 className="text-2xl sm:text-3xl my-4 ">Login</h1>
          <div className="flex flex-col w-full px-4 sm:px-12">
            <div className="w-full">
              <label className="text-left">First Name:</label>
              <input
                type="text"
                value={firstName}
                className="mx-2 my-2 py-1 px-2 text-md border-2 rounded-xl"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div>
              <label className="text-left">Last Name:</label>
              <input
                type="text"
                value={lastName}
                className="mx-2 my-2 py-1 px-2 text-md border-2 rounded-xl"
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="w-full">
              <label className="text-left">Age:</label>
              <input
                type="number"
                value={age}
                className="mx-2 my-2 py-1 px-2 text-md border-2 rounded-xl"
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            <div className="">
              <label className="text-left">Gender</label>
              <select
                className="bg-base-100 mx-2 my-2 py-1 px-2 text-md border-2 rounded-xl"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="w-full">
              <label className="text-left">EmailId:</label>
              <input
                type="email"
                value={emailId}
                className="mx-2 my-2 py-1 px-2 text-md border-2 rounded-xl"
                onChange={(e) => setEmailId(e.target.value)}
              />
            </div>
            <div>
              <label className="text-left">Photo Url:</label>
              <input
                type="text"
                value={photoUrl}
                className="mx-2 my-2 py-1 px-2 text-md border-2 rounded-xl"
                onChange={(e) => setPhotoUrl(e.target.value)}
              />
            </div>
            <div>
              <label className="text-left">About:</label>
              <input
                type="text"
                value={about}
                className="mx-2 my-2 py-1 px-2 text-md border-2 rounded-xl"
                onChange={(e) => setAbout(e.target.value)}
              />
            </div>
            <div>
              <label className="text-left">Skills:</label>
              <input
                type="text"
                value={skills?.toString()}
                placeholder="add a comma seperated skills"
                className="mx-2 my-2 py-1 px-2 text-md border-2 rounded-xl"
                onChange={(e) => setSkills(e.target.value.split(","))}
              />
            </div>
            <p>{error}</p>
            <button
              className="mt-8 bg-indigo-500 py-1 sm:py-2 text-xl sm:text-2xl rounded-xl cursor-pointer"
              onClick={saveProfile}
            >
              Save Profile
            </button>
          </div>
        </div>
      </div>
      <div>
        <UserCard
          user={{
            firstName,
            lastName,
            age,
            gender,
            emailId,
            photoUrl,
            about,
            skills,
          }}
        />
      </div>
    </div>
  );
};

export default EditProfile;
