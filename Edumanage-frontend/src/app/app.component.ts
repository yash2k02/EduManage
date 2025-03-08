import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { LoginModuleModule } from './login-module/login-module.module';
import { DashboardModuleModule } from './dashboard-module/dashboard-module.module';
import { routes } from './app.routes';
import { DataFetchingModuleModule } from './data-fetching-module/data-fetching-module.module';
import { FormsModule } from '@angular/forms';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone:true,
  imports: [RouterOutlet, FormsModule, LoginModuleModule, DashboardModuleModule, DataFetchingModuleModule, MonacoEditorModule], // Import RouterOutlet to handle routing
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Edumanage-frontend';
}
