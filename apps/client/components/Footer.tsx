import React from "react";

function Footer() {
  return (
    <div>
      <footer className="bg-black text-gray-400 text-center py-4 text-sm">
        Built with <span className="text-orange-500">♡</span> by{" "}
        <a
          href="https://github.com/iCoderabhishek/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-gray-300 transition-colors"
        >
          iCoderabhishek
        </a>
      </footer>
    </div>
  );
}

export default Footer;
