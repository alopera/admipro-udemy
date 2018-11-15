import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AccountSettingsService } from "./service.index";
import { SharedService } from "./service.index";
import { SidebarService } from "./service.index";

@NgModule({
  imports: [CommonModule],
  providers: [AccountSettingsService, SharedService, SidebarService]
})
export class ServiceModule {}
