"use client";

import { Form, Input, Select } from "antd";
import Image from "next/image";

const { Option } = Select;

type CareerAdvisorApplicationInfo = {
  fullName?: string;
  email?: string;
  contact?: string;
  expertise?: string;
  experience?: string;
  qualtifications?: string;
  availability?: string;
  motivationStatement?: string;
};

export default function CareerAdvisorPage() {
  return (
    <section className="w-full bg-white pb-[30px] px-5">
      <div className="flex max-md:flex-col-reverse items-center md:justify-between border border-black">
        <div className="flex flex-col gap-2">
          <h1 className="font-dm_sans font-semibold text-[38px] leading-[49.8px] text-black">
            Career Advisor Application
          </h1>
          <span className="font-lato text-[#4F4F4F] font-normal text-lg">
            {" "}
            Complete the form below to start your journey as a Career Advisor.{" "}
          </span>
        </div>
        <div className="border border-black">
          <Image
            width={228}
            height={228}
            alt="facetime"
            src={"/images/career-advisor/facetime.svg"}
          />
        </div>
      </div>

      <Form
        name="CareerAdvisorApplicationInfo"
        initialValues={{ remember: true }}
        // onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
      >
        <section className="flex flex-col xl:flex-row border border-black w-full mt-8 gap-8 font-poppins">
          <div className="flex flex-col gap-6 w-full xl:max-w-[500px]">
            {/* Personal Information */}
            <div className="flex flex-col gap-5">
              <h6 className="font-medium text-black text-xl">
                {" "}
                Personal Information{" "}
              </h6>
              <div className="grid grid-cols-2 gap-6 border border-black">
                <Form.Item<CareerAdvisorApplicationInfo>
                  label="Full name"
                  name="fullName"
                  className="border border-black w-full"
                  rules={[
                    { required: true, message: "Please input your full name" },
                  ]}
                >
                  <Input className="h-9 !font-poppins border !border-[#CBCBCB]" />
                </Form.Item>

                <Form.Item<CareerAdvisorApplicationInfo>
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Please input your email address",
                    },
                  ]}
                >
                  <Input className="h-9 !font-poppins border !border-[#CBCBCB]" />
                </Form.Item>

                <Form.Item<CareerAdvisorApplicationInfo>
                  label="Contact number"
                  name="contact"
                  rules={[
                    {
                      required: true,
                      message: "Please input your contact number",
                    },
                  ]}
                >
                  <Input className="h-9 !font-poppins border !border-[#CBCBCB]" />
                </Form.Item>

                {/* <Form.Item label={null}>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item> */}
              </div>
            </div>

            {/* Expertise Details */}
            <div className="flex flex-col gap-5">
              <h6 className="font-medium text-black text-xl">
                Expertise Details
              </h6>
              <div className="grid grid-cols-2 gap-6">
                <Form.Item<CareerAdvisorApplicationInfo>
                  name="expertise"
                  label="Select Areas of Expertise"
                  rules={[{ required: true }]}
                >
                  <Select
                    placeholder="Select option"
                    className="!h-9 !font-poppins"
                    allowClear
                  >
                    <Option value="example"> example </Option>
                  </Select>
                </Form.Item>

                <Form.Item<CareerAdvisorApplicationInfo>
                  name="expertise"
                  label="Years of Experience"
                  rules={[{ required: true }]}
                >
                  <Select
                    placeholder="Select option"
                    className="!h-9 !font-poppins"
                    allowClear
                  >
                    <Option value="example"> example </Option>
                  </Select>
                </Form.Item>
              </div>
            </div>

            {/* Qualifications */}
            <div className="flex flex-col gap-5">
              <h6 className="font-medium text-black text-xl">Qualifications</h6>
              <div className="flex">
                <Form.Item<CareerAdvisorApplicationInfo>
                  name="qualtifications"
                  label="List any certifications or relevant experience."
                  className="w-full"
                  rules={[{ required: true }]}
                >
                  <Input.TextArea
                    className="h-9 !font-poppins resize-none py-4 px-2.5 border !border-[#CBCBCB]"
                    autoSize={{
                      minRows: 8,
                    }}
                    placeholder="Certified Career Coach, 5+ years as a Hiring Manager, etc."
                  />
                </Form.Item>
              </div>
            </div>
          </div>

          <div className="flex flex-col flex-1 gap-6 w-full xl:max-w-[500px] border border-black">
            {/* Availability */}
            <div className="flex flex-col gap-5">
              <h6 className="font-medium text-black text-xl">Availability</h6>
              <div className="flex">
                <Form.Item<CareerAdvisorApplicationInfo>
                  name="availability"
                  className="w-full"
                  label="Select preferred days and times for sessions."
                  rules={[{ required: true }]}
                >
                  <Select
                    mode="multiple"
                    placeholder="Select option"
                    className="!h-9 !font-poppins"
                    allowClear
                  >
                    <Option value="example"> example </Option>
                  </Select>
                </Form.Item>
              </div>
            </div>

            {/* Motivation Statement */}
            <div className="flex flex-col gap-5">
              <h6 className="font-medium text-black text-xl">
                Motivation Statement (Optional)
              </h6>
              <div className="flex">
                <Form.Item<CareerAdvisorApplicationInfo>
                  name="motivationStatement"
                  className="w-full py-4 px-2.5"
                  rules={[{ required: true }]}
                >
                  <Input.TextArea
                    className="h-9 !font-poppins resize-none border !border-[#CBCBCB]"
                    autoSize={{
                      minRows: 8,
                    }}
                    placeholder="Why do you want to become a Career Advisor?"
                  />
                </Form.Item>
              </div>
            </div>
          </div>
        </section>
      </Form>
    </section>
  );
}

