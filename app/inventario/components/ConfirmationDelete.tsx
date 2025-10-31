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
import { useRouter } from "next/navigation";
import { deleteProduct } from "../services/invetoryService";
import { toast } from "sonner";

export default function ConfirmationDelete({id}: {id: number}) {
  const router = useRouter();
  const deletar = async () => {
       await deleteProduct(id);
       toast.success("Item deletado com sucesso!")
       router.refresh();
   };

  return (
    <AlertDialog>
      <AlertDialogTrigger className="bg-red-500 hover:bg-red-600 px-2 py-1 text-white rounded-sm cursor-pointer text-sm">
        Deletar Item
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Você tem certeza ?</AlertDialogTitle>
          <AlertDialogDescription>
            Essa ação irá deletar o item do estoque. Deseja continuar?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={deletar} className="bg-red-600 hover:bg-red-700 cursor-pointer">
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
