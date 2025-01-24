import { ResumeType } from "@/app/types/career";
import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from "react";

type ResumeContextType = {
  resumeData: ResumeType;
  resumeDataId: string | undefined;
  setResumeDataId: React.Dispatch<React.SetStateAction<string | undefined>>;
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
  const [resumeDataId, setResumeDataId] = useState<string | undefined>(
    initialData.id
  );

  return (
    <ResumeContext.Provider
      value={{ resumeData, setResumeData, resumeDataId, setResumeDataId }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

