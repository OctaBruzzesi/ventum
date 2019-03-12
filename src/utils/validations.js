const required = value => (value || typeof value === 'number' ? undefined : 'Campo obligatorio');
const maxLength = max => value => (value && value.length > max ? `Maximo ${max} caracteres` : undefined);
const minLength = min => value => (value && value.length < min ? `Minimo ${min} caracteres` : undefined);
const number = value => (value && isNaN(Number(value)) ? 'Debe ser número' : undefined);
const email = value => (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
  ? 'Email invalido'
  : undefined);
const alphaNumeric = value => (value && /[^a-zA-Z0-9 ]/i.test(value)
  ? 'Only alphanumeric characters'
  : undefined);
const phoneNumber = value => (value && !/^(0|[1-9][0-9]{9})$/i.test(value)
  ? 'Teléfono inválido, debe ser de 10 caracteres'
  : undefined);

export {
  required, maxLength, minLength, number, email, phoneNumber,
};
