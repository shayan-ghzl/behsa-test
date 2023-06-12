import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, map, of } from 'rxjs';
import { IUser } from '../shared/models/models';
import { ApiService } from '../shared/services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent implements AfterViewInit{

  @ViewChild('autoFocus') autoFocus!: ElementRef<HTMLInputElement>;

  customerForm = new FormGroup({
    // onlyNumbers: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.pattern(/^[0-9\u06F0-\u06F9]{3,12}$/)]),
    onlyNumbers: new FormControl({ value: '', disabled: false }),
    onlyPersianChars: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.pattern(/^[\u0627-\u06cc\s]{3,32}$/)]),
    selectUserOne: new FormControl<IUser | null>({ value: null, disabled: false }, [Validators.required]),
    selectUserTwo: new FormControl<IUser | null>({ value: null, disabled: false }, [Validators.required]),
  });

  userList$ = this.apiService.getUsers().pipe(
    map(x => x.users)
  );
  userListSecond$: Observable<IUser[]> = of([]);

  constructor(
    private apiService: ApiService,
    // private cdr: ChangeDetectorRef
  ){
  }

  ngAfterViewInit(): void {
    this.autoFocus.nativeElement.focus();
  }
  
  @HostListener('document:keyup.enter')
  submit(){
    if (this.customerForm.invalid) {
      return;
    }
    console.log(this.customerForm.value);
    this.customerForm.reset();
  }

  searchValue(searchKey: string){
    this.userListSecond$ = this.apiService.getUsers().pipe(
      map(x => x.users.filter(x => (x.firstName + x.lastName).toLowerCase().includes(searchKey))),
    );
  }

  // timeout: any;
  // searchValue(searchKey: string){
  //   clearTimeout(this.timeout);
  //   this.timeout = setTimeout(() => {
  //     this.userListSecond$ = this.apiService.getUsers().pipe(
  //       map(x => x.users.filter(x => (x.firstName + x.lastName).toLowerCase().includes(searchKey))),
  //     );
  //     this.cdr.detectChanges();
  //   }, 500);
  // }

}
