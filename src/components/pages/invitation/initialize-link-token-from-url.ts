// utils/initializeLinkTokenFromUrl.ts
import { localStorageService } from '@services/local-storage.service';
import { StorageKeys } from '@utils/index';

/**
 * Initializes link token from URL securely
 * @returns {boolean} True if token is stored successfully, false otherwise
 */
export function initializeLinkTokenFromUrl(): boolean {
  try {
    if (typeof window === 'undefined' || typeof URL === 'undefined') {
      return false;
    }

    const url = new URL(window.location.href);
    const linkToken = url.searchParams.get('token');

    if (!linkToken) return false;

    if (!isValidTokenFormat(linkToken)) {
      cleanLinkTokenFromUrl(url);
      return false;
    }

    localStorageService.setItem(StorageKeys.TOKEN, linkToken);

    cleanLinkTokenFromUrl(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Removes linkToken from URL without reloading
 */
function cleanLinkTokenFromUrl(url: URL): void {
  try {
    url.searchParams.delete('token');
    window.history.replaceState(
      { ...window.history.state, cleanedLinkToken: true },
      document.title,
      url.toString()
    );
  } catch (error) {
    console.log(error);
  }
}

/**
 * Basic token validation
 */
function isValidTokenFormat(token: string): boolean {
  if (token.length < 32) return false;

  const jwtPattern = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/;
  return jwtPattern.test(token);
}
