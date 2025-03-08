import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponentComponent } from './login-component/login-component.component';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [LoginComponentComponent],
  imports: [
    CommonModule, FormsModule
  ],
  exports:[LoginComponentComponent]
})
export class LoginModuleModule {}
