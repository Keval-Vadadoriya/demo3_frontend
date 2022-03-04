import { useSelector } from "react-redux";
const Profile = () => {
  const user = useSelector((state) => state.user);
  return (
    <div>
      <h1>Name:{user.name}</h1>
      <h1>Email:{user.email}</h1>
      <h1>Age:{user.age}</h1>
    </div>
  );
};
export default Profile;
