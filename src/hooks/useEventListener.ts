import {useEffect} from "react";

/**
 * void event listener
 * @param eventName
 * @param handler
 * @param element
 useEventListener('click',
    (e) => {},
    document
 )
 */
export default function useEventListener(eventName: string, handler: (e) => void, element?: HTMLElement) {
  useEffect(
    () => {
      // Make sure element supports addEventListener
      const isSupported = element && element.addEventListener;
      if (!isSupported) return;

      // Add event listener
      element.addEventListener(eventName, handler);

      // Remove event listener on cleanup
      return () => {
        element.removeEventListener(eventName, handler);
      };
    },
    [eventName, element, handler] // Re-run if eventName or element changes
  );
}
