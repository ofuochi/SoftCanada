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
  const contentRef = useRef<HTMLDivElement>(null);

  const handleDownloadPdf = useReactToPrint({
    contentRef,
    documentTitle: `my-resume-${new Date().toISOString()}`,
    pageStyle: `
      @page { margin: 20mm;   } 
      @media print {
        * {
          -webkit-print-color-adjust: exact; /* Chrome/Safari */
          print-color-adjust: exact; /* Standard */
        }
        .hide-for-print {
          display: none !important;
        }
      }
    `,
  });

  const registerResumeRef = useCallback((ref: HTMLDivElement | null) => {
    contentRef.current = ref;
  }, []);

  const value: ResumeDownloadContextProps = {
    registerResumeRef,
    handleDownloadPdf,
  };

  return (
    <ResumeDownloadContext.Provider value={value}>
      {children}
    </ResumeDownloadContext.Provider>
  );
}

