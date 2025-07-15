import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { provideIonicAngular } from '@ionic/angular/standalone';
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
      imports: [ReactiveFormsModule, AddUserModalComponent],
      providers: [
        provideIonicAngular(),
        { provide: UserService, useValue: userService },
        { provide: UiService, useClass: UiServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddUserModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create new user', async () => {
    component.form.setValue({ name: 'n', email: 'e@e.com', password: 'Pass@123' });
    await component.save();
    expect(userService.create).toHaveBeenCalled();
  });
});
