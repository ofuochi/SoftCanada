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
                      className="!font-dm_sans"
                    >
                      <Input
                        placeholder="Name of reference"
                        className="min-h-[44px] rounded-lg p-6 border-[0.5px] border-[#808080] !font-dm_sans"
                      />
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
                      className="!font-dm_sans"
                    >
                      <Input
                        placeholder="E.g. Manager"
                        className="min-h-[44px] rounded-lg p-6 border-[0.5px] border-[#808080] !font-dm_sans"
                      />
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
                      className="!font-dm_sans"
                    >
                      <Input
                        placeholder="Reference contact email"
                        className="min-h-[44px] rounded-lg p-6 border-[0.5px] border-[#808080] !font-dm_sans"
                      />
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
              className="!font-dm_sans"
            >
              Add Reference
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

export default ReferencesForm;

