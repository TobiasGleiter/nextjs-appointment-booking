import { AppRouterContext } from 'next/dist/shared/lib/app-router-context';
import '../src/app/globals.css';

// default pixel breakpoints
const BREAKPOINTS_INT = {
  xs: 375,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
};

const customViewports = Object.fromEntries(
  Object.entries(BREAKPOINTS_INT).map(([key, val], idx) => {
    console.log(val);
    return [
      key,
      {
        name: key,
        styles: {
          width: `${val}px`,
          height: `${(idx + 5) * 10}vh`,
        },
      },
    ];
  })
);

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  viewport: { viewports: customViewports },
  nextRouter: {
    Provider: AppRouterContext.Provider, // next 13 next 13 (using next/navigation)
    // Provider: RouterContext.Provider, // next 13 (using next/router) / next < 12
  },
};
