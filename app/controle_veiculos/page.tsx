"use client";
import { Button } from "@/components/ui/button";
import CardComponent from "../components/Card";
import FormAddVehicle from "./components/FormAddVehicle";
import { useEffect, useState } from "react";
import { useFormContext } from "@/context/FormAddVehicle";
import { getVehicles } from "./services/vehiclesService";
import CardVehicles from "./components/CardVehicles";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";

type VeiculoProps = {
  dt_entrada: string;
  dt_saida: string | null;
  id: number;
  nome_motorista: string;
  observacoes: string;
  placa: string;
  status: "Em Patio" | "Em Transito" | "Finalizado";
  transportadora: string;
  tipo: string;
  nf: number
};

export default function VehiclesControl() {
  const router = useRouter()
  
  const { formActive, setFormActive } = useFormContext();
  const [veiculos, setVeiculos] = useState<VeiculoProps[]>([]);
  const [filtro, setFiltro] = useState("");
  const [loading, setLoading] = useState(true); 

  const toggleForm = () => {
    setFormActive(true);
  };

  const hoje = new Date();
  const hojeStr = `${String(hoje.getDate()).padStart(2, "0")}/${String(
    hoje.getMonth() + 1
  ).padStart(2, "0")}/${hoje.getFullYear()}`;

  const entradasHoje = veiculos.filter((v) =>
    v.dt_entrada.startsWith(hojeStr)
  ).length;

  const saidasHoje = veiculos.filter(
    (v) => v.dt_saida && v.dt_saida.startsWith(hojeStr)
  ).length;

  const emPatio = veiculos.filter((v) => v.status === "Em Patio");



  async function carregar() {
      try {
        setLoading(true);
        const dados = await getVehicles();
        setVeiculos(dados);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  useEffect(() => {
    
    carregar();
  }, []);

  const veiculosFiltrados = emPatio.filter((v) => {
    const termo = filtro.toLowerCase();
    return (
      v.placa.toLowerCase().includes(termo) ||
      v.nome_motorista.toLowerCase().includes(termo) ||
      v.transportadora.toLowerCase().includes(termo)
    );
  });

  return (
    <div className="p-12 md:px-8 md:py-12">
      <div>{formActive && <FormAddVehicle />}</div>

      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-sans">Controle de veículos</h1>
          <h2 className="text-zinc-700">
            Registre entrada / saída de veículos
          </h2>
        </div>
        <Button onClick={toggleForm} className="cursor-pointer">
          + Registrar Veículo.
        </Button>
      </header>

      <div className="flex items-center justify-center gap-4 mb-8">
        <CardComponent titulo="Veículos em pátio" valor={emPatio.length} />
        <CardComponent titulo="Entradas Hoje" valor={entradasHoje} />
        <CardComponent titulo="Saídas Hoje" valor={saidasHoje} />
      </div>

      <Card className="p-8 space-y-4">
        <div className="flex items-center gap-2 justify-between">
          <h1 className="font-bold text-2xl">Veículos em Pátio</h1>
          <div className="flex items-center gap-2">
            <div className="bg-zinc-900 rounded-sm p-2 text-white">
              <SearchIcon size={16} />
            </div>
            <Input
              type="text"
              className="w-80"
              placeholder="Filtrar por placa, motorista ou transportadora"
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div
            className="grid gap-8
                     grid-cols-1 
                     sm:grid-cols-2
                     md:grid-cols-3 
                     lg:grid-cols-4"
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-40 w-full rounded-xl" />
            ))}
          </div>
        ) : veiculosFiltrados.length === 0 ? (
          <p className="text-center text-zinc-500 mt-4">
            Nenhum veículo encontrado.
          </p>
        ) : (
          <div
            className="grid gap-8
                       grid-cols-1 
                       sm:grid-cols-2
                       md:grid-cols-3 
                       lg:grid-cols-4"
          >
            {veiculosFiltrados.map((veiculo) => (
              <CardVehicles
                key={veiculo.id}
                nf={veiculo.nf}
                motorista={veiculo.nome_motorista}
                placa={veiculo.placa}
                dt_entrada={veiculo.dt_entrada}
                id={veiculo.id}
                transportadora={veiculo.transportadora}
                tipo={veiculo.tipo}
              />
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
