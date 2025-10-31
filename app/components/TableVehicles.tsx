"use client";

import { useMemo, useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Download, ChevronLeft, ChevronRight } from "lucide-react";

type DataProps = {
  id: number;
  nf: number;
  placa: string;
  transportadora: string;
  nome_motorista: string;
  observacoes: string;
  volumes: number;
  pecas: number;
  status: string;
  dt_entrada: string;
  dt_saida: string | null;
};

export default function TableVehicles({ data }: { data: DataProps[] }) {
  const [filtro, setFiltro] = useState("");
  const [pagina, setPagina] = useState(1);
  const itensPorPagina = 8;

  const filtrados = useMemo(() => {
    const termo = filtro.toLowerCase();
    return data.filter(
      (i) =>
        i.placa.toLowerCase().includes(termo) ||
        i.transportadora.toLowerCase().includes(termo) ||
        i.nome_motorista.toLowerCase().includes(termo) ||
        String(i.nf).includes(termo)
    );
  }, [filtro, data]);

  const totalPaginas = Math.ceil(filtrados.length / itensPorPagina);
  const dadosPagina = filtrados.slice(
    (pagina - 1) * itensPorPagina,
    pagina * itensPorPagina
  );

  const exportarExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filtrados);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Inbounds");
    const buffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([buffer]), "Inbounds.xlsx");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="bg-zinc-900 rounded-sm p-2 text-white">
            <Search size={16} />
          </div>
          <Input
            placeholder="Filtrar por NF, placa, motorista ou transportadora"
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            className="w-72"
          />
        </div>

        <Button onClick={exportarExcel} className="flex items-center gap-2">
          <Download size={16} />
          Exportar Excel
        </Button>
      </div>

      <div className="border rounded-lg overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>NF</TableHead>
              <TableHead>Placa</TableHead>
              <TableHead>Motorista</TableHead>
              <TableHead>Transportadora</TableHead>
              <TableHead>Volumes</TableHead>
              <TableHead>Peças</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Entrada</TableHead>
              <TableHead>Saída</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dadosPagina.map((i) => (
              <TableRow key={i.id}>
                <TableCell>{i.nf}</TableCell>
                <TableCell>{i.placa}</TableCell>
                <TableCell>{i.nome_motorista}</TableCell>
                <TableCell>{i.transportadora}</TableCell>
                <TableCell>{i.volumes}</TableCell>
                <TableCell>{i.pecas}</TableCell>
                <TableCell>{i.status}</TableCell>
                <TableCell>{i.dt_entrada}</TableCell>
                <TableCell>{i.dt_saida ?? "-"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-sm text-muted-foreground">
          Página {pagina} de {totalPaginas}
        </span>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPagina((p) => Math.max(1, p - 1))}
            disabled={pagina === 1}
          >
            <ChevronLeft size={16} />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPagina((p) => Math.min(totalPaginas, p + 1))}
            disabled={pagina === totalPaginas}
          >
            <ChevronRight size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
}
