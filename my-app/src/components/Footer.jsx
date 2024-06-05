import React from "react";
import { FaChevronUp, FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  // Function to scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-white text-gray-800 py-6 px-3">
      <div className="container mx-auto text-center mt-2">
        <div className="flex justify-center mb-4">
          <button
            onClick={scrollToTop}
            className="text-red-600 focus:outline-none hover:text-gray-300 transition duration-300"
          >
            <FaChevronUp size={24} />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-bold mb-2">About Us</h3>
            <p className="text-sm">
              Deluxe is where passion meets flavor. We're dedicated to creating
              delicious, high-quality meals that bring people together.
              Sustainability and community are at our core.
            </p>
          </div>
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-bold mb-2">Contact</h3>
            <p className="text-sm">
              Email: kioxmanu7@gmail.com
              <br />
              Phone: +25411645608
            </p>
          </div>
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-bold mb-2">Social Media</h3>
            <div className="flex justify-center space-x-4">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-800"
              >
                <FaFacebook size={24} />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-800"
              >
                <FaTwitter size={24} />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-800"
              >
                <FaInstagram size={24} />
              </a>
            </div>
          </div>
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-bold mb-2">Privacy Policy</h3>
            <a href="http://" target="_blank" rel="noopener noreferrer">
              <p className="text-red-500 hover:text-slate-400">Read our privacy policy here.</p>
            </a>
          </div>
        </div>
      </div>
      <div className="text-center mt-4">
        <p className="text-gray-500">
          © {new Date().getFullYear()} Emmanuel Kioko. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
