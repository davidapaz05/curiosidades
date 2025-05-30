
# 🔍 CRUD de Curiosidades

Sistema completo de gerenciamento de curiosidades, desenvolvido com uma arquitetura full stack:

- 📱 **Front-end:** React Native (Expo)  
- 🛠️ **Back-end:** Java (Spring Boot) com MongoDB  

Permite criar, visualizar, editar e excluir curiosidades organizadas por categorias:  

> 🕵️‍♂️ Mistério | 🏛️ História | 💻 Tecnologia | 🍔 Comida | 🐾 Animais  

---

## 📚 Sumário

- [📌 Sobre o Projeto](#-sobre-o-projeto)  
- [✨ Funcionalidades](#-funcionalidades)  
- [🧰 Tecnologias Utilizadas](#-tecnologias-utilizadas)  
- [📁 Estrutura de Pastas](#-estrutura-de-pastas)  
- [🚀 Guia de Instalação](#-guia-de-instalação)  
- [📱 Como Usar](#-como-usar)  
- [⚙️ Configuração de Ambiente](#-configuração-de-ambiente)  
- [🔗 Endpoints da API](#-endpoints-da-api)  
- [📈 Contribuindo](#-contribuindo)  
- [🐙 Comandos Git e GitHub](#-comandos-git-e-github)  
- [📝 Licença](#-licença)  
- [📬 Contato](#-contato)  

---

## 📌 Sobre o Projeto

Projeto desenvolvido para registrar e compartilhar curiosidades interessantes sobre diversos temas. Ideal para quem gosta de explorar fatos organizados de forma prática e visual.

---

## ✨ Funcionalidades

### 📱 Front-end

- 🔍 Visualizar curiosidades por categorias  
- ➕ Adicionar novas curiosidades (título, descrição, categoria e imagem)  
- 📝 Editar curiosidades existentes  
- ❌ Excluir curiosidades  
- 🔗 Integração total com a API  
- 🎨 Interface moderna e intuitiva  

### 🔗 Back-end

- API RESTful com arquitetura MVC  
- Banco de dados MongoDB  
- CRUD completo das curiosidades  
- Upload de imagens  
- Configuração via `application.properties` ou `.env`  

---

## 🧰 Tecnologias Utilizadas

### 🖥️ **Front-end (React Native + Expo)**

- JavaScript (ES6+)  
- React Navigation  
- Axios  
- Styled Components  

### 🔗 **Back-end (Java + Spring Boot)**

- Spring Web  
- Spring Data MongoDB  
- MongoDB  
- Spring Multipart (upload)  

---

## 📁 Estrutura de Pastas

```plaintext
Crud-Curiosidades/
│
├── backend/                        
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/seuprojeto/ 
│   │   │   └── resources/
│   ├── pom.xml
│   └── .env.example
│
├── frontend/
│   ├── .expo/
│   ├── assets/
│   ├── screens/
│   │   ├── Home.js
│   │   ├── ListaCuriosidades.js
│   │   ├── AdicionarCuriosidade.js
│   │   ├── Historia.js
│   │   ├── Misterio.js
│   │   ├── Comida.js
│   │   ├── Tecnologia.js
│   │   └── Animal.js
│   ├── api.js
│   ├── App.js
│   ├── app.json
│   └── package.json
│
├── README.md
└── LICENSE
```

---

## 🚀 Guia de Instalação

### 🔗 Clone o repositório:

```bash
git clone https://github.com/mauriciosfyt/Crud-Curiosidades.git
cd Crud-Curiosidades
```

---

### ⚙️ Configuração do Back-end:

```bash
cd backend
./mvnw spring-boot:run
```

Exemplo de `application.properties`:

```properties
spring.data.mongodb.uri=mongodb://localhost:27017/crud_curiosidades
server.port=8080
```

---

### 📱 Configuração do Front-end:

```bash
cd frontend
npm install
npx expo start
```

Configuração da API no `api.js`:

```javascript
const api = axios.create({
  baseURL: 'http://localhost:8080',
});
```

---

## 📱 Como Usar

- Abra o app no **Expo Go** ou em um emulador  
- Navegue pelas categorias  
- Visualize as curiosidades  
- Adicione, edite ou exclua informações com facilidade  

---

## ⚙️ Configuração de Ambiente

- Utilize os arquivos `.env.example` e `application.properties.example` como modelo.  

Configure:  
- 🔗 URL da API  
- 💾 URI do MongoDB local ou Atlas  
- ⚙️ Outras variáveis de ambiente necessárias  

---

## 🔗 Endpoints da API

| Método | Rota                   | Descrição                     |
|--------|-------------------------|-------------------------------|
| GET    | /curiosidades           | Lista todas as curiosidades   |
| GET    | /curiosidades/{id}      | Retorna uma curiosidade       |
| POST   | /curiosidades           | Cria uma nova curiosidade     |
| PUT    | /curiosidades/{id}      | Atualiza uma curiosidade      |
| DELETE | /curiosidades/{id}      | Remove uma curiosidade        |

---

## 📈 Contribuindo

1️⃣ Faça um fork do projeto:  

```bash
git fork
```

2️⃣ Crie uma branch:  

```bash
git checkout -b feature/SuaFeature
```

3️⃣ Faça alterações e commit:  

```bash
git add .
git commit -m "Feature: Descreva sua alteração"
```

4️⃣ Envie sua branch para seu repositório remoto:  

```bash
git push origin feature/SuaFeature
```

5️⃣ Crie um **Pull Request** 🚀  

---

## 🐙 Comandos Git e GitHub

### 🔄 Clonar repositório:

```bash
git clone https://github.com/mauriciosfyt/Crud-Curiosidades.git
```

### 🔥 Criar nova branch:

```bash
git checkout -b nome-da-sua-branch
```

### 💾 Adicionar alterações:

```bash
git add .
```

### 📝 Fazer commit:

```bash
git commit -m "Mensagem do seu commit"
```

### 🚀 Enviar alterações para o GitHub:

```bash
git push origin nome-da-sua-branch
```

### 🔄 Atualizar seu repositório local:

```bash
git pull origin main
```

### ♻️ Mesclar branch main (ou outra) na sua branch atual:

```bash
git merge main
```

### ❌ Remover branch (localmente):

```bash
git branch -d nome-da-branch
```

### ❌ Remover branch (no remoto - GitHub):

```bash
git push origin --delete nome-da-branch
```

---

## 📝 Licença

Distribuído sob a licença MIT.  
Consulte o arquivo [LICENSE](./LICENSE) para mais informações.

---

## 📬 Contato

- Mauricio – mauriciosfm1@gmail.com  
- Davi da Paz – davipaz125@gmail.com  
- Yasmin – yasmenezees138@gmail.com  
- Miguel Fernandes – miguelfc1912@gmail.com  

---
