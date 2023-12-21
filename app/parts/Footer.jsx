import Link from "next/link";
import { memo } from "react";

const Footer = memo(function Footer() {
  return (
    <div className="bg-[#171717] text-white p-8 md:p-20 flex flex-col md:flex-row items-start gap-y-8 md:gap-y-0 justify-between">
      <div>
        <p className="font-extrabold text-3xl mb-4">🍪 cryptomate</p>
        <p className="text-gray-300">📧 : cryptomate@info.com</p>
      </div>
      <div>
        <p className="font-bold underline mb-2">Links</p>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/">Features</Link>
          </li>
          <li>
            <Link href="/">Pricing</Link>
          </li>
          <li>
            <Link href="/">Contact</Link>
          </li>
        </ul>
      </div>
      <div>
        <p className="font-bold underline mb-2">Connect</p>
        <ul>
          <li>
            <Link href="/">LinkedIn</Link>
          </li>
          <li>
            <Link href="/">Facebook</Link>
          </li>
          <li>
            <Link href="/">Twitter</Link>
          </li>
          <li>
            <Link href="/">Instagram</Link>
          </li>
        </ul>
      </div>
    </div>
  );
});

export default Footer;
