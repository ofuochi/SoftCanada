import { CvStepProps } from "@/app/types/career";
import { Card, Divider, Input, Typography } from "antd";
import { motion } from "framer-motion";
import React from "react";
import { Controller } from "react-hook-form";

const { TextArea } = Input;
const { Title, Text } = Typography;

export const SummaryStep: React.FC<CvStepProps> = ({ control, errors }) => {
  return (
    <motion.div
      key="summary"
      initial={{ y: -1000 }}
      animate={{ y: 0 }}
      exit={{ y: 1000 }}
      transition={{ duration: 0.5 }}
    >
      <Card bordered>
        <Title level={3}>Professional Summary</Title>
        <Divider />
        <Controller
          name="summary"
          control={control}
          render={({ field }) => (
            <TextArea
              {...field}
              placeholder="Write a brief summary about yourself"
              rows={6}
            />
          )}
        />
        {errors.summary && <Text type="danger">{errors.summary.message}</Text>}
      </Card>
    </motion.div>
  );
};
