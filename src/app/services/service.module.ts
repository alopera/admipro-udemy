import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AccountSettingsService } from "./service.index";
import { SharedService } from "./service.index";
import { SidebarService } from "./service.index";
import { UsuarioService } from "./service.index";
import { HttpClientModule } from "@angular/common/http";
import { LoginGuardGuard } from "./guards/login-guard.guard";
import { SubirArchivoService } from "./subir-archivo/subir-archivo.service";
@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [AccountSettingsService, SharedService, SidebarService, UsuarioService, LoginGuardGuard, SubirArchivoService]
})
export class ServiceModule {}
