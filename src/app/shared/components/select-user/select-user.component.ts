import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IUser } from '../../models/models';

@Component({
  selector: 'app-select-user',
  templateUrl: './select-user.component.html',
  styleUrls: ['./select-user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: SelectUserComponent
    }
  ]
})
export class SelectUserComponent implements ControlValueAccessor {

  @Input() users: IUser[] | null = [];
  user!: IUser;
  search = '';

  onChange = (user: IUser) => {};
  onTouched = () => {};
  touched = false;
  disabled = false;

  writeValue(obj: IUser): void {
    this.user = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  selectUser(obj: IUser) {
    this.markAsTouched();
    if (!this.disabled) {
      this.user = obj;
      this.onChange(this.user);
      this.search = '';
    }
  }
  
  onDropdownShow(searchInput: HTMLInputElement){
    this.search = '';
    searchInput.focus(); 
  }
}
