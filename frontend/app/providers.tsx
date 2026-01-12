'use client';

import { ReactNode } from 'react';
import { UserProvider } from '@/contexts/UserContext';
import { TaskProvider } from '@/contexts/TaskContext';

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <UserProvider>
      <TaskProvider>
        {children}
      </TaskProvider>
    </UserProvider>
  );
}