// eslint-disable-next-line no-unused-vars
import React from "react";
import moment from 'moment';

const Footer = () => {
  return (
    <footer className="bg-white shadow-[0px_0px_1px_#000000] fixed bottom-0 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <p className="text-sm text-gray-500">&copy; {moment().format('YYYY')} HR Management System. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
