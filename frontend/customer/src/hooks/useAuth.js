// Hook placeholder for customer auth logic.
// Future implementation will handle sign-in, session recovery, and token refresh.
export function useAuth() {
  return {
    user: null,
    isAuthenticated: false,
    login: () => undefined,
    logout: () => undefined
  };
}
