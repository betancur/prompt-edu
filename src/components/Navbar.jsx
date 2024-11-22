import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-white font-bold text-xl">
          PromptEdu
        </Link>
        <div className="space-x-4">
          <Link to="/prompts" className="text-white hover:text-gray-300">
            Prompts
          </Link>
          <Link to="/frameworks" className="text-white hover:text-gray-300">
            Frameworks
          </Link>
        </div>
      </div>
    </nav>
  );
}