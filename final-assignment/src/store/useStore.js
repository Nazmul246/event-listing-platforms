import { create } from "zustand";

const useStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || '',
  login: ({ token, username }) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify({ username }));
    set({ user: { username }, token });
  },
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    set({ user: null, token: '' });
  },
}));

export default useStore;
