# Sugestões para Melhorar a Segurança

- **Configurar variáveis de ambiente seguras**: usar arquivos `.env` fora do versionamento e sistemas de secret management em produção.
- **Adicionar `helmet`** no NestJS para definir cabeçalhos HTTP que reduzem vulnerabilidades comuns.
- **Habilitar rate limiting** para prevenir ataques de força bruta e negação de serviço.
- **Implementar refresh tokens** e possibilidade de revogação de sessões.
- **Utilizar CORS mais restrito** com lista de domínios permitidos em produção.
- **Aplicar política de complexidade de senha** mais completa e expiração periódica.
- **Registrar logs de autenticação e operações críticas** com auditoria e alertas.
- **Usar HTTPS em todas as comunicações** e redirecionar automaticamente requisições HTTP.
- **Adicionar proteção contra CSRF** para rotas que usam cookies ou sessões.
- **Implementar testes automatizados de segurança** (lint para dependências, análise SAST).
- **Revisar permissões em banco de dados** concedendo ao usuário apenas o necessário.
- **Criar papéis e níveis de acesso** (RBAC) para controlar funcionalidades por tipo de usuário.
- **Monitorar dependências** e manter bibliotecas atualizadas para corrigir vulnerabilidades.
- **Configurar backups automáticos e planos de recuperação** em caso de incidentes.
- **Executar containers com usuários não privilegiados** e recursos mínimos necessários.
- **Usar variáveis específicas de produção** evitando valores padrão como `changeme`.
