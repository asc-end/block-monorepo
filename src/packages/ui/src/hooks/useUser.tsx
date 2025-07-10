import { useState, useEffect } from "react";
import type { User } from "@blockit/shared";
import { useAuthStore, api } from "../stores/authStore";

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuthStore();

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) return setLoading(false);

      try {
        const { data } = await api().get('/users/me');
        setUser(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching user:', err);
        setError('Failed to load user data');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token]);

  return { user, loading, error };
};