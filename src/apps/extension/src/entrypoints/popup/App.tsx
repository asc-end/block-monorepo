import './App.css';
import React, { Fragment, useEffect, useState } from 'react';
import { useBrowserMessages } from './hooks/useBrowserMessages';
import { Box, Button, Text, useTheme } from '@blockit/cross-ui-toolkit';
import { browser } from 'wxt/browser';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import { HomeScreen, StatsScreen, ViewRoutineScreen, CreateRoutineScreen, AppsScreen, TimeScreen, CalendarScreen, MoneyScreen } from './routes';
import { useAuth, getApiUrl } from '@blockit/ui';
import { BackHeader } from './components/BackHeader';

const router = createHashRouter([
  {
    path: "/",
    element: <HomeScreen />,
  },
  {
    path: "/stats",
    element:
      <Fragment>
        <BackHeader />
        <StatsScreen />
      </Fragment>
  },
  {
    path: "/routine/:routineId",
    element: <ViewRoutineScreen />
  },
  {
    path: "/create-routine",
    element: <Fragment>
      <BackHeader />
      <CreateRoutineScreen />
    </Fragment>
  },
  {
    path: "/create-routine/apps",
    element: <Fragment>
      <BackHeader />
      <AppsScreen />
    </Fragment>
  },
  {
    path: "/create-routine/time",
    element: <Fragment>
      <BackHeader />
      <TimeScreen />
    </Fragment>
  },
  {
    path: "/create-routine/calendar",
    element: <Fragment>
      <BackHeader />
      <CalendarScreen />
    </Fragment>
  },
  {
    path: "/create-routine/money",
    element: <Fragment>
      <BackHeader />
      <MoneyScreen />
    </Fragment>
  }
]);

export const App = () => {
  const { token: authToken, setToken } = useAuth();
  const [isOpeningAuthWindow, setIsOpeningAuthWindow] = useState(false);
  useBrowserMessages();
  const [isVerifyingToken, setIsVerifyingToken] = useState(false);
  const [verificationError, setVerificationError] = useState<string | null>(null);
  const [hasVerifiedToken, setHasVerifiedToken] = useState(false);
  const { currentColors } = useTheme();

  useEffect(() => {
    if (currentColors?.background) {
      document.documentElement.style.backgroundColor = currentColors.background;
    }
  }, [currentColors?.background]);

  const handleConnectWallet = () => {
    setIsOpeningAuthWindow(true);
    setVerificationError(null);

    browser.windows.getCurrent().then(window => {
      if (window.id !== undefined) {
        browser.runtime.sendMessage({ type: 'OPEN_AUTH_WINDOW', extensionWindowId: window.id });
      }
    }).catch((error) => {
      console.error('Error opening auth window:', error);
      setIsOpeningAuthWindow(false);
      setVerificationError('Failed to open authentication window. Please try again.');
    });
  };


  // Load token from browser storage on mount
  useEffect(() => {
    browser.storage.local.get(['authToken']).then((result: { authToken?: string }) => {
      if (result.authToken) {
        setToken(result.authToken);
      }
    });
  }, [setToken]);

  useEffect(() => {
    if (authToken) {
      setHasVerifiedToken(false);
      setVerificationError(null);
    } else {
      setHasVerifiedToken(false);
      setIsVerifyingToken(false);
      setVerificationError(null);
    }
  }, [authToken]);

  useEffect(() => {
    if (authToken && !hasVerifiedToken && !isVerifyingToken) {
      const verifyToken = async () => {
        setIsVerifyingToken(true);
        setVerificationError(null);

        try {
          console.log("🔑 Verifying token", authToken);
          const apiUrl = getApiUrl();
          console.log("🔑 Backend URL", apiUrl + '/users/verify');
          const response = await fetch(apiUrl + '/users/verify', {
            headers: {
              'Authorization': `Bearer ${authToken}`
            }
          });

          if (!response.ok) {
            if (response.status === 401) {
              setToken(null);
              await browser.storage.local.remove(['authToken']);
              setVerificationError('Session expired. Please log in again.');
              return;
            }
            throw new Error(`Authentication failed: ${response.status}`);
          }

          setHasVerifiedToken(true);
          setVerificationError(null);
        } catch (error) {
          console.error('Token verification failed:', error);
          setVerificationError('Failed to verify authentication');
          setToken(null);
          setHasVerifiedToken(false);
        } finally {
          setIsVerifyingToken(false);
        }
      };

      verifyToken();
    }
  }, [authToken, hasVerifiedToken, isVerifyingToken, setToken]);

  if (isOpeningAuthWindow) {
    return (
      <Box
        className="flex flex-col items-center justify-center min-h-screen p-4"
        style={{ background: currentColors?.background }}
      >
        <Box
          className="p-8 rounded-lg shadow-md"
          style={{ background: currentColors?.surface?.card }}
        >
          <Box className="flex flex-col items-center">
            <div
              className="animate-spin rounded-full h-8 w-8 border-b-2 mb-4"
              style={{
                borderColor: `${currentColors?.primary?.[600]} transparent transparent transparent`,
                borderWidth: "2px",
                borderStyle: "solid",
              }}
            ></div>
            <Text>Opening authentication window...</Text>
            <Button
              title="Cancel"
              variant="secondary"
              size="sm"
              className="mt-4"
              onPress={() => setIsOpeningAuthWindow(false)}
            />
          </Box>
        </Box>
      </Box>
    );
  }

  if (isVerifyingToken) {

    return (
      <Box className="flex flex-col items-center justify-center min-h-screen p-4" style={{ background: currentColors?.background }}>
        <Box
          className="p-8 rounded-lg shadow-md"
          style={{ background: currentColors?.surface?.card }}
        >
          <Box className="flex flex-col items-center">
            <div
              className="animate-spin rounded-full h-8 w-8 border-b-2 mb-4"
              style={{
                borderColor: `${currentColors?.primary?.[600]} transparent transparent transparent`,
                borderWidth: "2px",
                borderStyle: "solid",
              }}
            ></div>
            <Text>Verifying authentication...</Text>
          </Box>
        </Box>
      </Box>
    );
  }

  if (!authToken) {
    return (
      <Box className="flex flex-col justify-center items-center h-full p-4 ">
        <Text variant="h2" >
          Welcome to Blokit
        </Text>
        <Text variant="caption" className="mb-6">
          Connect your wallet to get started
        </Text>
        {verificationError && (
          <Box className="mb-4 p-3 rounded-lg" style={{ background: currentColors?.error?.background, border: `1px solid ${currentColors?.error?.border}` }}>
            <Text className="text-sm text-center" style={{ color: currentColors?.error?.text }}>{verificationError}</Text>
          </Box>
        )}
        <Button
          title="Connect Wallet"
          variant="primary"
          size="lg"
          className="w-full"
          onPress={handleConnectWallet}
          disabled={isOpeningAuthWindow}
        />
      </Box>
    );
  }

  if (authToken && hasVerifiedToken) {
    return (
      <Box className='w-full flex flex-col' style={{ height: '100vh', width: '100vw' }}>
        <RouterProvider router={router} />
      </Box>
    );
  }

  return (
    <Box className="flex flex-col items-center justify-center h-full p-4">
      <Box className="p-8 rounded-lg shadow-md ">
        <Box className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
          <Text>Loading...</Text>
        </Box>
      </Box>
    </Box>
  );
};