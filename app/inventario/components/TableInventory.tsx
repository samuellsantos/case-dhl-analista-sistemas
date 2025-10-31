"use client";

import { useMemo, useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Download, ChevronLeft, ChevronRight } from "lucide-react";

type ProdutoProps = {
  id: number;
  nome: string;
  sku: string;
  quantidade: number;
  posicao: string;
};

export default function TableInventory({ data }: { data: ProdutoProps[] }) {
  const [filtro, setFiltro] = useState("");
  const [pagina, setPagina] = useState(1);
  const itensPorPagina = 8;

  const filtrados = useMemo(() => {
    const termo = filtro.toLowerCase();
    return data.filter(
      (i) =>
        i.nome.toLowerCase().includes(termo) ||
        i.sku.toLowerCase().includes(termo) ||
        i.posicao.toLowerCase().includes(termo)
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
    XLSX.utils.book_append_sheet(wb, ws, "Inventory");
    const buffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([buffer]), "Inventory.xlsx");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="bg-zinc-900 rounded-sm p-2 text-white">
            <Search size={16} />
          </div>
          <Input
            placeholder="Filtrar por nome, SKU ou posição"
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
              <TableHead>Nome</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Quantidade</TableHead>
              <TableHead>Posição</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dadosPagina.map((p) => (
              <TableRow key={p.id}>
                <TableCell>{p.nome}</TableCell>
                <TableCell>{p.sku}</TableCell>
                <TableCell>{p.quantidade}</TableCell>
                <TableCell>{p.posicao}</TableCell>
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
