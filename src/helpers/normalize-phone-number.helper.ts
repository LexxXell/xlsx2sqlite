export function normalizePhoneNumber(phoneNumber: string): string {
  return phoneNumber[0] !== '+' ? `+${phoneNumber}` : phoneNumber;
}
