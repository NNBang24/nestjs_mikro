import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  Length,
} from 'class-validator';
export class CreateUserDto {
  @IsNotEmpty({ message: 'Email khong duoc de trong' })
  @IsEmail({}, { message: 'email khong dung dinh dang' })
  email: string;

  @IsNotEmpty({ message: 'Password khong duoc bo trong' })
  password: string;

  @IsNotEmpty({ message: 'Ten khong duoc de trong' })
  @Length(1, 20, { message: 'Ten phai tu 1 -20 ky tu' })
  name: string;

  @IsOptional()
  @IsPhoneNumber('VN', { message: 'so dien thoai khong dung dinh dang VN' })
  phone: string;
}
