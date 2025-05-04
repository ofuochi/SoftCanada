import React, { useState } from "react";
import {
  Button,
  Form,
  Input,
  message,
  Modal,
  Radio,
  Select,
  Spin,
  Typography,
} from "antd";
import { Dispatch, SetStateAction } from "react";
import TextArea from "antd/es/input/TextArea";
import { useApiClient } from "@/hooks/api-hook";

const { Option } = Select;
const { Title } = Typography;

interface ContactModalProps {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  formType: string;
}

interface ContactFormType {
  formType: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  liveInCanada: boolean;
  province?: string;
  comment: string;
}

const provinces = [
  "Ontario",
  "Quebec",
  "Nova Scotia",
  "New Brunswick",
  "Manitoba",
  "British Columbia",
  "Prince Edward Island",
  "Saskatchewan",
  "Alberta",
  "Newfoundland and Labrador",
];

const ContactModal: React.FC<ContactModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  formType,
}) => {
  const [form] = Form.useForm<ContactFormType>();
  // Watch the boolean radio so React can re-render when it changes
  const liveInCanada = Form.useWatch("liveInCanada", form);
  const { post } = useApiClient();
  const [messageApi, contextHolder] = message.useMessage();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (values: ContactFormType) => {
    setSubmitting(true);
    try {
      await post("/api/Form/submitOtherCategories", values, undefined, true);
      setIsModalOpen(false);
      form.resetFields();
      form.setFieldsValue({ formType });
      messageApi.success("Form submitted successfully!");
    } finally {
      setSubmitting(false);
    }
  };

  const handleModalClose = () => {
    form.resetFields();
    form.setFieldsValue({ formType });
    setIsModalOpen(false);
  };

  return (
    <Modal
      keyboard={!submitting}
      maskClosable={!submitting}
      closable={!submitting}
      centered
      open={isModalOpen}
      title={<Title level={4}>Contact Form</Title>}
      onCancel={handleModalClose}
      footer={null}
    >
      <Spin spinning={submitting}>
        {contextHolder}
        <Form
          form={form}
          layout="vertical"
          size="large"
          initialValues={{ formType, liveInCanada: undefined }}
          onFinish={handleSubmit}
        >
          {/* Hidden formType so we know which form was submitted */}
          <Form.Item name="formType" hidden>
            <Input />
          </Form.Item>

          {/* Name fields side by side */}
          <div className="flex gap-4">
            <Form.Item
              name="firstName"
              label="First Name"
              rules={[{ required: true, message: "Please enter first name" }]}
              className="flex-1"
            >
              <Input placeholder="John" />
            </Form.Item>

            <Form.Item
              name="lastName"
              label="Last Name"
              rules={[{ required: true, message: "Please enter last name" }]}
              className="flex-1"
            >
              <Input placeholder="Doe" />
            </Form.Item>
          </div>

          {/* Email */}
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { type: "email", message: "Invalid email format" },
              { required: true, message: "Please enter email" },
            ]}
          >
            <Input placeholder="john.doe@example.com" />
          </Form.Item>

          {/* Mobile */}
          <Form.Item
            name="mobile"
            label="Mobile Number"
            rules={[{ required: true, message: "Please enter mobile number" }]}
          >
            <Input placeholder="+1 234 567 8901" />
          </Form.Item>

          {/* Live in Canada radio */}
          <Form.Item
            name="liveInCanada"
            label="Do you currently live in Canada?"
            rules={[{ required: true, message: "Please select an option" }]}
          >
            <Radio.Group>
              <Radio value={true}>Yes</Radio>
              <Radio value={false}>No</Radio>
            </Radio.Group>
          </Form.Item>

          {/* Province – only show when “Yes” */}
          <Form.Item
            name="province"
            label="Province"
            hidden={!liveInCanada}
            rules={[
              { required: liveInCanada, message: "Please select province" },
            ]}
          >
            <Select placeholder="Select province">
              {provinces.map((p) => (
                <Option key={p} value={p}>
                  {p}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {/* Comments */}
          <Form.Item
            name="comment"
            label="Message"
            rules={[{ required: true, message: "Please enter your comments" }]}
          >
            <TextArea
              rows={4}
              placeholder="Enter your comments or questions..."
            />
          </Form.Item>

          {/* Actions */}
          <div className="flex justify-end gap-2">
            <Button onClick={handleModalClose} disabled={submitting}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" loading={submitting}>
              Submit
            </Button>
          </div>
        </Form>
      </Spin>
    </Modal>
  );
};

export default ContactModal;
