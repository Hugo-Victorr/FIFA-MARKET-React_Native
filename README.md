# FIFA Market Mobile

Aplicativo mobile desenvolvido em React Native para gerenciamento de um sistema Ultimate Team, inspirado no FIFA Ultimate Team. Permite gerenciar jogadores, posições, compras e vendas com uma interface moderna e intuitiva.

![alt text](image.png) ![image](https://github.com/user-attachments/assets/c5b24c3d-da0f-47f7-9a3a-ffbcddb9da10)

![image](https://github.com/user-attachments/assets/9b9d2b05-7756-4fe2-b3f9-613b72151c97) ![image](https://github.com/user-attachments/assets/0083c09b-d215-4af4-865b-f63987c0a3d8)

![image](https://github.com/user-attachments/assets/1355e34f-db4f-4fd8-8d5c-454a77cd41ba) ![image](https://github.com/user-attachments/assets/3fc691f0-d379-47e3-a009-00e91345f50c)

## 🚀 Tecnologias Utilizadas

- React Native
- Expo
- React Navigation
- React Native Paper
- Async Storage
- SQLite (armazenamento local)
- Expo AV (áudio)
- Axios (requisições HTTP)

## ✨ Funcionalidades

### Sistema de Autenticação
- Login com email e senha
- Cadastro de novos usuários
- Token JWT com sistema de refresh
- Persistência de sessão

### Gerenciamento de Jogadores
- Listagem de jogadores
- Cadastro de novos jogadores
- Edição de jogadores existentes
- Exclusão de jogadores
- Filtros e busca

### Sistema de Posições
- Cadastro de posições
- Listagem de posições disponíveis
- Edição e exclusão de posições
- Associação com jogadores

### Mercado de Transferências
- Compra de jogadores
- Sistema de vendas
- Histórico de transações
- Carrinho de compras

### Interface do Usuário
- Design moderno e responsivo
- Temas personalizados
- Animações fluidas
- Background music player
- Modal de confirmação
- Feedback visual para ações

## 📁 Estrutura do Projeto

```
N2_mobile/
├── API/                    # Serviços de API
│   ├── ApiService.js       # Configuração base da API
│   ├── AuthApiService.js   # Serviço de autenticação
│   └── ...                 # Outros serviços
├── assets/                 # Recursos estáticos
│   ├── images/            # Imagens
│   └── sounds/            # Arquivos de áudio
├── Componentes/           # Componentes reutilizáveis
├── Database/              # Serviços de banco local
└── telas/                 # Telas do aplicativo
    ├── Auth/              # Autenticação
    ├── Home/              # Tela principal
    └── ...                # Outras telas
```

## 🎯 Principais Features

### Home Screen
- Dashboard principal
- Menu de navegação intuitivo
- Controle de áudio
- Informações do usuário

### Autenticação
- Formulário de login estilizado
- Validação de campos
- Feedback de erros
- Navegação para cadastro

### Gerenciamento
- CRUD completo de jogadores e posições
- Interface intuitiva
- Confirmação de ações
- Loading states

### Sistema de Compra/Venda
- Carrinho de compras
- Modal de confirmação
- Histórico de transações
- Gráficos de vendas

## 🔒 Segurança

- Autenticação JWT
- Refresh Token
- Dados sensíveis criptografados
- Validação de entrada
- Proteção contra ataques comuns

## 🤝 Integrações

- Backend RESTful API NodeJs (FIFA Market API)
- Sistema de autenticação
- Banco de dados local
- Sistema de áudio

## 📄 Licença

Este projeto está sob a licença MIT - veja o arquivo [LICENSE.md](LICENSE.md) para detalhes
