import { CvStepProps } from "@/app/types/career";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Divider, Input, Space, Typography } from "antd";
import { motion } from "framer-motion";
import { Controller, useFieldArray } from "react-hook-form";

const { TextArea } = Input;
const { Title, Text } = Typography;

export const EducationStep: React.FC<CvStepProps> = ({ errors, control }) => {
  const educationArray = useFieldArray({
    control,
    name: "education",
  });
  return (
    <motion.div
      key="education"
      initial={{ x: -1000 }}
      animate={{ x: 0 }}
      exit={{ x: 1000 }}
      transition={{ duration: 0.5 }}
    >
      <Card bordered>
        <Title level={3}>Education</Title>
        <Divider />
        <Button
          type="dashed"
          block
          icon={<PlusOutlined />}
          onClick={() =>
            educationArray.append({
              institution: "",
              degree: "",
              startDate: "",
              endDate: "",
              description: "",
            })
          }
        >
          Add Education
        </Button>
        {educationArray.fields.map((field, index) => (
          <Card
            key={field.id}
            type="inner"
            title={`Education ${index + 1}`}
            extra={
              <Button
                type="text"
                danger
                icon={<DeleteOutlined />}
                onClick={() => educationArray.remove(index)}
              />
            }
            style={{ marginTop: 16 }}
          >
            <Space direction="vertical" style={{ width: "100%" }}>
              <Controller
                name={`education.${index}.institution`}
                control={control}
                render={({ field }) => (
                  <Input {...field} placeholder="Institution Name" />
                )}
              />
              {errors.education?.[index]?.institution && (
                <Text type="danger">
                  {errors.education[index]?.institution?.message}
                </Text>
              )}
              <Controller
                name={`education.${index}.degree`}
                control={control}
                render={({ field }) => (
                  <Input {...field} placeholder="Degree" />
                )}
              />
              {errors.education?.[index]?.degree && (
                <Text type="danger">
                  {errors.education[index]?.degree?.message}
                </Text>
              )}
              <Controller
                name={`education.${index}.startDate`}
                control={control}
                render={({ field }) => (
                  <Input {...field} placeholder="Start Date" />
                )}
              />
              {errors.education?.[index]?.startDate && (
                <Text type="danger">
                  {errors.education[index]?.startDate?.message}
                </Text>
              )}
              <Controller
                name={`education.${index}.endDate`}
                control={control}
                render={({ field }) => (
                  <Input {...field} placeholder="End Date" />
                )}
              />
              {errors.education?.[index]?.endDate && (
                <Text type="danger">
                  {errors.education[index]?.endDate?.message}
                </Text>
              )}
              <Controller
                name={`education.${index}.description`}
                control={control}
                render={({ field }) => (
                  <TextArea {...field} placeholder="Description" rows={4} />
                )}
              />
              {errors.education?.[index]?.description && (
                <Text type="danger">
                  {errors.education[index]?.description?.message}
                </Text>
              )}
            </Space>
          </Card>
        ))}
      </Card>
    </motion.div>
  );
};
