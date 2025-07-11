import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { UsersPage } from './users.page';
import { UserService, User } from '../services/user.service';
import { AuthService } from '../../services/auth.service';
import { UiService } from '../../core/services/ui.service';

class UserServiceMock {
  findAll = jasmine.createSpy('findAll').and.resolveTo([{ id:1,name:'n',email:'e'}]);
  delete = jasmine.createSpy('delete').and.resolveTo();
}
class AuthServiceMock {
  isLoggedIn = () => true;
  userId = 1;
  logout = jasmine.createSpy('logout');
}
class UiServiceMock { toast() {} }

describe('UsersPage', () => {
  let component: UsersPage;
  let fixture: ComponentFixture<UsersPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IonicModule, FormsModule, RouterTestingModule, UsersPage],
      providers: [
        { provide: UserService, useClass: UserServiceMock },
        { provide: AuthService, useClass: AuthServiceMock },
        { provide: UiService, useClass: UiServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should load users on init', async () => {
    await component.load();
    expect(component.users.length).toBe(1);
  });
});
