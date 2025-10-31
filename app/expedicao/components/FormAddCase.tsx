"use client";
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
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useRouter } from "next/navigation";

export default function FormAddVehicle() {
  const router = useRouter()
  const [motorista, setMotorista] = useState("");
  const [placa, setPlaca] = useState("");
  const [transportadora, setTransportadora] = useState("");
  const [observacao, setObservacao] = useState("");
  const [tipo, setTipo] = useState("Expedição");
  const [volumes, setVolumes] = useState<number | "">("");
  const [pecas, setPecas] = useState<number | "">("");
  const [nf, setNF] = useState<string>("");

  const { formActive, setFormActive } = useFormContext();


  return (
    <div
      className="bg-zinc-500/50 fixed inset-0 w-full h-screen z-10 flex items-center justify-center transition-all"
      onClick={() => setFormActive(false)}
    >
      <Card
        className="w-full max-w-lg m-auto z-50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        onClick={(e) => e.stopPropagation()}
      >
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
          <form className="flex flex-col gap-4">
            {/* Tipo */}
            <div className="grid gap-2 w-full">
              <Label htmlFor="tipo">Tipo de Veículo</Label>
              <Select onValueChange={(value) => setTipo(value)} defaultValue={tipo}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Inbound">Inbound</SelectItem>
                  <SelectItem value="Expedição">Expedição</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Motorista */}
            <div className="grid gap-2 w-full">
              <Label htmlFor="nome_motorista">Nome do Motorista</Label>
              <Input
                id="nome_motorista"
                type="text"
                placeholder="John Doe"
                value={motorista}
                onChange={(e) => setMotorista(e.target.value)}
                required
                className="w-full"
              />
            </div>

            {/* Placa e Transportadora */}
            <div className="flex flex-row items-center justify-between gap-6">
              <div className="grid gap-2 w-full">
                <Label htmlFor="placa">Placa</Label>
                <Input
                  id="placa"
                  type="text"
                  placeholder="ABC-1234"
                  value={placa}
                  onChange={(e) => setPlaca(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2 w-full">
                <Label htmlFor="transportadora">Transportadora</Label>
                <Input
                  id="transportadora"
                  type="text"
                  placeholder="Nome da transportadora"
                  value={transportadora}
                  onChange={(e) => setTransportadora(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Campos extras para Inbound */}
            {tipo === "Inbound" && (
              <>
                <div className="grid gap-2 w-full">
                  <Label htmlFor="nf">Número da NF</Label>
                  <Input
                    id="nf"
                    type="text"
                    placeholder="Ex: 123456"
                    value={nf}
                    onChange={(e) => setNF(e.target.value)}
                    required={tipo === "Inbound"}
                  />
                </div>

                <div className="flex flex-row gap-6">
                  <div className="grid gap-2 w-full">
                    <Label htmlFor="volumes">Volumes</Label>
                    <Input
                      id="volumes"
                      type="number"
                      placeholder="Ex: 24"
                      value={volumes}
                      onChange={(e) => setVolumes(Number(e.target.value))}
                      required={tipo === "Inbound"}
                    />
                  </div>
                  <div className="grid gap-2 w-full">
                    <Label htmlFor="pecas">Peças (quantidade)</Label>
                    <Input
                      id="pecas"
                      type="number"
                      placeholder="Ex: 312"
                      value={pecas}
                      onChange={(e) => setPecas(Number(e.target.value))}
                      required={tipo === "Inbound"}
                    />
                  </div>
                </div>
              </>
            )}

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
          >
            {'Registrar Veículo'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
