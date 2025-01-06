"use client"
import Input from '@/shared/Input/Input';
import { FC, useState } from 'react';
import { UseFormRegister } from 'react-hook-form';
import eyeOpenIcon from "@/images/icons/eye-open.png"
import eyeHiddenIcon from "@/images/icons/eye-hide.png"

import Image from 'next/image';

interface PasswordInputProps {
  className?: string;
  register: UseFormRegister<any>;
  name:string;
  inputLabel:string;
  passwordValue?:string;
}

const PasswordInput: FC<PasswordInputProps> = ({ className, register,name,inputLabel,passwordValue }) => {
  const [isPassword,setIsPassword] = useState(true)

  const handleClick = ()=> setIsPassword((prev)=> !prev)
  return (
    <label className={`block ${className} relative`} >
      <span>{inputLabel}</span>
      <Input
        type={isPassword ? 'password' : "text"}
        placeholder='*******'

        {...passwordValue ?      {...register(name, {
          required: 'Password Field is Required!',
          minLength: {
            value: 6,
            message: 'Password must be at least 6 characters',
          },
          
          validate: value =>
            value === passwordValue || 'Passwords do not match',
        })} :      {...register(name, {
          required: 'Password Field is Required!',
          minLength: {
            value: 6,
            message: 'Password must be at least 6 characters',
          },
        
        })}}
   
        name={name}
      />
      <Image onClick={handleClick} src={isPassword ?  eyeOpenIcon  : eyeHiddenIcon } alt='eyeOpen' width={20} height={20} className="absolute right-5 top-9 cursor-pointer"/>
    </label>
  );
};

export default PasswordInput;
