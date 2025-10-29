
export async function loginUser(data: any){
    const response = await fetch('http://127.0.0.1:5000/auth/login', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(data),
    })

    if (!response) {
        throw new Error('Erro ao logar')
    }

    return response.json()
}