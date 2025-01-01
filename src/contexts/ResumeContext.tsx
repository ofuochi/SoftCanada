import { ResumeType } from "@/app/types/career";
import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from "react";

type ResumeContextType = {
  resumeData: ResumeType;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeType>>;
};

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error("useResumeContext must be used within a ResumeProvider");
  }
  return context;
};

export const ResumeProvider: React.FC<
  PropsWithChildren<{
    initialData: ResumeType;
  }>
> = ({ children, initialData }) => {
  const [resumeData, setResumeData] = useState<ResumeType>(initialData);

  return (
    <ResumeContext.Provider value={{ resumeData, setResumeData }}>
      {children}
    </ResumeContext.Provider>
  );
};
