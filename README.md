# 📚 Curiosities API

A **Curiosities API** é uma aplicação REST desenvolvida com **Spring Boot** e **MongoDB**, que permite o gerenciamento de curiosidades organizadas por categorias. Ideal para fins educacionais, projetos de aprendizado ou para integrar a sistemas que exibem fatos e curiosidades.

---

## 🚀 Funcionalidades

- 🔍 Buscar todas as curiosidades
- 📂 Filtrar curiosidades por categoria
- ➕ Adicionar novas curiosidades
- ✏️ Atualizar curiosidades existentes
- ❌ Deletar curiosidades
- 🧠 Estrutura de dados organizada por categoria

---

## 🛠️ Tecnologias Utilizadas

### Backend

- **Java 17**
- **Spring Boot 3.4.5**
- **MongoDB**
- **Spring Data MongoDB**
- **Lombok**
- **Docker Compose** (opcional)
- **JUnit 5** para testes

---

## 🧩 Estrutura do Projeto

src/
├── controller/
│ └── CuriosidadeController.java
├── model/
│ ├── Curiosidade.java
│ └── Categoria.java
├── repository/
│ └── CuriosidadeRepository.java
├── CuriositiesApplication.java
└── test/
└── CuriositiesApplicationTests.java

yaml
Copiar
Editar

---

## 🌐 Endpoints da API

> Base URL: `http://localhost:8080/curiosidades`

### 🔹 GET `/curiosidades`
Retorna todas as curiosidades cadastradas.

### 🔹 GET `/curiosidades/categoria/{categoria}`
Filtra curiosidades por categoria (ex: HISTORIA, CIENCIA, etc).

### 🔹 POST `/curiosidades`
Cria uma nova curiosidade.

**Exemplo de Corpo:**
```json
{
  "texto": "A água ferve a 100°C ao nível do mar.",
  "categoria": "CIENCIA"
}
🔹 PUT /curiosidades/{id}
Atualiza o texto e categoria de uma curiosidade.

Exemplo de Corpo:

json
Copiar
Editar
{
  "texto": "A água pode ferver a temperaturas menores em altitudes elevadas.",
  "categoria": "CIENCIA"
}
🔹 DELETE /curiosidades/{id}
Remove uma curiosidade pelo ID.

🧠 Modelo de Dados
java
Copiar
Editar
@Document(collection = "curiosidades")
public class Curiosidade {
    @Id
    private String id;
    private String texto;
    private Categoria categoria;
}
Enum Categoria (Exemplo)
java
Copiar
Editar
public enum Categoria {
    HISTORIA,
    CIENCIA,
    GEOGRAFIA,
    TECNOLOGIA
}
⚙️ Como Executar Localmente
Clone o repositório

bash
Copiar
Editar
git clone https://github.com/seu-usuario/curiosities-api.git
cd curiosities-api
Inicie o MongoDB

Você pode usar Docker ou ter o MongoDB instalado localmente.

bash
Copiar
Editar
docker run -d -p 27017:27017 --name mongo mongo
Execute a aplicação

bash
Copiar
Editar
./mvnw spring-boot:run
A aplicação será iniciada em: http://localhost:8080

🧪 Testes
Para rodar os testes:

bash
Copiar
Editar
./mvnw test
📄 Arquivo pom.xml - Principais Dependências
xml
Copiar
Editar
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-mongodb</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <optional>true</optional>
</dependency>
📚 Documentação da API
Você pode utilizar ferramentas como Postman, Insomnia, ou integrar com Swagger (basta adicionar a dependência do SpringDoc se quiser essa funcionalidade):

xml
Copiar
Editar
<dependency>
    <groupId>org.springdoc</groupId>
    <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
    <version>2.5.0</version>
</dependency>
