'use client'
import { useState } from "react";
import { loginUser } from "./services/userService";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"; 
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon, CheckCheckIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter()
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [mensagem, setMensagem] = useState("");

  const limparMensagem = () => {
    setTimeout(() => {
      setMensagem('')
    }, 3000)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 

    try {
      const resultado = await loginUser({ nome: usuario, senha: password });
      setMensagem(resultado.message);
      limparMensagem()
      if (resultado.message == 'Logado com sucesso!') {
        setTimeout(() => router.push('/'), 1000)
        
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-white w-full h-screen text-zinc-800 font-sans">
      <h1 className="text-5xl font-bold mb-6">XYZ</h1>

      <div className="p-8 border border-zinc-300 rounded-xl shadow-md">
        <header>
          <h2 className="text-xl font-semibold mb-6 text-center">
            Faça login na sua conta
          </h2>
        </header>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-md">
          <div className="flex flex-col">
            <Label htmlFor="usuario" className="mb-2">Usuário</Label>
            <Input
              type="text"
              id="usuario"
              value={usuario}
              placeholder="Digite seu usuário"
              onChange={(e) => setUsuario(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <Label htmlFor="senha" className="mb-2">Senha</Label>
            <Input
              type="password"
              id="senha"
              value={password}
              placeholder="Digite sua senha"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button onClick={handleSubmit} className="w-full mt-2 cursor-pointer">
            Logar
          </Button>

          <Button type="button" className="w-full mt-2 cursor-pointer" variant={"secondary"}>
            Registrar usuário e senha
          </Button>

          {mensagem == 'Logado com sucesso!' ?
          (<Alert>
            <CheckCheckIcon />
            <AlertTitle>
              Sucesso!
            </AlertTitle>
            <AlertDescription>
              {mensagem}
            </AlertDescription>
          </Alert>)

          : mensagem ?
          (<Alert>
            <AlertCircleIcon />
            <AlertTitle>
              Erro
            </AlertTitle>
            <AlertDescription>
              {mensagem}
            </AlertDescription>
          </Alert>)
          :
          null
          }
          
        </form>
      </div>
    </div>
  );
}
