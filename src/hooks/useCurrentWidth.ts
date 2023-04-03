import { useState, useEffect } from "react";

export const useCurrentWidth = () => {
  const [currenWindowtWidth, setCurrentWindowWidth] = useState(
    window.innerWidth
  );

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    function handleWindowWidth() {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(
        () => setCurrentWindowWidth(window.innerWidth),
        150
      );
    }

    window.addEventListener("resize", handleWindowWidth);
    return () => window.removeEventListener("resize", handleWindowWidth);
  }, []);

  return currenWindowtWidth;
};
