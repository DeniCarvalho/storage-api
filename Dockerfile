## Comando obrigatório
## Baixa a imagem do node com versão alpine. ex: node:16-alpine (versão mais simplificada e leve)
FROM node:16

## Define o local onde o app vai ficar no disco do container
## Pode ser o diretório que você quiser
WORKDIR /home/app

## Copia tudo que começa com package e termina com .json para dentro da pasta /home/app
COPY package*.json yarn.lock ./

RUN apt update && apt install ffmpeg -y
## Executa yarn install para adicionar as dependências e criar a pasta node_modules
RUN yarn
## Copia tudo que está no diretório onde o arquivo Dockerfile está 
## para dentro da pasta /home/app do container
## Vamos ignorar a node_modules por isso criaremos um .dockerignore
COPY . .

## Container ficará ouvindo os acessos na porta 3000
EXPOSE 3000

## Não se repete no Dockerfile
## Executa o comando npm start para iniciar o script que que está no package.json
CMD yarn start