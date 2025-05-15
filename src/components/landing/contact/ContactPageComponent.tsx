"use client";

import { Button, Form, Input, message, Radio, Select } from "antd";
import React from "react";
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { Contact, ContactQuery } from "@/tina/__generated__/types";
import { tinaField, useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { useApiClient } from "@/hooks/api-hook";

const { Option } = Select;

type Props = Contact & {
  cmsQuery?: any;
};
interface FormValues {
  formType: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  liveInCanada: boolean;
  province?: string;
  comment: string;
}

const provinces = [
  "Ontario",
  "Quebec",
  "Nova Scotia",
  "New Brunswick",
  "Manitoba",
  "British Columbia",
  "Prince Edward Island",
  "Saskatchewan",
  "Alberta",
  "Newfoundland and Labrador",
];
const formType = "inquiry";
export const ContactPageComponent: React.FC<Props> = ({ cmsQuery }) => {
  const { data } = useTina<ContactQuery>(cmsQuery);
  const [form] = Form.useForm<FormValues>();
  const { post, inProgress } = useApiClient();
  const liveInCanada = Form.useWatch("liveInCanada", form);

  const [messageApi] = message.useMessage();

  const handleSubmit = async (values: FormValues) => {
    values.formType = formType;
    await post("/api/Form/submitOtherCategories", values, undefined, true);
    form.resetFields();
    form.setFieldsValue({ formType });
    messageApi.success("Form submitted successfully!");
  };
  return (
    <>
      <style jsx global>{`
        .ant-radio-wrapper .ant-radio-checked .ant-radio-inner {
          border-color: #ef4444 !important;
        }
        .ant-radio-wrapper .ant-radio:hover .ant-radio-inner {
          border-color: #ef4444;
        }
        .ant-radio-wrapper .ant-radio-input:focus + .ant-radio-inner {
          box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.08);
        }
        .ant-radio-wrapper .ant-radio-inner::after {
          background-color: #ef4444;
        }
      `}</style>
      <section className="mt-10 px-4 md:px-16">
        <div
          className="text-center"
          data-tina-field={tinaField(data.contact, "message")}
        >
          <TinaMarkdown
            content={data.contact.heading}
            components={{
              h1: (p: any) => (
                <h1
                  className="text-3xl md:text-4xl lg:text-5xl font-bold"
                  {...p}
                />
              ),
              p: (p: any) => (
                <p
                  className="text-sm md:text-base mt-4 mb-6 text-gray-500"
                  {...p}
                />
              ),
            }}
          />
        </div>
      </section>

      <section className="bg-gray-900 text-gray-300 mt-32 px-5 md:px-36 py-12 mb-10 dark w-full">
        <div className="w-full flex flex-col md:flex-row gap-8 items-start">
          {/* Contact Info */}
          <div className="w-full md:w-1/3 space-y-16 place-self-center">
            {data.contact?.address && (
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 flex justify-center items-center bg-gray-700 rounded-full">
                  <FaMapMarkerAlt className="text-red-500 text-lg" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold">Address</h4>
                  <p className="text-sm text-gray-400">
                    {data.contact.address}
                  </p>
                </div>
              </div>
            )}
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 flex justify-center items-center bg-gray-700 rounded-full">
                <FaEnvelope className="text-red-500 text-lg" />
              </div>
              <div>
                <h4 className="text-lg font-semibold">Email</h4>
                <p className="text-sm text-gray-400">{data.contact.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 flex justify-center items-center bg-gray-700 rounded-full">
                <FaPhoneAlt className="text-red-500 text-lg" />
              </div>
              <div>
                <h4 className="text-lg font-semibold">Phone</h4>
                <p className="text-sm text-gray-400">
                  {data.contact.phoneNumber}
                </p>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden md:block w-px bg-gray-700"></div>

          {/* Contact Form */}
          <div className="w-full md:w-2/3">
            <Form
              size="large"
              initialValues={{ formType, liveInCanada: undefined }}
              form={form}
              onFinish={handleSubmit}
              className="space-y-8"
              layout="vertical"
            >
              <div className="flex gap-4">
                <Form.Item
                  name="firstName"
                  label={<span className="text-white">First Name</span>}
                  rules={[
                    {
                      required: true,
                      message: "Please input your first name!",
                    },
                  ]}
                  className="flex-1"
                >
                  <Input className="bg-gray-700 border-gray-600 text-white" />
                </Form.Item>
                <Form.Item
                  name="lastName"
                  label={<span className="text-white">Last Name</span>}
                  rules={[
                    { required: true, message: "Please input your last name!" },
                  ]}
                  className="flex-1"
                >
                  <Input className="bg-gray-700 border-gray-600 text-white" />
                </Form.Item>
              </div>

              <Form.Item
                name="email"
                label={<span className="text-white">Email</span>}
                rules={[
                  { required: true, message: "Please input your email!" },
                  { type: "email", message: "Please enter a valid email!" },
                ]}
              >
                <Input className="bg-gray-700 border-gray-600 text-white" />
              </Form.Item>

              <Form.Item
                name="mobile"
                label={<span className="text-white">Mobile Phone</span>}
                rules={[
                  {
                    required: true,
                    message: "Please input your mobile number!",
                  },
                ]}
              >
                <Input className="bg-gray-700 border-gray-600 text-white" />
              </Form.Item>

              <Form.Item
                name="liveInCanada"
                label={
                  <span className="text-white">Do you live in Canada?</span>
                }
                rules={[
                  { required: true, message: "Please select an option!" },
                ]}
              >
                <Radio.Group>
                  <Radio value={true} className="!text-white">
                    Yes
                  </Radio>
                  <Radio value={false} className="!text-white">
                    No
                  </Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item
                name="province"
                label={<span className="text-white">Province</span>}
                hidden={!liveInCanada}
                rules={[
                  { required: liveInCanada, message: "Please select province" },
                ]}
              >
                <Select placeholder="Select province">
                  {provinces.map((p) => (
                    <Option key={p} value={p}>
                      {p}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                name="comment"
                label={<span className="text-white">Comments/Questions</span>}
                rules={[
                  { required: true, message: "Please input your comment!" },
                ]}
              >
                <Input.TextArea
                  rows={4}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  size="large"
                  className="!bg-red-600 !hover:!bg-red-500 !text-white !font-bold"
                  style={{ borderRadius: "unset" }}
                  loading={inProgress}
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </section>
    </>
  );
};

