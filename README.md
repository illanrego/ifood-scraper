# Scraper de Cardápio de Restaurantes no iFood

## Visão Geral

**Scraper de Cardápio de Restaurantes no iFood** é uma aplicação web desenvolvida em Next.js que permite aos usuários gerar um cardápio categorizado de qualquer restaurante no iFood, simplesmente fornecendo a URL do restaurante. Esta ferramenta faz o scraping da página do restaurante, extrai as informações dos produtos e organiza os itens em categorias predefinidas para facilitar a visualização.

## Funcionalidades

- **Entrada de URL**: Usuários podem inserir a URL de qualquer restaurante no iFood.
- **Web Scraping**: A aplicação faz o scraping dos dados dos produtos da página do restaurante, como nomes, descrições e preços.
- **Categorização**: Os produtos são automaticamente categorizados em grupos predefinidos, como "Combos," "Proteína," "Massas," e outros, com base em palavras-chave.
- **Feedback em Tempo Real**: Os usuários recebem feedback sobre o sucesso ou falha do processo de scraping e podem visualizar os resultados categorizados diretamente na página.

## Tecnologias Utilizadas

- **Frontend**: React com Next.js (App Directory)
- **Backend**: Node.js com rotas de API para scraping
- **Web Scraping**: Puppeteer para a funcionalidade de web scraping
- **Componentes de UI**: Componentes personalizados usando a biblioteca Shadcn UI

## Instalação e Configuração

1. **Clone o Repositório**:
   ```bash
   git clone https://github.com/illanrego/ifood-scraper.git
   cd ifood-scraper

2. **Instale as Dependências**:
    ```bash
    npm install

3. **Execute o Servidor de Desenvolvimento**:
    ```bash
    npm run dev

## Como Usar

    Na página inicial, insira a URL de um restaurante no iFood.
    Clique no botão Gerar Cardápio.
    Se a URL for válida e o scraping for bem-sucedido, o cardápio categorizado será exibido na página.
        As categorias incluem: "Combos," "Proteína," "Massas," "Peixes e Frutos do Mar," "Líquidos," "Pizzas," "Saladas," "Sobremesas," "Lanches," e "Outros."

### Exemplos de URL válidas

Quero Pizza: https://www.ifood.com.br/delivery/montes-claros-mg/quero-pizza-centro/8ad0dc66-d6ba-4acd-8a69-59de2f8227d7 
Julius Burguer: https://www.ifood.com.br/delivery/montes-claros-mg/julius-hamburgueria-delivery-santa-rita-i/47b65b4d-6c04-48ce-98dd-b77c5a3435ca
MacDonalds: https://www.ifood.com.br/delivery/montes-claros-mg/mcdonalds---dmo---drive-montes-claros-dmo-melo/74f3e376-e055-467c-b7c6-477312acd776


### Tratamento de Erros

    Se a URL for inválida ou o scraping falhar, uma mensagem de erro será exibida.

### Contribuições

Sinta-se à vontade para fazer um fork deste repositório, abrir issues ou enviar pull requests. Contribuições são bem-vindas para melhorar a aplicação!
Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo LICENSE para mais detalhes.
