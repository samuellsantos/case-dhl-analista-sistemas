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
import { Boxes, ChevronRightCircle, Clock, Puzzle, Route, Tag, Tags, User2Icon } from "lucide-react";


type CardInboundProps = {
  nf: number;
  motorista: string;
  placa: string;
  transportadora: string;
  dt_entrada: string;
  caixas: number;
  pecas: number;
}

export default function CardInbound({nf, motorista, placa, transportadora, dt_entrada, caixas, pecas}: CardInboundProps) {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>
          <div className="flex items-center gap-2">
            <div className="bg-zinc-900 w-fit p-2 rounded-sm">
              <Tags color="white" />
            </div>
            <p>NF: {nf}</p>
          </div>
        </CardTitle>
        <CardDescription></CardDescription>
        <CardAction>
          <Button className="cursor-pointer" >
            <ChevronRightCircle />
            <p>
              Iniciar
            </p>
          </Button>
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
            <span>Transportadora: {transportadora}</span>
          </li>

          <li className="flex items-center gap-2">
            <Clock size={16} />
            <span>Chegada: {dt_entrada} </span>
          </li>

          <li className="flex items-center gap-2">
            <Boxes size={16} />
            <span>Caixas: {caixas}</span>
          </li>

          <li className="flex items-center gap-2">
            <Puzzle size={16} />
            <span>Peças: {pecas}</span>
          </li>
        </ul>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
