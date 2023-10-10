import { IPersonData } from '../@types';

export class PersonData implements IPersonData {
  public name: string;
  public email: string;
  public phone: string;
  public mobile: string;
  public location: string;
  public filepath: string;
  public raw_data: string;

  constructor(filepath: string, raw_data: string) {
    this.name = '';
    this.email = '';
    this.phone = '';
    this.mobile = '';
    this.location = '';
    this.filepath = filepath;
    this.raw_data = raw_data;
  }
}
