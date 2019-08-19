import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowMovableRenameableComponent } from './flow-movable-renameable.component';

describe('FlowMovableRenameableComponent', () => {
  let component: FlowMovableRenameableComponent;
  let fixture: ComponentFixture<FlowMovableRenameableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlowMovableRenameableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlowMovableRenameableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
