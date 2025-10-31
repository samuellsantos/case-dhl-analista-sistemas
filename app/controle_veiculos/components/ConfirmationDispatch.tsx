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
import { updateVehicle } from "../services/vehiclesService";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function ConfirmationDispatch({id}: {id: number}) {
  const router = useRouter();
  const despacharVeiculo = async () => {
    try {
      await updateVehicle(id);
      router.refresh();
      toast.success("Veículo despachado com sucesso!")
    } catch (error) {
      toast.error("Não foi possível realizar a ação de despacho.")
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger className="bg-zinc-900 px-4 py-2 text-white rounded-lg cursor-pointer">
        Despachar
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Você tem certeza ?</AlertDialogTitle>
          <AlertDialogDescription>
            Essa ação marcará o veículo como despachado. Deseja continuar?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={despacharVeiculo} className="bg-red-600 hover:bg-red-700 cursor-pointer">
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
