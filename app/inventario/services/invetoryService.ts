export type ProductData = {
  nome: string;
  sku: string;
  quantidade: number;
  posicao: string;
};

const API_URL = "http://127.0.0.1:5000/inventory";

export async function getInventory() {
  const res = await fetch(`${API_URL}/listar_inventario`, { cache: "no-store" });
  if (!res.ok) throw new Error("Erro ao buscar inventário");
  return res.json();
}

export async function addProduct(data: ProductData) {
  const res = await fetch(`${API_URL}/adicionar_inventario`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Erro ao adicionar produto");
  return res.json();
}

export async function deleteProduct(id: number) {
  const res = await fetch(`${API_URL}/deletar/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Erro ao deletar produto");
  return res.json();
}

export async function moveProduct(id: number, posicao: string) {
  const res = await fetch(`${API_URL}/mover/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ posicao }),
  });
  if (!res.ok) throw new Error("Erro ao mover produto");
  return res.json();
}

export async function updateQuantity(id: number, delta: number) {
  const res = await fetch(`${API_URL}/quantidade/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ delta }),
  });
  if (!res.ok) throw new Error("Erro ao atualizar quantidade");
  return res.json();
}
