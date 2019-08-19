import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentMovableRenameableComponent } from './document-movable-renameable.component';

describe('DocumentMovableRenameableComponent', () => {
  let component: DocumentMovableRenameableComponent;
  let fixture: ComponentFixture<DocumentMovableRenameableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentMovableRenameableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentMovableRenameableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
