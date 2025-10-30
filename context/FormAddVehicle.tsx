"use client";

import { createContext, useState, ReactNode, useContext } from "react";

type FormAddVehicleType = { 
  formActive: boolean;
  setFormActive: (value: boolean) => void;
};

const FormContext = createContext<FormAddVehicleType | undefined>(undefined);

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [formActive, setFormActive] = useState(false);

  return (
    <FormContext.Provider value={{ formActive, setFormActive }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext deve ser usado dentro de um FormProvider");
  }
  return context;
};
