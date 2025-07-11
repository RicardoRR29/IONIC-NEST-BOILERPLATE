import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { AuthPage } from './auth.page';
import { AuthService } from '../services/auth.service';

class AuthServiceMock {
  login = jasmine.createSpy('login').and.resolveTo();
  register = jasmine.createSpy('register').and.resolveTo();
  isLoggedIn = () => false;
}

describe('AuthPage', () => {
  let component: AuthPage;
  let fixture: ComponentFixture<AuthPage>;
  let auth: AuthServiceMock;

  beforeEach(async () => {
    auth = new AuthServiceMock();
    await TestBed.configureTestingModule({
      imports: [IonicModule, ReactiveFormsModule, RouterTestingModule, AuthPage],
      providers: [
        { provide: AuthService, useValue: auth },
        { provide: NavController, useValue: { navigateRoot: () => {}, navigateForward: () => {}, navigateBack: () => {} } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should submit login form', async () => {
    component.form.setValue({ name: '', email: 'e@e.com', password: 'Pass@123' });
    await component.submit();
    expect(auth.login).toHaveBeenCalled();
  });
});
