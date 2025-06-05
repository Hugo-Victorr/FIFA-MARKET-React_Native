# Ultimate Team Mobile

Aplicativo mobile desenvolvido em React Native para gerenciamento de um sistema Ultimate Team, inspirado no FIFA Ultimate Team. Permite gerenciar jogadores, posições, compras e vendas com uma interface moderna e intuitiva.

![alt text](image-1.png)

![alt text](image.png)

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

## 📦 Instalação

```powershell
# Clone o repositório
git clone https://github.com/seu-usuario/ultimate-team-mobile.git

# Entre no diretório
cd ultimate-team-mobile

# Instale as dependências
npm install

# Inicie o projeto
expo start
```

## ⚙️ Configuração

1. Configure o arquivo de ambiente:
```javascript
// API/ApiService.js
const BASE_URL = 'seu-backend-url';
```

2. Instale o app Expo Go no seu dispositivo móvel

3. Escaneie o QR Code gerado pelo Expo

## 🔧 Requisitos

- Node.js 14+
- Expo CLI
- Android Studio (para emulador Android)
- XCode (para emulador iOS - apenas macOS)
- Dispositivo móvel com Expo Go (para teste físico)

## 📱 Build

### Android
```powershell
expo build:android
```

### iOS
```powershell
expo build:ios
```

## 🎨 Personalização

O aplicativo utiliza um tema personalizado que pode ser modificado em:
```javascript
// Exemplo de customização de tema
const theme = {
  colors: {
    primary: '#0096FF',
    accent: '#00B4FF',
    background: 'rgba(10, 31, 58, 0.85)',
  }
};
```

## 🔒 Segurança

- Autenticação JWT
- Refresh Token
- Dados sensíveis criptografados
- Validação de entrada
- Proteção contra ataques comuns

## 🤝 Integrações

- Backend RESTful API
- Sistema de autenticação
- Banco de dados local
- Sistema de áudio

## 📈 Roadmap

- [ ] Implementar modo offline
- [ ] Adicionar notificações push
- [ ] Implementar chat entre usuários
- [ ] Adicionar animations mais elaboradas
- [ ] Implementar sistema de achievements
- [ ] Adicionar suporte a múltimos idiomas

## 📄 Licença

Este projeto está sob a licença MIT - veja o arquivo [LICENSE.md](LICENSE.md) para detalhes

## 👥 Contribuição

1. Faça o fork do projeto
2. Crie sua feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## ✨ Agradecimentos

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [React Navigation](https://reactnavigation.org/)
- [React Native Paper](https://callstack.github.io/react-native-paper/)
