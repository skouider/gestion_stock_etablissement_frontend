import { Routes } from '@angular/router';
import { Dashboard } from './features/dashboard/dashboard';
import { StockList } from './features/stocks/stock-list/stock-list';
import { ArticleList } from './features/articles/article-list/article-list';
import { ArticleDetail } from './features/articles/article-detail/article-detail';
import { QrScanner } from './features/scanner/qr-scanner/qr-scanner';
import { MouvementHistory } from './features/mouvements/mouvement-history/mouvement-history';
import { MouvementForm } from './features/mouvements/mouvement-form/mouvement-form';
import { DepartementList } from './features/departements/departement-list/departement-list';
import { TransfertList } from './features/transferts/transfert-list/transfert-list';

export const routes: Routes = [
    {
        path: '', component: Dashboard
    },
    {
        path: 'dashboard', component: Dashboard
    },

    {
        path: 'stocks', component: StockList
    },

    {
        path: 'articles', component: ArticleList
    },

    {
        path: 'articles/:id', component: ArticleDetail
    },

    {
        path: 'scanner', component: QrScanner
    },

    {
        path: 'mouvements', component: MouvementHistory
    },
    {
        path: 'mouvements/new', component: MouvementForm
    },

    {
        path: 'departements', component: DepartementList
    },

    {
            path: 'transferts', component: TransfertList
    },
    {path: '**', redirectTo: 'dashboard'}

];

