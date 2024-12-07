"use client";

import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { useUser } from "@auth0/nextjs-auth0/client";
import {
  Button,
  Card,
  Form,
  GetProp,
  Input,
  message,
  Select,
  Typography,
  Upload,
  UploadProps,
} from "antd";
import Image from "next/image";
import { useState } from "react";

const { Option } = Select;
const { Paragraph, Title } = Typography;
type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

export default function AccountSettings() {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>(user?.picture || "");

  const getBase64 = (img: FileType, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };

  const beforeUpload = (file: FileType) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const handleChange: UploadProps["onChange"] = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as FileType, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };
  const uploadButton = (
    <button className="border-0 bg-none" type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <>
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        {/* Change Profile Section */}
        <Card className="shadow-sm">
          <Title level={3}>Change Profile Picture</Title>
          <Paragraph>Change your profile picture from here</Paragraph>
          <div className="justify-items-center mt-10">
            <Upload
              name="avatar"
              listType="picture-circle"
              showUploadList={false}
              action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
              beforeUpload={beforeUpload}
              onChange={handleChange}
            >
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt="avatar"
                  style={{ width: "100%" }}
                  width={100}
                  height={100}
                />
              ) : (
                uploadButton
              )}
            </Upload>
            <Paragraph className="mt-5">
              Allowed JPG, GIF, or PNG. Max size of 800K
            </Paragraph>
          </div>
        </Card>

        {/* Change Password Section */}
        <Card className="shadow-sm">
          <Title level={3}>Change Password</Title>
          <Paragraph>
            To change your password, please enter your new old and new password
            below
          </Paragraph>
          <Form layout="vertical">
            <Form.Item label="Current Password" name="currentPassword">
              <Input.Password />
            </Form.Item>
            <Form.Item label="New Password" name="newPassword">
              <Input.Password />
            </Form.Item>
            <Form.Item label="Confirm Password" name="confirmPassword">
              <Input.Password />
            </Form.Item>
            <Button type="primary">Save</Button>
          </Form>
        </Card>
      </div>

      {/* Personal Details Section */}
      <Card style={{ marginTop: "32px" }} className="shadow-sm">
        <Title level={3}>Personal Details</Title>
        <Paragraph>
          To change your personal details, edit and save your details
        </Paragraph>
        <Form layout="vertical">
          <Form.Item label="Your Name" name="name">
            <Input placeholder="Mathew Anderson" />
          </Form.Item>
          <Form.Item label="Location" name="location">
            <Select defaultValue="India">
              <Option value="India">India</Option>
              <Option value="USA">USA</Option>
              <Option value="UK">UK</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Store Name" name="storeName">
            <Input placeholder="Maxima Studio" />
          </Form.Item>
          <Form.Item label="Currency" name="currency">
            <Select defaultValue="India (INR)">
              <Option value="India (INR)">India (INR)</Option>
              <Option value="USA (USD)">USA (USD)</Option>
              <Option value="UK (GBP)">UK (GBP)</Option>
            </Select>
          </Form.Item>
          <Button type="primary">Save</Button>
        </Form>
      </Card>
    </>
  );
}
