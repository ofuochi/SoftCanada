import { CvStepProps, FileType, FormValues } from "@/app/types/career";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Card,
  Divider,
  Input,
  message,
  Space,
  Typography,
  Upload,
  UploadProps,
} from "antd";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { Controller, UseFormSetValue } from "react-hook-form";

const { Title, Text } = Typography;

type Props = CvStepProps & { setValue: UseFormSetValue<FormValues> };
export const PersonalInfoStep: React.FC<Props> = ({
  control,
  errors,
  setValue,
}) => {
  const [loading, setLoading] = useState(false);

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

  const getBase64 = (img: FileType, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };

  const handleUploadImageChange: UploadProps["onChange"] = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as FileType, (url) => {
        setLoading(false);
        setValue("personalInfo.avatar", url);
      });
    }
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <motion.div
      key="personalInfo"
      initial={{ x: -1000 }}
      animate={{ x: 0 }}
      exit={{ x: 1000 }}
      transition={{ duration: 0.5 }}
    >
      <Card bordered>
        <Title level={3}>Personal Information</Title>
        <Divider />
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <Controller
            name="personalInfo.avatar"
            control={control}
            render={({ field }) => (
              <Upload
                name="avatar"
                listType="picture-card"
                showUploadList={false}
                beforeUpload={beforeUpload}
                onChange={handleUploadImageChange}
              >
                {field.value ? (
                  <Image
                    src={field.value}
                    alt="avatar"
                    style={{ width: "100%" }}
                    width={100}
                    height={100}
                  />
                ) : (
                  uploadButton
                )}
              </Upload>
            )}
          />
          <Controller
            name="personalInfo.fullName"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="Full Name" size="large" />
            )}
          />
          {errors.personalInfo?.fullName && (
            <Text type="danger">{errors.personalInfo.fullName.message}</Text>
          )}
          <Controller
            name="personalInfo.email"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="Email" size="large" />
            )}
          />
          {errors.personalInfo?.email && (
            <Text type="danger">{errors.personalInfo.email.message}</Text>
          )}
          <Controller
            name="personalInfo.phone"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="Phone" size="large" />
            )}
          />
          {errors.personalInfo?.phone && (
            <Text type="danger">{errors.personalInfo.phone.message}</Text>
          )}
          <Controller
            name="personalInfo.address"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="Address" size="large" />
            )}
          />
          {errors.personalInfo?.address && (
            <Text type="danger">{errors.personalInfo.address.message}</Text>
          )}
        </Space>
      </Card>
    </motion.div>
  );
};
