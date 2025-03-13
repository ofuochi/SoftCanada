import React from "react";
import { Form, Input, FormItemProps, InputProps } from "antd";
import { cn } from "@/utils/cn";

interface CustomFormInputProps<T> extends Omit<FormItemProps<T>, "className"> {
  inputClassName?: string;
  containerClassName?: string;
  inputProps?: InputProps;
  placeholder?: string;
}

const CustomFormInput = <T extends object>({
  label,
  name,
  rules,
  inputClassName,
  containerClassName,
  inputProps,
  placeholder,
  ...restProps
}: CustomFormInputProps<T>) => {
  return (
    <Form.Item<T>
      label={label}
      name={name}
      rules={rules}
      className={cn("w-full", containerClassName)}
      {...restProps}
    >
      <Input
        className={cn(
          "h-9 border border-[#CBCBCB] !font-poppins",
          inputClassName
        )}
        placeholder={placeholder}
        {...inputProps}
      />
    </Form.Item>
  );
};

export default CustomFormInput;

