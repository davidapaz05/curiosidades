Documentação da API - Curiosidades 

Visão Geral 

A API de Curiosidades permite que os usuários gerenciem matérias e suas respectivas curiosidades. A API é construída com Spring Boot e utiliza MongoDB como banco de dados. 

Base URL 

http://localhost:8080/materias 
  

Endpoints 

1. Obter todas as matérias 

Método: GET 

Endpoint: /materias 

Descrição: Retorna uma lista de todas as matérias disponíveis. 

Resposta: 

Código 200 (OK): Retorna um array de objetos Materia. 

Exemplo de Resposta:[ 
  { 
    "id": "1", 
    "nome": "Matemática", 
    "curiosidades": ["Curiosidade 1", "Curiosidade 2"] 
  }, 
  { 
    "id": "2", 
    "nome": "História", 
    "curiosidades": ["Curiosidade 3", "Curiosidade 4"] 
  } 
] 
  

2. Obter matéria por ID 

Método: GET 

Endpoint: /materias/{id} 

Descrição: Retorna uma matéria específica com base no ID fornecido. 

Parâmetros: 

id (string): O ID da matéria a ser recuperada. 

Resposta: 

Código 200 (OK): Retorna um objeto Materia. 

Código 404 (Not Found): Se a matéria não for encontrada. 

Exemplo de Resposta:{ 
  "id": "1", 
  "nome": "Matemática", 
  "curiosidades": ["Curiosidade 1", "Curiosidade 2"] 
} 
  

3. Criar nova matéria 

Método: POST 

Endpoint: /materias 

Descrição: Cria uma nova matéria. 

Corpo da Requisição: 

Um objeto Materia com os campos nome e curiosidades. 

Resposta: 

Código 201 (Created): Retorna a matéria criada. 

Exemplo de Corpo da Requisição:{ 
  "nome": "Ciências", 
  "curiosidades": ["Curiosidade 5", "Curiosidade 6"] 
} 
  

Exemplo de Resposta:{ 
  "id": "3", 
  "nome": "Ciências", 
  "curiosidades": ["Curiosidade 5", "Curiosidade 6"] 
} 
  

4. Atualizar matéria existente 

Método: PUT 

Endpoint: /materias/{id} 

Descrição: Atualiza uma matéria existente com base no ID fornecido. 

Parâmetros: 

id (string): O ID da matéria a ser atualizada. 

Corpo da Requisição: 

Um objeto Materia com os campos nome e curiosidades. 

Resposta: 

Código 200 (OK): Retorna a matéria atualizada. 

Código 404 (Not Found): Se a matéria não for encontrada. 

Exemplo de Corpo da Requisição:{ 
  "nome": "Matemática Avançada", 
  "curiosidades": ["Curiosidade 7", "Curiosidade 8"] 
} 
  

Exemplo de Resposta:{ 
  "id": "1", 
  "nome": "Matemática Avançada", 
  "curiosidades": ["Curiosidade 7", "Curiosidade 8"] 
} 
  

5. Deletar matéria 

Método: DELETE 

Endpoint: /materias/{id} 

Descrição: Deleta uma matéria com base no ID fornecido. 

Parâmetros: 

id (string): O ID da matéria a ser deletada. 

Resposta: 

Código 204 (No Content): Se a matéria for deletada com sucesso. 

Código 404 (Not Found): Se a matéria não for encontrada. 

Considerações Finais 

Esta API permite a gestão de matérias e suas curiosidades de forma simples e eficiente. Através dos endpoints descritos, os usuários podem criar, ler, atualizar e deletar informações sobre matérias. A documentação pode ser acessada através do Swagger UI, que fornece uma interface interativa para testar os endpoints.
