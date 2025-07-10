import { Box, Button, Text, useTheme } from "@blockit/cross-ui-toolkit";
import { useRouteError, useNavigate, isRouteErrorResponse } from "react-router-dom";
import { useState } from "react";

interface ErrorInfo {
  status: string | number;
  statusText: string;
  message: string;
  stack?: string;
  type: string;
}

export default function Error() {
  const error = useRouteError();
  const navigate = useNavigate();
  const [showDetails, setShowDetails] = useState(false);
  const { currentColors } = useTheme();

  const getErrorInfo = (): ErrorInfo => {
    if (isRouteErrorResponse(error)) {
      return {
        status: error.status,
        statusText: error.statusText,
        message: error.data?.message || error.data,
        type: "Route Error"
      };
    } else if (error && typeof error === 'object' && 'message' in error) {
      const err = error as any;
      return {
        status: "Error",
        statusText: err.name || "Unknown Error",
        message: err.message || String(error),
        stack: err.stack,
        type: "Application Error"
      };
    } else {
      return {
        status: "Unknown",
        statusText: "Unknown Error",
        message: String(error),
        type: "Unknown Error Type"
      };
    }
  };

  const errorInfo = getErrorInfo();

  return (
    <Box className="min-h-screen flex items-center justify-center p-4">
      <Box className="max-w-2xl w-full">
        <Box className="rounded-lg shadow-lg p-8" style={{ backgroundColor: currentColors.surface?.card }}>
          <Box className="text-center mb-6 flex flex-col items-center" style={{ gap: 4 }}>
            <Text variant="h1">
              {errorInfo.status}
            </Text>
            <Text variant="h2" className="mb-2">
              {errorInfo.statusText}
            </Text>
            <Text>
              {errorInfo.message}
            </Text>
          </Box>

          <Box className="border-t pt-4 mb-6">
            <Box className="flex justify-between items-center mb-2">
              <Text>Error Details</Text>
              <Button
                variant="ghost"
                title={showDetails ? "Hide Details" : "Show Details"}
                size="sm"
                onPress={() => setShowDetails(!showDetails)}
              />
            </Box>

            {showDetails && (
              <Box className="rounded p-4 mt-2 flex flex-col" style={{ backgroundColor: currentColors.surface?.card, gap: 4 }}>
                <Text>
                  <span className="font-bold">Type:</span> {errorInfo.type}
                </Text>
                <Text>
                  <span className="font-bold">URL:</span> {window.location.href}
                </Text>
                <Text>
                  <span className="font-bold">Timestamp:</span> {new Date().toLocaleString()}
                </Text>
                {errorInfo.stack && (
                  <Box className="mt-4">
                    <Text>Stack Trace:</Text>
                    <Box className="p-3 rounded overflow-x-auto" style={{ backgroundColor: currentColors.surface?.card }}>
                      <pre className="text-xs">{errorInfo.stack}</pre>
                    </Box>
                  </Box>
                )}
              </Box>
            )}
          </Box>

          <Box className="flex gap-3 justify-center">
            <Button
              title="Go Back Home"
              variant="primary"
              onPress={() => navigate("/")}
            />
            <Button
              title="Reload Page"
              variant="secondary"
              onPress={() => window.location.reload()}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}