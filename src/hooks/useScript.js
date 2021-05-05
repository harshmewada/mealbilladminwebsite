import { useEffect } from "react";

const useScript = (url, async) => {
  console.log(url);
  useEffect(() => {
    if (typeof url === "string") {
      const script = document.createElement("script");

      script.src = url;
      script.async = true;

      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    } else {
      url.map((child) => {
        const script = document.createElement("script");

        script.src = child;
        script.async = true;

        document.body.appendChild(script);
      });

      // return () => {
      //   url.map((child) => {
      //     const script = document.createElement("script");

      //     script.src = child;
      //     // script.async = true;

      //     document.body.removeChild(script);
      //   });
      // };
    }
  }, [url]);
};

export default useScript;
