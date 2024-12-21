# React Native App

Este é o projeto desenvolvido para a disciplina de Front-end com React Native, utilizando a biblioteca React Native Paper para a interface do usuário, e implementando funcionalidades como Redux Toolkit para gerenciamento de estado global, consumo de uma API GraphQL com Apollo Client e integração com notificações push.


## Recursos Principais

* Exibição de dados dinâmicos em listas de cards, utilizando a API GraphQL.
* Gerenciamento de estado global com Redux Toolkit.
* Notificações push, com evento de toque nas notificações.
* Implementação de telas com navegação utilizando React Navigation.
* Design moderno e responsivo utilizando React Native Paper.
* Suporte para tema claro e tema escuro.
* Integração com uma API GraphQL para consumir dados.


## Instalação

1. Clone o repositório:
```bash
   git clone https://github.com/Markos-Vini/my-app.git
   cd my-app
```

2. Clone o repositório da API GraphQL
```bash
   git clone https://github.com/Markos-Vini/my-app-graphql.git
 cd my-app-graphql
```

3. Instale as dependências do projeto: Certifique-se de ter o Node.js e o Expo CLI instalados na máquina.
```bash
   npm install
```

4. Inicie o projeto:
```bash
   npm expo start
```

## Configuração

Certifique-se de que as seguintes bibliotecas estão instaladas e configuradas corretamente:

### Dependências Principais
* #### React Native e Expo

* Framework para desenvolvimento mobile.
```bash
   npm install react-native react-native-maps expo
```
* Gerenciamento de localização:
```bash
   npm install expo-location
```
* Persistência de dados:
```bash
   npm install @react-native-async-storage/async-storage
```
* Interface e ícones:
```bash
   npm install react-native-paper @expo/vector-icons
```
* Navegação:
```bash
   npm install @react-navigation/native react-native-screens react-native-gesture-handler react-native-safe-area-context react-native-reanimated react-native-get-random-values react-native-vector-icons
```

## Funcionalidades

### 1. Tela de Login
* Exibe uma tela de login com campos de usuário, senha e um botao para acesar.

### 2. Tela Cidades
* Exibe uma lista com cards das cidades adicionasdas
* Botão flutuante que redireciona para um formulário para adicionar uma nova cidade.
* Botão flutuante que redireciona para uma nova tela com um mapa.

### 3. Tela de Localização
* Mostra um mapa interativo com a posição atual do usuário.
* Permite: 
   * Adicionar um ou mais marcadores no mapa.
   * Mover os marcadores pressionando e arrastando eles.

### 4. Tela de Formulário de cidades
* Exibe um formulário para dicionar uma nova cidade.
* Campos:
   * Nome da Cidade
   * País
   * Data
   * Se precisa de passaporte
   * Um botão para salvar

### 5. Tela de Confirmação dos dados do formulário
* Exibe os os campos do formulário com os dados preenchidos e um botão flutuante de salvar.

## Dependências Utilizadas

* React Native
* Expo
* react-native-maps
* expo-location
* React Native Paper: Para componentes de interface de usuário.
* Redux Toolkit: Para gerenciamento de estado global.
* Apollo Client: Para consumir dados de API GraphQL.
* Notificações Push: Para recebimento de notificações.
* React Navigation: Para navegação entre as telas.
