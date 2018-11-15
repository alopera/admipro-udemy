import { NgModule } from "@angular/core";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ProgressComponent } from "./progress/progress.component";
import { Graficas1Component } from "./graficas1/graficas1.component";
import { PagesComponent } from './pages.component';
import { SharedModule } from "../shared/shared.module";
import { PAGES_ROUTES } from "./pages.routes";
import { IncremetadorComponent } from '../components/incremetador/incremetador.component';
import { FormsModule } from "@angular/forms";
import { ChartsModule } from 'ng2-charts';
import { GraficoDonaComponent } from './graficas1/grafico-dona/grafico-dona.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';

@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        IncremetadorComponent,
        GraficoDonaComponent,
        AccountSettingsComponent,
        
    ],
    exports: [
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        IncremetadorComponent
    ],
    imports: [
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        ChartsModule
    ]
})

export class PagesModule {

}

