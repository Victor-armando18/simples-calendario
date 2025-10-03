# Calendário de Marcações

Projeto web simples com um calendário mensal interativo. Permite aos utilizadores marcar e desmarcar dias, com persistência dos dados em ficheiro, garantindo que as marcações permanecem mesmo após recarregar a página.

---

## Funcionalidades

- Exibição do calendário mensal
- Navegação entre meses e anos
- Marcação e desmarcação de dias com clique
- Persistência de dados num ficheiro JSON
- Carregamento automático das marcações salvas
- Interface simples e intuitiva

---

## Tecnologias Utilizadas

### Frontend

- **HTML5** — estrutura semântica da página
- **CSS3** — estilização da interface
- **JavaScript** — manipulação dinâmica do DOM e requisições AJAX

### Backend

- **PHP** — responsável pela leitura/escrita do ficheiro JSON
- **JSON** — formato de armazenamento dos dados marcados


## Estrutura do Projeto

```
project-root/
├── assets/        # Ficheiros estáticos (HTML, CSS, JS)
├── core/          # Lógica de backend em PHP
├── db/            # Ficheiro JSON com as marcações
├── docs/          # Documentação PDF
└── README.md      # Este ficheiro
```

## Como Executar Localmente

### Pré-requisitos

- Servidor web com suporte a PHP (ex: Apache)
- Ferramentas recomendadas: [XAMPP](https://www.apachefriends.org/) ou [WAMP](http://www.wampserver.com/)

### Passos

1. **Copiar para o servidor**

   - XAMPP: `C:\xampp\htdocs\`
   - WAMP: `C:\wamp\www\`
   - Extraia o projeto dentro das pastas referenciadas no ponto anterior.

2. **Iniciar o servidor**

   - Inicie o Apache pelo painel do XAMPP/WAMP

3. **Acessar no navegador**

- [http://localhost/test-calendario-edudigital/](http://localhost/test-calendario-edudigital/)
ou 
- [http://127.0.0.1/test-calendario-edudigital/](http://127.0.0.1/test-calendario-edudigital/)

Ou, se tiver o PHP instalado globalmente no servidor, acesse a raiz do projecto via CMD e execute o seguinte comando:

```bash
    php -S localhost:7000
```
e no navegador acessar a URL: http://localhost:7000/

- Interagir com o calendário
- Clique nos dias para marcar/desmarcar
- Use os botões para mudar mês/ano
- As marcações serão salvas e carregadas automaticamente


### Excluído do Escopo

Para manter o projeto simples, as seguintes funcionalidades não foram incluídas:
- Gestão de utilizadores
- Autenticação/autorização
- Banco de dados relacional
- Notificações ou lembretes
- Agendamentos
- Deploy em produção
- Testes automatizados


### Critérios de Sucesso

O projeto é considerado bem-sucedido se:
- Todas as funcionalidades acima estiverem implementadas
- Código estiver limpo, modular e comentado
- Interface for funcional e intuitiva
- Projeto puder ser executado facilmente conforme instruções
- Documentação for clara