import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsAuthFormComponent } from './sms-auth-form.component';

describe('SmsAuthFormComponent', () => {
  let component: SmsAuthFormComponent;
  let fixture: ComponentFixture<SmsAuthFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SmsAuthFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmsAuthFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
