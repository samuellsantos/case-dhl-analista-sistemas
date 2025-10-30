import { Button } from "@/components/ui/button";
import { useFormContext } from "@/context/FormAddVehicle";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { registerVehicle } from "../services/vehiclesService";
import { useState } from "react";

export default function FormAddVehicle() {
  const [motorista, setMotorista] = useState("");
  const [placa, setPlaca] = useState("");
  const [transportadora, setTransportadora] = useState("");
  const [observacao, setObservacao] = useState("");

  const { formActive, setFormActive } = useFormContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const resultado = await registerVehicle({
        nome_motorista: motorista,
        placa: placa,
        transportadora: transportadora,
        observacoes: observacao,
      });
      console.log(resultado.message);
    } catch (error) {
      console.error(error);
    }
    setFormActive(false)
  };

  return (
    <div
      className="bg-zinc-500/50 w-full h-screen m-auto z-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all"
      onClick={() => setFormActive(false)}
    >
      <Card className="w-full max-w-lg m-auto z-50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      onClick={(e) => e.stopPropagation()}>
        <CardHeader>
          <CardTitle>Registrar novo veículo</CardTitle>
          <CardDescription>
            Preencha os campos abaixo para registrar o veículo
          </CardDescription>
          <CardAction>
            <Button
              variant="secondary"
              onClick={() => setFormActive(false)}
              className="cursor-pointer"
            >
              X
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="grid gap-2 w-full">
              <Label htmlFor="nome_motorista">Nome do Motorista</Label>
              <Input
                id="nome_motorista"
                type="nome_motorista"
                placeholder="John Doe"
                value={motorista}
                onChange={(e) => setMotorista(e.target.value)}
                required
                className="w-full"
              />
            </div>

            <div className="flex flex-row items-center justify-between gap-6">
              <div className="grid gap-2 w-full">
                <Label htmlFor="placa">Placa</Label>
                <Input
                  id="placa"
                  type="placa"
                  placeholder="ABC-1234"
                  value={placa}
                  onChange={(e) => setPlaca(e.target.value)}
                  required
                  className="w-full"
                />
              </div>
              <div className="grid gap-2 w-full">
                <div className="flex items-center">
                  <Label htmlFor="transportadora">Transportadora</Label>
                </div>
                <Input
                  id="transportadora"
                  type="transportadora"
                  value={transportadora}
                  onChange={(e) => setTransportadora(e.target.value)}
                  required
                  className="w-full"
                />
              </div>
            </div>
            <div className="grid w-full gap-3">
              <Label htmlFor="obs">Adicione uma observação (opcional)</Label>
              <Textarea
                placeholder="Digite uma mensagem aqui"
                id="obs"
                value={observacao}
                onChange={(e) => setObservacao(e.target.value)}
              />
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button
            type="submit"
            className="w-full cursor-pointer"
            onClick={handleSubmit}
          >
            Registrar Veículo
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
