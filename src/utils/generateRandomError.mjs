// Função para gerar um erro aleatório para fins de teste
import { logger } from "./index.mjs";

export function generateRandomError() {
  const random = Math.random();

  if (random < 0.5) {
    throw new Error('Erro aleatório gerado para teste.').message;
  } else {
    logger.log('generateRandomError', 'Sem Errors');
  }
}

