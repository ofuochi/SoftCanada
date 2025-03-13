import React from "react";
import { Form, Input, FormItemProps } from "antd";
import { cn } from "@/utils/cn";
import { TextAreaProps } from "antd/es/input";

interface CustomFormTextareaProps<T>
  extends Omit<FormItemProps<T>, "className"> {
  textareaClassName?: string;
  containerClassName?: string;
  textareaProps?: TextAreaProps;
  placeholder?: string;
}

const CustomFormTextarea = <T extends object>({
  label,
  rules,
  name,
  textareaClassName,
  containerClassName,
  textareaProps,
  placeholder,
  ...restProps
}: CustomFormTextareaProps<T>) => {
  return (
    <Form.Item<T>
      label={label}
      name={name}
      rules={rules}
      className={cn("w-full", containerClassName)}
      {...restProps}
    >
      <Input.TextArea
        className={cn(
          "!h-[128px] !border !border-[#CBCBCB] !font-poppins resize-none",
          textareaClassName
        )}
        autoSize={{
          minRows: 8,
        }}
        placeholder={placeholder}
        {...textareaProps}
      />
    </Form.Item>
  );
};

export default CustomFormTextarea;

