import { defineStore } from 'pinia';
import { Buffer } from 'buffer';

import * as api from '@/api';
import router from '@/router';
import { useAlertStore } from '@/stores/alert';

window.Buffer = Buffer;

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => {
    return {
      token: localStorage.getItem('deliver_jwt_token'),
      user: JSON.parse(localStorage.getItem('deliver_user_info')),
    }
  },
  actions: {
    async login(email, password, redirect) {
      if (!redirect) redirect = '/';

      try {
        api.login(email, password)
        .then((res) => {
          if (res) {
            this.token = res;
            localStorage.setItem('deliver_jwt_token', res);
            
            // decode JWT token to get first and last name
            const payload = res.split('.')[1];
            const buffer = Buffer.from(payload, 'base64');
            const obj = JSON.parse(buffer.toString());
            
            const user = {
              email,
              role: obj.role,
              first_name: obj.first_name,
              last_name: obj.last_name,
            };
            
            this.user = user;
            localStorage.setItem('deliver_user_info', JSON.stringify(user));

            router.push(redirect);
          }
        });
      } catch (err) {
        const alert = useAlertStore();
        alert.error(error);
      }
    },
    logout(redirect) {
      if (!redirect) redirect = '/';

      this.token = null;
      this.user = null;

      localStorage.removeItem('deliver_jwt_token');
      localStorage.removeItem('deliver_user_info');
      
      router.push(redirect);
    },
    updateUser(updated) {
      const user = {
        email: updated.email,
        role: updated.role,
        first_name: updated.first_name,
        last_name: updated.last_name,
      };
      
      this.user = user;
      localStorage.setItem('deliver_user_info', JSON.stringify(user));
    },
  },
  getters: {
    loggedIn: (state) => (state.token != null),
  }
});