
export async function registerVehicle(data: any){
    const response = await fetch('http://127.0.0.1:5000/vehicles/registrar_veiculo', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(data),
    })

    if (!response) {
        throw new Error('Erro ao registrar')
    }

    return response.json()
}


export async function getVehicles() {
  const response = await fetch("http://127.0.0.1:5000/vehicles/listar_veiculos", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Erro ao buscar veículos");
  }

  return response.json();
}


export async function updateVehicle(id: number) {
  const response = await fetch(
    `http://127.0.0.1:5000/vehicles/despachar_veiculo/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      }
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Erro ao atualizar veículo: ${errorText}`);
  }

  return response.json();
}


export async function updateVehicleOutbound(id: number, nf: string, volumes: number, pecas: number) {
  const response = await fetch(
    `http://127.0.0.1:5000/vehicles/despachar_veiculoexp/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nf,
        volumes,
        pecas,
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Erro ao atualizar veículo: ${errorText}`);
  }

  return response.json();
}

