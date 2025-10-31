"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { addProduct } from "../services/invetoryService";
import { Card } from "@/components/ui/card";

export default function FormAddProduct() {
  const router = useRouter();
  const [form, setForm] = useState({
    nome: "",
    sku: "",
    quantidade: "",
    posicao: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addProduct({
      nome: form.nome,
      sku: form.sku,
      quantidade: Number(form.quantidade),
      posicao: form.posicao,
    });
    router.refresh();
    setForm({ nome: "", sku: "", quantidade: "", posicao: "" });
  };

  return (
    <Card className="mb-6">
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-2 gap-4 p-6 rounded-lg"
      >
        <div>
          <Label htmlFor="nome">Nome</Label>
          <Input
            name="nome"
            value={form.nome}
            onChange={handleChange}
            placeholder="Ex: Camisa Nike Air"
          />
        </div>

        <div>
          <Label htmlFor="sku">SKU</Label>
          <Input
            name="sku"
            value={form.sku}
            onChange={handleChange}
            placeholder="Ex: NK1234"
          />
        </div>

        <div>
          <Label htmlFor="quantidade">Quantidade</Label>
          <Input
            name="quantidade"
            type="number"
            value={form.quantidade}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label htmlFor="posicao">Posição</Label>
          <Input
            name="posicao"
            value={form.posicao}
            onChange={handleChange}
            placeholder="Ex: A1-02"
          />
        </div>

        <div className="col-span-2 flex justify-end">
          <Button type="submit">Adicionar Produto</Button>
        </div>
      </form>
    </Card>
  );
}
