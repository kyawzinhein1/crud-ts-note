import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../store";

const Header = () => {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);

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
