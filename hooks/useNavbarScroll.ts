import { useEffect, useState } from "react";

const useNavbarScroll = () => {
  const [isScrolled, setIsScrolled] = useState(false); // Out of screen
  useEffect(() => {
    const scroll = () => {
      if (window.scrollY === 0) setIsScrolled(false);
      else setIsScrolled(true);
    };
    window.addEventListener("scroll", scroll, { passive: true });
    return () => window.removeEventListener("scroll", scroll);
  }, []);


  return isScrolled;
};


export default useNavbarScroll;