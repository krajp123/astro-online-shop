// Hook placeholder for seller auth logic.
// Future implementation will handle seller login, token checks, and route protection.
export function useAuth() {
  return {
    seller: null,
    isAuthenticated: false,
    login: () => undefined,
    logout: () => undefined
  };
}
