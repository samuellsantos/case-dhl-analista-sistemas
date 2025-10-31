"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateVehicle, updateVehicleOutbound } from "../services/vehiclesService";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";

export default function ConfirmationDispatch({
  id,
  tipo,
}: {
  id: number;
  tipo: string;
}) {
  const router = useRouter();
  const [nf, setNf] = useState("");
  const [volumes, setVolumes] = useState("");
  const [pecas, setPecas] = useState("");

  const despacharVeiculo = async () => {
    try {
      await updateVehicle(id);
      router.refresh();
      toast.success("Veículo despachado com sucesso!");
    } catch (error) {
      toast.error("Não foi possível realizar a ação de despacho.");
    }
  };


    const despacharVeiculoOutbound = async () => {
    try {
      if (tipo === "Expedição") {
        if (!nf || !volumes || !pecas) {
          toast.error("Preencha todos os campos antes de continuar!");
          return;
        }
        await updateVehicleOutbound(id, nf, Number(volumes), Number(pecas));
      } else {
        await updateVehicleOutbound(id, "", 0, 0);
      }

      router.refresh();
      toast.success("Veículo despachado com sucesso!");
    } catch (error) {
      toast.error("Não foi possível realizar o despacho.");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger className="bg-zinc-900 px-4 py-2 text-white rounded-lg cursor-pointer">
        Despachar
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
          <AlertDialogDescription>
            Essa ação marcará o veículo como despachado. Deseja continuar?
          </AlertDialogDescription>
        </AlertDialogHeader>

        {/* Campos adicionais só aparecem se for tipo expedição */}
        {tipo.toLowerCase() === "expedição" && (
          <div className="flex flex-col gap-3 mt-3">
            <div>
              <Label htmlFor="nf">Número da NF</Label>
              <Input
                id="nf"
                placeholder="Digite o número da nota fiscal"
                value={nf}
                onChange={(e) => setNf(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="volumes">Quantidade de Volumes</Label>
              <Input
                id="volumes"
                type="number"
                placeholder="Ex: 12"
                value={volumes}
                onChange={(e) => setVolumes(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="pecas">Quantidade de Peças</Label>
              <Input
                id="pecas"
                type="number"
                placeholder="Ex: 150"
                value={pecas}
                onChange={(e) => setPecas(e.target.value)}
              />
            </div>
          </div>
        )}

        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={tipo == "Inbound" ? despacharVeiculo : despacharVeiculoOutbound}
            className="bg-red-600 hover:bg-red-700 cursor-pointer"
          >
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
