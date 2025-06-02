/**
 * Initializes auth token from URL with security protections
 * @returns {string | null} The token if valid and found, null otherwise
 */
export function initializeAuthTokenFromUrl(): string | null {
  try {
    if (typeof window === 'undefined' || typeof URL === 'undefined') {
      return null;
    }

    const url = new URL(window.location.href);
    const token = url.searchParams.get('token');

    if (!token) {
      return null;
    }

    if (!isValidTokenFormat(token)) {
      cleanTokenFromUrl(url);
      return null;
    }

    cleanTokenFromUrl(url);
    return token;
  } catch (error) {
    return null;
  }
}

function cleanTokenFromUrl(url: URL): void {
  try {
    url.searchParams.delete('token');
    const newUrl = url.toString();
    window.history.replaceState({ ...window.history.state, cleanedAuthToken: true }, document.title, newUrl);
  } catch (error) {
    console.log(error);
  }
}

function isValidTokenFormat(token: string): boolean {
  if (token.length < 32) return false;
  const jwtPattern = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/;
  return jwtPattern.test(token);
}
