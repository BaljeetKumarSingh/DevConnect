const UserCard = ({ user }) => {
  const { firstName, lastName, age, about, skills, photoUrl, gender } = user;
  return (
    <div className="card bg-base-200 shadow-sm">
      <figure>
        <img
          className="w-full h-48 sm:w-64 md:w-72 lg:w-84 lg:h-72"
          src={photoUrl}
          alt="User Profile"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        <div>
          {age && <span>{age}, </span>}
          {gender && <span>{gender}</span>}
        </div>
        <p>{about}</p>
        {skills?.length != 0 && <p>Skills: {skills?.join(", ")}</p>}
        <div className="card-actions flex justify-between">
          <button className="btn btn-primary">Ignore</button>
          <button className="btn btn-secondary">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
