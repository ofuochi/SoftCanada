import { ResumeWorkType } from "@/app/types/career";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Collapse,
  CollapseProps,
  DatePicker,
  Flex,
  Form,
  FormInstance,
  FormListFieldData,
  Input,
  Row,
  Space,
} from "antd";
import React, { useState } from "react";

interface WorkExperienceFormValues {
  workExperienceList: ResumeWorkType[];
}

type WorkExperienceProps = {
  data: ResumeWorkType;
  form: FormInstance<WorkExperienceFormValues>;
  field: FormListFieldData;
};

const WorkExperience: React.FC<WorkExperienceProps> = ({
  data,
  form,
  field,
}) => {
  const [optionalVisible, setOptionalVisible] = useState<{
    [key in keyof ResumeWorkType]?: boolean;
  }>({
    url: !!data?.url,
    summary: !!data?.summary,
  });

  const [hasMinHighlightError, setMinHasHighlightError] = useState(false);
  const [hasHighlightValidationError, setHasHighlightValidationError] =
    useState(false);
  const [isAccordionCollapsed, setIsAccordionCollapsed] = useState(false);

  const toggleOptionalField = (fld: keyof ResumeWorkType) => {
    setOptionalVisible((prev) => ({
      ...prev,
      [fld]: !prev[fld],
    }));
  };

  const removeField = (fieldName: keyof ResumeWorkType) => {
    const formValues = form.getFieldsValue();

    const experience = formValues.workExperienceList[field.name];
    if (!experience) return;

    delete experience[fieldName];

    formValues.workExperienceList[field.name] = experience;

    form.setFieldsValue(formValues);
    toggleOptionalField(fieldName);
  };

  const highlights: CollapseProps["items"] = [
    {
      key: "1",
      label: "Responsibilities",
      children: (
        <Form.List
          name={[field.name, "highlights"]}
          rules={[
            {
              validator: async (_, names) => {
                if (!names || names.length === 0) {
                  return Promise.reject(
                    new Error("Please add at least one responsibility!")
                  );
                }
              },
            },
          ]}
        >
          {(fields, { add, remove }, { errors }) => {
            setMinHasHighlightError(errors.length > 0);
            return (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Flex key={key} className="space-x-2">
                    <div className="flex-1">
                      <Form.Item
                        {...restField}
                        name={name}
                        rules={[
                          {
                            required: true,
                            validator: async (_, value) => {
                              if (!value) {
                                setHasHighlightValidationError(true);
                                return Promise.reject(new Error("Required!"));
                              }
                              setHasHighlightValidationError(false);
                            },
                          },
                        ]}
                      >
                        <Input placeholder="Enter responsibility" />
                      </Form.Item>
                    </div>
                    <div>
                      <CloseOutlined
                        onClick={() => {
                          remove(name);
                          setHasHighlightValidationError(false);
                        }}
                        className="mt-2 text-red-500"
                        title="Remove"
                      />
                    </div>
                  </Flex>
                ))}

                <Form.Item noStyle>
                  <Form.ErrorList
                    errors={errors}
                    className="mb-5 text-red-500"
                  />
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    icon={<PlusOutlined />}
                  >
                    Add Responsibility
                  </Button>
                </Form.Item>
              </>
            );
          }}
        </Form.List>
      ),
    },
  ];

  return (
    <>
      <Row gutter={16}>
        <Col xs={24} sm={12}>
          <Form.Item
            label="Company Name"
            name={[field.name, "name"]}
            rules={[
              { required: true, message: "Please enter the company name!" },
            ]}
          >
            <Input placeholder="Enter company name" />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12}>
          <Form.Item
            label="Position"
            name={[field.name, "position"]}
            rules={[{ required: true, message: "Please enter the position!" }]}
          >
            <Input placeholder="Enter position" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24} sm={12}>
          <Form.Item
            label="Start Date"
            name={[field.name, "startDate"]}
            rules={[
              { required: true, message: "Please enter the start date!" },
            ]}
          >
            <DatePicker
              style={{ width: "100%" }}
              format="YYYY-MM"
              placeholder="Select start date"
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item label="End Date" name={[field.name, "endDate"]}>
            <DatePicker
              style={{ width: "100%" }}
              format="YYYY-MM"
              placeholder="Select end date"
            />
          </Form.Item>
        </Col>
      </Row>

      {/* Responsibilities (highlights) */}
      <div className="mb-5">
        <Collapse
          items={highlights}
          size="small"
          ghost
          defaultActiveKey="1"
          activeKey={isAccordionCollapsed ? undefined : "1"}
          collapsible={
            hasMinHighlightError || hasHighlightValidationError
              ? "disabled"
              : "header"
          }
          onChange={(key) => setIsAccordionCollapsed(key.length === 0)}
        />
      </div>

      {/* Optional Fields */}
      {optionalVisible.url && (
        <div className="flex space-x-2">
          <div className="flex-1">
            <Form.Item
              label="Company URL"
              name={[field.name, "url"]}
              rules={[
                {
                  type: "url",
                  message: "Please enter a valid URL!",
                },
              ]}
            >
              <Input placeholder="Enter company website URL" />
            </Form.Item>
          </div>
          <CloseOutlined
            onClick={() => removeField("url")}
            className="mt-2 text-red-500"
            title="Remove field"
          />
        </div>
      )}

      {optionalVisible.summary && (
        <div className="flex space-x-2">
          <div className="flex-1">
            <Form.Item label="Summary" name={[field.name, "summary"]}>
              <Input.TextArea
                placeholder="Describe your role"
                autoSize={{ minRows: 4 }}
              />
            </Form.Item>
          </div>
          <CloseOutlined
            onClick={() => removeField("summary")}
            className="mt-2 text-red-500"
            title="Remove field"
          />
        </div>
      )}

      {/* Add any hidden optional fields */}
      <Space wrap>
        {Object.entries(optionalVisible).map(
          ([field, visible]) =>
            !visible && (
              <Button
                key={field}
                type="dashed"
                onClick={() =>
                  toggleOptionalField(field as keyof ResumeWorkType)
                }
                icon={<PlusOutlined />}
              >
                Add {field.charAt(0).toUpperCase() + field.slice(1)}
              </Button>
            )
        )}
      </Space>
    </>
  );
};

export default WorkExperience;
