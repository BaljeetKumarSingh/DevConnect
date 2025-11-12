const UserCard = ({ user }) => {
  const { firstName, lastName, age, about, skills, photoUrl, gender } = user;
  return (
    <div className="card bg-base-200 w-82 shadow-sm">
      <figure>
        <img className="" src={photoUrl} alt="User Profile" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        <p>{about}</p>
        {skills.length != 0 && <p>Skills: {skills.join(", ")}</p>}
        {age && gender && (
          <p>
            {age}, {gender}
          </p>
        )}
        <div className="card-actions flex justify-between">
          <button className="btn btn-primary">Ignore</button>
          <button className="btn btn-secondary">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
