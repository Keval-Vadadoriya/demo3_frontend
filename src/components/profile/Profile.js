import { useSelector } from "react-redux";
const Profile = () => {
  const user = useSelector((state) => state.user);
  const avatar = user.avatar;
  return (
    <div>
      <h1>Name:{user.name}</h1>
      <h1>Email:{user.email}</h1>
      <h1>Age:{user.age}</h1>
      <img src={`http://127.0.0.1:3001/${avatar}`} />
    </div>
  );
};
export default Profile;
