import { Audio } from 'expo-av';
import { useEffect, useRef } from 'react';

const voiceSegments = [
  require('../../../assets/voice/segment1.mp3'),
  require('../../../assets/voice/segment2.mp3'),
  require('../../../assets/voice/segment3.mp3'),
  require('../../../assets/voice/segment4.mp3'),
  require('../../../assets/voice/segment5.mp3'),
  require('../../../assets/voice/segment6.mp3'),
  require('../../../assets/voice/segment7.mp3'),
];

const backgroundFile = require('../../../assets/onboarding-background.mp3');

const BACKGROUND_VOLUME = 0.6;
const VOICE_VOLUME = 0.5;
const VOICE_DELAY = 800;
const FADE_DURATION = 1000;

interface AudioPlayerProps {
  onReady: () => void;
  currentStep: number;
  isCinematicEnding?: boolean;
  isMuted?: boolean;
}

export function AudioPlayer({ onReady, currentStep, isCinematicEnding, isMuted }: AudioPlayerProps) {
  const backgroundRef = useRef<Audio.Sound | null>(null);
  const voiceSoundsRef = useRef<Audio.Sound[]>([]);
  const isFirstRender = useRef(true);
  const fadeIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Handle mute state changes
  useEffect(() => {
    async function updateVolumes() {
      try {
        if (backgroundRef.current) {
          await backgroundRef.current.setVolumeAsync(isMuted ? 0 : BACKGROUND_VOLUME);
        }

        await Promise.all(
          voiceSoundsRef.current.map(async sound => {
            try {
              await sound.setVolumeAsync(isMuted ? 0 : VOICE_VOLUME);
            } catch (error) {
              console.error('Error updating voice segment volume:', error);
            }
          })
        );
      } catch (error) {
        console.error('Error updating audio volumes:', error);
      }
    }

    updateVolumes();
  }, [isMuted]);

  // Cleanup function
  const cleanup = async () => {
    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
      fadeIntervalRef.current = null;
    }

    if (backgroundRef.current) {
      await backgroundRef.current.unloadAsync();
      backgroundRef.current = null;
    }

    await Promise.all(
      voiceSoundsRef.current.map(async sound => {
        try {
          await sound.unloadAsync();
        } catch (error) {
          console.error('Error cleaning up voice segment:', error);
        }
      })
    );
    voiceSoundsRef.current = [];
  };

  // Fade out function
  const fadeOut = async () => {
    if (!backgroundRef.current) return;

    const status = await backgroundRef.current.getStatusAsync();
    if (!status.isLoaded) return;

    const startVolume = BACKGROUND_VOLUME;
    const steps = 20;
    const stepDuration = FADE_DURATION / steps;
    const volumeStep = startVolume / steps;
    let currentStep = 0;

    fadeIntervalRef.current = setInterval(async () => {
      if (!backgroundRef.current) {
        if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
        return;
      }

      currentStep++;
      const newVolume = Math.max(0, startVolume - (volumeStep * currentStep));
      
      try {
        await backgroundRef.current.setVolumeAsync(newVolume);
        
        if (currentStep >= steps) {
          if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
          cleanup();
        }
      } catch (error) {
        console.error('Error during fade out:', error);
        if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
        cleanup();
      }
    }, stepDuration);
  };

  useEffect(() => {
    let isMounted = true;

    const setupAudio = async () => {
      try {
        const { sound: bgSound } = await Audio.Sound.createAsync(backgroundFile, {
          isLooping: true,
          volume: BACKGROUND_VOLUME,
          shouldPlay: false,
        });

        const voiceSounds = await Promise.all(
          voiceSegments.map(segment =>
            Audio.Sound.createAsync(segment, {
              volume: VOICE_VOLUME,
              shouldPlay: false,
            })
          )
        );

        if (isMounted) {
          backgroundRef.current = bgSound;
          voiceSoundsRef.current = voiceSounds.map(({ sound }) => sound);

          await bgSound.playAsync();
          await voiceSoundsRef.current[0].playAsync();

          onReady();
        }
      } catch (error) {
        console.error('Error setting up audio:', error);
      }
    };

    setupAudio();

    return () => {
      isMounted = false;
      cleanup();
    };
  }, []);

  useEffect(() => {
    if (isCinematicEnding) {
      fadeOut();
    }
  }, [isCinematicEnding]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    async function playStepAudio() {
      try {
        await Promise.all(
          voiceSoundsRef.current.map(async sound => {
            try {
              const status = await sound.getStatusAsync();
              if (status.isLoaded && status.isPlaying) {
                await sound.stopAsync();
              }
            } catch (error) {
              console.error('Error stopping voice segment:', error);
            }
          })
        );

        await new Promise(resolve => setTimeout(resolve, VOICE_DELAY));

        if (voiceSoundsRef.current[currentStep]) {
          await voiceSoundsRef.current[currentStep].playAsync();
        }
      } catch (error) {
        console.error('Error playing step audio:', error);
      }
    }
    playStepAudio();
  }, [currentStep]);

  return null;
} 