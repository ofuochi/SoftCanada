import { ResumeBasicsType } from "@/app/types/career";
import { Col, Form, Input, Row } from "antd";
import { useState } from "react";

const PersonalInfoForm = () => {
  const [form] = Form.useForm<ResumeBasicsType>();
  const [formData, setFormData] = useState(form.getFieldsValue());

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
              label="Job Title"
              name="label"
              rules={[
                {
                  required: true,
                  message: "Please enter your professional label!",
                },
              ]}
            >
              <Input placeholder="e.g., Software Engineer" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Profile Image URL"
              name="image"
              rules={[{ type: "url", message: "Please enter a valid URL!" }]}
            >
              <Input placeholder="Enter image URL" />
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
          <Col xs={24} sm={12}>
            <Form.Item
              label="Website URL"
              name="url"
              rules={[{ type: "url", message: "Please enter a valid URL!" }]}
            >
              <Input placeholder="Enter your website URL" />
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

        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Address"
              name={["location", "address"]}
              rules={[
                { required: true, message: "Please enter your address!" },
              ]}
            >
              <Input placeholder="Enter your address" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Postal Code"
              name={["location", "postalCode"]}
              rules={[
                { required: true, message: "Please enter your postal code!" },
              ]}
            >
              <Input placeholder="Enter your postal code" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} sm={8}>
            <Form.Item
              label="City"
              name={["location", "city"]}
              rules={[{ required: true, message: "Please enter your city!" }]}
            >
              <Input placeholder="Enter your city" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={8}>
            <Form.Item
              label="Country Code"
              name={["location", "countryCode"]}
              rules={[
                { required: true, message: "Please enter your country code!" },
              ]}
            >
              <Input placeholder="e.g., US" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={8}>
            <Form.Item
              label="Region"
              name={["location", "region"]}
              rules={[{ required: true, message: "Please enter your region!" }]}
            >
              <Input placeholder="e.g., California" />
            </Form.Item>
          </Col>
        </Row>
      </Form>

      <pre>{JSON.stringify(formData, null, 2)}</pre>
    </>
  );
};

export default PersonalInfoForm;
