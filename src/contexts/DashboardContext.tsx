import React, {
  createContext,
  useContext,
  useState,
  PropsWithChildren,
} from "react";

type DashboardContextType = {
  advisorType: string;
  setAdvisorType: React.Dispatch<React.SetStateAction<string>>;
};

const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined
);

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
};

export const DashboardProvider: React.FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  const [advisorType, setAdvisorType] = useState<string>("");

  return (
    <DashboardContext.Provider value={{ advisorType, setAdvisorType }}>
      {children}
    </DashboardContext.Provider>
  );
};

