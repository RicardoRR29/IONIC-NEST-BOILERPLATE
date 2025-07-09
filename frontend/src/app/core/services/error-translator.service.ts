import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ErrorTranslatorService {
  private readonly messages: Record<string, string> = {
    AUTH_001: 'E-mail ou senha incorretos.',
    AUTH_002: 'Sua sessão expirou. Faça login novamente.',
    AUTH_003: 'Token inválido.',
    AUTH_004: 'Você precisa estar logado.',
    AUTH_005: 'Acesso não autorizado.',
    USER_001: 'Usuário não encontrado.',
    USER_002: 'Este e-mail já está em uso.',
    USER_003: 'Dados inválidos.',
    USER_004: 'Erro ao excluir usuário.',
    USER_005: 'Erro ao atualizar dados.',
    VALIDATION_001: 'Preencha todos os campos obrigatórios.',
    VALIDATION_002: 'Há campos com formato inválido.',
    VALIDATION_003: 'O conteúdo enviado é muito grande.',
    DB_001: 'Erro de conexão com o servidor.',
    DB_002: 'A operação não é permitida.',
    DB_003: 'Erro ao acessar os dados.',
    GENERIC_001: 'Erro inesperado. Tente novamente.',
    GENERIC_002: 'Verifique sua conexão com a internet.',
    GENERIC_003: 'Serviço temporariamente indisponível.',
  };

  translate(code: string): string {
    return this.messages[code] || 'Algo deu errado. Tente novamente.';
  }
}
