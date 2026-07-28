import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold gradient-text">BlockLearn</Link>
          <div className="flex items-center space-x-6">
            <Link to="/dashboard" className="text-gray-600 hover:text-primary-600 font-medium transition-colors">
              Dashboard
            </Link>
            <Link to="/skills" className="text-gray-600 hover:text-primary-600 font-medium transition-colors">
              Skills
            </Link>
            <Link to="/match" className="text-gray-600 hover:text-primary-600 font-medium transition-colors">
              Match
            </Link>
            <Link to="/sessions" className="text-gray-600 hover:text-primary-600 font-medium transition-colors">
              Sessions
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
