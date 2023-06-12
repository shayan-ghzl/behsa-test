import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Input() filterByApi = false;
  @Output() searchValue = new EventEmitter<string>();

  user!: IUser;
  // search = '';

  // constructor(
  //   private cdr: ChangeDetectorRef
  // ) {    
  // }

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

  selectUser(obj: IUser, searchInput: HTMLInputElement) {
    this.markAsTouched();
    if (!this.disabled) {
      this.user = obj;
      this.onChange(this.user);
      searchInput.value = '';
    }
  }
  
  onDropdownShow(searchInput: HTMLInputElement){
    searchInput.value = '';
    searchInput.focus(); 
  }

  timeout: any;
  searchChange(text: string){
    if(this.filterByApi && text.trim().length >= 3) {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.searchValue.emit(text);
        // this.cdr.detectChanges();
      }, 500);
    }
  }

}
