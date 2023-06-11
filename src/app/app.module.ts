import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownDirective } from './shared/directives/dropdown.directive';
import { FilterPipe } from './shared/pipes/filter.pipe';
import { HttpClientModule } from '@angular/common/http';
import { SelectUserComponent } from './shared/components/select-user/select-user.component';
import { NumberValidationDirective } from './shared/directives/number-validation.directive';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    DropdownDirective,
    FilterPipe,
    SelectUserComponent,
    NumberValidationDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
