import { ResumeReferenceType } from "@/app/types/career";
import { useResume } from "@/contexts/ResumeContext";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row } from "antd";
import React, { useState } from "react";

type Props = {
  isSaving?: boolean;
  onSubmit: (references: ResumeReferenceType[]) => void;
};

const ReferencesForm: React.FC<Props> = ({ isSaving, onSubmit }) => {
  const {
    resumeData: { references },
    setResumeData,
  } = useResume();
  const [form] = Form.useForm<{ references: ResumeReferenceType[] }>();
  const [showSaveBtn, setShowSaveBtn] = useState(false);

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{ references }}
      onFinish={({ references }) => onSubmit(references)}
      onValuesChange={(_, { references }) => {
        setResumeData((prev) => ({ ...prev, references }));
        setShowSaveBtn(references.length > 0);
      }}
    >
      <Form.List name="references">
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
                      label="Name"
                      name={[name, "name"]}
                      rules={[
                        {
                          required: true,
                          message: "Required!",
                        },
                      ]}
                    >
                      <Input placeholder="Name of reference" />
                    </Form.Item>
                  </Col>
                  <Col flex="1">
                    <Form.Item
                      label="Relationship"
                      name={[name, "reference"]}
                      rules={[
                        {
                          required: true,
                          message: "Required!",
                        },
                      ]}
                    >
                      <Input placeholder="E.g. Manager" />
                    </Form.Item>
                  </Col>
                  <Col flex="1">
                    <Form.Item
                      label="Email"
                      name={[name, "email"]}
                      rules={[
                        { type: "email", message: "Invalid email!" },
                        {
                          required: true,
                          message: "Required!",
                        },
                      ]}
                    >
                      <Input placeholder="Reference contact email" />
                    </Form.Item>
                  </Col>
                </Row>
                <div>
                  <CloseOutlined
                    className="text-red-500 cursor-pointer"
                    title="Remove reference"
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

export default ReferencesForm;
