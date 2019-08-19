import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessMovableRenameableComponent } from './process-movable-renameable.component';

describe('ProcessMovableRenameableComponent', () => {
  let component: ProcessMovableRenameableComponent;
  let fixture: ComponentFixture<ProcessMovableRenameableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessMovableRenameableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessMovableRenameableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
