"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@radix-ui/react-separator";
import { SearchIcon } from "lucide-react";
import CardComponent from "../components/Card";
import CardInbound from "./components/CardInbound";
import { getVehicles } from "../controle_veiculos/services/vehiclesService";
import { ChartInbound } from "./components/InboundChart";
import TabelaInbounds from "./components/TabelaInbounds";
import ConfirmationDispatch from "../controle_veiculos/components/ConfirmationDispatch";

type InboundProps = {
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


export default function Inbound() {
  const [inbounds, setInbounds] = useState<InboundProps[]>([]);
  const [filtro, setFiltro] = useState("");
  const [loading, setLoading] = useState(true);

  const inboundsDespachados = inbounds.filter((e) => e.status != "Em Patio")
  const inboundsEmPatio = inbounds.filter((e) => e.status == "Em Patio")

const chartData = Object.values(
  inboundsDespachados.reduce((acc, i) => {
    const day = i.dt_entrada.split(" ")[0];
    if (!acc[day]) {
      acc[day] = { day, volumes: 0, pecas: 0 };
    }
    acc[day].volumes += i.volumes;
    acc[day].pecas += i.pecas;
    return acc;
  }, {} as Record<string, { day: string; volumes: number; pecas: number }>)
);

console.log(chartData);


useEffect(() => {
    async function carregar() {
      try {
        setLoading(true);
        const dados = await getVehicles();
        setInbounds(dados.filter((e:any) => e.tipo == "Inbound"));
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

  const entradasHoje = inbounds.filter((i) =>
    i.dt_entrada.startsWith(hojeStr)
  ).length;

  const saidasHoje = inbounds.filter(
    (i) => i.dt_saida && i.dt_saida.startsWith(hojeStr)
  ).length;

  const emPatio = inbounds.filter((i) => i.status === "Em Patio" && i.tipo === "Inbound");

  const inboundsFiltrados = emPatio.filter((i) => {
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
          <h1 className="text-2xl font-bold font-sans">Inbound</h1>
          <h2 className="text-zinc-700">Controle de recebimento de cargas</h2>
        </div>
      </header>

      <div className="flex items-center justify-center gap-4 mb-8">
        <CardComponent titulo="Em Pátio" valor={emPatio.length} />
        <CardComponent titulo="Entradas Hoje" valor={entradasHoje} />
        <CardComponent titulo="Saídas Hoje" valor={saidasHoje} />
      </div>


      <Card className="p-8 space-y-4">
        <div className="flex items-center gap-2 justify-between">
          <h1 className="font-bold text-2xl">Inbounds em Patio</h1>
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
            {inboundsFiltrados.map((i) => (
              <CardInbound 
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

        <TabelaInbounds inbounds={inbounds}/>
      </Card>

      {/* <Card className="p-8">
        <h1 className="font-bold text-2xl">Inbounds recebidos por dia</h1>
        <ChartInbound data={chartData}/>
      </Card> */}

      
    </div>
  );
}
