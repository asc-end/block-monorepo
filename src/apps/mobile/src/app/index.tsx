import { useNativeAppBlocking } from '@/hooks/useNativeAppBlocking';
import { Home } from '@blockit/ui';
import { router } from 'expo-router';

export default function Page() {
  const nativeAppBlocking = useNativeAppBlocking();

  return (
      <Home 
        onCreateRoutine={() => router.push("create-routine")} 
        nativeAppBlocking={nativeAppBlocking} 
      />
  );
}