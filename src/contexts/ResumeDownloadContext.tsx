"use client";

import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useRef,
} from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useReactToPrint } from "react-to-print";

interface ResumeDownloadContextProps {
  registerResumeRef: (ref: HTMLDivElement | null) => void;
  handleDownloadPdf: () => void;
}

const ResumeDownloadContext = createContext<ResumeDownloadContextProps>({
  registerResumeRef: () => {},
  handleDownloadPdf: () => {
    return Promise.resolve();
  },
});

export function useResumeDownload() {
  return useContext(ResumeDownloadContext);
}

export function ResumeDownloadProvider({ children }: PropsWithChildren) {
  const resumeRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: resumeRef,
    documentTitle: `my-resume-${new Date().toISOString()}`,
    // print: async (printIframe) => {
    //   // Do whatever you want here, including asynchronous work
    //   await downloadPdf(printIframe);
    // },
    pageStyle: `
      @page { margin: 20mm; } 
      @media print {
        .hide-for-print {
          display: none !important;
        }
      }
    `,
  });

  const downloadPdf = async (printIframe: HTMLIFrameElement) => {
    if (!printIframe) return;
    try {
      // 1) Create a large canvas of the entire resume
      // scale = 2 => sharper text, bigger file
      const canvas = await html2canvas(printIframe, {
        scale: 2,
        useCORS: true, // if you have external images/logos
      });

      const imgWidth = 595.28; // A4 width in points (72 dpi)
      const pageHeight = 841.89; // A4 height in points
      const pageHeightPx = canvas.width * (pageHeight / imgWidth);

      // Convert the entire canvas height to px
      let remainingCanvasHeight = canvas.height;
      let printY = 0;

      // Prepare jsPDF (portrait, points, A4)
      const pdf = new jsPDF("p", "pt", "a4");

      while (remainingCanvasHeight > 0) {
        // 2) Create a new "page" canvas to hold the current slice
        const pageCanvas = document.createElement("canvas");
        pageCanvas.width = canvas.width;
        // If the current chunk is bigger than one page, just use that size, otherwise the rest
        pageCanvas.height =
          remainingCanvasHeight > pageHeightPx
            ? pageHeightPx
            : remainingCanvasHeight;

        const pageCtx = pageCanvas.getContext("2d")!;
        // Draw current slice from the main canvas onto pageCanvas
        pageCtx.drawImage(
          canvas,
          0, // x-coord of main canvas from which to start clipping
          printY,
          canvas.width,
          pageCanvas.height,
          0, // x-coord on the new pageCanvas
          0,
          canvas.width,
          pageCanvas.height
        );

        // Convert pageCanvas to image data
        const pageData = pageCanvas.toDataURL("image/png");

        // 3) Add the slice to PDF
        const pageHeightInPoints =
          (pageCanvas.height * imgWidth) / canvas.width; // how tall is this slice in PDF points

        pdf.addImage(
          pageData,
          "PNG",
          0,
          0,
          imgWidth,
          pageHeightInPoints,
          undefined,
          "FAST"
        );

        // 4) If there's still more left, add a new page and continue
        remainingCanvasHeight -= pageCanvas.height;
        printY += pageCanvas.height;

        if (remainingCanvasHeight > 0) {
          pdf.addPage();
        }
      }

      // 5) Save the PDF
      pdf.save(`resume-${new Date().toISOString()}.pdf`);
    } catch (error) {
      console.error("Error generating multi-page PDF:", error);
    }
  };

  const handleDownloadPdf = useCallback(async () => {
    if (!resumeRef.current) return;

    try {
      // 1) Create a large canvas of the entire resume
      // scale = 2 => sharper text, bigger file
      const canvas = await html2canvas(resumeRef.current, {
        scale: 2,
        useCORS: true, // if you have external images/logos
      });

      const imgWidth = 595.28; // A4 width in points (72 dpi)
      const pageHeight = 841.89; // A4 height in points
      const pageHeightPx = canvas.width * (pageHeight / imgWidth);

      // Convert the entire canvas height to px
      let remainingCanvasHeight = canvas.height;
      let printY = 0;

      // Prepare jsPDF (portrait, points, A4)
      const pdf = new jsPDF("p", "pt", "a4");

      while (remainingCanvasHeight > 0) {
        // 2) Create a new "page" canvas to hold the current slice
        const pageCanvas = document.createElement("canvas");
        pageCanvas.width = canvas.width;
        // If the current chunk is bigger than one page, just use that size, otherwise the rest
        pageCanvas.height =
          remainingCanvasHeight > pageHeightPx
            ? pageHeightPx
            : remainingCanvasHeight;

        const pageCtx = pageCanvas.getContext("2d")!;
        // Draw current slice from the main canvas onto pageCanvas
        pageCtx.drawImage(
          canvas,
          0, // x-coord of main canvas from which to start clipping
          printY,
          canvas.width,
          pageCanvas.height,
          0, // x-coord on the new pageCanvas
          0,
          canvas.width,
          pageCanvas.height
        );

        // Convert pageCanvas to image data
        const pageData = pageCanvas.toDataURL("image/png");

        // 3) Add the slice to PDF
        const pageHeightInPoints =
          (pageCanvas.height * imgWidth) / canvas.width; // how tall is this slice in PDF points

        pdf.addImage(
          pageData,
          "PNG",
          0,
          0,
          imgWidth,
          pageHeightInPoints,
          undefined,
          "FAST"
        );

        // 4) If there's still more left, add a new page and continue
        remainingCanvasHeight -= pageCanvas.height;
        printY += pageCanvas.height;

        if (remainingCanvasHeight > 0) {
          pdf.addPage();
        }
      }

      // 5) Save the PDF
      pdf.save(`resume-${new Date().toISOString()}.pdf`);
    } catch (error) {
      console.error("Error generating multi-page PDF:", error);
    }
  }, []);

  const registerResumeRef = useCallback((ref: HTMLDivElement | null) => {
    resumeRef.current = ref;
  }, []);

  const value: ResumeDownloadContextProps = {
    registerResumeRef,
    handleDownloadPdf: handlePrint,
  };

  return (
    <ResumeDownloadContext.Provider value={value}>
      {children}
    </ResumeDownloadContext.Provider>
  );
}
