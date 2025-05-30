# 🔍 CRUD de Curiosidades

Um sistema completo de gerenciamento de curiosidades, com arquitetura full stack: **front-end em React-Native** e **back-end em Java (Spring Boot) com MongoDB**. Permite criar, visualizar, editar e excluir curiosidades categorizadas em temas como **Mistério, História, Tecnologia, Comida e Animais**.

---

## 📚 Sumário


- [Funcionalidades Detalhadas](#funcionalidades-detalhadas)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Guia de Instalação (Passo a Passo)](#guia-de-instalação-passo-a-passo)
- [Como Usar](#como-usar)
- [Configuração de Ambiente](#configuração-de-ambiente)
- [Principais Endpoints da API](#principais-endpoints-da-api)
- [Fluxo de Desenvolvimento & Contribuição](#fluxo-de-desenvolvimento--contribuição)
- [Licença](#licença)
- [Contato](#contato)

---

## Sobre o Projeto

O **CRUD de Curiosidades** foi desenvolvido para registrar e compartilhar informações interessantes de diferentes temas. Ideal para quem gosta de explorar fatos curiosos sobre o mundo.

- **Front-end React-Native (Expo)**: Interface interativa e amigável para exibir e gerenciar as curiosidades.
- **Back-end Java (Spring Boot) + MongoDB**: API robusta para persistência, categorização e manipulação dos dados.

---

## Arquitetura & Estrutura de Pastas

```text
Crud-Curiosidades/
│
├── backend/                         # API RESTful (Java, Spring Boot, MongoDB)
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/seuprojeto/ # Código Java (controllers, models, services, repositories)
│   │   │   └── resources/           # Configurações (application.properties, etc)
│   ├── pom.xml                      # Dependências Maven
│   └── .env.example                 # Exemplo de variáveis de ambiente
│
├── frontend/                        # App React-Native (Expo)
│   ├── .expo/                       # Configurações do Expo
│   ├── assets/                      # Imagens, ícones, fontes
│   ├── screens/                     # Telas do app
│   │   ├── AdicionarCuriosidade.js
│   │   ├── Animal.js
│   │   ├── Comida.js
│   │   ├── Historia.js
│   │   ├── Home.js
│   │   ├── ListaCuriosidades.js
│   │   ├── Misterio.js
│   │   └── Tecnologia.js
│   ├── api.js                       # Serviço Axios (conexão com API)
│   ├── App.js                       # Arquivo principal do app
│   ├── app.json                      # Configurações do Expo
│   ├── package.json                  # Dependências
│   └── .gitignore                    # Arquivo de exclusões do Git
│
├── README.md                         # Documentação do projeto
└── LICENSE                            # Licença
Funcionalidades Detalhadas
````
Front-end
📄 Exibir curiosidades separadas por categoria:

Mistério

História

Tecnologia

Comida

Animais

🔍 Visualizar detalhes das curiosidades.

➕ Adicionar novas curiosidades (título, descrição, categoria e imagem).

📝 Editar curiosidades existentes.

❌ Excluir curiosidades.

🔗 Integração total com a API back-end.

🎨 Interface mobile limpa e intuitiva.

Back-end
🔗 API RESTful estruturada em MVC.

🗄️ Banco de dados MongoDB.

🔐 Endpoints protegidos e validados.

☁️ Upload e armazenamento de imagens.

📦 Gerenciamento de dados das curiosidades (CRUD completo).

⚙️ Configuração flexível via application.properties ou .env.

Tecnologias Utilizadas
Front-end
React-Native + Expo

JavaScript (ES6+)

Axios

React Navigation

Styled Components (ou CSS-in-JS)

Back-end
Java

Spring Boot

MongoDB

Spring Data MongoDB

Spring Web

Spring Multipart (upload de imagens)
```text
Guia de Instalação (Passo a Passo)
1️⃣ Clone o repositório
bash
Copiar
Editar
git clone https://github.com/SeuUsuario/Crud-Curiosidades.git
cd Crud-Curiosidades
```
```text
2️⃣ Configurando o Back-end
bash
Copiar
Editar
cd backend
./mvnw spring-boot:run
Exemplo de application.properties:

properties
Copiar
Editar
spring.data.mongodb.uri=mongodb://localhost:27017/crud_curiosidades
server.port=8080
```

```text
3️⃣ Configurando o Front-end
bash
Copiar
Editar
cd frontend
npm install
npx expo start
⚙️ Configure a API no arquivo api.js:

javascript
Copiar
Editar
const api = axios.create({
  baseURL: 'http://localhost:8080',
});
```
Como Usar
Abra o app no Expo Go ou emulador.

Navegue pelas categorias na tela inicial.

Visualize as curiosidades cadastradas.

Utilize a tela de adicionar para inserir novas curiosidades.

Edite ou exclua curiosidades quando necessário.

Configuração de Ambiente
O arquivo .env.example e application.properties.example servem como modelo.

Configure a URL da API e as credenciais do banco MongoDB local ou MongoDB Atlas.

Principais Endpoints da API
GET /curiosidades – Lista todas as curiosidades

GET /curiosidades/{id} – Retorna uma curiosidade específica

POST /curiosidades – Cria uma nova curiosidade

PUT /curiosidades/{id} – Atualiza uma curiosidade

DELETE /curiosidades/{id} – Remove uma curiosidade

Fluxo de Desenvolvimento & Contribuição
Faça um fork deste repositório.

Crie uma branch (git checkout -b feature/SuaFeature).

Faça commit das suas alterações (git commit -m 'Feature: SuaFeature').

Push para sua branch (git push origin feature/SuaFeature).

Abra um Pull Request.

Licença
Distribuído sob licença MIT. Veja mais em LICENSE.

```text
Contato
Mauricio - mauriciosfm1@gmail.com

Davi da paz – davipaz125@gmail.com

Yasmin - yasmenezees138@gmail.com

Miguel Fernandes - miguelfc1912@gmail.com
```
