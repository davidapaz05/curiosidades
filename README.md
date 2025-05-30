🔍 CRUD de Curiosidades
Sistema completo de gerenciamento de curiosidades, desenvolvido com uma arquitetura full stack:
📱 Front-end em React Native (Expo)
🛠️ Back-end em Java (Spring Boot) com MongoDB

Permite criar, visualizar, editar e excluir curiosidades organizadas por categorias:

Mistério, História, Tecnologia, Comida e Animais.

📚 Sumário
📌 Sobre o Projeto

✨ Funcionalidades

🧰 Tecnologias Utilizadas

📁 Estrutura de Pastas

🚀 Guia de Instalação

📱 Como Usar

⚙️ Configuração de Ambiente

🔗 Endpoints da API

📈 Contribuindo

📝 Licença

📬 Contato

📌 Sobre o Projeto
Este projeto tem como objetivo registrar e compartilhar curiosidades interessantes sobre diferentes temas do mundo. Ideal para quem gosta de explorar fatos curiosos organizados de forma prática e visualmente atrativa.

✨ Funcionalidades
📱 Front-end
Exibição de curiosidades separadas por categoria:

Mistério

História

Tecnologia

Comida

Animais

🔍 Visualização de detalhes das curiosidades

➕ Adição de novas curiosidades (título, descrição, categoria e imagem)

📝 Edição de curiosidades existentes

❌ Exclusão de curiosidades

🔗 Integração completa com a API

🎨 Interface mobile intuitiva e moderna

🔗 Back-end
API RESTful com arquitetura MVC

Banco de dados MongoDB

Endpoints protegidos e validados

CRUD completo das curiosidades

Upload de imagens

Configuração flexível por application.properties ou .env

🧰 Tecnologias Utilizadas
Front-end (React Native + Expo)
JavaScript (ES6+)

React Navigation

Axios

Styled Components (CSS-in-JS)

Back-end (Java + Spring Boot)
Spring Web

Spring Data MongoDB

MongoDB

Spring Multipart (upload)

📁 Estrutura de Pastas
bash
Copiar
Editar
Crud-Curiosidades/
│
├── backend/                        # API RESTful
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/seuprojeto/  # Código Java
│   │   │   └── resources/            # application.properties
│   ├── pom.xml                      # Dependências Maven
│   └── .env.example                 # Variáveis de ambiente (exemplo)
│
├── frontend/                       # App React Native (Expo)
│   ├── .expo/                      # Configurações do Expo
│   ├── assets/                     # Imagens e ícones
│   ├── screens/                    # Telas do app
│   │   ├── Home.js
│   │   ├── ListaCuriosidades.js
│   │   ├── AdicionarCuriosidade.js
│   │   ├── Historia.js
│   │   ├── Misterio.js
│   │   ├── Comida.js
│   │   ├── Tecnologia.js
│   │   └── Animal.js
│   ├── api.js                      # Axios configurado
│   ├── App.js                      # Componente principal
│   ├── app.json                    # Configuração Expo
│   └── package.json                # Dependências
│
├── README.md                       # Este arquivo
└── LICENSE                         # Licença MIT
🚀 Guia de Instalação
1️⃣ Clone o repositório:
bash
Copiar
Editar
git clone https://github.com/SeuUsuario/Crud-Curiosidades.git
cd Crud-Curiosidades
2️⃣ Configuração do Back-end
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
3️⃣ Configuração do Front-end
bash
Copiar
Editar
cd frontend
npm install
npx expo start
Configure a base URL da API em api.js:

javascript
Copiar
Editar
const api = axios.create({
  baseURL: 'http://localhost:8080',
});
📱 Como Usar
Abra o app no Expo Go (ou emulador)

Navegue pelas categorias

Visualize as curiosidades

Adicione, edite ou exclua informações com facilidade

⚙️ Configuração de Ambiente
Use os arquivos .env.example e application.properties.example como modelo.

Configure:

URL da API

URI do MongoDB local ou Atlas

Outras variáveis de ambiente necessárias

🔗 Endpoints da API
Método	Rota	Descrição
GET	/curiosidades	Lista todas as curiosidades
GET	/curiosidades/{id}	Retorna uma curiosidade específica
POST	/curiosidades	Cria uma nova curiosidade
PUT	/curiosidades/{id}	Atualiza uma curiosidade
DELETE	/curiosidades/{id}	Remove uma curiosidade

📈 Contribuindo
Faça um fork do projeto

Crie sua branch: git checkout -b feature/SuaFeature

Commit: git commit -m 'Feature: SuaFeature'

Push: git push origin feature/SuaFeature

Abra um Pull Request 🚀

📝 Licença
Distribuído sob a licença MIT.
Consulte o arquivo LICENSE para mais detalhes.

📬 Contato
Desenvolvedores responsáveis:

Mauricio – mauriciosfm1@gmail.com

Davi da Paz – davipaz125@gmail.com

Yasmin – yasmenezees138@gmail.com

Miguel Fernandes – miguelfc1912@gmail.com



<img src="https://i.imgur.com/Eim2EQO.png" alt="Tela inicial do app" width="200">



```text
Contato
Mauricio - mauriciosfm1@gmail.com

Davi da paz – davipaz125@gmail.com

Yasmin - yasmenezees138@gmail.com

Miguel Fernandes - miguelfc1912@gmail.com
```
