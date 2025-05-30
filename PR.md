# Ficha de aferição

**Data:** 2025-04-05

## Autor

**Nome:** Beatriz Carvalho Peixoto  
**Número:** A104170  

## Exercício 1

### Persistência de dados
1. De modo a preparar o dataset fornecido para a aplicação Web, foram feitas algumas mudanças.
2. Inicialmente, foram retirados os nomes extra como ed1959 de todos os registos.
3. Ficando com os registos apenas, o campo id de cada registo foi convertido para _id.
4. Os números que estavam string foram convertidos para números, como é o caso do campo anoEdicao.
5. O dataset final é o [db.json](ex1/db.json).

### Exercício 1.1 (Setup da base de dados)
1. Para o mongoDB foi criado um container no docker cujo nome é mongoEW.
2. Tendo o dataset preparado para a base de dados mongoDB, procedeu-se ao setup da base de dados da seguinte forma:
    - sudo docker cp db.json mongoEW:/tmp
    - sudo docker start mongoEW
    - sudo docker exec -it mongoEW sh
3. Dentro do mongo:
    - cd /tmp
    - mongoimport -d eurovisao -c edicoes db.json --jsonArray

### Exercício 1.2 (Querys)
As querys pedidas no exercício 1.2 encontram-se no ficheiro: [queries.txt](ex1/queries.txt). 

### API de dados
1. A API de dados responde na porta 25000.
2. O servidor da API de dados encontra-se em [api](ex1/)


### Interface
1. O servidor do frontend encontra-se em [frontend](ex2/)
2. Este servidor utiliza Express e está à escuta na porta 25001.
3. Sempre que necessitar de dados, este serviço comunica com a API de dados definida acima.

## Utilização
### Servidor API de dados
1. **Iniciar o docker:** docker start mongoEW
2. **Executar o servidor:** npm start

### Servidor Front-end
1. **Executar o servidor:** npm start
2. **Ver página inicial:** http://localhost:25001/
3. **Ver edição ed1959:** http://localhost:25001/ed1959
