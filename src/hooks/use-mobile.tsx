import * as React from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      setIsMobile(false);
      return;
    }

    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    setIsMobile(mql.matches ?? window.innerWidth < MOBILE_BREAKPOINT);

    if (typeof mql.addEventListener === "function") {
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    } else if (typeof (mql as any).addListener === "function") {
      (mql as any).addListener(onChange);
      return () => (mql as any).removeListener(onChange);
    }
  }, []);

  return !!isMobile;
}
