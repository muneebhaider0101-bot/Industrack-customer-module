import { defineConfig, devices } from '@playwright/test';
import path from 'path';

// Define the exact file path where your login state is stored
const AUTH_STATE_PATH = path.join(__dirname, 'playwright/.auth/user.json');

export default defineConfig({
  testDir: './Tests', // Points to your test files directory
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  use: {
    /* 1. CRITICAL: Provide the base URL so Playwright understands which 
       domain to automatically attach the injected cookie state to */
    baseURL: 'https://onetrack.industrack.com',
    viewport: { width: 1500, height: 1220 }, 
    // Default system trace capture options
    trace: 'on-first-retry',
  },

  /* 2. CRITICAL: Configure the sequential execution dependencies */
  projects: [
    {
      name: 'setup',
      // Playwright targets files matching this specific regex extension pattern
      testMatch: /.*\.setup\.ts/, 
      use: {
        // Keeps the environment completely clean for the initial login
        storageState: undefined, 
      }
    },
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        /* 3. CRITICAL: Tell this browser project to read 
           and apply the generated cookies/localStorage keys */
        storageState: AUTH_STATE_PATH, 
        headless: false
      },
      // 4. CRITICAL: Guarantees 'setup' runs first and creates user.json
      dependencies: ['setup'], 
    },
    // {
    //   name: 'firefox',
    //   use: { 
    //     ...devices['Desktop Firefox'],
    //     storageState: AUTH_STATE_PATH,
    //   },
    //   dependencies: ['setup'],
    // },
  ],
});
