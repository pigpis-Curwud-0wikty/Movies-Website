import AuthScreen from "./AuthScreen";
import HomeScreen from "./HomeScreen";
import { useAuthStore } from "../store/authUser";

const Homepage = () => {
  const { user } = useAuthStore();

  return <>{user ? <HomeScreen /> : <AuthScreen />}</>;
};

export default Homepage;
