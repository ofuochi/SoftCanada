import { ResumeBasicsType, ResumeType } from "@/app/types/career";
import { useApiClient } from "@/hooks/api-hook";
import { CloseCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Col, Form, Input, message, Row, Space } from "antd";
import { Dispatch, SetStateAction, useState } from "react";

const optionalFields = {
  label: "Job Title",
  image: "Profile Image URL",
  url: "Website URL",
  location: "Address",
  profiles: "Social Profiles",
};

type Props = {
  setResumeData: Dispatch<SetStateAction<ResumeType>>;
  data?: ResumeBasicsType;
};

const PersonalInfoForm: React.FC<Props> = ({ setResumeData, data }) => {
  const { post } = useApiClient();
  const [messageApi, contextHolder] = message.useMessage();

  const [form] = Form.useForm<ResumeBasicsType>();
  const [optionalVisible, setOptionalVisible] = useState<{
    [key in keyof ResumeBasicsType]?: boolean;
  }>({
    label: false,
    image: false,
    url: false,
    location: false,
    profiles: false,
  });

  const handleSubmit = async (basics: ResumeBasicsType) => {
    await post<ResumeType, Partial<ResumeType>>("/api/resumes", {
      basics,
    });

    messageApi.success("Information saved successfully!");
  };

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
      initialValues={data || {}}
      onFinish={handleSubmit}
      onValuesChange={(_, values) =>
        setResumeData((prev) => ({ ...prev, basics: values }))
      }
    >
      {contextHolder}
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
                title="Address"
                extra={
                  <CloseCircleOutlined
                    onClick={() => toggleOptionalField(key)}
                    style={{ color: "red", cursor: "pointer" }}
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
                      <Input placeholder="Enter your city" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={8}>
                    <Form.Item
                      label="Country Code"
                      name={["location", "countryCode"]}
                    >
                      <Input placeholder="e.g., US" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={8}>
                    <Form.Item label="Region" name={["location", "region"]}>
                      <Input placeholder="e.g., California" />
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
                  <CloseCircleOutlined
                    onClick={() => toggleOptionalField(key)}
                    style={{ color: "red", cursor: "pointer" }}
                  />
                }
              >
                <Form.List name="profiles">
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name }) => (
                        <Row gutter={16} key={key} align="middle">
                          <Col xs={24} sm={8}>
                            <Form.Item
                              label="Network"
                              name={[name, "network"]}
                              key={key}
                              rules={[
                                {
                                  required: true,
                                  message: "Please enter the network name!",
                                },
                              ]}
                            >
                              <Input placeholder="e.g., LinkedIn" />
                            </Form.Item>
                          </Col>
                          <Col xs={24} sm={8}>
                            <Form.Item
                              label="Username"
                              name={[name, "username"]}
                              key={key}
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
                              key={key}
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
                          <Col>
                            <CloseCircleOutlined
                              onClick={() => remove(name)}
                              style={{ color: "red", cursor: "pointer" }}
                            />
                          </Col>
                        </Row>
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
              <Row gutter={16} align="middle">
                <Col xs={24} sm={12}>
                  <Form.Item label={label} name={key}>
                    <Input placeholder={`Enter ${label.toLowerCase()}`} />
                  </Form.Item>
                </Col>
                <Col>
                  <CloseCircleOutlined
                    onClick={() => toggleOptionalField(key)}
                    style={{ color: "red", cursor: "pointer" }}
                  />
                </Col>
              </Row>
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
        <Button type="primary" htmlType="submit" className="mt-4">
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PersonalInfoForm;