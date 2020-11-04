import { useEffect } from "react";

const useDocumentTitle = (title, fallbackTitle) => {
  useEffect(() => {
    document.title = title;

    return () => {
      document.title = fallbackTitle;
    };
  }, [title]);
};

export default useDocumentTitle;
