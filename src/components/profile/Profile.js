import { useSelector } from "react-redux";
const Profile = () => {
  const user = useSelector((state) => state.user);
  const avatar = user.avatar;
  const src = "data:image/jpg;base64, " + avatar.toString("base64");
  return (
    <div>
      <h1>Name:{user.name}</h1>
      <h1>Email:{user.email}</h1>
      <h1>Age:{user.age}</h1>
      <img src={src} />
    </div>
  );
};
export default Profile;
