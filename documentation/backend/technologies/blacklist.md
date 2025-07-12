# Blacklist

O serviço `TokenBlacklistService` armazena tokens invalidados durante o logout. A `JwtAuthGuard` consulta essa lista para bloquear requisições com tokens expirados ou revogados antes de atingir os casos de uso.
