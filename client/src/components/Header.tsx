import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="flex my-10 justify-between items-center">
          <h2 className="text-3xl font-bold">Simple Share</h2>
          <div className="space-x-4">
              <Link to="/login" className="text-white bg-black py-2 px-4 rounded-sm">Login</Link>
              <Link to="/register" className="border py-2 px-4 rounded-sm">Register</Link>
          </div>
    </nav>
  );
};

export default Header;
