"use client";

import {
  MinusCircleOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, Select, Upload, Image as AntImage } from "antd";
import Image from "next/image";
import { UploadChangeParam, UploadFile } from "antd/es/upload";
import {
  AdvisorApplicationFormData,
  useAdvisorApplicationForm,
} from "./useAdvisorApplicationForm";

const { Option } = Select;

// Split into reusable subcomponents
const PersonalInfoSection = ({ validationRules }: { validationRules: any }) => (
  <div className="flex flex-col gap-5">
    <h6 className="font-medium text-black text-xl">Personal Information</h6>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <Form.Item<AdvisorApplicationFormData>
        label="Full name"
        name="name"
        className="w-full"
        rules={validationRules.name}
      >
        <Input className="h-9 !font-poppins border !border-[#CBCBCB]" />
      </Form.Item>

      <Form.Item<AdvisorApplicationFormData>
        label="Contact number"
        name="phoneNumber"
        rules={validationRules.phoneNumber}
      >
        <Input className="h-9 !font-poppins border !border-[#CBCBCB]" />
      </Form.Item>

      <Form.Item<AdvisorApplicationFormData>
        label="Job Title"
        name="title"
        rules={validationRules.title}
      >
        <Input className="h-9 !font-poppins border !border-[#CBCBCB]" />
      </Form.Item>
    </div>
  </div>
);

const ExpertiseSection = ({ validationRules }: { validationRules: any }) => {
  // Define expertise validation rules
  const expertiseRules = {
    areaOfExpertise: [
      {
        required: true,
        message: "Please select an area of expertise",
      },
    ],
    yearsOfExperience: [
      {
        required: true,
        message: "Please select years of experience",
      },
    ],
  };

  return (
    <div className="flex flex-col gap-5">
      <h6 className="font-medium text-black text-xl">Expertise Details</h6>
      <Form.List
        name="expertise"
        rules={[
          {
            validator: async (_, expertise) => {
              if (!expertise || expertise.length === 0) {
                return Promise.reject(
                  new Error("At least one expertise is required")
                );
              }
              return Promise.resolve();
            },
          },
        ]}
      >
        {(fields, { add, remove }, { errors }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <div
                key={key}
                className="flex items-center gap-2.5 flex-col-reverse md:flex-row"
              >
                <div className="w-full flex flex-col md:flex-row gap-5 flex-1">
                  <Form.Item
                    {...restField}
                    name={[name, "areaOfExpertise"]}
                    label="Select Area of Expertise"
                    rules={expertiseRules.areaOfExpertise}
                    className="w-full"
                  >
                    <Select
                      placeholder="Select option"
                      className="!min-h-9 !font-poppins"
                      allowClear
                    >
                      <Option value="Science">Science and Research</Option>
                      <Option value="Finance">Finance</Option>
                      <Option value="Engineering">
                        Engineering and Manufacturing
                      </Option>
                      <Option value="HealthCare">
                        Health Care and Medicine
                      </Option>
                      <Option value="Education">Education and Training</Option>
                      <Option value="Media">Creative and Media</Option>
                      <Option value="Transportation">
                        Transportation and Logistics
                      </Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    name={[name, "yearsOfExperience"]}
                    label="Years of Experience"
                    rules={expertiseRules.yearsOfExperience}
                    className="w-full"
                  >
                    <Select
                      placeholder="Select option"
                      className="!h-9 !font-poppins"
                      allowClear
                    >
                      <Option value="0">Less than 1 year</Option>
                      <Option value="2-5">2 to 5 years</Option>
                      <Option value="5-10">5 to 10 years</Option>
                      <Option value="10+">10+ years</Option>
                    </Select>
                  </Form.Item>
                </div>

                <MinusCircleOutlined
                  className="max-md:mr-auto"
                  onClick={() => remove(name)}
                />
              </div>
            ))}
            <Form.Item>
              <Button
                className="!bg-[#010B18] !border !border-[#010B18] !w-[167px] !h-[44px] rounded-[6px] !text-white !font-poppins"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Add Expertise
              </Button>
              <Form.ErrorList errors={errors} />
            </Form.Item>
          </>
        )}
      </Form.List>
    </div>
  );
};

