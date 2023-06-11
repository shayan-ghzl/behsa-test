import { Pipe, PipeTransform } from '@angular/core';
import { IUser } from '../models/models';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: IUser[] | null, inputVal: string, fields: string[]): IUser[] | null {
    if (!(inputVal.trim().length >= 3) || !(value && value.length) || !(fields && fields.length)) {
      return value;
    }
    return this.search(inputVal, value, fields);
  }

  search(value: string, list: IUser[], fields: string[]){
    const keyword = value.trim().toLowerCase();
    let temp: IUser[] = [];
    temp = list.filter(x => this.searchInFields(x, fields).includes(keyword));
    return temp;
  }

  searchInFields(model: any, fields: string[]){
    const temp: string[] = [];
    fields.forEach((field) => {
      temp.push(model[field].toString().trim().toLowerCase());
    });
    return temp.join(' ');
  }

}