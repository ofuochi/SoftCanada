import dayjs, { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

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
  FormListFieldData,
  Input,
  Row,
  Space,
} from "antd";
import React, { useState } from "react";
import { WorkExperienceFormValues } from "./WorkExperienceListForm";
import { useResume } from "@/contexts/ResumeContext";

type WorkExperienceProps = {
  data: ResumeWorkType;
  field: FormListFieldData;
};

const WorkExperienceAccordion: React.FC<WorkExperienceProps> = ({
  data,
  field,
}) => {
  const { setResumeData } = useResume();
  const form = Form.useFormInstance<WorkExperienceFormValues>();
  const [optionalVisible, setOptionalVisible] = useState<{
    [key in keyof ResumeWorkType]?: boolean;
  }>({
    url: !!data?.url,
    summary: !!data?.summary,
  });

  const [isAccordionCollapsed, setIsAccordionCollapsed] = useState(false);
  const [hasMinHighlightError, setMinHasHighlightError] = useState(false);
  const [hasHighlightValidationError, setHasHighlightValidationError] =
    useState(false);

  const toggleOptionalField = (fld: keyof ResumeWorkType) => {
    setOptionalVisible((prev) => ({
      ...prev,
      [fld]: !prev[fld],
    }));
  };

  const removeField = (fieldName: keyof ResumeWorkType) => {
    const formValues = form.getFieldsValue();
    delete formValues.workExperienceList[field.name][fieldName];
    form.setFieldsValue(formValues);
    setResumeData((prev) => ({
      ...prev,
      work: formValues.workExperienceList,
    }));
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
                        className="!font-dm_sans"
                      >
                        <Input
                          placeholder="Enter responsibility"
                          className="min-h-[44px] rounded-lg p-6 border-[0.5px] border-[#808080] !font-dm_sans"
                        />
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
                    className="!font-dm_sans"
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

  const isDateWithinRange = (currentDate: Dayjs) => {
    if (!currentDate) return false;

    // Get the current month
    const currentMonth = dayjs().endOf("month");

    // Grab the entire list, then pick the startDate for this item
    const listValues = form.getFieldValue("workExperienceList");
    const startVal = listValues?.[field.name]?.startDate;
    if (!startVal) return currentDate.isAfter(currentMonth);

    // Compare month-to-month. We disable if:
    // 1. The date is strictly before the start date.
    // 2. The date is after the current month.
    const startMonth = dayjs(startVal).startOf("month");
    const currentMonthBoundary = dayjs(currentDate).startOf("month");

    return (
      currentMonthBoundary.isBefore(startMonth) || // Date is strictly before start date
      currentDate.isAfter(currentMonth)
    );
  };

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
            className="!font-dm_sans"
          >
            <Input
              placeholder="Enter company name"
              className="min-h-[44px] rounded-lg p-6 border-[0.5px] border-[#808080] !font-dm_sans"
            />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12}>
          <Form.Item
            label="Position"
            name={[field.name, "position"]}
            rules={[{ required: true, message: "Please enter the position!" }]}
            className="!font-dm_sans"
          >
            <Input
              placeholder="Enter position"
              className="min-h-[44px] rounded-lg p-6 border-[0.5px] border-[#808080] !font-dm_sans"
            />
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
            className="!font-dm_sans"
          >
            <DatePicker
              style={{ width: "100%" }}
              format="YYYY-MM"
              picker="month"
              placeholder="Select start date"
              disabledDate={(currentDate) => {
                // Disable dates that are after the current month
                return (
                  currentDate && currentDate.isAfter(dayjs().endOf("month"))
                );
              }}
              className="min-h-[44px] rounded-lg p-6 border-[0.5px] border-[#808080] !font-dm_sans"
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item
            label="End Date"
            name={[field.name, "endDate"]}
            rules={[
              ({ getFieldValue }) => ({
                validator(_, endValue) {
                  if (!endValue) {
                    return Promise.resolve();
                  }
                  const startValue = getFieldValue([
                    "workExperienceList",
                    field.name,
                    "startDate",
                  ]);
                  if (!startValue) {
                    // No start date => no check
                    return Promise.resolve();
                  }

                  // Compare by month. We want endValue to be the same as or after startValue.
                  const startMonth = dayjs(startValue).startOf("month");
                  const endMonth = dayjs(endValue).startOf("month");

                  if (endMonth.isBefore(startMonth)) {
                    return Promise.reject(
                      new Error(
                        "End date must be the same as or after the start date!"
                      )
                    );
                  }

                  return Promise.resolve();
                },
              }),
            ]}
            className="!font-dm_sans"
          >
            <DatePicker
              style={{ width: "100%" }}
              format="YYYY-MM"
              picker="month"
              placeholder="Till Now"
              disabledDate={isDateWithinRange}
              className="min-h-[44px] rounded-lg p-6 border-[0.5px] border-[#808080] !font-dm_sans"
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
              className="!font-dm_sans"
            >
              <Input
                placeholder="Enter company website URL"
                className="min-h-[44px] rounded-lg p-6 border-[0.5px] border-[#808080] !font-dm_sans"
              />
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
            <Form.Item
              label="Summary"
              name={[field.name, "summary"]}
              className="!font-dm_sans"
            >
              <Input.TextArea
                placeholder="Describe your role"
                autoSize={{ minRows: 4 }}
              />
            </Form.Item>
          </div>
          <CloseOutlined
            onClick={() => removeField("summary")}
            title="Remove field"
            className="mt-2 text-red-500"
          />
        </div>
      )}

      {/* Add any hidden optional fields */}
      <Space wrap>
        {Object.entries(optionalVisible).map(
          ([fld, visible]) =>
            !visible && (
              <Button
                key={fld}
                type="dashed"
                onClick={() => toggleOptionalField(fld as keyof ResumeWorkType)}
                icon={<PlusOutlined />}
                className="!font-dm_sans"
              >
                Add {fld.charAt(0).toUpperCase() + fld.slice(1)}
              </Button>
            )
        )}
      </Space>
    </>
  );
};

export default WorkExperienceAccordion;

