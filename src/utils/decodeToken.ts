// utils/decodeToken.ts
import { verify, VerifyErrors } from 'jsonwebtoken';

interface DecodedToken {
  sub: string; // O ID do usuário normalmente é armazenado no campo 'sub' do token JWT
  // Adicione outros campos conforme necessário
}

export function decodeToken(token: any): DecodedToken | null {
  try {
    const decodedToken = verify(token, '1cbd3c4a7777c403a7a504164eb298f1') as DecodedToken;
    return decodedToken;
  } catch (error) {
    // Verifique se o erro é do tipo VerifyErrors e lide com ele conforme necessário
    if (error instanceof VerifyErrors) {
      console.error('Erro ao verificar a assinatura do token:', error);
    } else {
      console.error('Erro ao decodificar o token:', error);
    }

    return null;
  }
}
