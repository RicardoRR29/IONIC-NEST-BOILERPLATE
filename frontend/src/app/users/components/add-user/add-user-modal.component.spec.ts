import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AddUserModalComponent } from './add-user-modal.component';
import { UserService } from '../../services/user.service';
import { UiService } from '../../../core/services/ui.service';

class UserServiceMock {
  create = jasmine.createSpy('create').and.resolveTo({ id: 1, name: 'n', email: 'e' });
  update = jasmine.createSpy('update').and.resolveTo({ id: 1, name: 'n', email: 'e' });
}
class UiServiceMock { toast() {} }

describe('AddUserModalComponent', () => {
  let component: AddUserModalComponent;
  let fixture: ComponentFixture<AddUserModalComponent>;
  let userService: UserServiceMock;

  beforeEach(async () => {
    userService = new UserServiceMock();
    await TestBed.configureTestingModule({
      imports: [IonicModule, ReactiveFormsModule, AddUserModalComponent],
      providers: [
        { provide: UserService, useValue: userService },
        { provide: UiService, useClass: UiServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddUserModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create new user', async () => {
    component.form.setValue({ name: 'n', email: 'e', password: '123456' });
    await component.save();
    expect(userService.create).toHaveBeenCalled();
  });
});
