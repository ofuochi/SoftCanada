"use client";

import { message } from "antd";
import { createContext, ReactNode, useContext, useState } from "react";

export type ApiError = {
  type: string;
  title: string;
  status: number;
  errors: {
    [key: string]: string[];
  };
  traceId?: string;
};

// Error context type
export type ErrorContextType = {
  setApiError: (error: ApiError) => void;
  clearApiError: () => void;
  apiError: ApiError | null;
};

// Create context
const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

// Error Provider
export const ErrorProvider = ({ children }: { children: ReactNode }) => {
  const [apiError, setApiErrorState] = useState<ApiError | null>(null);
  const [messageApi, contextHolder] = message.useMessage();

  const setApiError = (error: ApiError) => {
    setApiErrorState(error);
    displayErrorMessages(error);
  };

  const clearApiError = () => {
    setApiErrorState(null);
  };

  const displayErrorMessages = (error: ApiError) => {
    const formattedErrors = Object.entries(error.errors || {}).map(
      ([field, messages]) => `${field}: ${messages.join(", ")}`
    );

    messageApi.error({
      content: (
        <div>
          <b>{error.title || "An Error has occurred:"}</b>
          <ul>
            {formattedErrors.map((err, idx) => (
              <li key={idx}>{err}</li>
            ))}
          </ul>
        </div>
      ),
      duration: 5,
    });
  };

  return (
    <ErrorContext.Provider value={{ setApiError, clearApiError, apiError }}>
      {contextHolder}
      {children}
    </ErrorContext.Provider>
  );
};

// Custom hook to access the Error Context
export const useErrorContext = () => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error("useErrorContext must be used within an ErrorProvider");
  }
  return context;
};
