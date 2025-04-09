"use client";
import { usePathname } from "next/navigation";
import Button from "./components/shared/button/button";
import Link from "next/link";
const NotFound = () => {
  const pathname = usePathname();

  // const handleBackClick = (e: React.MouseEvent) => {
  //   e.preventDefault();
  //   window.scrollTo({ top: 0, behavior: "smooth" });
  //   window.location.href = "/";
  // };

  return (
    <div className="w-full h-screen bg-[#161616] z-90 fixed top-0 flex justify-center items-center">
      <div className="flex flex-col gap-5 items-center leading-none relative">
        <img
          className="absolute -top-40 -z-10"
          src="/not found/nappingcat.gif"
          alt="404 not found"
        />
        <h2 className="text-center text-8xl mt-20">404</h2>
        <h3 className="text-center text-xl">
          Page Not Found – It’s Taking a Nap
        </h3>
        <Link href="/">
          <Button text="Go Back" color="text-black" bgColor="bg-amber-300" />
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
