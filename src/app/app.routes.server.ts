import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'articles/:id',
    renderMode: RenderMode.Server // Rendu à la demande (SSR) au lieu du Prerender statique
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
