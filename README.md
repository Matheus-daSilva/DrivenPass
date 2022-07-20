# <p align = "center"> DrivenPass </p>



<p align = "center">
   <img src="https://img.shields.io/badge/author-Matheus-4dae71?style=flat-square" />
</p>


##  :clipboard: Descrição

Esta API é um gerenciador de senhas diversas como wifis, cartões, credenciais e, também, um bloco de notas. Nessas páginas podemos armazenar títulos, descrições, urls, senhas, entre outros dados

***

## :computer:	 Tecnologias e Conceitos

- REST APIs
- JWTs & refresh tokens
- Node.js
- TypeScript
- PostgreSQL com Prisma

***

## :rocket: Rotas

```yml
POST /sign-up
    - Rota para cadastrar um novo usuário
    - headers: {}
    - body:{
        "email": "matheus@gmail.com",
        "password": "123456789aa"
    }
```
    
```yml 
POST /sign-in
    - Rota para fazer login
    - headers: {}
    - body: {
        "email": "matheus@gmail.com",
        "password": "123456789aa"
    }
```
    
```yml 
POST /cards (autenticada)
    - Rota para cadastrar os dados de um cartão
    - headers: { "Authorization": "Bearer $token" }
    - body: {
        "number": "000 000 000 00",
        "title": "Cartão Mastercard",
        "description": "cartão da mamãe",
        "cardName": "Matheus S",
        "securityCode": "345",
        "expirationDate": "12/30",
        "password": "123456",
        "type": "crédito"
    }
```

```yml 
GET /cards (autenticada)
    - Rota para listar os dados dos cartões do usuário
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```
```yml

GET /cards/:id (autenticada)
    - Rota para procurar um cartão pelo id
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
``` 

```yml
DELETE /cards/:id (autenticada)
    - Rota para deletar os dados de um cartão
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```
 
 ```yml 
POST /notes (autenticada)
    - Rota para postar uma nota
    - headers: { "Authorization": "Bearer $token" }
    - body: {
       "title": "prova mes que vem",
       "text": "prova de química"
    }
```

```yml 
GET /notes (autenticada)
    - Rota para listar as notas cadastradas pelo usuário
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```
```yml

GET /notes/:id (autenticada)
    - Rota para listar uma nota pelo id
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
``` 

```yml
DELETE /notes/:id (autenticada)
    - Rota para deletar uma nota cadastrada
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```

 ```yml 
POST /credential (autenticada)
    - Rota para postar uma credencial
    - headers: { "Authorization": "Bearer $token" }
    - body: {
        "title": "um título muito legal",
        "username": "matheus silva",
        "url": "https://youtube.com",
        "password": "matheus"
    }
```

```yml 
GET /credential (autenticada)
    - Rota para listar as credenciais do usuário
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```
```yml

GET /credential/:id (autenticada)
    - Rota para procurar uma credencial pelo id
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
``` 

```yml
DELETE /credential/:id (autenticada)
    - Rota para deletar uma credencial cadastrada
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```

 ```yml 
POST /wifi (autenticada)
    - Rota para postar os dados de uma rede wifi
    - headers: { "Authorization": "Bearer $token" }
    - body: {
        "title": "wifi do matheus",
        "routerName": "silva",
        "password": "102030@"
    }
```

```yml 
GET /wifi (autenticada)
    - Rota para listar os dados das redes wifi que o usuário cadastrou
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```
```yml

GET /wifi/:id (autenticada)
    - Rota para procurar uma rede wifi pelo id
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
``` 

```yml
DELETE /wifi/:id (autenticada)
    - Rota para deletar uma rede wifi cadastrada
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```

***

