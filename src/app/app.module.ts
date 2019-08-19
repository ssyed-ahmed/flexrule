import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { EditorComponent } from './editor/editor.component';
import { ProcessComponent } from './process/process.component';
import { DocumentComponent } from './document/document.component';
import { FlowComponent } from './flow/flow.component';
import { ProcessMovableRenameableComponent } from './process-movable-renameable/process-movable-renameable.component';
import { DraggableDirective } from './draggable.directive';
import { DocumentMovableRenameableComponent } from './document-movable-renameable/document-movable-renameable.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    EditorComponent,
    ProcessComponent,
    DocumentComponent,
    FlowComponent,
    ProcessMovableRenameableComponent,
    DraggableDirective,
    DocumentMovableRenameableComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
