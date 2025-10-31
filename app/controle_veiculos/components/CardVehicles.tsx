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
import { Clock, Route, Tag, TagsIcon, TruckIcon, User2Icon } from "lucide-react";
import { updateVehicle } from "../services/vehiclesService";
import { useRouter } from 'next/navigation'
import ConfirmationDispatch from "./ConfirmationDispatch";

type CardVehiclesProps = {
  placa: string;
  motorista: string;
  dt_entrada: string;
  id: number;
  transportadora: string;
  tipo: string;
  nf: number;
};

export default function CardVehicles({
  placa,
  motorista,
  dt_entrada,
  id,
  transportadora,
  tipo,
  nf
}: CardVehiclesProps) {
  const router = useRouter()

  return (
    <Card
  className={`w-sm sm:w-full border-l-4 ${
    tipo === "Inbound" ? "border-red-600" : "border-yellow-500"
  }`}
>
  <CardHeader>
    <CardTitle>
      <div className="flex items-center gap-2">
        <div
          className={`w-fit p-2 rounded-sm ${
            tipo === "Inbound" ? "bg-red-500" : "bg-yellow-500"
          }`}
        >
          <TruckIcon color="white" />
        </div>
        <p className="flex flex-col">{placa}
          <span>{tipo}</span>
        </p>
      </div>
    </CardTitle>
    <CardDescription></CardDescription>
    <CardAction>
         <ConfirmationDispatch id={id} />
    </CardAction>
  </CardHeader>
  <CardContent>
    <ul className="flex flex-col gap-1">
      <li className="flex items-center gap-2">
        <User2Icon size={16} />
        <span>Motorista: {motorista}</span>
      </li>
      <li className="flex items-center gap-2">
        <Tag size={16} />
        <span>Placa: {placa}</span>
      </li>

      <li className="flex items-center gap-2">
        <Route size={16} />
        <span>Transportadora: {transportadora} </span>
      </li>

      <li className="flex items-center gap-2">
        <Clock size={16} />
        <span>Data Entrada: {dt_entrada} </span>
      </li>

      {tipo == "Inbound" &&
      <li className="flex items-center gap-2">
        <TagsIcon size={16} />
        <span>NF: {nf} </span>
      </li>}
    </ul>
  </CardContent>
  <CardFooter></CardFooter>
</Card>

  );
}
