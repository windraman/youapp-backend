import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { User } from 'src/schemas/users.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@ValidatorConstraint({ name: 'EmailExist', async: false })
export class EmailExist implements ValidatorConstraintInterface {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  validate(text: string, args: ValidationArguments) {
    var users = this.userModel.find({ email: text });
    return !users; // for async validations you must return a Promise<boolean> here
  }

  defaultMessage(args: ValidationArguments) {
    // here you can provide default error message if validation failed
    return 'Email ($value) is alredy taken!';
  }
}
