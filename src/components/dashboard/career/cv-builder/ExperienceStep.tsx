import { CvStepProps } from "@/app/types/career";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Divider, Input, Space, Typography } from "antd";

import { motion } from "framer-motion";
import { Controller, useFieldArray } from "react-hook-form";

const { Text, Title } = Typography;
const { TextArea } = Input;

export const ExperienceStep: React.FC<CvStepProps> = ({ control, errors }) => {
  const experienceArray = useFieldArray({
    control,
    name: "experience",
  });
  return (
    <motion.div
      key="experience"
      initial={{ y: 1000 }}
      animate={{ y: 0 }}
      exit={{ y: -1000 }}
      transition={{ duration: 0.5 }}
    >
      <Card bordered>
        <Title level={3}>Work Experience</Title>
        <Divider />
        <Button
          type="dashed"
          block
          icon={<PlusOutlined />}
          onClick={() =>
            experienceArray.append({
              company: "",
              position: "",
              startDate: "",
              endDate: "",
              description: "",
            })
          }
        >
          Add Experience
        </Button>
        {experienceArray.fields.map((field, index) => (
          <Card
            key={field.id}
            type="inner"
            title={`Experience ${index + 1}`}
            extra={
              <Button
                type="text"
                danger
                icon={<DeleteOutlined />}
                onClick={() => experienceArray.remove(index)}
              />
            }
            style={{ marginTop: 16 }}
          >
            <Space direction="vertical" style={{ width: "100%" }}>
              <Controller
                name={`experience.${index}.company`}
                control={control}
                render={({ field }) => (
                  <Input {...field} placeholder="Company Name" />
                )}
              />
              {errors.experience?.[index]?.company && (
                <Text type="danger">
                  {errors.experience[index]?.company?.message}
                </Text>
              )}
              <Controller
                name={`experience.${index}.position`}
                control={control}
                render={({ field }) => (
                  <Input {...field} placeholder="Position" />
                )}
              />
              {errors.experience?.[index]?.position && (
                <Text type="danger">
                  {errors.experience[index]?.position?.message}
                </Text>
              )}
              <Controller
                name={`experience.${index}.startDate`}
                control={control}
                render={({ field }) => (
                  <Input {...field} placeholder="Start Date" />
                )}
              />
              {errors.experience?.[index]?.startDate && (
                <Text type="danger">
                  {errors.experience[index]?.startDate?.message}
                </Text>
              )}
              <Controller
                name={`experience.${index}.endDate`}
                control={control}
                render={({ field }) => (
                  <Input {...field} placeholder="End Date" />
                )}
              />
              {errors.experience?.[index]?.endDate && (
                <Text type="danger">
                  {errors.experience[index]?.endDate?.message}
                </Text>
              )}
              <Controller
                name={`experience.${index}.description`}
                control={control}
                render={({ field }) => (
                  <TextArea {...field} placeholder="Description" rows={4} />
                )}
              />
              {errors.experience?.[index]?.description && (
                <Text type="danger">
                  {errors.experience[index]?.description?.message}
                </Text>
              )}
            </Space>
          </Card>
        ))}
      </Card>
    </motion.div>
  );
};
