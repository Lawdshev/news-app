// test-utils.tsx
import React, { ReactElement } from "react";
import { render, RenderOptions, RenderResult } from "@testing-library/react";
import { ThemeProvider } from "next-themes";
import {
  UserAuthContextProvider,
} from "@/app/providers/user-auth-context-provider";
import { FavouriteProvider } from "@/app/hooks/favourite";

interface TestProviderOptions {
  theme?: string;
  initialState?: any;
}

interface CustomOptions extends RenderOptions, TestProviderOptions {}

const createTestProviders =
  ({ theme = "dark", initialState=null }: TestProviderOptions): React.FC =>
    ({ children }: React.PropsWithChildren<{}>) =>
    
    (
      <ThemeProvider
        defaultTheme={theme}
        enableSystem={false}
        attribute="class"
      >
        <UserAuthContextProvider initialState={initialState}>
          <FavouriteProvider>{children}</FavouriteProvider>
        </UserAuthContextProvider>
      </ThemeProvider>
    );

const customRender = (
  ui: ReactElement,
  { theme,initialState, ...options }: CustomOptions = {}
): RenderResult =>
  render(ui, { wrapper: createTestProviders({ theme }), ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
