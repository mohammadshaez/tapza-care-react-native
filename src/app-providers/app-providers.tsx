import type { PropsWithChildren } from "react";

import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { QueryClientProvider } from "@tanstack/react-query";
import { I18nextProvider } from "react-i18next";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { appI18n } from "@/locales/i18n";
import { queryClient } from "@/services/query/query-client";
import { AppThemeProvider } from "@/theme/theme-provider";

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <I18nextProvider i18n={appI18n}>
          <QueryClientProvider client={queryClient}>
            <AppThemeProvider>
              <BottomSheetModalProvider>{children}</BottomSheetModalProvider>
            </AppThemeProvider>
          </QueryClientProvider>
        </I18nextProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