const QualificationsSection = ({
  validationRules,
}: {
  validationRules: any;
}) => (
  <div className="flex flex-col gap-5">
    <h6 className="font-medium text-black text-xl">Qualifications</h6>
    <div className="flex">
      <Form.Item<AdvisorApplicationFormData>
        name="qualifications"
        label="List any certifications or relevant experience."
        className="w-full"
        rules={validationRules.qualifications}
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
);

const ImageUploadSection = ({
  imageUrl,
  validationRules,
  handleImageChange,
  handleImageRemove,
  handleBeforeUpload,
}: {
  imageUrl?: string;
  validationRules: any;
  handleImageChange: (info: UploadChangeParam<UploadFile<any>>) => void;
  handleImageRemove: () => void;
  handleBeforeUpload: (file: File) => boolean;
}) => (
  <div className="flex flex-col gap-5">
    <h6 className="font-medium text-black text-xl">Upload Cover Image</h6>
    <Form.Item name="image" rules={validationRules.image}>
      <Upload
        maxCount={1}
        onChange={handleImageChange}
        onRemove={handleImageRemove}
        beforeUpload={handleBeforeUpload}
        accept=".jpeg, .jpg, .png, .webp,"
        className="!font-poppins"
      >
        <Button className="!font-poppins" icon={<UploadOutlined />}>
          Click to Upload
        </Button>
        {imageUrl && (
          <AntImage
            alt="preview"
            preview={false}
            src={imageUrl}
            className="object-cover mt-6 h-[250px]"
          />
        )}
      </Upload>
    </Form.Item>
  </div>
);

const MotivationSection = () => (
  <div className="flex flex-col gap-5">
    <h6 className="font-medium text-black text-xl">
      Motivation Statement (Optional)
    </h6>
    <div className="flex">
      <Form.Item<AdvisorApplicationFormData>
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
);

export default function AdvisorApplication() {
  const {
    form,
    inProgress,
    imageUrl,
    advisorType,
    contextHolder,
    validationRules,
    handleSubmit,
    handleImageChange,
    handleImageRemove,
    handleBeforeUpload,
  } = useAdvisorApplicationForm();

  return (
    <>
      {contextHolder}
      <section className="w-full bg-white pb-[30px] px-4 sm:px-6 max-xl:py-6 md:px-10 rounded-xl max-w-[1320px]">
        <div className="flex max-md:flex-col-reverse items-center md:justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="font-dm_sans font-semibold text-[38px] leading-[49.8px] text-black max-md:text-center">
              {advisorType ?? ""} Advisor Application
            </h1>
            <span className="font-lato text-[#4F4F4F] font-normal text-lg max-md:text-center">
              Complete the form below to start your journey as a{" "}
              {advisorType ?? ""} Advisor.
            </span>
          </div>
          <div className="">
            <Image
              width={228}
              height={228}
              alt="facetime"
              src={"/images/career-advisor/facetime.svg"}
            />
          </div>
        </div>

        <Form
          form={form}
          name="AdvisorApplicationForm"
          initialValues={{ expertise: [{}] }}
          onFinish={handleSubmit}
          autoComplete="off"
          layout="vertical"
        >
          <section className="flex flex-col xl:flex-row w-full mt-8 gap-8 font-poppins">
            <div className="flex flex-col gap-6 w-full xl:max-w-[500px]">
              {/* Personal Information */}
              <PersonalInfoSection validationRules={validationRules} />

              {/* Expertise Details */}
              <ExpertiseSection validationRules={validationRules} />

              {/* Qualifications */}
              <QualificationsSection validationRules={validationRules} />
            </div>

            <div className="flex flex-col flex-1 gap-6 w-full xl:max-w-[500px]">
              {/* Image Upload */}
              <ImageUploadSection
                imageUrl={imageUrl}
                validationRules={validationRules}
                handleImageChange={handleImageChange}
                handleImageRemove={handleImageRemove}
                handleBeforeUpload={handleBeforeUpload}
              />

              {/* Motivation Statement */}
              <MotivationSection />

              <Form.Item label={null}>
                <Button
                  disabled={inProgress}
                  loading={inProgress}
                  htmlType="submit"
                  className="w-full !bg-black !border-black !py-1 !px-3 !text-white !h-12 !rounded-md !font-semibold !text-[13px] leading-[15.6px] !font-poppins"
                >
                  Submit Application
                </Button>
              </Form.Item>
            </div>
          </section>
        </Form>
      </section>
    </>
  );
}
