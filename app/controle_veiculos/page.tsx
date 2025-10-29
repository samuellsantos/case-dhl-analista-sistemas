"use client";
import { Button } from "@/components/ui/button";
import CardComponent from "../components/Card";
import FormAddVehicle from "./components/FormAddVehicle";
import { useState } from "react";

export default function VehiclesControl() {
  const [form, setForm] = useState(false);

  const toggleForm = () => {
    setForm(true);
  };

  return (
    <div className="p-12 md:px-44 md:py-12">
        <div>{form && <FormAddVehicle />}</div>
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-sans">Controle de veículos</h1>
          <h2 className="text-zinc-700">
            Registre entrada / saída de veículos
          </h2>
        </div>
        <Button 
        onClick={toggleForm}
        className="cursor-pointer">+ Registrar Veículo.</Button>
      </header>

      <div className="flex items-center justify-center gap-4">
        <CardComponent />
        <CardComponent />
        <CardComponent />
      </div>

      
    </div>
  );
}
