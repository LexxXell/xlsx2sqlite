import { IPersonData } from '../@types';

export class PersonData implements IPersonData {
  public name: string;
  public email: string;
  public phone: string;
  public mobile: string;
  public location: string;
  public file_id: number;
  public raw_data: string;

  constructor(file_id: number, raw_data: string) {
    this.name = '';
    this.email = '';
    this.phone = '';
    this.mobile = '';
    this.location = '';
    this.file_id = file_id;
    this.raw_data = raw_data;
  }
}
