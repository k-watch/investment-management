const TOKEN_ACCESS = 'accessToken';

export const getToken = () => {
  if (typeof window !== 'undefined')
    return !!localStorage.getItem(TOKEN_ACCESS);
};

export const setToken = (token: string) => {
  if (typeof window !== 'undefined') localStorage.setItem(TOKEN_ACCESS, token);
};
