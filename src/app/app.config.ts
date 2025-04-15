import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { provideLottieOptions } from 'ngx-lottie';
import player from 'lottie-web';

export function playerFactory() {
  return player;
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), provideAnimationsAsync(),
    provideAnimationsAsync(),
    provideHttpClient(withFetch()),
    provideAnimations(),
    provideLottieOptions({ player: playerFactory }),
  ]
};
