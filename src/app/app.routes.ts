import { Routes } from '@angular/router';
import { Dashboard } from './features/dashboard/dashboard/dashboard';
import { StockList } from './features/stocks/stock-list/stock-list';
import { ArticleList } from './features/articles/article-list/article-list';
import { ArticleDetail } from './features/articles/article-detail/article-detail';
import { ScanArticle } from './features/scan/scan-article/scan-article';
import { MouvementHistory } from './features/mouvements/mouvement-history/mouvement-history';
import { MouvementForm } from './features/mouvements/mouvement-form/mouvement-form';
import { DepartementList } from './features/departements/departement-list/departement-list';
import { TransfertList } from './features/transfert/transfert-list/transfert-list';

export const routes: Routes = [
     
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
       path:'scan/:code', component:ScanArticle
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
    {
        path: '', component: Dashboard
    },
    { path: '**', redirectTo: 'dashboard' }
];
