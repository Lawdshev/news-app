import { useEffect } from "react";

export function useTriggerScrollFix(deps: any) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("scroll"));
    }
  }, deps);
}
