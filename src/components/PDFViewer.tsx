"use client";

import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import { Button } from "@/components/ui/button";
import { Download, ZoomIn, ZoomOut } from "lucide-react";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
  ).toString();

interface PDFViewerProps {
  pdfUrl: string;
}

const PDFViewer = ({ pdfUrl }: PDFViewerProps) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1);
  console.log(pdfUrl);
  

  // Callback when the PDF is successfully loaded
  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const onDocumentLoadError = (error: Error) => {
    console.error("Failed to load PDF:", error);
  };
  

  // Handle zoom in
  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.25, 2.5)); // Limit max zoom to 2.5x
  };

  // Handle zoom out
  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev - 0.25, 0.5)); // Limit min zoom to 0.5x
  };

  // Handle download
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "document.pdf";
    link.click();
  };

  return (
    <div className="flex flex-col items-center p-4 bg-gray-50 min-h-screen">
      {/* PDF Document */}
      <div className="w-full max-w-4xl bg-white border shadow-lg rounded-lg overflow-hidden">
        {/* Toolbar */}
        <div className="flex justify-between items-center p-4 border-b bg-gray-100">
          <div className="flex gap-2">
            <Button
              onClick={handleZoomOut}
              variant="outline"
              size="sm"
              disabled={scale <= 0.5}
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button
              onClick={handleZoomIn}
              variant="outline"
              size="sm"
              disabled={scale >= 2.5}
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button onClick={handleDownload} variant="outline" size="sm">
              <Download className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-sm text-gray-600">
            Page {pageNumber} of {numPages}
          </p>
        </div>

        {/* PDF Content */}
        <Document
          file={pdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={onDocumentLoadError} // Add error handler
          className="p-4"
        >
          <Page pageNumber={pageNumber} scale={scale} />
        </Document>

        {/* Pagination Controls */}
        <div className="flex justify-center p-4 border-t bg-gray-100">
          <Button
            onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}
            disabled={pageNumber <= 1}
            variant="outline"
            size="sm"
          >
            Previous
          </Button>
          <Button
            onClick={() => setPageNumber((prev) => Math.min(prev + 1, numPages || 1))}
            disabled={pageNumber >= (numPages || 1)}
            variant="outline"
            size="sm"
            className="ml-2"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PDFViewer;