import { parsePhoneNumber } from 'libphonenumber-js';
import { PersonData } from '../classes';
import { normalizePhoneNumber } from './normalize-phone-number.helper';

export function getPersonLocation(person: PersonData): string {
  try {
    if (
      person.location &&
      typeof person.location === 'string' &&
      person.location.trim().toLowerCase() !== 'undefined'
    ) {
      return person.location.trim();
    }
    if (person.mobile && typeof person.mobile === 'string' && person.mobile.trim().toLowerCase() !== 'undefined') {
      const parsedPhone = parsePhoneNumber(normalizePhoneNumber(person.mobile));
      if (parsedPhone && parsedPhone.country) {
        return parsedPhone.country;
      }
    }
    if (person.phone && typeof person.phone === 'string' && person.phone.trim().toLowerCase() !== 'undefined') {
      const parsedPhone = parsePhoneNumber(normalizePhoneNumber(person.phone));
      if (parsedPhone && parsedPhone.country) {
        return parsedPhone.country;
      }
    }
  } catch {
    return '';
  }
  return '';
}
