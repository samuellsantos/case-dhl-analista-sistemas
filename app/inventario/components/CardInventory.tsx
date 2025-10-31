"use client";

import { Card, CardHeader, CardContent, CardFooter, CardAction } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PackageIcon, MapPinIcon, TrashIcon, ArrowRightLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { deleteProduct, moveProduct } from "../services/invetoryService";
import ConfirmationDispatch from "./ConfirmationDelete";
import ConfirmationDelete from "./ConfirmationDelete";

type CardInventoryProps = {
  id: number;
  nome: string;
  sku: string;
  quantidade: number;
  posicao: string;
};

export default function CardInventory({ id, nome, sku, quantidade, posicao }: CardInventoryProps) {
  const router = useRouter();

  const mover = async () => {
    const novaPosicao = prompt("Digite a nova posição:");
    if (!novaPosicao) return;
    await moveProduct(id, novaPosicao);
    router.refresh();
  };

  // const deletar = async () => {
  //   if (confirm(`Excluir o produto ${nome}?`)) {
  //     await deleteProduct(id);
  //     router.refresh();
  //   }
  // };

  return (
    <Card className="border-l-4 border-blue-600 hover:shadow-lg transition">
      <CardHeader className="flex justify-between">
        <div className="flex items-center gap-2">
          <PackageIcon className="text-blue-600" />
          <h3 className="font-semibold">{nome}</h3>
        </div>
        <span className="text-zinc-600 text-sm">{sku}</span>
      </CardHeader>

      <CardAction>
       
      </CardAction>

      <CardContent>
        <p><strong>Qtd:</strong> {quantidade}</p>
        <p className="flex items-center gap-1">
          <MapPinIcon size={14} /> <span>{posicao}</span>
        </p>
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button size="sm" onClick={mover} className="bg-blue-600 hover:bg-blue-700">
          <ArrowRightLeftIcon size={16} className="mr-2" /> Mover
        </Button>
        {/* <ConfirmationDelete id={id} /> */}
      </CardFooter>
    </Card>
  );
}
