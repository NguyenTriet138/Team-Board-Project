import { Link } from '@tanstack/react-router';
import { useAuth } from '../context/auth';

const Navbar = () => {
  const { user, signOut } = useAuth();

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          TeamBoard
        </Link>
        <div className="flex gap-4 items-center">
          {user ? (
            <>
              <div className="flex items-center gap-3">
                {user.pictureUrl && (
                  <img
                    src={user.pictureUrl}
                    alt={user.name}
                    className="w-8 h-8 rounded-full"
                  />
                )}
                <span>{user.name}</span>
              </div>
              <button
                onClick={signOut}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm"
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
