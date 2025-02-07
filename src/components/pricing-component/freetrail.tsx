import Link from "next/link";
import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";

const FreeTrail = () => {
  return (
    <div>
      <div className="py-16 bg-[#FFFFFF] text-center mt-20 wrapper">
        <h2 className="text-[40px] font-bold text-[#252B42]">
          Start Your 20 Days Free Trial
        </h2>
        <p className="text-[#737373] text-[14px] mt-4 mx-auto">
          Met Minim Mollie Non Deserunt Alamo Est Sit Cliquey Dolor <br /> Do
          Met Sent. RELUIT Official Consequat.
        </p>
        <button className="mt-6 bg-[#23A6F0] rounded-md text-[14px] font-bold text-[#FFFFFF] px-8 py-4 hover:bg-blue-400">
          Try It Free Now
        </button>

        <div className="flex justify-center mt-10">
          <Link href="#" className="text-[#55ACEE] mx-2">
            <FaTwitter size={30} />
          </Link>
          <Link href="#" className="text-[#395185] mx-2">
            <FaFacebookF size={30} />
          </Link>
          <Link href="#" className="text-[#000000] mx-2">
            <FaInstagram size={30} />
          </Link>
          <Link href="#" className="text-[#0A66C2] mx-2">
            <FaLinkedinIn size={30} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FreeTrail;
