import { AfterViewInit, ChangeDetectionStrategy, Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IUser } from '../shared/models/models';
import { ApiService } from '../shared/services/api.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent implements AfterViewInit{

  today!: string;
  todayJalali!: string;
  printJsonValue = {};

  customerForm = new FormGroup({
    onlyNumbers: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.pattern(/^[0-9]{3,12}$/i)]),
    onlyPersianChars: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.pattern(/^[\u0627-\u06cc\s]{3,32}$/)]),
    selectUserOne: new FormControl<IUser | null>({ value: null, disabled: false }, [Validators.required]),
    selectUserTwo: new FormControl<IUser | null>({ value: null, disabled: false }, [Validators.required]),
  });

  userList$ = this.apiService.getUsers().pipe(
    map(x => x.users)
  );

  userOneSearch = '';
  userTwoSearch = '';

  constructor(
    private apiService: ApiService
  ){
  }

  ngAfterViewInit(): void {
   
  }

  onDropdownShow(dropdownSearchInput: HTMLInputElement){
    this.userOneSearch = '';
    this.userTwoSearch = '';
    dropdownSearchInput.focus(); 
  }

  selectUserOne(user: IUser){
    this.customerForm.patchValue({'selectUserOne': user}, { emitEvent: true });
    this.userOneSearch = '';
  }

  selectUserTwo(user: IUser){
    this.customerForm.patchValue({'selectUserTwo': user}, { emitEvent: true });
    this.userTwoSearch = '';
  }
  
  @HostListener('document:keyup.enter')
  submit(){
    if (this.customerForm.invalid) {
      return;
    }
    console.log(this.customerForm.value);
    this.customerForm.reset();
  }
}
