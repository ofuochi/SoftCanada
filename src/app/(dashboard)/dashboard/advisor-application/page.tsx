"use client";

import { useDashboard } from "@/contexts/DashboardContext";
import { Button, Form, Input, Select } from "antd";
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

export default function AdvisorApplicationPage() {
  const { advisorType } = useDashboard();
  const [form] = Form.useForm<CareerAdvisorApplicationInfo>();

  const availabilityTime = [
    "05:00 PM",
    "11:00 AM",
    "12:00 PM",
    "9:00 AM",
    "02:00 AM",
  ];

  const handleAvailabitityClick = (time: string) => () => {
    const currentAvailability = form.getFieldValue("availability") || [];
    const newAvailability = [...new Set([...currentAvailability, time])];
    form.setFieldValue("availability", newAvailability);
  };

  return (
    <section className="w-full bg-white pb-[30px] px-5 pt-3 rounded-xl">
      <div className="flex max-md:flex-col-reverse items-center h-fit md:justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="font-dm_sans font-semibold text-[38px] leading-[49.8px] text-black max-md:text-center">
            {advisorType} Advisor Application
          </h1>
          <span className="font-lato text-[#4F4F4F] font-normal text-lg max-md:text-center">
            {" "}
            Complete the form below to start your journey as a {
              advisorType
            }{" "}
            Advisor.{" "}
          </span>
        </div>
        <div className="">
          <Image
            width={150}
            height={150}
            alt="facetime"
            src={"/images/career-advisor/facetime.svg"}
          />
        </div>
      </div>

      <Form
        form={form}
        name="CareerAdvisorApplicationInfo"
        initialValues={{ remember: true }}
        // onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
      >
        <section className="flex flex-col xl:flex-row w-full mt-8 gap-8 px-4 font-poppins">
          <div className="flex flex-col gap-6 w-full xl:max-w-[500px]">
            {/* Personal Information */}
            <div className="flex flex-col gap-5">
              <h6 className="font-medium text-black text-xl">
                {" "}
                Personal Information{" "}
              </h6>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Form.Item<CareerAdvisorApplicationInfo>
                  label="Full name"
                  name="fullName"
                  className="w-full"
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
              </div>
            </div>

            {/* Expertise Details */}
            <div className="flex flex-col gap-5">
              <h6 className="font-medium text-black text-xl">
                Expertise Details
              </h6>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Form.Item<CareerAdvisorApplicationInfo>
                  name="expertise"
                  label="Select Areas of Expertise"
                  rules={[
                    {
                      required: true,
                      message: "Please input your areas of expertise",
                    },
                  ]}
                >
                  <Select
                    placeholder="Select option"
                    className="!min-h-9 !font-poppins"
                    allowClear
                  >
                    <Option value="Tech"> Tech </Option>
                    <Option value="Finance"> Finance </Option>
                    <Option value="Engineering"> Engineering </Option>
                  </Select>
                </Form.Item>

                <Form.Item<CareerAdvisorApplicationInfo>
                  name="experience"
                  label="Years of Experience"
                  rules={[
                    {
                      required: true,
                      message: "Please input your years of experience",
                    },
                  ]}
                >
                  <Select
                    placeholder="Select option"
                    className="!h-9 !font-poppins"
                    allowClear
                  >
                    <Option value="1"> 1 </Option>
                    <Option value="2"> 2 </Option>
                    <Option value="3"> 3 </Option>
                    <Option value="4"> 4 </Option>
                    <Option value="5"> 5 </Option>
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
                  rules={[
                    {
                      required: true,
                      message: "Please input your qualifications",
                    },
                  ]}
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

          <div className="flex flex-col flex-1 gap-6 w-full xl:max-w-[500px]">
            {/* Availability */}
            <div className="flex flex-col gap-5">
              <h6 className="font-medium text-black text-xl">Availability</h6>
              <div className="flex flex-col gap-4">
                <Form.Item<CareerAdvisorApplicationInfo>
                  name="availability"
                  className="w-full"
                  label="Select preferred days and times for sessions."
                  rules={[
                    {
                      required: true,
                      message:
                        "Please input your preferred session days and times",
                    },
                  ]}
                >
                  <Select
                    mode="multiple"
                    placeholder="Select option"
                    className="!min-h-9 !font-poppins"
                    allowClear
                  >
                    {availabilityTime.map((time, i) => (
                      <Option value={time} key={i}>
                        {" "}
                        {time}{" "}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                <div className="flex gap-3 min-[590px]:justify-between flex-wrap">
                  {availabilityTime.map((time, i) => (
                    <span
                      key={i}
                      onMouseDown={handleAvailabitityClick(time)}
                      className="border-[0.6px] border-[#808080] h-[30px] w-[74.5px] rounded text-black font-semibold text-[10px] flex justify-center items-center md:cursor-pointer"
                    >
                      {time}
                    </span>
                  ))}
                </div>
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
                  rules={[{ required: false }]}
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

            <Form.Item label={null}>
              <Button
                htmlType="submit"
                className="w-full !bg-[#4441F8] !border-[#4441F8] !py-1 !px-3 !text-white !h-12 !rounded-md !font-semibold !text-[13px] leading-[15.6px] !font-poppins"
              >
                Submit Application
              </Button>
            </Form.Item>
          </div>
        </section>
      </Form>
    </section>
  );
}

