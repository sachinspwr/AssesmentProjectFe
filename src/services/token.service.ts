import { isExpired, decodeToken } from 'react-jwt';
import { localStorageService } from './local-storage.service';
import { StorageKeys } from '@utils/index';
import { TokenPayload } from '@dto/token-payload';

class TokenService {
  // ==================== Core Token Methods ====================
  public getToken(): string | null {
    return localStorageService.getItem(StorageKeys.TOKEN);
  }

  public setToken(token: string): void {
    if (!token) throw new Error('Token cannot be empty');
    localStorageService.setItem(StorageKeys.TOKEN, token);
  }

  public clearToken(): void {
    localStorageService.removeItem(StorageKeys.TOKEN);
  }

  // ==================== Token Validation ====================
  public isTokenValid(inputToken?:string): boolean {
    const token = inputToken ?? this.getToken();
    return !!token && !isExpired(token);
  }

  public isThisTokenValid(inputToken?:string): boolean {
    return !!inputToken && !isExpired(inputToken);
  }

  public isTokenAboutToExpire(thresholdMinutes = 5): boolean {
    const token = this.getToken();
    if (!token) return true;

    const payload = this.decodeToken(token);
    if (!payload?.exp) return true;

    const now = Date.now() / 1000;
    return payload.exp - now < thresholdMinutes * 60;
  }

  // ==================== Token Decoding ====================
  public decodeToken(token: string): TokenPayload | null {
    try {
      return decodeToken<TokenPayload>(token);
    } catch (error) {
      console.error('Token decoding failed:', error);
      return null;
    }
  }

  public getTokenPayload(): TokenPayload | null {
    const token = this.getToken();
    return token ? this.decodeToken(token) : null;
  }

  // ==================== Payload Utilities ====================
  public getPayloadValue<K extends keyof TokenPayload>(
    key: K
  ): TokenPayload[K] | null {
    const payload = this.getTokenPayload();
    return payload?.[key] ?? null;
  }
}

export const tokenService = new TokenService();