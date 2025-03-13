import React from "react";
import { Form, Input, FormItemProps, Select, SelectProps } from "antd";
import { cn } from "@/utils/cn";

const { Option } = Select;

interface CustomFormSelectProps<T> extends Omit<FormItemProps<T>, "className"> {
  selectClassName?: string;
  containerClassName?: string;
  selectProps?: SelectProps;
  placeholder?: string;
  optionValues: {
    label: string;
    value: string;
  }[];
}

const CustomFormSelect = <T extends object>({
  label,
  rules,
  name,
  selectClassName,
  containerClassName,
  selectProps,
  placeholder,
  optionValues,
  ...restProps
}: CustomFormSelectProps<T>) => {
  return (
    <Form.Item<T>
      label={label}
      name={name}
      rules={rules}
      className={cn("w-full", containerClassName)}
      {...restProps}
    >
      <Select
        placeholder="Select option"
        className="!h-12 !font-poppins"
        allowClear
        {...selectProps}
      >
        {optionValues.map((option) => (
          <Option key={option.label} value={option.value}>
            {option.value}
          </Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default CustomFormSelect;

