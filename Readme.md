# App

Find-a-Friend app.

## 🚀 Começando

Essas instruções permitirão que você obtenha uma cópia do projeto em operação na sua máquina local para fins de desenvolvimento e teste.
- Clone o repositório: https://github.com/WesleyR10/Find-a-Friend-APP.git 

# 🔧 Instalação

- **1°** Instale as dependências do backend **npm install**
- **2°** Altere o nome do arquivo **.env.example**  para **.env** e configure a porta e a chave secreta. 
Exemplo:
```
NODE_ENV=dev
DATABASE_URL="postgresql://docker:docker@localhost:5432/apisolid?schema=public"
```
## Iniciando o Docker

Certifique-se de ter o Docker instalado.
Para iniciar o Docker e executar o aplicativo:

- **1°** No terminal digite o seguinte código:  
```bash
docker-compose up -d
```

- Para parar o aplicativo:
```bash
docker-compose stop
```
## 🌎 Iniciando a aplicação

- Inicie o backend **npm run dev**

## RFs (Requisitos funcionais)
- [x] Deve ser possível cadastrar um usuário;
- [x] Deve ser possível cadastrar um pet;
- [ ] Deve ser possível listar todos os pets disponíveis para adoção em uma cidade;
- [x] Deve ser possível filtrar pets por suas características;
- [ ] Deve ser possível visualizar detalhes de um pet para adoção;
- [x] Deve ser possível se cadastrar como uma ORG;
- [x] Deve ser possível realizar login como uma ORG;

## RNs (Regras de negócio) 

- [x] Para listar os pets, obrigatoriamente precisamos informar a cidade;
- [x] Uma ORG precisa ter um endereço e um número de WhatsApp;
- [x] Um pet deve estar ligado a uma ORG;
- [ ] O usuário que quer adotar, entrará em contato com a ORG via WhatsApp;
- [x] Todos os filtros, além da cidade, são opcionais;
- [ ] Para uma ORG acessar a aplicação como admin, ela precisa estar logada;

## RNFs (Requisitos não-funcionais)

- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [x] Todas listas de dados precisam estar paginadas com 20 itens por página;
- [ ] O usuário deve ser identificado por um JWT (JSON Web Token);

# 🐾 Faça parte da comunidade!

Ao adotar um animal através da FindAFriend, você não só muda a vida de um bichinho, mas também enriquece a sua própria vida com amor e companheirismo. Seja parte desta jornada compartilhando sua história: poste uma foto com seu novo amigo(a) e nos marque nas redes sociais. Sua ação não só inspira outros a adotarem, mas também nos enche de alegria em ver o impacto positivo que juntos estamos fazendo. Não esqueça de compartilhar essa experiência com seus amigos, espalhando amor e conscientização sobre a adoção responsável. Juntos, estamos fazendo a diferença uma patinha de cada vez. 🐶🐱✨

Com carinho,
Equipe FindAFriend

## 🎁 Expressões de gratidão
Se este projeto foi útil para você de alguma forma, considere as seguintes maneiras de expressar sua gratidão:

- Compartilhe este projeto com outras pessoas 📢
- Convide um membro da equipe para uma cerveja virtual 🍺
- Um agradecimento especial em seu próximo evento ou reunião 🫂
- Apoie e reconheça publicamente contribuições valiosas 🌟
- E, acima de tudo, obrigado por explorar e usar o Find-a-Friend! 🙏 ⌨️ com ❤️ por Wesley Ribas 😊
