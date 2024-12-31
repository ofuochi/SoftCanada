import { ResumeType, ResumeWorkType } from "@/app/types/career";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Collapse,
  CollapseProps,
  DatePicker,
  Flex,
  Form,
  Input,
  Row,
  Space,
} from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import React, { Dispatch, SetStateAction, useState } from "react";

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
    url: !!data[0]?.url,
    summary: !!data[0]?.summary,
  });

  const [hasMinHighlightError, setMinHasHighlightError] = useState(false);
  const [hasHighlightValidationError, setHasHighlightValidationError] =
    useState(false);
  const [isAccordionCollapsed, setIsAccordionCollapsed] = useState(false);

  const toggleOptionalField = (field: keyof ResumeWorkType) => {
    setOptionalVisible((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const processedData = data.map((item) => ({
    ...item,
    startDate: item.startDate ? dayjs(item.startDate) : undefined,
    endDate: item.endDate ? dayjs(item.endDate) : undefined,
  }));

  const items: CollapseProps["items"] = [
    {
      key: 1,
      label: "Responsibilities",
      children: (
        <Form.List
          name="highlights"
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
                        layout="horizontal"
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
    <Form
      layout="vertical"
      form={form}
      initialValues={processedData[0] || {}}
      onFinishFailed={() => {
        setIsAccordionCollapsed(
          !(hasHighlightValidationError || hasMinHighlightError)
        );
      }}
      onFinish={(values) => {
        const formattedValues = {
          ...values,
          startDate: values.startDate && dayjs(values.startDate).toISOString(),
          endDate: values.endDate && dayjs(values.endDate).toISOString(),
        };
        onSubmit([formattedValues]);
      }}
      onValuesChange={(_, values) => {
        const { startDate, endDate } = values;
        values.startDate = startDate
          ? dayjs(startDate).toISOString()
          : undefined;
        values.endDate = endDate ? dayjs(endDate).toISOString() : undefined;
        setResumeData((prev) => ({ ...prev, work: [values] }));
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
              placeholder="Select end date"
            />
          </Form.Item>
        </Col>
      </Row>

      <div className="mb-5">
        <Collapse
          items={items}
          size="small"
          ghost
          defaultActiveKey={1}
          activeKey={isAccordionCollapsed ? undefined : 1}
          collapsible={
            hasMinHighlightError || hasHighlightValidationError
              ? "disabled"
              : "header"
          }
          onChange={(key) => {
            setIsAccordionCollapsed(key.length === 0);
          }}
        />
      </div>

      {optionalVisible.url && (
        <div className="flex space-x-2">
          <div className="flex-1">
            <Form.Item
              label="Company URL"
              name="url"
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
            onClick={() => {
              form.setFieldsValue({ url: undefined });
              setResumeData((prev) => ({
                ...prev,
                work: [{ ...prev.work[0], url: undefined }],
              }));
              toggleOptionalField("url");
            }}
            className="mt-2 text-red-500"
            title="Remove field"
          />
        </div>
      )}

      {optionalVisible.summary && (
        <div className="flex space-x-2">
          <div className="flex-1">
            <Form.Item label="Summary" name="summary">
              <Input.TextArea
                placeholder="Describe your role"
                autoSize={{ minRows: 4 }}
              />
            </Form.Item>
          </div>
          <CloseOutlined
            onClick={() => {
              form.setFieldsValue({ summary: undefined });
              setResumeData((prev) => ({
                ...prev,
                work: [{ ...prev.work[0], summary: undefined }],
              }));
              toggleOptionalField("summary");
            }}
            className="mt-2 text-red-500"
            title="Remove field"
          />
        </div>
      )}

      {Object.entries(optionalVisible).map(
        ([field, visible]) =>
          !visible && (
            <Space key={field} wrap className="mb-5">
              <Button
                type="dashed"
                onClick={() =>
                  toggleOptionalField(field as keyof ResumeWorkType)
                }
                icon={<PlusOutlined />}
              >
                Add {field.charAt(0).toUpperCase() + field.slice(1)}
              </Button>
            </Space>
          )
      )}

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isSaving}>
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};

export default WorkExperienceForm;
