import { useEffect, RefObject, useState } from "react";

type Event = MouseEvent | TouchEvent;

export const useDetectClick = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  initialState: boolean = false,
  clear?: () => void,
  typeClick: "mousedown" | "click" | "mouseup" = "mousedown"
) => {
  const [isActive, setIsActive] = useState<boolean>(initialState);

  useEffect(() => {
    const pageClickEvent = (e: Event) => {
      if (ref.current !== null && !ref.current.contains(e.target as Node)) {
        setIsActive(!isActive);
        clear && clear();
      }
    };

    if (isActive) {
      document.addEventListener(typeClick, pageClickEvent);
      document.addEventListener("touchstart", pageClickEvent);
    }

    return () => {
      document.removeEventListener(typeClick, pageClickEvent);
      document.removeEventListener("touchstart", pageClickEvent);
    };
  }, [isActive, ref]);

  const setActive = (showing: boolean) => {
    setIsActive(showing);
    clear && clear();
  };

  return { isActive, setActive };
};
