import { ResumeBasicsType } from "@/app/types/career";
import { Form, Input, Button, Row, Col, Space, Card } from "antd";
import { useState } from "react";
import { PlusOutlined, CloseCircleOutlined } from "@ant-design/icons";
import useSWR from "swr";

const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to fetch data");
  return response.json();
};

const optionalFields = {
  label: "Job Title",
  image: "Profile Image URL",
  url: "Website URL",
  location: "Address",
  profiles: "Social Profiles",
};

const PersonalInfoForm = () => {
  // const { data, error, isLoading } = useSWR<ResumeBasicsType>(
  //   "/api/resume-basics",
  //   fetcher
  // );

  const [form] = Form.useForm<ResumeBasicsType>();
  const [formData, setFormData] = useState(form.getFieldsValue());
  const [optionalVisible, setOptionalVisible] = useState<{
    [key in keyof ResumeBasicsType]?: boolean;
  }>({
    label: false,
    image: false,
    url: false,
    location: false,
    profiles: false,
  });
  const [profiles, setProfiles] = useState<number[]>([]); // Tracks dynamically added profiles

  const toggleOptionalField = (field: keyof ResumeBasicsType) => {
    setOptionalVisible((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const addProfile = () => setProfiles((prev) => [...prev, Date.now()]); // Unique key for profiles
  const removeProfile = (key: number) =>
    setProfiles((prev) => prev.filter((id) => id !== key));

  // if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>Error loading data: {error.message}</div>;

  return (
    <>
      <Form
        layout="vertical"
        form={form}
        initialValues={{
          name: "John Doe",
          label: "Software Engineer",
          image: "https://via.placeholder.com/150",
          email: "johndoe@example.com",
          phone: "+1234567890",
          url: "https://johndoe.dev",
          summary:
            "A passionate software engineer with expertise in building scalable applications, cloud computing, and DevOps.",
          location: {
            address: "123 Main St",
            postalCode: "12345",
            city: "San Francisco",
            countryCode: "US",
            region: "California",
          },
          profiles: [],
        }}
        onValuesChange={(_, values) => setFormData(values)}
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
            rows={3}
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
                  {profiles.map((id) => (
                    <Row gutter={16} key={id} align="middle">
                      <Col xs={24} sm={8}>
                        <Form.Item
                          label="Network"
                          name={["profiles", id, "network"]}
                        >
                          <Input placeholder="e.g., LinkedIn" />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={8}>
                        <Form.Item
                          label="Username"
                          name={["profiles", id, "username"]}
                        >
                          <Input placeholder="Enter username" />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={8}>
                        <Form.Item label="URL" name={["profiles", id, "url"]}>
                          <Input placeholder="Enter profile URL" />
                        </Form.Item>
                      </Col>
                      <CloseCircleOutlined
                        onClick={() => removeProfile(id)}
                        style={{ color: "red", cursor: "pointer" }}
                      />
                    </Row>
                  ))}
                  <Button
                    type="dashed"
                    onClick={addProfile}
                    icon={<PlusOutlined />}
                  >
                    Add Profile
                  </Button>
                </Card>
              )}

              {key !== "location" && key !== "profiles" && (
                <Row gutter={16} align="middle">
                  <Col xs={24} sm={12}>
                    <Form.Item label={label} name={key}>
                      <Input placeholder={`Enter ${label.toLowerCase()}`} />
                    </Form.Item>
                  </Col>
                  <CloseCircleOutlined
                    onClick={() => toggleOptionalField(key)}
                    style={{ color: "red", cursor: "pointer" }}
                  />
                </Row>
              )}
            </div>
          ) : null;
        })}
      </Form>

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

      <pre>{JSON.stringify(formData, null, 2)}</pre>
    </>
  );
};

export default PersonalInfoForm;
