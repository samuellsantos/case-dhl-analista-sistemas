"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon, PlusIcon, BoxesIcon, XIcon, Divide } from "lucide-react";
import CardComponent from "../components/Card";
import {
  getInventory,
  updateQuantity,
} from "./services/invetoryService";
import { toast } from "sonner";
import FormAddProduct from "./components/FormAddProduct";
import ConfirmationDelete from "./components/ConfirmationDelete";
import TableInventory from "./components/TableInventory";

type Produto = {
  id: number;
  nome: string;
  sku: string;
  quantidade: number;
  posicao: string;
};

export default function InventarioDashboard() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [filtro, setFiltro] = useState("");
  const [formAtivo, setFormAtivo] = useState(false);

  async function carregarProdutos() {
    try {
      const dados = await getInventory();
      setProdutos(dados);
    } catch (error) {
      toast.error("Erro ao carregar produtos.");
    }
  }

  useEffect(() => {
    carregarProdutos();
  }, []);

  const produtosFiltrados = produtos.filter((p) => {
    const termo = filtro.toLowerCase();
    return (
      p.nome.toLowerCase().includes(termo) ||
      p.sku.toLowerCase().includes(termo) ||
      p.posicao.toLowerCase().includes(termo)
    );
  });

  const totalItens = produtos.reduce((acc, p) => acc + p.quantidade, 0);


  async function handleAlterarQuantidade(id: number, delta: number) {
    try {
      await updateQuantity(id, delta);
      carregarProdutos();
      toast.success(
        delta > 0
          ? "Quantidade aumentada com sucesso!"
          : "Quantidade reduzida com sucesso!"
      );
    } catch {
      toast.error("Erro ao alterar quantidade.");
    }
  }

  return (
    <div className="p-8">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            Inventário
          </h1>
          <p className="text-zinc-600">
            Gerencie e visualize o estoque em tempo real.
          </p>
        </div>
        <Button onClick={() => setFormAtivo(!formAtivo)}>
          {!formAtivo ? (
            <div className="flex items-center justify-center">
              <PlusIcon className="mr-2" /> Adicionar Produto
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <XIcon className="mr-2" /> Fechar
            </div>
          )}
        </Button>
      </header>

      {formAtivo && (
        <FormAddProduct
          onAdd={() => {
            carregarProdutos();
            toast.success("Produto adicionado com sucesso!");
          }}
        />
      )}

      <div className="flex items-center gap-4 mb-8">
        <CardComponent titulo="Total de Itens" valor={totalItens} />
        <CardComponent titulo="Produtos Cadastrados" valor={produtos.length} />
      </div>

      <Card className="p-8 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Estoque Atual</h1>
          <div className="flex items-center gap-2">
            <div className="bg-zinc-900 rounded-sm p-2 text-white">
              <SearchIcon size={16} />
            </div>
            <Input
              placeholder="Buscar por nome, SKU ou posição"
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
              className="w-80"
            />
          </div>
        </div>

        {produtosFiltrados.length === 0 ? (
          <p className="text-center text-zinc-500 mt-4">
            Nenhum produto encontrado.
          </p>
        ) : (
          <div
            className="grid gap-6 
                       grid-cols-1 
                       sm:grid-cols-2 
                       md:grid-cols-3 
                       lg:grid-cols-4"
          >
            {produtosFiltrados.map((p) => (
              <Card
                key={p.id}
                className="p-4 space-y-3 border-l-4 border-red-500"
              >
                <h2 className="font-bold text-lg">{p.nome}</h2>
                <p>SKU: {p.sku}</p>
                <p>Posição: {p.posicao}</p>

                <div className="flex items-center justify-between">
                  <p className="font-medium">Quantidade:</p>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleAlterarQuantidade(p.id, -1)}
                      disabled={p.quantidade <= 0}
                    >
                      -
                    </Button>
                    <span className="w-8 text-center font-bold">
                      {p.quantidade}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleAlterarQuantidade(p.id, +1)}
                    >
                      +
                    </Button>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      toast.info("Função de mover produto em desenvolvimento.")
                    }
                  >
                    Mover
                  </Button>
                  <ConfirmationDelete id={p.id} />
                </div>
              </Card>
            ))}
          </div>
        )}
        <TableInventory data={produtos}/>
      </Card>
    </div>
  );
}
