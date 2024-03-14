import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
export function ValidatePassword(
  property?: string,
  validationOptions?: ValidationOptions,
) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [property],
      validator: ValidatePasswordConstraint,
    });
  };
}
@ValidatorConstraint({ name: 'ValidatePassword' })
class ValidatePasswordConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    return /^\S*(?=\S{8,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/.test(
      value,
    );
  }
  defaultMessage(args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;
    return `Password must be at least 8 characters long and include at least one uppercase letter, one digit, and one special character.`;
  }
}
