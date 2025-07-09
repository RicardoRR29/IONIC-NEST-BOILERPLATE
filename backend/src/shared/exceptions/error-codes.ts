export const ErrorCodes = {
  AUTH: {
    INVALID_CREDENTIALS: {
      code: 'AUTH_001',
      message: 'E-mail ou senha incorretos.',
    },
    TOKEN_EXPIRED: {
      code: 'AUTH_002',
      message: 'Sua sessão expirou. Faça login novamente.',
    },
    TOKEN_INVALID: {
      code: 'AUTH_003',
      message: 'Token de acesso inválido.',
    },
    MISSING_TOKEN: {
      code: 'AUTH_004',
      message: 'Você precisa estar logado para acessar este recurso.',
    },
    UNAUTHORIZED_ACCESS: {
      code: 'AUTH_005',
      message: 'Acesso não autorizado.',
    },
  },

  USER: {
    USER_NOT_FOUND: {
      code: 'USER_001',
      message: 'Usuário não encontrado.',
    },
    EMAIL_ALREADY_EXISTS: {
      code: 'USER_002',
      message: 'Este e-mail já está em uso. Tente outro.',
    },
    INVALID_USER_DATA: {
      code: 'USER_003',
      message: 'Alguns dados fornecidos são inválidos.',
    },
    DELETION_FAILED: {
      code: 'USER_004',
      message: 'Não foi possível excluir o usuário.',
    },
    UPDATE_FAILED: {
      code: 'USER_005',
      message: 'Não foi possível atualizar os dados do usuário.',
    },
  },

  VALIDATION: {
    MISSING_FIELDS: {
      code: 'VALIDATION_001',
      message: 'Campos obrigatórios não foram preenchidos.',
    },
    INVALID_FORMAT: {
      code: 'VALIDATION_002',
      message: 'Formato inválido em um ou mais campos.',
    },
    PAYLOAD_TOO_LARGE: {
      code: 'VALIDATION_003',
      message: 'O envio ultrapassa o tamanho permitido.',
    },
  },

  DATABASE: {
    CONNECTION_FAILED: {
      code: 'DB_001',
      message: 'Erro ao conectar ao banco de dados.',
    },
    CONSTRAINT_VIOLATION: {
      code: 'DB_002',
      message: 'A operação violou uma restrição do banco.',
    },
    QUERY_FAILED: {
      code: 'DB_003',
      message: 'Erro ao consultar ou salvar dados no banco.',
    },
  },

  GENERAL: {
    UNKNOWN_ERROR: {
      code: 'GENERIC_001',
      message: 'Ocorreu um erro inesperado. Tente novamente.',
    },
    NETWORK_ERROR: {
      code: 'GENERIC_002',
      message: 'Falha de comunicação com o servidor. Verifique sua conexão.',
    },
    SERVICE_UNAVAILABLE: {
      code: 'GENERIC_003',
      message: 'Serviço temporariamente indisponível.',
    },
  },
} as const;
