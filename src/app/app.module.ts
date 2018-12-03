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
import { MaxFileSizeValidator } from './signup-form/abz-input-file/max-file-size.directive';
import { MinImageResolutionDirective } from './signup-form/abz-input-file/min-image-resolution.directive';
import { AllowedImageFormatsDirective } from './signup-form/abz-input-file/allowed-image-formats.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ClickStopPropagationDirective,
    UsersComponent,
    SignupFormComponent,
    AbzSelectComponent,
    AbzInputFileComponent,
    MaxFileSizeValidator,
    MinImageResolutionDirective,
    AllowedImageFormatsDirective
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
