# Controle Logístico - ZYX

Sistema desenvolvido para gerenciamento completo de operações logísticas, incluindo controle de inventário, entrada e saída de veículos, expedição de cargas e relatórios consolidados.

---

## Tecnologias Utilizadas

- **Frontend:** Next.js, React, Tailwind CSS, Lucide Icons  
- **Backend:** Flask, Flask-SQLAlchemy, Flask-Login, Flask-CORS  
- **Banco de Dados:** SQLite / SQLAlchemy ORM  
- **Outros:** Sonner (toast notifications), FileSaver e XLSX (exportação para Excel)  

---

## Funcionalidades

### Inventário
- Adicionar produtos com nome, SKU, quantidade e posição.  
- Alterar quantidade de produtos e mover entre posições.  
- Deletar produtos do inventário.  
- Filtro e pesquisa por nome, SKU ou posição.  
- Exportação do inventário para Excel.  

### Controle de Veículos
- Registrar entrada de caminhões com placa, motorista, transportadora e observações.    

### Expedição
- Marcar veículos como despachados.  
- Adicionar NF, quantidade de volumes e peças ao despachar veículos.  
- Validações de status para evitar duplicidade de despacho.  

### Dashboard
- Visualização geral de inventário e veículos em pátio.  
- Cards com estatísticas resumidas (Total de Itens, Produtos Cadastrados, Veículos em Pátio, etc.)  
- Paginação e filtros nos dashboards.  
- Notificações em tempo real via toast.  

---

## Como Rodar o Projeto

*IMPORTANTE: Ter node JS e Python instalados*

### Backend (Flask)
1. Criar e ativar ambiente virtual:
    No terminal executar os comandos abaixo
   ```bash
   python -m venv venv #Caso tenha uma pasta venv na raiz do projeto deletar antes de executar o comando
   ./venv/Scripts/Activate.ps1 #Ativar ambiente virtual
   cd backend # Ir para pasta backend
   python -m pip install -r requirements.txt # Instalar dependências

2. Executar backend. Na raiz do projeto (case-dhl-analista-sistemas)
    ```
    npm run api

3. Executar Next JS. Na raiz do projeto (case-dhl-analista-sistemas)
    ```
    npm i
    npm run dev
    

