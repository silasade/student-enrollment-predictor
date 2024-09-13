import { useAuth } from "../context/authContext";
import { siginOut } from "../firebase/auth";
import clsx from "clsx";
import s from "./Home.module.scss"
function Home() {
  const { currentUser } = useAuth();
  return (
    <div className={clsx(s.wrapper)}>
      <h1>
        Welcome,{" "}
        {currentUser
          ? currentUser.displayName
            ? currentUser.displayName
            : currentUser.email
          : ""}
      </h1>
      <button onClick={siginOut}>Logout</button>
    </div>
  );
}
export default Home;
