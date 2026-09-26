// src/hooks/useAuth.ts
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import type { User } from 'firebase/auth';
import { auth, ADMIN_EMAIL } from '../lib/firebase';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsAdmin(user?.email === ADMIN_EMAIL);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { user, loading, isAdmin };
}