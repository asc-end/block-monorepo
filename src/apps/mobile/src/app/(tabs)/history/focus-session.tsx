import { useLocalSearchParams, router } from 'expo-router';
import { ViewFocusSession } from '@blockit/ui';

export default function FocusSessionPage() {
    const { sessionId } = useLocalSearchParams<{ sessionId: string }>();
    
    if (!sessionId) {
        router.back();
        return null;
    }

    return (
        <ViewFocusSession
            sessionId={sessionId}
            onBack={() => router.back()}
        />
    );
}