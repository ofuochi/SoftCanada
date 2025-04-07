"use client";

import { useDashboard } from "@/contexts/DashboardContext";
import { useApiClient } from "@/hooks/api-hook";
import {
  MinusCircleOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  Button,
  Form,
  FormProps,
  GetProp,
  Input,
  message,
  Select,
  Upload,
  Image as AntImage,
} from "antd";
import {
  RcFile,
  UploadChangeParam,
  UploadFile,
  UploadProps,
} from "antd/es/upload";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const { Option } = Select;

type Expertise = {
  areaOfExpertise: string;
  yearsOfExperience: string;
};

type CareerAdvisorApplicationInfo = {
  title: string;
  phoneNumber: string;
  name: string;
  expertise: Expertise[];
  qualifications: string;
  image: RcFile;
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

const convertAdvisorType = (advisorType: string): string | null => {
  const advisorMap: { [key: string]: string } = {
    finance_advisor: "Finance",
    career_advisor: "Career",
    immigration_advisor: "Immigration",
    study_advisor: "Study",
  };

  return advisorMap[advisorType] || null;
};

export default function AdvisorApplication() {
  const router = useRouter();
  const { advisorType, setAdvisorType } = useDashboard();
  const { post, inProgress } = useApiClient();
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm<CareerAdvisorApplicationInfo>();
  const { setFieldValue, resetFields } = form;
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);

  const searchParams = useSearchParams();
  const type = searchParams.get("at");

  const handleSubmit: FormProps<CareerAdvisorApplicationInfo>["onFinish"] =
    async (values) => {
      const formData = new FormData();

      if (values.motivationStatement !== undefined) {
        formData.append(
          "Advisor.MotivationStatement",
          values.motivationStatement.toString()
        );
      }

      formData.append("Advisor.Name", values.name.toString());
      formData.append("Advisor.Title", values.title.toString());
      formData.append("Advisor.PhoneNumber", values.phoneNumber.toString());
      formData.append(
        "Advisor.Qualification",
        values.qualifications.toString()
      );

      formData.append("Advisor.expertise", JSON.stringify(values.expertise));
      formData.append("Advisor.AdvisorType", type!.toString());
      formData.append("Image", values.image);

      await post("/api/advisors", formData)
        .then(() => {
          resetFields();
          setImageUrl(undefined);
          router.push("/dashboard");
          messageApi.success("Application submitted successfully");
        })
        .catch((error) => {
          messageApi.error(error);
        });

      // make a POST call to /api/auth/update-session to nextjs backend
      // to update the session with the new user role
      // this is to make sure the user can see the new role in the dashboard
      await fetch("/api/auth/update-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          role: type, // Gets the updated role from the url
        }),
      });
    };
  const handleChange = (info: UploadChangeParam<UploadFile<any>>) => {
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj as FileType, (url) => {
        setImageUrl(url);
        setFieldValue("image", info.file.originFileObj);
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

  useEffect(() => {
    if (type) {
      const advisorType = convertAdvisorType(type) || "";
      setAdvisorType(advisorType);
    }
  }, [type]);

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
              {" "}
              Complete the form below to start your journey as a{" "}
              {advisorType ?? ""} Advisor.{" "}
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
                    label="Job Title"
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
                                <Option value="Science">
                                  Science and Research
                                </Option>
                                <Option value="Finance">Finance</Option>
                                <Option value="Engineering">
                                  Engineering and Manufacturing
                                </Option>
                                <Option value="HealthCare">
                                  Health Care and Medicine
                                </Option>
                                <Option value="Education">
                                  Education and Training
                                </Option>
                                <Option value="Media">
                                  Creative and Media
                                </Option>
                                <Option value="Transportation">
                                  Transportation and Logistics
                                </Option>
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

