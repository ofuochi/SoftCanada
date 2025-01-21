import { ResumeSkillType } from "@/app/types/career";
import { useResume } from "@/contexts/ResumeContext";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Select } from "antd";
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

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{ skills }}
      onFinish={({ skills }) => onSubmit(skills)}
      onValuesChange={(_, { skills }) => {
        setResumeData((prev) => ({ ...prev, skills }));
        setShowSaveBtn(skills.length > 0);
      }}
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
                      className="!font-dm_sans"
                    >
                      <Input
                        placeholder="E.g. JavaScript"
                        className="min-h-[44px] rounded-lg p-6 border-[0.5px] border-[#808080] !font-dm_sans"
                      />
                    </Form.Item>
                  </Col>
                  <Col flex="1">
                    <Form.Item
                      label="Level"
                      name={[name, "level"]}
                      className="!font-dm_sans"
                    >
                      <Select
                        placeholder="Select skill level"
                        className="min-h-[44px] rounded-lg p-6 border-[0.5px] border-[#808080] !font-dm_sans"
                      >
                        <Option value="Beginner">Beginner</Option>
                        <Option value="Intermediate">Intermediate</Option>
                        <Option value="Advanced">Advanced</Option>
                        <Option value="Expert">Expert</Option>
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
              className="!font-dm_sans"
            >
              Add Skill
            </Button>
          </>
        )}
      </Form.List>

      <Form.Item>
        <Button
          loading={isSaving}
          disabled={!showSaveBtn}
          htmlType="submit"
          className="!font-dm_sans mt-5"
          style={{
            width: "100%",
            maxWidth: "400px",
            borderRadius: "12px",
            padding: "18px 24px",
            height: "50px",
            fontWeight: "600",
            fontSize: "16px",
            color: "#010309",
            border: "none",
            backgroundColor: "#72FA3266",
          }}
        >
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SkillsForm;

