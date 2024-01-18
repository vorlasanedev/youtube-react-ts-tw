import { ArrowLeft, Bell, Menu, Mic, Search, Upload, User } from "lucide-react";
import Button from "../components/Button";
import { useState } from "react";

export default function PageHeader() {
  const [showFullWidthSearch, setShowFullWidthSearch] = useState(false);

  return (
    <>
      <div className="flex gap-10 lg:gap-20 justify-between pt-2 mb-6 mx-4">
        <div
          className={`gap-4 items-center flex-shrink-0 
        ${showFullWidthSearch ? "hidden" : "flex"}
        `}
        >
          <Button variant="ghost" size="icon">
            <Menu />
          </Button>
          <a href="/">
            <img
              src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
              alt="google"
              className="h-6"
            />
          </a>
        </div>

        <form
          className={`gap-4 flex-grow items-center justify-center ${
            showFullWidthSearch ? "flex" : "hidden md:flex"
          }`}
        >
          {showFullWidthSearch && (<Button 
          onClick={() => setShowFullWidthSearch(false)}
          type="button" variant="ghost" size="icon" className="flex-shrink-0">
            <ArrowLeft />
          </Button>)}
          <div className="flex flex-grow max-w-[600px]">
            <input
              type="search"
              placeholder="Search Google or type a URL"
              className="rounded-l-full border border-secondary-border
              shadow-inner shadow-secondary
              px-4 py-1 text-lg w-full
              focus:outline-none focus:ring-2 focus:ring-primary focus:border-blue-500 flex-grow "
            />
            <Button
              type="button"
              variant="ghost"
              className="py-2 px-4 rounded-r-full border border-secondary-border border-l-0 flex-shrink-0"
            >
              <Search />
            </Button>
          </div>
          {/* <Button
            type="button"
            size="icon"
            variant="ghost"
            className="flex-shrink-0"
          >
            <Mic />
          </Button> */}
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="flex-shrink-0"
          >
            <Mic />
          </Button>
        </form>
        <div
          className={`flex-shrink-0 md:gap-2 ${
            showFullWidthSearch ? "hidden" : "flex"
          }`}
        >
          
          <Button
            onClick={() => setShowFullWidthSearch(true)}
            variant="ghost"
            size="icon"
            className="md:hidden"
          >
            <Search />
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Mic />
          </Button>
          <Button variant="ghost" size="icon">
            <Upload />
          </Button>
          <Button variant="ghost" size="icon">
            <Bell />
          </Button>
          <Button variant="ghost" size="icon">
            <User />
          </Button>
        </div>
      </div>
    </>
  );
}
