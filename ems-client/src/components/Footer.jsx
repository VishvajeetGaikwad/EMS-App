// Footer.jsx
import { FaLinkedin, FaFacebook, FaTwitter } from "react-icons/fa"; // Importing LinkedIn and other social icons

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto flex justify-between items-center">
        <p>&copy; 2025 EMS Portal</p>
        <div className="flex gap-6">
          {/* LinkedIn icon */}
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors duration-300"
          >
            <FaLinkedin size={24} />
          </a>
          {/* Facebook icon */}
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors duration-300"
          >
            <FaFacebook size={24} />
          </a>
          {/* Twitter icon */}
          <a
            href="https://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors duration-300"
          >
            <FaTwitter size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
