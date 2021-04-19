import { useEffect } from "react";

const namePrefix = "BVPlayer";

export function useTitle(title) {
  useEffect(() => {
    document.title = `${namePrefix} — ${title}`;
  }, [title]);
}
