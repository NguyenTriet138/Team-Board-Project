import { Link } from '@tanstack/react-router';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          TeamBoard
        </Link>
        <div className="flex gap-4">
          <Link to="/" className="hover:text-gray-300">
            Home
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
