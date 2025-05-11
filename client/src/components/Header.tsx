import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../store";
import { useLogoutMutation } from "../slices/userApi";
import { clearUserInfo } from "../slices/auth";

const Header = () => {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const [logout, { isLoading }] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      await logout({});
      dispatch(clearUserInfo());
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <nav className="flex my-10 justify-between items-center">
      <Link to={"/"} className="text-3xl font-bold">
        Simple Share
      </Link>
      <div className="space-x-4">
        {userInfo ? (
          <button
            type="button"
            className="bg-red-600 text-white py-2 px-4 rounded-sm cursor-pointer"
            onClick={logoutHandler}
            disabled={isLoading}
          >
            Logout
          </button>
        ) : (
          <>
            <Link
              to="/login"
              className="text-white bg-black py-2 px-4 rounded-sm"
            >
              Login
            </Link>
            <Link to="/register" className="border py-2 px-4 rounded-sm">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;
