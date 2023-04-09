// import { useBetween } from "use-between";
// import { useState } from "react";

// const usePdf = () => {
//   const [viewPdf, setViewPdf] = useState(null);
//   return {
//     viewPdf,
//     setViewPdf,
//   };
// };

// const useSharedPdf = () => useBetween(usePdf);

// export default useSharedPdf;

import { createContext } from "react";

export const PdfContext = createContext({});
