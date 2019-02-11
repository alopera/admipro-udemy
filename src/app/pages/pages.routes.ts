import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ProgressComponent } from "./progress/progress.component";
import { Graficas1Component } from "./graficas1/graficas1.component";
import { PagesComponent } from "./pages.component";
import { RxjsComponent } from './rxjs/rxjs.component';

const pagesRoutes: Routes = [
  {
    path: "",
    component: PagesComponent,
    children: [
      { path: "dashboard", component: DashboardComponent, data: {titulo: 'Dashboard'} },
      { path: "progress", component: ProgressComponent, data: {titulo: 'Barra de Progreso'} },
      { path: "graficas1", component: Graficas1Component, data: {titulo: 'Gráficas'} },
      { path: "accountSettings", component: AccountSettingsComponent, data: {titulo: 'Configuracion Cuenta'} },
      { path: "observable", component: RxjsComponent, data: {titulo: 'Observables'} },
      { path: "", redirectTo: "/dashboard", pathMatch: "full" }
    ]
  }

];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
