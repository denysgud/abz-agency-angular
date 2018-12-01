import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule }    from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ClickStopPropagationDirective } from './click-stop-propagation.directive';
import { UsersComponent } from './users/users.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { AbzSelectComponent } from './signup-form/abz-select/abz-select.component';
import { AbzInputFileComponent } from './signup-form/abz-input-file/abz-input-file.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ClickStopPropagationDirective,
    UsersComponent,
    SignupFormComponent,
    AbzSelectComponent,
    AbzInputFileComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
