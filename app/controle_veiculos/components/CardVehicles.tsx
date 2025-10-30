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
import { Clock, Route, Tag, TruckIcon, User2Icon } from "lucide-react";
import { updateVehicle } from "../services/vehiclesService";

type CardVehiclesProps = {
  placa: string;
  motorista: string;
  dt_entrada: string;
  id: number;
  transportadora: string;
};

export default function CardVehicles({
  placa,
  motorista,
  dt_entrada,
  id,
  transportadora,
}: CardVehiclesProps) {
  const despacharVeiculo = async () => {
    try {
      await updateVehicle(id); // apenas envia o id
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card className="w-sm sm:w-full">
      <CardHeader>
        <CardTitle>
          <div className="flex items-center gap-2">
            <div className="bg-zinc-900 w-fit p-2 rounded-sm">
              <TruckIcon color="white" />
            </div>
            <p>{placa}</p>
          </div>
        </CardTitle>
        <CardDescription></CardDescription>
        <CardAction>
          <Button className="cursor-pointer" onClick={despacharVeiculo}>
            Despachar
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <ul className="flex flex-col gap-1">
          <li className="flex items-center gap-2">
            <User2Icon size={16} />
            <span>{motorista}</span>
          </li>
          <li className="flex items-center gap-2">
            <Tag size={16} />
            <span>{placa}</span>
          </li>

          <li className="flex items-center gap-2">
            <Route size={16} />
            <span>{transportadora} </span>
          </li>

          <li className="flex items-center gap-2">
            <Clock size={16} />
            <span>{dt_entrada} </span>
          </li>
        </ul>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
