"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import CardComponent from "../components/Card";
import { getVehicles } from "../controle_veiculos/services/vehiclesService";
import CardInbound from "../inbound/components/CardInbound";
import CardExpedicao from "./components/CardOutbound";
import TableVehicles from "../components/TableVehicles";

type ExpedicaoProps = {
  id: number;
  nf: number;
  placa: string;
  transportadora: string;
  nome_motorista: string;
  observacoes: string;
  volumes: number;
  pecas: number;
  status: "Em Patio" | "Despachado" | "Finalizado";
  dt_entrada: string;
  dt_saida: string | null;
  tipo: string;
};


export default function Expedicao() {
  const [expedicao, setexpedicao] = useState<ExpedicaoProps[]>([]);
  const [filtro, setFiltro] = useState("");
  const [loading, setLoading] = useState(true);

  const expedicaoDespachados = expedicao.filter((e) => e.status != "Em Patio")


useEffect(() => {
    async function carregar() {
      try {
        setLoading(true);
        const dados = await getVehicles();
        setexpedicao(dados.filter((e:any) => e.tipo == "Expedição"));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    carregar();
  }, []);

  const hoje = new Date();
  const hojeStr = `${String(hoje.getDate()).padStart(2, "0")}/${String(
    hoje.getMonth() + 1
  ).padStart(2, "0")}/${hoje.getFullYear()}`;

  const entradasHoje = expedicao.filter((i) =>
    i.dt_entrada.startsWith(hojeStr)
  ).length;

  const saidasHoje = expedicao.filter(
    (i) => i.dt_saida && i.dt_saida.startsWith(hojeStr)
  ).length;

  const emPatio = expedicao.filter((i) => i.status === "Em Patio" && i.tipo === "Expedição");

  const expedicaoFiltrados = emPatio.filter((i) => {
    const termo = filtro.toLowerCase();
    return (
      i.placa.toLowerCase().includes(termo) ||
      i.nome_motorista.toLowerCase().includes(termo) ||
      i.transportadora.toLowerCase().includes(termo) ||
      String(i.nf).includes(termo)
    );
  });

  return (
    <div className="p-12 md:px-8 md:py-12 flex flex-col gap-8">
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-sans">Expedição</h1>
          <h2 className="text-zinc-700">Controle de expedição de cargas.</h2>
        </div>
      </header>

      <div className="flex items-center justify-center gap-4 mb-8">
        <CardComponent titulo="Em Pátio" valor={emPatio.length} />
        <CardComponent titulo="Entradas Hoje" valor={entradasHoje} />
        <CardComponent titulo="Saídas Hoje" valor={saidasHoje} />
      </div>


      <Card className="p-8 space-y-4">
        <div className="flex items-center gap-2 justify-between">
          <h1 className="font-bold text-2xl">Veículos em patio para expedição</h1>
          <div className="flex items-center gap-2">
            <div className="bg-zinc-900 rounded-sm p-2 text-white">
              <SearchIcon size={16} />
            </div>
            <Input
              type="text"
              className="w-80"
              placeholder="Filtrar por NF, placa, motorista ou transportadora"
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div className="text-center text-zinc-500">Carregando...</div>
        ) : (
          <div
            className="grid gap-8
                      grid-cols-1 
                      sm:grid-cols-2
                      md:grid-cols-3 
                      lg:grid-cols-4"
          >
            {expedicaoFiltrados.map((i) => (
              <CardExpedicao
              nf={i.nf}
              motorista={i.nome_motorista}
              placa={i.placa}
              caixas={i.volumes}
              dt_entrada={i.dt_entrada}
              pecas={i.pecas}
              transportadora={i.transportadora}
              key={i.id}
              />
            ))}
          </div>
          
        )}
        <h1 className="text-2xl font-bold font-sans">Relatório Geral</h1>
        <TableVehicles data={expedicao}/>
      </Card>

       
      
    </div>
  );
}
