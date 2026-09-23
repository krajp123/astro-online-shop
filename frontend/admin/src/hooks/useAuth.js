// Hook placeholder for admin auth logic.
// Future implementation will handle admin sign-in, permission checks, and session handling.
export function useAuth() {
  return {
    admin: null,
    isAuthenticated: false,
    login: () => undefined,
    logout: () => undefined
  };
}
