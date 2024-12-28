import React, { Dispatch, SetStateAction, useState } from "react";
import { ResumeWorkType, ResumeType } from "@/app/types/career";
import { Button, Col, Form, Input, Row, DatePicker, Space } from "antd";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

type Props = {
  setResumeData: Dispatch<SetStateAction<ResumeType>>;
  data: ResumeWorkType[];
  isSaving?: boolean;
  onSubmit: (work: ResumeWorkType[]) => void;
};

const WorkExperienceForm: React.FC<Props> = ({
  setResumeData,
  data,
  isSaving,
  onSubmit,
}) => {
  const [form] = Form.useForm<ResumeWorkType>();
  const [optionalVisible, setOptionalVisible] = useState<{
    [key in keyof ResumeWorkType]?: boolean;
  }>({
    url: false,
    summary: false,
  });

  const toggleOptionalField = (field: keyof ResumeWorkType) => {
    setOptionalVisible((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  return (
    <Form
      layout="vertical"
      form={form}
      initialValues={data[0] || {}}
      onFinish={(values) => onSubmit([values])}
      onValuesChange={(_, values) => {
        const { startDate, endDate } = values;
        values.startDate = startDate && dayjs(startDate).toISOString();
        values.endDate = endDate && dayjs(endDate).toISOString();
        return setResumeData((prev) => ({ ...prev, work: [values] }));
      }}
    >
      <Row gutter={16}>
        <Col xs={24} sm={12}>
          <Form.Item
            label="Company Name"
            name="name"
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
            name="position"
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
            name="startDate"
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
          <Form.Item label="End Date" name="endDate">
            <DatePicker
              style={{ width: "100%" }}
              format="YYYY-MM"
              placeholder="Select end date or 'Present'"
            />
          </Form.Item>
        </Col>
      </Row>
      {optionalVisible.url && (
        <Form.Item label="Company URL" name="url">
          <Input placeholder="Enter company website URL" />
        </Form.Item>
      )}
      {optionalVisible.summary && (
        <Form.Item label="Summary" name="summary">
          <Input.TextArea
            placeholder="Describe your role"
            autoSize={{ minRows: 4 }}
          />
        </Form.Item>
      )}
      <Form.Item>
        <Form.List name="highlights">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }, index) => (
                <Space key={key} style={{ display: "flex" }} align="baseline">
                  <Form.Item
                    {...restField}
                    label={`Highlight ${index + 1}`}
                    name={name}
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message: "Please enter a highlight!",
                      },
                    ]}
                  >
                    <Input placeholder="Enter highlight" />
                  </Form.Item>
                  <CloseOutlined
                    onClick={() => remove(name)}
                    style={{ color: "red" }}
                  />
                </Space>
              ))}
              <Button
                type="dashed"
                onClick={() => add()}
                icon={<PlusOutlined />}
              >
                Add Highlight
              </Button>
            </>
          )}
        </Form.List>
      </Form.Item>
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
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={isSaving}
          style={{ marginTop: 16 }}
        >
          Save Work Experience
        </Button>
      </Form.Item>
    </Form>
  );
};

export default WorkExperienceForm;
