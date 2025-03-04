# Configuração do Projeto Next.js

## Passos para configurar o ambiente

### 1. Criar o arquivo `.env.local`

Antes de iniciar o projeto, crie um arquivo `.env.local` na raiz do projeto e adicione a seguinte variável de ambiente:

```
NEXT_PUBLIC_WEATHER_API_KEY=1a2d4aa91a98406b881165349252802
DATABASE_URL="mongodb+srv://thaisvtr26:t6BoYJAzz6r2lvzB@cluster0.tvffi.mongodb.net/clima-tempo?retryWrites=true&w=majority&appName=Cluster0"
```

### 2. Instalar dependências

Execute o seguinte comando para instalar todas as dependências do projeto:

```
npm install
```

### 3. Iniciar o servidor de desenvolvimento

Para rodar o projeto em modo de desenvolvimento, utilize o comando:

```
npm run dev
```

O servidor estará rodando e pronto para uso!
