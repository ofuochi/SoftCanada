import { CvStepProps } from "@/app/types/career";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Card, Divider, Input, List, Typography } from "antd";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { useFieldArray } from "react-hook-form";

const { Title, Text } = Typography;

export const SkillsStep: React.FC<CvStepProps> = ({ errors, control }) => {
  const [skillInput, setSkillInput] = useState("");
  const skillsArray = useFieldArray({
    control,
    name: "skills",
  });
  return (
    <motion.div
      key="skills"
      initial={{ x: 1000 }}
      animate={{ x: 0 }}
      exit={{ x: -1000 }}
      transition={{ duration: 0.5 }}
    >
      <Card bordered>
        <Title level={3}>Skills</Title>
        <Divider />
        <Input
          placeholder="Enter a skill and press Add"
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
          onPressEnter={() => {
            if (skillInput.trim()) {
              skillsArray.append({ name: skillInput.trim() });
              setSkillInput("");
            }
          }}
          addonAfter={
            <Button
              type="primary"
              onClick={() => {
                if (skillInput.trim()) {
                  skillsArray.append({ name: skillInput.trim() });
                  setSkillInput("");
                }
              }}
            >
              Add
            </Button>
          }
        />
        {errors.skills && <Text type="danger">{errors.skills.message}</Text>}
        <List
          dataSource={skillsArray.fields}
          renderItem={(item, index) => (
            <List.Item
              actions={[
                <Button
                  key={index}
                  type="text"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => skillsArray.remove(index)}
                />,
              ]}
            >
              {item.name}
            </List.Item>
          )}
        />
      </Card>
    </motion.div>
  );
};
