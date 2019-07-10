import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { EditorComponent } from './editor/editor.component';
import { ProcessComponent } from './process/process.component';
import { DocumentComponent } from './document/document.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    EditorComponent,
    ProcessComponent,
    DocumentComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
