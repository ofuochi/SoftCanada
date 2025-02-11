import { ResumeBasicsType, ResumeImageFile } from "@/app/types/career";
import { useResume } from "@/contexts/ResumeContext";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  message,
  Row,
  Space,
} from "antd";
import { X } from "lucide-react";
import { ChangeEvent, Fragment, useCallback, useRef, useState } from "react";

const optionalFields = {
  label: "Job Title",
  imageName: "Profile Image URL",
  url: "Website URL",
  location: "Address",
  profiles: "Social Profiles",
};

type Props = {
  isSaving?: boolean;
  onSubmit: (basics: ResumeBasicsType) => void;
};

const PersonalInfoForm: React.FC<Props> = ({ isSaving, onSubmit }) => {
  const {
    resumeData: { basics },
    setResumeData,
  } = useResume();

  const [messageApi, contextHolder] = message.useMessage();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form] = Form.useForm<ResumeBasicsType>();
  const [optionalVisible, setOptionalVisible] = useState<{
    [key in keyof ResumeBasicsType]?: boolean;
  }>(
    Object.fromEntries(
      Object.keys(optionalFields).map((key) => [
        key,
        !!basics?.[key as keyof ResumeBasicsType], // Show if value exists in `basics`
      ])
    ) as { [key in keyof ResumeBasicsType]?: boolean }
  );

  const toggleOptionalField = (field: keyof ResumeBasicsType) => {
    setOptionalVisible((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleImageUpload = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      e.preventDefault();
      const file = e.target.files?.[0];

      if (!file) return;

      // Check file size (10MB = 10 * 1024 * 1024 bytes)
      if (file.size > 10 * 1024 * 1024) {
        messageApi.open({
          type: "error",
          content: "Image size must not exceed 10MB",
        });
        return;
      }

      // Check if file is an image
      if (!file.type.startsWith("image/")) {
        messageApi.open({
          type: "error",
          content: "Please upload an image file",
        });
        return;
      }

      // Create base64 preview
      const reader = new FileReader();
      reader.onloadend = () => {
        // Store file object
        const imageFileData: ResumeImageFile = {
          file,
          name: file.name,
          size: file.size,
          type: file.type,
          base64Url: reader.result as string,
        };
        setResumeData((prev: any) => ({
          ...prev,
          basics: {
            ...prev.basics,
            imageName: imageFileData?.base64Url,
            imageFile: imageFileData,
          },
        }));
      };
      reader.readAsDataURL(file);
    },
    [setResumeData]
  );

  const handleRemoveImage = useCallback((): void => {
    setResumeData((prev: any) => ({
      ...prev,
      basics: { ...prev.basics, imageName: "", imageFile: null },
    }));
  }, [setResumeData]);

  const handleTriggerUpload = useCallback(() => {
    fileInputRef.current?.click();
  }, [fileInputRef]);
  return (
    <>
      {contextHolder}
      <Form
        layout="vertical"
        form={form}
        initialValues={basics}
        onFinish={onSubmit}
        onValuesChange={(_, values) =>
          setResumeData((prev) => ({ ...prev, basics: values }))
        }
      >
        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please enter your name!" }]}
              className="!font-dm_sans"
            >
              <Input
                placeholder="Enter your full name"
                className="min-h-[44px] rounded-lg p-6 border-[0.5px] border-[#808080] !font-dm_sans"
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please enter your email!" },
                { type: "email", message: "Please enter a valid email!" },
              ]}
              className="!font-dm_sans"
            >
              <Input
                placeholder="Enter your email"
                className="min-h-[44px] rounded-lg p-6 border-[0.5px] border-[#808080] !font-dm_sans"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xs={24} sm={24}>
            <Form.Item
              label="Phone"
              name="phone"
              rules={[
                { required: true, message: "Please enter your phone number!" },
              ]}
              className="!font-dm_sans"
            >
              <Input
                placeholder="Enter your phone number"
                className="min-h-[44px] rounded-lg p-6 border-[0.5px] border-[#808080] !font-dm_sans"
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          label="Summary"
          name="summary"
          rules={[{ required: true, message: "Please enter a brief summary!" }]}
          className="!font-dm_sans"
        >
          <Input.TextArea
            placeholder="Write a short summary about yourself"
            autoSize={{ minRows: 6 }}
            rows={6}
            className="!font-dm_sans"
          />
        </Form.Item>
        {/* Dynamically Added Optional Fields */}
        {Object.entries(optionalFields).map(([field, label]) => {
          const key = field as keyof ResumeBasicsType;
          return optionalVisible[key] ? (
            <div key={key} className="!font-dm_sans">
              {key === "location" && (
                <Card
                  style={{ marginBottom: 16 }}
                  title="Location"
                  extra={
                    <CloseOutlined
                      onClick={() => {
                        form.setFieldsValue({ location: {} });
                        setResumeData((prev: any) => ({
                          ...prev,
                          basics: { ...prev.basics, location: {} },
                        }));
                        toggleOptionalField(key);
                      }}
                      style={{ color: "red" }}
                      title="Remove section"
                      className="!font-dm_sans"
                    />
                  }
                >
                  <Row gutter={16}>
                    <Col xs={24} sm={12}>
                      <Form.Item
                        label="Address"
                        name={["location", "address"]}
                        className="!font-dm_sans"
                      >
                        <Input
                          placeholder="Enter your address"
                          className="min-h-[44px] rounded-lg p-6 border-[0.5px] border-[#808080] !font-dm_sans"
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                      <Form.Item
                        label="Postal Code"
                        name={["location", "postalCode"]}
                        className="!font-dm_sans"
                      >
                        <Input
                          placeholder="Enter your postal code"
                          className="min-h-[44px] rounded-lg p-6 border-[0.5px] border-[#808080] !font-dm_sans"
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={8}>
                      <Form.Item
                        label="City"
                        name={["location", "city"]}
                        className="!font-dm_sans"
                      >
                        <Input
                          placeholder="e.g Toronto"
                          className="min-h-[44px] rounded-lg p-6 border-[0.5px] border-[#808080] !font-dm_sans"
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={8}>
                      <Form.Item
                        label="Country"
                        name={["location", "countryCode"]}
                      >
                        <Input
                          placeholder="e.g., Canada"
                          className="min-h-[44px] rounded-lg p-6 border-[0.5px] border-[#808080] !font-dm_sans"
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={8}>
                      <Form.Item
                        label="Region"
                        name={["location", "region"]}
                        className="!font-dm_sans"
                      >
                        <Input
                          placeholder="e.g., Ontario"
                          className="min-h-[44px] rounded-lg p-6 border-[0.5px] border-[#808080] !font-dm_sans"
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Card>
              )}

              {key === "profiles" && (
                <Card
                  style={{ marginBottom: 16 }}
                  title="Social Profiles"
                  extra={
                    <CloseOutlined
                      onClick={() => {
                        form.setFieldsValue({ profiles: [] });
                        setResumeData((prev: any) => ({
                          ...prev,
                          basics: { ...prev.basics, profiles: [] },
                        }));
                        toggleOptionalField(key);
                      }}
                      title="Remove section"
                      style={{ color: "red" }}
                    />
                  }
                >
                  <Form.List name="profiles">
                    {(fields, { add, remove }) => (
                      <>
                        {fields.map(({ key, name }) => (
                          <Fragment key={key}>
                            <Space className="">
                              <CloseOutlined
                                onClick={() => remove(name)}
                                className="mt-2 text-red-500"
                                title="Remove field"
                              />
                              <Row key={key} align="middle">
                                <Col xs={24} sm={24}>
                                  <Form.Item
                                    label="Network"
                                    name={[name, "network"]}
                                    rules={[
                                      { required: true, message: "Required!" },
                                    ]}
                                    className="!font-dm_sans"
                                  >
                                    <Input
                                      placeholder="e.g., LinkedIn"
                                      className="min-h-[44px] rounded-lg p-6 border-[0.5px] border-[#808080] !font-dm_sans"
                                    />
                                  </Form.Item>
                                </Col>
                                <Col xs={24} sm={24}>
                                  <Form.Item
                                    label="Username"
                                    name={[name, "username"]}
                                    rules={[
                                      {
                                        required: true,
                                        message: "Please enter the username!",
                                      },
                                    ]}
                                    className="!font-dm_sans"
                                  >
                                    <Input
                                      placeholder="Enter username"
                                      className="min-h-[44px] rounded-lg p-6 border-[0.5px] border-[#808080] !font-dm_sans"
                                    />
                                  </Form.Item>
                                </Col>
                                <Col xs={24} sm={24}>
                                  <Form.Item
                                    label="URL"
                                    name={[name, "url"]}
                                    rules={[
                                      {
                                        type: "url",
                                        message: "Please enter a valid URL!",
                                      },
                                    ]}
                                    className="!font-dm_sans"
                                  >
                                    <Input
                                      placeholder="Enter profile URL"
                                      className="min-h-[44px] rounded-lg p-6 border-[0.5px] border-[#808080] !font-dm_sans"
                                    />
                                  </Form.Item>
                                </Col>
                              </Row>
                            </Space>
                            <Divider />
                          </Fragment>
                        ))}
                        <Button
                          type="dashed"
                          onClick={() => add()}
                          icon={<PlusOutlined />}
                        >
                          Add Profile
                        </Button>
                      </>
                    )}
                  </Form.List>
                </Card>
              )}

              {key === "imageName" && (
                <section className="mt-2.5 mb-5">
                  <input
                    type="file"
                    accept="image/*"
                    className="!hidden"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                  />
                  <button
                    type="button"
                    onMouseDown={handleTriggerUpload}
                    className="bg-black p-1.5 font-dm_sans text-xs font-medium text-white rounded"
                  >
                    Upload Image
                  </button>
                  {basics?.imageFile?.name && (
                    <div className="flex items-center justify-between mt-1">
                      <p className="font-dm_sans font-medium text-sm text-black">
                        {basics.imageFile.name}{" "}
                      </p>
                      <X
                        size={16}
                        color="#ef4444"
                        className="cursor-pointer"
                        onMouseDown={handleRemoveImage}
                      />
                    </div>
                  )}
                </section>
              )}

              {key !== "location" &&
                key !== "profiles" &&
                key !== "imageName" && (
                  <div className="flex space-x-2">
                    <div className="flex-1">
                      <Form.Item
                        label={label}
                        name={key}
                        className="!font-dm_sans"
                      >
                        <Input
                          placeholder={`Enter ${label.toLowerCase()}`}
                          className="min-h-[44px] rounded-lg p-6 border-[0.5px] border-[#808080] !font-dm_sans"
                        />
                      </Form.Item>
                    </div>
                    <CloseOutlined
                      onClick={() => {
                        form.setFieldsValue({ [key]: undefined });
                        setResumeData((prev: any) => ({
                          ...prev,
                          basics: { ...prev.basics, [key]: undefined },
                        }));
                        toggleOptionalField(key);
                      }}
                      className="mt-2 text-red-500"
                      title="Remove field"
                    />
                  </div>
                )}
            </div>
          ) : null;
        })}
        {/* Add Buttons for Optional Fields */}
        <Space wrap>
          {Object.entries(optionalFields).map(([field, label]) => {
            const key = field as keyof ResumeBasicsType;
            return !optionalVisible[key] ? (
              <Button
                key={key}
                type="dashed"
                onClick={() => toggleOptionalField(key)}
                icon={<PlusOutlined />}
              >
                Add {label}
              </Button>
            ) : null;
          })}
        </Space>
        <Form.Item label={null}>
          <Button
            loading={isSaving}
            htmlType="submit"
            className="!font-dm_sans mt-5"
            style={{
              width: "100%",
              maxWidth: "400px",
              borderRadius: "12px",
              padding: "18px 24px",
              height: "50px",
              fontWeight: "600",
              fontSize: "16px",
              color: "#010309",
              border: "none",
              backgroundColor: "#72FA3266",
            }}
          >
            Save
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default PersonalInfoForm;

