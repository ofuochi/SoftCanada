import { ResumeSkillType } from "@/app/types/career";
import { useResume } from "@/contexts/ResumeContext";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Flex, Form, Input, Row, Select, Space } from "antd";
import React, { useState } from "react";

const { Option } = Select;

type Props = {
  isSaving?: boolean;
  onSubmit: (skills: ResumeSkillType[]) => void;
};

const SkillsForm: React.FC<Props> = ({ isSaving, onSubmit }) => {
  const {
    resumeData: { skills },
    setResumeData,
  } = useResume();

  const [form] = Form.useForm<{ skills: ResumeSkillType[] }>();
  const [showSaveBtn, setShowSaveBtn] = useState(false);

  const handleValuesChange = (
    _: any,
    { skills }: { skills: ResumeSkillType[] }
  ) => {
    setResumeData((prev) => ({ ...prev, skills }));
    setShowSaveBtn(skills.length > 0);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{ skills }}
      onFinish={({ skills }) => onSubmit(skills)}
      onValuesChange={handleValuesChange}
    >
      <Form.List name="skills">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name }) => (
              <div key={key} className="flex items-center space-x-2">
                <Row
                  key={key}
                  gutter={16}
                  align="middle"
                  wrap={false}
                  style={{ width: "100%" }}
                >
                  <Col flex="1">
                    <Form.Item
                      label="Skill Name"
                      name={[name, "name"]}
                      rules={[
                        { required: true, message: "Please enter skill name!" },
                      ]}
                    >
                      <Input placeholder="E.g. JavaScript" />
                    </Form.Item>
                  </Col>
                  <Col flex="1">
                    <Form.Item label="Level" name={[name, "level"]}>
                      <Select placeholder="Select skill level">
                        <Select.Option value="Beginner">Beginner</Select.Option>
                        <Select.Option value="Intermediate">
                          Intermediate
                        </Select.Option>
                        <Select.Option value="Advanced">Advanced</Select.Option>
                        <Select.Option value="Expert">Expert</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                <div>
                  <CloseOutlined
                    className="text-red-500 cursor-pointer"
                    title="Remove skill"
                    onClick={() => remove(name)}
                  />
                </div>
              </div>
            ))}
            <Button
              type="dashed"
              onClick={() => add()}
              icon={<PlusOutlined />}
              block
            >
              Add Skill
            </Button>
          </>
        )}
      </Form.List>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={isSaving}
          disabled={!showSaveBtn}
          className="mt-4"
        >
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SkillsForm;
