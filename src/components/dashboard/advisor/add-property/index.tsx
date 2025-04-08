"use client";

import Image from "next/image";
import { Button, Form, FormProps, InputNumber, Radio, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

import CustomFormInput from "@/components/form/CustomFormInput";
import CustomFormSelect from "@/components/form/CustomFormSelect";
import CustomFormTextarea from "@/components/form/CustomFormTextarea";
import {
  PropertyData,
  PropertyFormType,
  usePropertyForm,
} from "@/hooks/usePropertyForm";

type PropertyFormProps = {
  propertyData?: PropertyData;
};

const priceFormatter = (value: number | undefined) =>
  value ? `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "";

const priceParser = (value: string | undefined) =>
  value ? (value.replace(/\$\s?|(,*)/g, "") as unknown as number) : 0;

const footageFormatter = (value: number | undefined) =>
  value ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "";

const footageParser = (value: string | undefined) =>
  value ? (value.replace(/(,*)/g, "") as unknown as number) : 0;

const PropertyForm = ({ propertyData }: PropertyFormProps) => {
  const {
    form,
    isEditMode,
    inProgress,
    contextHolder,
    imageUrls,
    fileList,
    videoUrl,
    FORM_OPTIONS,
    VALIDATION_RULES,
    handleSubmit,
    handleImageChange,
    handleImageBeforeUpload,
    handleImageRemove,
    handleVideoChange,
    handleVideoBeforeUpload,
    handleVideoRemove,
  } = usePropertyForm(propertyData);

  const onFinish: FormProps<PropertyFormType>["onFinish"] = (values) => {
    handleSubmit(values);
  };

  const handleNumberKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    const isNumber = /^[0-9]$/.test(event.key);
    const isAllowedKey = [
      "Backspace",
      "Delete",
      "ArrowLeft",
      "ArrowRight",
      "Tab",
      "Home",
      "End",
      ".",
      ",",
    ].includes(event.key);

    if (!isNumber && !isAllowedKey) {
      event.preventDefault();
    }
  };

  return (
    <>
      {contextHolder}
      <section className="w-full bg-white pb-[30px] px-4 sm:px-6 py-6 md:px-10 rounded-xl max-w-[1320px]">
        <h1 className="font-lato font-semibold text-[38px] leading-[49.8px] text-black">
          {isEditMode ? "Edit Property" : "Add a New Property"}
        </h1>

        <Form
          form={form}
          name="PropertyForm"
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
        >
          <section className="flex flex-col xl:flex-row w-full mt-[55px] gap-8 font-poppins">
            {/* Left Column - Property Details */}
            <div className="flex flex-col w-full xl:max-w-[500px]">
              <h6 className="text-black font-poppins font-medium text-xl mb-6">
                Property Information
              </h6>

              <CustomFormInput<PropertyFormType>
                label="Property Name"
                name="propertyName"
                rules={[
                  VALIDATION_RULES.required("Please input your property name"),
                ]}
              />

              <CustomFormTextarea<PropertyFormType>
                label="Property Description"
                name="propertyDescription"
                rules={[
                  VALIDATION_RULES.required(
                    "Please input your property description"
                  ),
                ]}
              />

              <CustomFormSelect<PropertyFormType>
                label="Property Type"
                name="propertyType"
                rules={[
                  VALIDATION_RULES.required("Please select the property type"),
                ]}
                optionValues={FORM_OPTIONS.propertyTypes}
              />

              <CustomFormInput<PropertyFormType>
                label="Location"
                name="location"
                rules={[
                  VALIDATION_RULES.required(
                    "Please input the property location"
                  ),
                ]}
              />

              <Form.Item<PropertyFormType>
                label="Price"
                name="price"
                rules={[
                  VALIDATION_RULES.required("Please input the price"),
                  VALIDATION_RULES.number,
                  VALIDATION_RULES.nonNegative,
                ]}
              >
                <InputNumber<number>
                  formatter={priceFormatter}
                  parser={priceParser}
                  onKeyDown={handleNumberKeyDown}
                  className="!py-2.5 !w-full border border-[#CBCBCB] !font-poppins"
                />
              </Form.Item>

              <CustomFormSelect<PropertyFormType>
                label="Number of Bedrooms"
                name="noOfBedroom"
                rules={[
                  VALIDATION_RULES.required(
                    "Please select the number of bedrooms"
                  ),
                ]}
                optionValues={FORM_OPTIONS.bedrooms}
              />

              <CustomFormSelect<PropertyFormType>
                label="Number of Bathrooms"
                name="noOfBathroom"
                rules={[
                  VALIDATION_RULES.required(
                    "Please select the number of bathrooms"
                  ),
                ]}
                optionValues={FORM_OPTIONS.bathrooms}
              />

              <Form.Item<PropertyFormType>
                label="Square Footage"
                name="squareFootage"
                rules={[
                  VALIDATION_RULES.required("Please input the square footage"),
                  VALIDATION_RULES.number,
                  VALIDATION_RULES.positiveNumber,
                ]}
              >
                <InputNumber<number>
                  formatter={footageFormatter}
                  parser={footageParser}
                  onKeyDown={handleNumberKeyDown}
                  className="!py-2.5 !w-full border border-[#CBCBCB] !font-poppins"
                />
              </Form.Item>
            </div>

            {/* Right Column - Contact Info, Media, and Submission */}
            <div className="flex flex-col gap-7 w-full xl:flex-1">
              <CustomFormInput<PropertyFormType>
                label="Contact"
                name="contact"
                rules={[
                  VALIDATION_RULES.required("Please input your contact number"),
                  VALIDATION_RULES.usPhoneNumber,
                ]}
              />

              <CustomFormInput<PropertyFormType>
                label="Office Address"
                name="officeAddress"
                rules={[
                  VALIDATION_RULES.required("Please input the office address"),
                ]}
              />

              <Form.Item<PropertyFormType>
                name="listingType"
                label="Listing Type"
                rules={[
                  VALIDATION_RULES.required("Please select the tenancy type"),
                ]}
              >
                <Radio.Group options={FORM_OPTIONS.tenancyTypes} />
              </Form.Item>

              {/* Image Upload Section */}
              <div className="flex flex-col gap-5">
                <h6 className="font-medium text-black text-xl">
                  Upload Images
                </h6>
                <Form.Item
                  name="images"
                  rules={[
                    {
                      required: !isEditMode || fileList.length === 0,
                      message: "Please upload at least one image",
                    },
                  ]}
                >
                  <Upload
                    maxCount={10}
                    fileList={fileList}
                    onChange={handleImageChange}
                    beforeUpload={handleImageBeforeUpload}
                    onRemove={handleImageRemove}
                    accept=".jpeg, .jpg, .png, .webp, .gif"
                    className="!font-poppins"
                    multiple
                  >
                    <Button className="!font-poppins" icon={<UploadOutlined />}>
                      Choose file
                    </Button>
                    <div className="flex flex-wrap gap-3 mt-6">
                      {imageUrls.length > 0 &&
                        imageUrls.map((image, index) => (
                          <div
                            className="w-[194px] h-[220px] overflow-clip relative"
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

              {/* Video Upload Section */}
              <div className="flex flex-col gap-5">
                <h6 className="font-medium text-black text-xl">Upload Video</h6>
                <Form.Item
                  name="video"
                  rules={[
                    {
                      required: !isEditMode && !videoUrl,
                      message: "Please upload a video",
                    },
                  ]}
                >
                  <Upload
                    maxCount={1}
                    onChange={handleVideoChange}
                    onRemove={handleVideoRemove}
                    beforeUpload={handleVideoBeforeUpload}
                    accept=".mp4, .webm, .ogg"
                    className="!font-poppins"
                  >
                    <Button className="!font-poppins" icon={<UploadOutlined />}>
                      Choose file
                    </Button>
                    <div className="flex gap-3 mt-6">
                      {videoUrl && (
                        <video
                          controls
                          width="200"
                          height="150"
                          className="w-[200px] h-[200px] object-cover"
                        >
                          <source src={videoUrl} />
                          Your browser does not support the video tag.
                        </video>
                      )}
                    </div>
                  </Upload>
                </Form.Item>
              </div>

              {/* Submit Button */}
              <Form.Item>
                <Button
                  disabled={inProgress}
                  loading={inProgress}
                  htmlType="submit"
                  className="w-full !bg-[#010B18] !border-[#010B18] !py-1 !px-3 !text-white !h-[50px] !rounded-md !font-normal !text-lg !font-lato"
                >
                  {isEditMode ? "Update Property" : "Publish Property"}
                </Button>
              </Form.Item>
            </div>
          </section>
        </Form>
      </section>
    </>
  );
};

export default PropertyForm;

