import { ResumeBasicsType } from "@/app/types/career";
import { useResume } from "@/contexts/ResumeContext";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Col, Form, Input, Row, Space } from "antd";
import { useState } from "react";

const optionalFields = {
  label: "Job Title",
  image: "Profile Image URL",
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
  const [form] = Form.useForm<ResumeBasicsType>();
  const [optionalVisible, setOptionalVisible] = useState<{
    [key in keyof ResumeBasicsType]?: boolean;
  }>(
    Object.fromEntries(
      Object.keys(optionalFields).map((key) => [
        key,
        !!basics[key as keyof ResumeBasicsType], // Show if value exists in `basics`
      ])
    ) as { [key in keyof ResumeBasicsType]?: boolean }
  );

  const toggleOptionalField = (field: keyof ResumeBasicsType) => {
    setOptionalVisible((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  return (
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
          >
            <Input placeholder="Enter your full name" />
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
          >
            <Input placeholder="Enter your email" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col xs={24} sm={12}>
          <Form.Item
            label="Phone"
            name="phone"
            rules={[
              { required: true, message: "Please enter your phone number!" },
            ]}
          >
            <Input placeholder="Enter your phone number" />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item
        label="Summary"
        name="summary"
        rules={[{ required: true, message: "Please enter a brief summary!" }]}
      >
        <Input.TextArea
          placeholder="Write a short summary about yourself"
          autoSize={{ minRows: 6 }}
          rows={6}
        />
      </Form.Item>
      {/* Dynamically Added Optional Fields */}
      {Object.entries(optionalFields).map(([field, label]) => {
        const key = field as keyof ResumeBasicsType;
        return optionalVisible[key] ? (
          <div key={key}>
            {key === "location" && (
              <Card
                style={{ marginBottom: 16 }}
                title="Location"
                extra={
                  <CloseOutlined
                    onClick={() => {
                      form.setFieldsValue({ location: {} });
                      setResumeData((prev) => ({
                        ...prev,
                        basics: { ...prev.basics, location: {} },
                      }));
                      toggleOptionalField(key);
                    }}
                    style={{ color: "red" }}
                    title="Remove section"
                  />
                }
              >
                <Row gutter={16}>
                  <Col xs={24} sm={12}>
                    <Form.Item label="Address" name={["location", "address"]}>
                      <Input placeholder="Enter your address" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      label="Postal Code"
                      name={["location", "postalCode"]}
                    >
                      <Input placeholder="Enter your postal code" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={8}>
                    <Form.Item label="City" name={["location", "city"]}>
                      <Input placeholder="e.g Toronto" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={8}>
                    <Form.Item
                      label="Country"
                      name={["location", "countryCode"]}
                    >
                      <Input placeholder="e.g., Canada" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={8}>
                    <Form.Item label="Region" name={["location", "region"]}>
                      <Input placeholder="e.g., Ontario" />
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
                      setResumeData((prev) => ({
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
                        <Space key={key}>
                          <Row gutter={16} key={key} align="middle">
                            <Col xs={24} sm={8}>
                              <Form.Item
                                label="Network"
                                name={[name, "network"]}
                                rules={[
                                  { required: true, message: "Required!" },
                                ]}
                              >
                                <Input placeholder="e.g., LinkedIn" />
                              </Form.Item>
                            </Col>
                            <Col xs={24} sm={8}>
                              <Form.Item
                                label="Username"
                                name={[name, "username"]}
                                rules={[
                                  {
                                    required: true,
                                    message: "Please enter the username!",
                                  },
                                ]}
                              >
                                <Input placeholder="Enter username" />
                              </Form.Item>
                            </Col>
                            <Col xs={24} sm={8}>
                              <Form.Item
                                label="URL"
                                name={[name, "url"]}
                                rules={[
                                  {
                                    type: "url",
                                    message: "Please enter a valid URL!",
                                  },
                                ]}
                              >
                                <Input placeholder="Enter profile URL" />
                              </Form.Item>
                            </Col>
                          </Row>
                          <CloseOutlined
                            onClick={() => remove(name)}
                            className="mt-2 text-red-500"
                            title="Remove field"
                          />
                        </Space>
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

            {key !== "location" && key !== "profiles" && (
              <div className="flex space-x-2">
                <div className="flex-1">
                  <Form.Item label={label} name={key}>
                    <Input placeholder={`Enter ${label.toLowerCase()}`} />
                  </Form.Item>
                </div>
                <CloseOutlined
                  onClick={() => {
                    form.setFieldsValue({ [key]: undefined });
                    setResumeData((prev) => ({
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
          type="primary"
          htmlType="submit"
          className="mt-4"
          loading={isSaving}
        >
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PersonalInfoForm;

