import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { NGX_MONACO_EDITOR_CONFIG } from 'ngx-monaco-editor-v2';
import { DatePipe } from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    {
      provide: NGX_MONACO_EDITOR_CONFIG,
      useValue: {
        // Configure Monaco to use the CDN
        baseUrl: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.37.1/min/vs', // Replace version as needed
        defaultOptions: {
          scrollBeyondLastLine: false, // Example default options
        },
      },}
  ],
};
