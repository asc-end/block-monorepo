import { useEffect, useState } from 'react';
import { Box, Text, Button, useTheme, ScrollView, Pressable, AnimatedView } from '@blockit/cross-ui-toolkit';
import { SolIcon } from './icons/SolIcon';
import { Rainbow } from './components/svgs/Raibow';
import { Star } from './components/svgs/Star';
import { useHistoricalSessions, type HistoricalSession } from '../hooks/useHistoricalSessions';
import { claimCommitmentIx, claimCommitmentTx } from '@blockit/shared';
import { Transaction, VersionedTransaction, PublicKey } from '@solana/web3.js';
import BN from 'bn.js';

interface SuccessProps {
  sessionId?: string;
  claimMode?: 'single' | 'multiple';
  sendTransaction: (tx: Transaction | VersionedTransaction) => Promise<{ signature: string } | null>;
  walletAddress?: string;
  onBack:() => {}
}

export function Success({
  sessionId,
  claimMode = 'single',
  sendTransaction,
  walletAddress,
  onBack
}: SuccessProps) {
  const { currentColors } = useTheme();
  const [session, setSession] = useState<HistoricalSession | null>(null);
  const { sessions, refetch } = useHistoricalSessions();
  const [isClaiming, setIsClaiming] = useState(false);
  const [claimSuccess, setClaimSuccess] = useState(false);
  const [claimedAmount, setClaimedAmount] = useState(0);
  
  const claimableSessions = sessions?.filter(s => 
    s.commitment?.status === 'active' && 
    s.commitment?.claimedAt === null && 
    s.commitment?.forfeitedAt === null && // Exclude forfeited commitments
    s.commitment?.unlockTime && 
    new Date() > new Date(s.commitment.unlockTime)
  );

  // Debug: Log claimable sessions
  console.log('All sessions:', sessions);
  console.log('Claimable sessions:', claimableSessions);
  console.log('Claimable sessions count:', claimableSessions?.length);

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
      if (!walletAddress) {
        throw new Error('Wallet not connected');
      }
      if (!session?.commitment?.id) {
        throw new Error('No commitment ID found');
      }
      const userPublicKey = new PublicKey(walletAddress);
      const commitmentId = new BN(session.commitment.id);
      const tx = await claimCommitmentTx(userPublicKey, commitmentId);
      const result = await sendTransaction(tx);
      
      if (result?.signature) {
        // Success - update state and show success message
        setClaimedAmount(Number(session.commitment.amount) / 1e9);
        setClaimSuccess(true);
        
        // Update the session to mark as claimed
        if (session.commitment) {
          session.commitment.claimedAt = new Date().toISOString();
        }
        
        // Navigate back after delay to show success
        setTimeout(() => {
          onBack();
        }, 3500);
      } else {
        throw new Error('Transaction failed');
      }
    } catch (error) {
      console.error('Error claiming commitment:', error);
    } finally {
      setIsClaiming(false);
    }
  }

  async function handleClaimAll() {
    setIsClaiming(true);
    try {
      if (!walletAddress) {
        throw new Error('Wallet not connected');
      }
      const userPublicKey = new PublicKey(walletAddress);
      let tx = new Transaction();
      let totalClaimed = 0;
      
      for (const [index, session] of (claimableSessions || []).entries()) {
        if (!session?.commitment?.id) {
          console.warn('Skipping session without commitment ID');
          continue;
        }
        const commitmentId = new BN(session.commitment.id);
        const ix = await claimCommitmentIx(userPublicKey, commitmentId);
        tx.add(ix);
        totalClaimed += Number(session.commitment.amount) / 1e9;

        // Send and reset tx every 7 instructions if there are more than 7 sessions
        if ((index + 1) % 7 === 0 && claimableSessions.length > 7) {
          const result = await sendTransaction(tx);
          if (!result?.signature) throw new Error("Failed to claim commitment");
          tx = new Transaction();
        }
      }
      
      // Send any remaining instructions
      if (tx.instructions.length > 0) {
        const result = await sendTransaction(tx);
        if (!result?.signature) throw new Error("Failed to claim commitment");
      }
      
      // Success - update state and show success message
      setClaimedAmount(totalClaimed);
      setClaimSuccess(true);
      
      // Update all claimed sessions
      claimableSessions?.forEach(session => {
        if (session.commitment) {
          session.commitment.claimedAt = new Date().toISOString();
        }
      });
      
      // Navigate back after delay to show success
      setTimeout(() => {
        onBack();
      }, 3500);
      
      console.log('Claimed all earnings:', totalClaimed, 'SOL');
    } catch (error) {
      console.error(error);
    } finally {
      setIsClaiming(false);
    }
  }

  return (
    <Pressable onPress={onBack} className="flex-1 p-6 pb-16" style={{ backgroundColor: currentColors.background }}
    >
      <Box className="flex-1 px-6 pt-32 items-center">

        {!claimSuccess ? (
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
        ) : (
          <Box className='flex flex-col justify-center items-center' style={{ height: 280, position: 'relative' }}>
            {/* Animated burst effect */}
            <AnimatedView
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.5, 1], opacity: [0, 0.3, 0] }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              style={{
                position: 'absolute',
                width: 200,
                height: 200,
                borderRadius: 100,
                backgroundColor: currentColors.primary['500'],
              }}
            />
            
            {/* Main success icon */}
            <AnimatedView
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.1
              }}
              className="w-32 h-32 rounded-full items-center justify-center"
              style={{ 
                backgroundColor: currentColors.primary['100'],
                position: 'relative',
                zIndex: 2
              }}
            >
              <AnimatedView
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, type: "spring" }}
              >
                <Box className="w-24 h-24 rounded-full items-center justify-center" 
                     style={{ backgroundColor: currentColors.primary['500'] }}>
                  <SolIcon size={48} color="#FFFFFF" />
                </Box>
              </AnimatedView>
            </AnimatedView>
            
            {/* Floating particles */}
            {[...Array(6)].map((_, i) => (
              <AnimatedView
                key={i}
                initial={{ 
                  scale: 0,
                  x: 0,
                  y: 0,
                  opacity: 1
                }}
                animate={{ 
                  scale: [0, 1, 0.5],
                  x: [0, (Math.random() - 0.5) * 200],
                  y: [0, -100 - Math.random() * 100],
                  opacity: [1, 1, 0]
                }}
                transition={{ 
                  duration: 1.5,
                  delay: 0.3 + i * 0.1,
                  ease: "easeOut"
                }}
                style={{
                  position: 'absolute',
                  width: 12,
                  height: 12,
                  borderRadius: 6,
                  backgroundColor: i % 2 === 0 ? currentColors.primary['400'] : currentColors.primary['300'],
                }}
              />
            ))}
          </Box>
        )}
        {/* Title */}
        <AnimatedView
          initial={claimSuccess ? { opacity: 0, y: 20 } : {}}
          animate={claimSuccess ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Text
            className="text-3xl font-bold mb-2 text-center"
            style={{ 
              color: claimSuccess ? currentColors.primary['600'] : currentColors.text.main, 
              fontFamily: 'ClashDisplay-Bold', 
              fontSize: claimSuccess ? 56 : 72, 
              lineHeight: claimSuccess ? 56 : 64 
            }}
          >
            {claimSuccess ? 'CLAIMED' : 'Success'}
          </Text>
        </AnimatedView>

        {/* Subtitle */}
        <AnimatedView
          initial={claimSuccess ? { opacity: 0, y: 20 } : {}}
          animate={claimSuccess ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <Text
            className="text-lg mb-8 text-center"
            style={{ 
              color: claimSuccess ? currentColors.primary['600'] : currentColors.text.soft, 
              fontFamily: 'ClashDisplay-Bold', 
              fontSize: claimSuccess ? 28 : (session?.commitment ? 32 : 20), 
              lineHeight: claimSuccess ? 32 : (session?.commitment ? 32 : 24) 
            }}
          >
            {claimSuccess 
              ? `${claimedAmount.toFixed(3)} SOL TRANSFERRED`
              : claimMode === 'multiple' && claimableSessions && claimableSessions.length > 0
                ? `${claimableSessions.reduce((total, session) =>
                  total + (session.commitment ? Number(session.commitment.amount) / 1e9 : 0), 0
                ).toFixed(2)} SOL saved`
                : session?.commitment
                  ? `${(Number(session.commitment.amount) / 1e9).toFixed(2)} SOL saved`
                  : 'You saved your brain from melting'}
          </Text>
        </AnimatedView>

        {/* Session Details */}
        {!claimSuccess && claimMode === 'single' && session && (
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
        {!claimSuccess && claimMode === 'multiple' && claimableSessions && claimableSessions.length > 0 && (
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
        {/* Test button for development */}
        {!claimSuccess && (
          <Button
            title="Test Success Animation"
            className='rounded-full!important w-full mb-4'
            variant="secondary"
            onPress={() => {
              setClaimedAmount(0.05); // Test amount
              setClaimSuccess(true);
              setTimeout(() => {
                onBack();
              }, 3500);
            }}
          />
        )}
        
        {!walletAddress && (session?.commitment || (claimableSessions && claimableSessions.length > 0)) && (
          <Text className="text-center mb-4" style={{ color: currentColors.text.soft }}>
            Please connect your wallet to claim rewards
          </Text>
        )}
        {!claimSuccess && claimMode === 'single' && session?.commitment && walletAddress && (
          <Button
            title="Claim Reward"
            className='rounded-full!important w-full'
            variant="primary"
            onPress={handleClaim}
            leftIcon={<SolIcon size={20} color={'#FFFFFF'} />}
            loading={isClaiming}
          />
        )}
        {!claimSuccess && claimMode === 'multiple' && claimableSessions && claimableSessions.length > 0 && walletAddress && (
          <Button
            loading={isClaiming}
            title="Claim All"
            className='rounded-full!important w-full'
            variant="primary"
            onPress={handleClaimAll}
            leftIcon={<SolIcon size={20} color={'#FFFFFF'} />}
          />
        )}
        {claimSuccess && (
          <AnimatedView
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.4 }}
            className="items-center"
          >
            <Box className="px-6 py-3 rounded-full mb-2" 
                 style={{ 
                   backgroundColor: currentColors.surface.card,
                   borderWidth: 2,
                   borderColor: currentColors.primary['500']
                 }}>
              <Text className="text-center font-bold" style={{ color: currentColors.primary['600'] }}>
                TRANSACTION CONFIRMED
              </Text>
            </Box>
            <AnimatedView
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.5, 1] }}
              transition={{ delay: 1.3, duration: 1, repeat: Infinity }}
            >
              <Text className="text-center text-sm" style={{ color: currentColors.text.soft }}>
                Redirecting...
              </Text>
            </AnimatedView>
          </AnimatedView>
        )}
      </Box>

    </Pressable>
  );
}