import { Home } from '@blockit/ui';
import { router } from 'expo-router';

export default function Page() {

  return (
    <Home onCreateRoutine={() => router.push("create-routine")} />
  );
}