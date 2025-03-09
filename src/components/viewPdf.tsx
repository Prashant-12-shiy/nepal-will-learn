"use client"
import { useEffect, useRef } from "react";

import PDFObject from "pdfobject";

const ViewerPDF = ({ pdfUrl }: {pdfUrl: string}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      PDFObject.embed(pdfUrl, containerRef.current);
    }
  }, [pdfUrl]);

  return <div ref={containerRef} className="h-screen w-full"></div>;
};

export default ViewerPDF;