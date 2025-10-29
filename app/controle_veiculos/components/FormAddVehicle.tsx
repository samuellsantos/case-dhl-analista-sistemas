import { Button } from "@/components/ui/button";
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      console.log({
        nome_motorista: motorista,
        placa: placa,
        transportadora: transportadora,
        observacoes: observacao,
      })
      const resultado = await registerVehicle({
        nome_motorista: motorista,
        placa: placa,
        transportadora: transportadora,
        observacoes: observacao,
      });
      console.log(resultado.message)
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card className="w-full max-w-lg m-auto z-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <CardHeader>
        <CardTitle>Registrar novo veículo</CardTitle>
        <CardDescription>
          Preencha os campos abaixo para registrar o veículo
        </CardDescription>
        <CardAction>
          <Button variant="secondary">X</Button>
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
                placeholder="John Doe"
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
              placeholder="Type your message here."
              id="obs"
              value={observacao}
              onChange={(e) => setObservacao(e.target.value)}
            />
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full" onClick={handleSubmit}>
          Login
        </Button>
      </CardFooter>
    </Card>
  );
}
