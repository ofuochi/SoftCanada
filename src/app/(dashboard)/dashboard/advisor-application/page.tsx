"use client";

import { useDashboard } from "@/contexts/DashboardContext";
import { useApiClient } from "@/hooks/api-hook";
import {
  MinusCircleOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useUser } from "@auth0/nextjs-auth0/client";
import {
  Button,
  Form,
  FormProps,
  GetProp,
  Input,
  message,
  Select,
  Upload,
} from "antd";
import { UploadChangeParam, UploadFile, UploadProps } from "antd/es/upload";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const { Option } = Select;

type Expertise = {
  areaOfExpertise: string;
  yearsOfExperience: string;
};

type CareerAdvisorApplicationInfo = {
  title?: string;
  phoneNumber?: string;
  name?: string;
  expertise?: Expertise[];
  qualifications?: string;
  image: string;
  motivationStatement?: string;
};

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};
// Allowed image MIME types
const allowedTypes = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/gif",
  "image/webp",
];

// Max file size (5MB in bytes)
const maxSize = 1 * 1024 * 1024;

export default function AdvisorApplicationPage() {
  const { user } = useUser();

  console.log(user, "user");

  const router = useRouter();
  const { advisorType } = useDashboard();

  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm<CareerAdvisorApplicationInfo>();
  const { setFieldValue, resetFields } = form;
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const { post } = useApiClient();

  const handleSubmit: FormProps<CareerAdvisorApplicationInfo>["onFinish"] =
    async (values) => {
      const formData = new FormData();

      formData.append("CareerAdvisor.Name", JSON.stringify(values.name));
      formData.append("CareerAdvisor.Title", JSON.stringify(values.title));
      formData.append(
        "CareerAdvisor.PhoneNumber",
        JSON.stringify(values.phoneNumber)
      );
      formData.append(
        "CareerAdvisor.Qualification",
        JSON.stringify(values.qualifications)
      );
      formData.append(
        "CareerAdvisor.MotivationStatement",
        JSON.stringify(values.motivationStatement)
      );
      formData.append(
        "CareerAdvisor.expertise",
        JSON.stringify(values.expertise)
      );
      formData.append(
        "CareerAdvisor.Expertise",
        JSON.stringify(values.expertise)
      );

      await post("/api/career-advisors", formData);
      resetFields();
      setImageUrl(undefined);
      router.push("/dashboard");
  const handleChange = (info: UploadChangeParam<UploadFile<any>>) => {
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj as FileType, (url) => {
        setImageUrl(url);
        setFieldValue("image", url);
      });
    }
  };

  const handleBeforeUpload = (file: File) => {
    // Check file type
    if (!allowedTypes.includes(file.type)) {
      const error = `File type ${file.type} is not supported. Please upload an image (JPEG, PNG, GIF, or WEBP)`;
      messageApi.error(error);
      return Upload.LIST_IGNORE;
    }

    // Check file size
    if (file.size > maxSize) {
      const error = `File size exceeds 5MB limit. Current file size: ${(
        file.size /
        1024 /
        1024
      ).toFixed(2)}MB`;
      messageApi.error(error);
      return Upload.LIST_IGNORE;
    }
  };

  const handleRemove = (file: UploadFile<any>) => setImageUrl(undefined);

  return (
    <>
      {contextHolder}
      <section className="w-full bg-white pb-[30px] px-4 sm:px-6 max-xl:py-6 md:px-10 rounded-xl max-w-[1320px]">
        <div className="flex max-md:flex-col-reverse items-center md:justify-between">
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
              width={228}
              height={228}
              alt="facetime"
              src={"/images/career-advisor/facetime.svg"}
            />
          </div>
        </div>

        <Form
          form={form}
          name="CareerAdvisorApplicationInfo"
          initialValues={{ expertise: [{}] }}
          onFinish={handleSubmit}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
        >
          <section className="flex flex-col xl:flex-row w-full mt-8 gap-8 font-poppins">
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
                    name="name"
                    className="w-full"
                    rules={[
                      {
                        required: true,
                        message: "Please input your full name",
                      },
                    ]}
                  >
                    <Input className="h-9 !font-poppins border !border-[#CBCBCB]" />
                  </Form.Item>

                  <Form.Item<CareerAdvisorApplicationInfo>
                    label="Contact number"
                    name="phoneNumber"
                    rules={[
                      {
                        required: true,
                        message: "Please input your contact number",
                      },
                      {
                        pattern:
                          /^(\+1\s?)?(\([0-9]{3}\)|[0-9]{3})[\s\-]?[0-9]{3}[\s\-]?[0-9]{4}$/,
                        message:
                          "Please enter a valid US or Canadian phone number",
                      },
                    ]}
                  >
                    <Input className="h-9 !font-poppins border !border-[#CBCBCB]" />
                  </Form.Item>

                  <Form.Item<CareerAdvisorApplicationInfo>
                    label="Title"
                    name="title"
                    rules={[
                      {
                        required: true,
                        message: "Please input your title",
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
                <Form.List name="expertise">
                  {(fields, { add, remove }) => (
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
                              rules={[
                                {
                                  required: true,
                                  message:
                                    "Please input your areas of expertise",
                                },
                              ]}
                              className="w-full"
                            >
                              <Select
                                placeholder="Select option"
                                className="!min-h-9 !font-poppins"
                                allowClear
                              >
                                <Option value="Tech">Tech</Option>
                                <Option value="Finance">Finance</Option>
                                <Option value="Engineering">Engineering</Option>
                              </Select>
                            </Form.Item>

                            <Form.Item
                              {...restField}
                              name={[name, "yearsOfExperience"]}
                              label="Years of Experience"
                              rules={[
                                {
                                  required: true,
                                  message:
                                    "Please input your years of experience",
                                },
                              ]}
                              className="w-full"
                            >
                              <Select
                                placeholder="Select option"
                                className="!h-9 !font-poppins"
                                allowClear
                              >
                                {[1, 2, 3, 4, 5].map((year) => (
                                  <Option key={year} value={year.toString()}>
                                    {year}
                                  </Option>
                                ))}
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
                        {fields.length === 0 && (
                          <span className="block text-[#ff4d4f]">
                            Expertise details is required
                          </span>
                        )}
                      </Form.Item>
                    </>
                  )}
                </Form.List>
              </div>

              {/* Qualifications */}
              <div className="flex flex-col gap-5">
                <h6 className="font-medium text-black text-xl">
                  Qualifications
                </h6>
                <div className="flex">
                  <Form.Item<CareerAdvisorApplicationInfo>
                    name="qualifications"
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
              <div className="flex flex-col gap-5">
                <h6 className="font-medium text-black text-xl">
                  Upload Cover Image
                </h6>
                <Form.Item
                  name="image"
                  rules={[
                    {
                      required: true,
                      message: "Please input your cover image",
                    },
                  ]}
                >
                  <Upload
                    maxCount={1}
                    onChange={handleChange}
                    onRemove={handleRemove}
                    beforeUpload={handleBeforeUpload}
                    // showUploadList={false}
                    accept=".jpeg, .jpg, .png, .webp,"
                    className="!font-poppins"
                  >
                    <Button className="!font-poppins" icon={<UploadOutlined />}>
                      Click to Upload
                    </Button>
                    {imageUrl && (
                      <Image
                        width={495}
                        height={200}
                        alt="preview"
                        src={imageUrl}
                        className="object-cover mt-6 h-[250px]"
                      />
                    )}
                  </Upload>
                </Form.Item>
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
    </>
  );
}

