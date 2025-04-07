import { useState, useEffect } from "react";

/**
 * Custom hook that returns true if the screen width is less than the provided breakpoint
 * @param breakpoint - The width breakpoint in pixels (default: 768)
 * @returns boolean - True if the screen width is less than the breakpoint
 */
const useMobile = (breakpoint: number = 768): boolean => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth < breakpoint);

      const handleResize = (): void => {
        setIsMobile(window.innerWidth < breakpoint);
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [breakpoint]);

  return isMobile;
};

export default useMobile;

