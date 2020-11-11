export function emailIsValid(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function fieldIsEmpty(value: string) {
  if (!value) { return true; }
  return (value || '').length < 1;
}

export function minLength(value: string, min = 6) {
  if (!value) { return true; }
  return value.length < min;
}
