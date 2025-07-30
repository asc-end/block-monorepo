import { useEffect, useState } from 'react';
import { Box, Text, Button, useTheme, ScrollView } from '@blockit/cross-ui-toolkit';
import { SolIcon } from './icons/SolIcon';
import { Rainbow } from './components/svgs/Raibow';
import { Star } from './components/svgs/Star';
import { useHistoricalSessions, type HistoricalSession } from '../hooks/useHistoricalSessions';
import { claimCommitmentIx, claimCommitmentTx } from '@blockit/shared';
import { Transaction } from '@solana/web3.js';

interface SuccessProps {
  sessionId?: string;
  claimMode?: 'single' | 'multiple';
  sendTransaction: (tx: any) => Promise<{ signature: string } | null>;
}

export function Success({
  sessionId,
  claimMode = 'single',
  sendTransaction
}: SuccessProps) {
  const { currentColors } = useTheme();
  const [session, setSession] = useState<HistoricalSession | null>(null);
  const { sessions } = useHistoricalSessions();
  const [isClaiming, setIsClaiming] = useState(false);
  
  const claimableSessions = sessions?.filter(s => 
    s.commitment?.status === 'active' && 
    s.commitment?.claimedAt === null && 
    s.commitment?.unlockTime && 
    new Date() > new Date(s.commitment.unlockTime)
  );

  useEffect(() => {
    if (sessionId && sessions && sessions.length > 0) {
      const foundSession = sessions.find(s => s.id === sessionId);
      setSession(foundSession || null);
    }
  }, [sessionId]); // Only depend on sessionId, not sessions


  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes} minutes`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours} hour${hours > 1 ? 's' : ''}`;
  };

  async function handleClaim(){
    setIsClaiming(true);
    try{
      const tx = await claimCommitmentTx(session?.commitment?.id, session?.commitment?.amount);
      await sendTransaction(tx);
    } catch (error) {
      console.error(error);
    } finally {
      setIsClaiming(false);
    }
  }

  async function handleClaimAll() {
    setIsClaiming(true);
    try {
      let tx = new Transaction();
      for (const [index, session] of (claimableSessions || []).entries()) {
        const ix = await claimCommitmentIx(session?.commitment?.id, session?.commitment?.amount);
        tx.add(ix);

        // Send and reset tx every 7 instructions if there are more than 7 sessions
        if ((index + 1) % 7 === 0 && claimableSessions.length > 7) {
          const signature = await sendTransaction(tx);
          if (!signature) throw new Error("Failed to claim commitment");
          tx = new Transaction();
        }
      }
      // Send any remaining instructions
      if (tx.instructions.length > 0) {
        const signature = await sendTransaction(tx);
        if (!signature) throw new Error("Failed to claim commitment");
      }
      console.log('Claimed all earnings');
    } catch (error) {
      console.error(error);
    } finally {
      setIsClaiming(false);
    }
  }

  return (
    <Box className="flex-1 p-6 pb-16" style={{ backgroundColor: currentColors.background }}
    >
      <Box className="flex-1 px-6 pt-32 items-center">

        <Box className='flex flex-col justify-end items-center' style={{ position: 'relative', width: 272, height: 280 }}>
          <Box style={{ position: 'absolute', top: 0, left: 0 }}>
            <Star size={29} />
          </Box>
          <Box style={{ position: 'absolute', top: 50, right: 0 }}>
            <Star size={25} />
          </Box>
          <Box style={{ position: 'absolute', top: 30, left: 30 }}>
            <Star size={16} />
          </Box>
          <Rainbow />
        </Box>
        {/* Title */}
        <Text
          className="text-3xl font-bold mb-2 text-center"
          style={{ color: currentColors.text.main, fontFamily: 'ClashDisplay-Bold', fontSize: 72, lineHeight: 64 }}
        >
          Success
        </Text>

        {/* Subtitle */}
        <Text
          className="text-lg mb-8 text-center"
          style={{ color: currentColors.text.soft, fontFamily: 'ClashDisplay-Bold', fontSize: session?.commitment ? 32 : 20, lineHeight: session?.commitment ? 32 : 24 }}
        >
          {claimMode === 'multiple' && claimableSessions && claimableSessions.length > 0
            ? `${claimableSessions.reduce((total, session) =>
              total + (session.commitment ? Number(session.commitment.amount) / 1e9 : 0), 0
            ).toFixed(2)} SOL saved`
            : session?.commitment
              ? `${(Number(session.commitment.amount) / 1e9).toFixed(2)} SOL saved`
              : 'You saved your brain from melting'}
        </Text>

        {/* Session Details */}
        {claimMode === 'single' && session && (
          <Box
            className="w-full p-6 rounded-2xl mb-8"
            style={{ backgroundColor: currentColors.surface.card }}
          >
            <Box className="mb-4">
              <Text className="text-sm mb-1" style={{ color: currentColors.text.soft }}>
                Duration
              </Text>
              <Text className="text-2xl font-semibold" style={{ color: currentColors.text.main }}>
                {formatDuration(session.duration || 0)}
              </Text>
            </Box>

            {session?.commitment && (
              <Box>
                <Text className="text-sm mb-1" style={{ color: currentColors.text.soft }}>
                  Staked Amount
                </Text>
                <Box className="flex flex-row items-center gap-2">
                  <SolIcon size={24} color={currentColors.primary['500']} />
                  <Text className="text-2xl font-semibold" style={{ color: currentColors.text.main }}>
                    {(Number(session.commitment.amount) / 1e9).toFixed(2)} SOL
                  </Text>
                </Box>
              </Box>
            )}
          </Box>
        )}

        {/* Sessions details for multiple claim mode */}
        {claimMode === 'multiple' && claimableSessions && claimableSessions.length > 0 && (
          <Box className="w-full mb-8">
            <Box className="flex flex-row justify-between items-center mb-4">
              <Text className="text-lg font-semibold" style={{ color: currentColors.text.main }}>
                Claimable Rewards
              </Text>
              <Box
                className="px-3 py-1 rounded-full"
                style={{ backgroundColor: currentColors.primary['100'] }}
              >
                <Text className="text-sm font-medium" style={{ color: currentColors.primary['600'] }}>
                  {claimableSessions.reduce((total, session) => total + (Number(session.commitment?.amount) / 1e9), 0).toFixed(2)} SOL ready
                </Text>
              </Box>
            </Box>

            <ScrollView
              className="max-h-64"
              showsVerticalScrollIndicator={false}
            >
              {claimableSessions.map((session, index) => (
                <Box
                  key={session.id}
                  className="p-4 mb-2 rounded-xl flex flex-row justify-between items-center"
                  style={{
                    backgroundColor: currentColors.surface.card,
                    borderWidth: 1,
                    borderColor: currentColors.neutral ? currentColors.neutral['200'] : currentColors.primary['100']
                  }}
                >
                  <Box className="flex-1">
                    <Box className="flex flex-row items-center gap-1">
                      {session.type === 'routine' && session.emoji && (
                        <Text style={{ fontSize: 16 }}>{session.emoji}</Text>
                      )}
                      <Text className="text-sm" style={{ color: currentColors.text.soft }}>
                        {session.type === 'routine' ? session.name : `Focus Session ${index + 1}`}
                      </Text>
                    </Box>
                    {session.duration && (
                      <Text className="text-base font-medium" style={{ color: currentColors.text.main }}>
                        {formatDuration(session.duration)}
                      </Text>
                    )}
                  </Box>
                  {session.commitment && (
                    <Box className="flex flex-row items-center gap-1">
                      <SolIcon size={16} color={currentColors.primary['500']} />
                      <Text className="text-base font-semibold" style={{ color: currentColors.primary['600'] }}>
                        {(Number(session.commitment.amount) / 1e9).toFixed(2)} SOL
                      </Text>
                    </Box>
                  )}
                </Box>
              ))}
            </ScrollView>
          </Box>
        )}
      </Box>

      {/* Action Buttons */}
      <Box className='w-full'>
        {claimMode === 'single' && session?.commitment && (
          <Button
            title="Claim Reward"
            className='rounded-full!important w-full'
            variant="primary"
            onPress={handleClaim}
            leftIcon={<SolIcon size={20} color={'#FFFFFF'} />}
            loading={isClaiming}
          />
        )}
        {claimMode === 'multiple' && claimableSessions && claimableSessions.length > 0 && (
          <Button
            loading={isClaiming}
            title="Claim All"
            className='rounded-full!important w-full'
            variant="primary"
            onPress={handleClaimAll}
            leftIcon={<SolIcon size={20} color={'#FFFFFF'} />}
          />
        )}
      </Box>

    </Box>
  );
}