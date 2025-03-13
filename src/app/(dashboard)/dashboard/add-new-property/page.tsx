"use client";

import CustomFormInput from "@/components/CustomFormInput";
import CustomFormSelect from "@/components/CustomFormSelect";
import CustomFormTextarea from "@/components/CustomFormTextarea";
import { useDashboard } from "@/contexts/DashboardContext";
import { useApiClient } from "@/hooks/api-hook";
import { getRoles, UserRoleKey } from "@/lib/abilities";
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

type squareFootage = {
  areaOfsquareFootage: string;
  yearsOfExperience: string;
};

type AddPropertyType = {
  propertyName?: string;
  propertyDescription?: string;
  propertyType?: string;
  location?: string;
  price?: string;
  noOfBedroom?: string;
  noOfBathroom?: string;
  squareFootage?: string;
  contact?: string;
  officeAddress?: string;
  availabilityStatus?: string;
  images: string[];
  videos: string[];
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
const allowedVideoTypes = ["video/mp4", "video/webm", "video/ogg"];

// Max file size (5MB in bytes)
const maxSize = 5 * 1024 * 1024;

// Max file size (50MB in bytes)
const maxVideoSize = 50 * 1024 * 1024;

export default function AddNewProperty() {
  const { user } = useUser();
  const router = useRouter();

  const { post } = useApiClient();
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm<AddPropertyType>();
  const { setFieldValue, resetFields } = form;
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [videoUrls, setVideoUrls] = useState<string[]>([]);

  const handleSubmit: FormProps<AddPropertyType>["onFinish"] = async (
    values
  ) => {
    const formData = new FormData();

    formData.append(
      "CareerAdvisor.propertyName",
      JSON.stringify(values.propertyName)
    );
    formData.append(
      "CareerAdvisor.propertyDescription",
      JSON.stringify(values.propertyDescription)
    );
    formData.append(
      "CareerAdvisor.propertyType",
      JSON.stringify(values.propertyType)
    );
    formData.append("CareerAdvisor.location", JSON.stringify(values.location));
    formData.append("CareerAdvisor.price", JSON.stringify(values.price));
    formData.append(
      "CareerAdvisor.noOfBedroom",
      JSON.stringify(values.noOfBedroom)
    );
    formData.append(
      "CareerAdvisor.noOfBathroom",
      JSON.stringify(values.noOfBathroom)
    );
    formData.append(
      "CareerAdvisor.squareFootage",
      JSON.stringify(values.squareFootage)
    );
    formData.append("CareerAdvisor.contact", JSON.stringify(values.contact));
    formData.append(
      "CareerAdvisor.officeAddress",
      JSON.stringify(values.officeAddress)
    );
    formData.append(
      "CareerAdvisor.availabilityStatus",
      JSON.stringify(values.availabilityStatus)
    );

    await post("/api/career-advisors", formData);
    resetFields();
    setImageUrls([]);
    router.push("/dashboard");

    const handleVideoChange = (info: UploadChangeParam<UploadFile<any>>) => {
      if (info.file.status === "done") {
        info.fileList.map((file) =>
          getBase64(file.originFileObj as FileType, (url) => {
            setVideoUrls((prevUrls) => [...prevUrls, url]);
          })
        );
      }
    };
    const handleChange = (info: UploadChangeParam<UploadFile<any>>) => {
      if (info.file.status === "done") {
        info.fileList.map((file) =>
          getBase64(file.originFileObj as FileType, (url) => {
            setImageUrls((prevUrls) => [...prevUrls, url]);
          })
        );
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

    const handleVideoBeforeUpload = (file: File) => {
      // Check file type
      if (!allowedVideoTypes.includes(file.type)) {
        const error = `File type ${file.type} is not supported. Please upload an image (JPEG, PNG, GIF, or WEBP)`;
        messageApi.error(error);
        return Upload.LIST_IGNORE;
      }

      // Check file size
      if (file.size > maxVideoSize) {
        const error = `File size exceeds 50MB limit. Current file size: ${(
          file.size /
          1024 /
          1024
        ).toFixed(2)}MB`;
        messageApi.error(error);
        return Upload.LIST_IGNORE;
      }
    };

    const handleRemove = (file: UploadFile<any>) => {
      setImageUrls((prevUrls) =>
        prevUrls.filter((url) => url !== file.thumbUrl)
      );
    };

    const handleVideoRemove = (file: UploadFile<any>) => {
      setVideoUrls((prevUrls) =>
        prevUrls.filter((url) => url !== file.thumbUrl)
      );
    };

    return (
      <>
        {contextHolder}
        <section className="w-full bg-white pb-[30px] px-4 sm:px-6 max-xl:py-6 md:px-10 rounded-xl max-w-[1320px]">
          <div className="flex max-md:flex-col-reverse items-center md:justify-between">
            <div className="flex flex-col gap-2">
              <h1 className="font-lato font-semibold text-[38px] leading-[49.8px] text-black">
                Add a New Property
              </h1>
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
            name="AddProperty"
            //   initialValues={{ squareFootage: [{}] }}
            onFinish={handleSubmit}
            // onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
          >
            <section className="flex flex-col xl:flex-row w-full mt-[55px] gap-8 font-poppins">
              <div className="flex flex-col gap-7 w-full xl:max-w-[500px]">
                <h6 className="text-black font-poppins font-medium text-xl">
                  {" "}
                  Property Information{" "}
                </h6>
                <CustomFormInput<AddPropertyType>
                  label="Property Name"
                  name="propertyName"
                  rules={[
                    {
                      required: true,
                      message: "Please input your property name",
                    },
                  ]}
                />

                <CustomFormTextarea<AddPropertyType>
                  label="Property Description"
                  name="propertyDescription"
                  rules={[
                    {
                      required: true,
                      message: "Please input your property description",
                    },
                  ]}
                />

                <CustomFormSelect<AddPropertyType>
                  label="Property Type"
                  name="propertyType"
                  rules={[
                    {
                      required: true,
                      message: "Please input the property type",
                    },
                  ]}
                  optionValues={[
                    { label: "Residential", value: "Residential" },
                    { label: "Commercial", value: "Commercial" },
                    { label: "Industrial", value: "Industrial" },
                    { label: "Agricultural", value: "Agricultural" },
                  ]}
                />

                <CustomFormInput<AddPropertyType>
                  label="Location"
                  name="location"
                  rules={[
                    {
                      required: true,
                      message: "Please input the property location",
                    },
                  ]}
                />

                <CustomFormInput<AddPropertyType>
                  label="Price"
                  name="price"
                  rules={[
                    {
                      required: true,
                      message: "Please input the price",
                    },
                  ]}
                />

                <CustomFormSelect<AddPropertyType>
                  label="Number of Bedrooms"
                  name="noOfBedroom"
                  rules={[
                    {
                      required: true,
                      message: "Please input the number of bedroom",
                    },
                  ]}
                  optionValues={[
                    { label: "1", value: "1" },
                    { label: "2", value: "2" },
                    { label: "3", value: "3" },
                    { label: "4", value: "4" },
                  ]}
                />

                <CustomFormSelect<AddPropertyType>
                  label="Number of Bathrooms"
                  name="noOfBathroom"
                  rules={[
                    {
                      required: true,
                      message: "Please input the number of bathroom",
                    },
                  ]}
                  optionValues={[
                    { label: "1", value: "1" },
                    { label: "2", value: "2" },
                    { label: "3", value: "3" },
                    { label: "4", value: "4" },
                  ]}
                />

                <CustomFormInput<AddPropertyType>
                  label="Square Footage"
                  name="squareFootage"
                  rules={[
                    {
                      required: true,
                      message: "Please input the square footage",
                    },
                  ]}
                />
              </div>

              <div className="flex flex-col gap-7 w-full xl:flex-1">
                <CustomFormInput<AddPropertyType>
                  label="Contact"
                  name="contact"
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
                />

                <CustomFormInput<AddPropertyType>
                  label="Office Address"
                  name="officeAddress"
                  rules={[
                    {
                      required: true,
                      message: "Please input the office address",
                    },
                  ]}
                />

                <CustomFormSelect<AddPropertyType>
                  label="Availability Status"
                  name="availabilityStatus"
                  rules={[
                    {
                      required: true,
                      message: "Please select availability status",
                    },
                  ]}
                  optionValues={[
                    { label: "Available", value: "Available" },
                    { label: "Unavailable", value: "Unavailable" },
                  ]}
                />

                <div className="flex flex-col gap-5">
                  <h6 className="font-medium text-black text-xl">
                    Upload Images
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
                      maxCount={3}
                      onChange={handleChange}
                      onRemove={handleRemove}
                      beforeUpload={handleBeforeUpload}
                      // showUploadList={false}
                      accept=".jpeg, .jpg, .png, .webp,"
                      className="!font-poppins"
                    >
                      <Button
                        className="!font-poppins"
                        icon={<UploadOutlined />}
                      >
                        Choose file
                      </Button>
                      <div className="flex gap-3 mt-6">
                        {imageUrls.length > 0 &&
                          imageUrls.map((image, index) => (
                            <div
                              className="w-full max-w-[194px] h-[150px]"
                              key={index}
                            >
                              <Image
                                width={194}
                                height={150}
                                alt="preview"
                                src={image}
                                className="object-cover"
                              />
                            </div>
                          ))}
                      </div>
                    </Upload>
                  </Form.Item>
                </div>

                <div className="flex flex-col gap-5">
                  <h6 className="font-medium text-black text-xl">
                    Upload Videos
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
                      maxCount={3}
                      onChange={handleVideoChange}
                      onRemove={handleVideoRemove}
                      beforeUpload={handleVideoBeforeUpload}
                      // showUploadList={false}
                      accept=".jpeg, .jpg, .png, .webp,"
                      className="!font-poppins"
                    >
                      <Button
                        className="!font-poppins"
                        icon={<UploadOutlined />}
                      >
                        Choose file
                      </Button>
                      <div className="flex gap-3 mt-6">
                        {imageUrls.length > 0 &&
                          imageUrls.map((image, index) => (
                            <div
                              className="w-full max-w-[194px] h-[150px]"
                              key={index}
                            >
                              <Image
                                width={194}
                                height={150}
                                alt="preview"
                                src={image}
                                className="object-cover"
                              />
                            </div>
                          ))}
                      </div>
                    </Upload>
                  </Form.Item>
                </div>

                <Form.Item label={null}>
                  <Button
                    htmlType="submit"
                    className="w-full !bg-[#010B18] !border-[#010B18] !py-1 !px-3 !text-white !h-[59px] !rounded-md !font-normal !text-lg !font-lato"
                  >
                    Publish Property
                  </Button>
                </Form.Item>
              </div>
            </section>
          </Form>
        </section>
      </>
    );
  };
}

