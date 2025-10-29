
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