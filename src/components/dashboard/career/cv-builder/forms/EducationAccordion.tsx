import dayjs, { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

import { ResumeEducationType } from "@/app/types/career";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Collapse,
  CollapseProps,
  DatePicker,
  Form,
  FormListFieldData,
  Input,
  Row,
  Space,
} from "antd";
import React, { useState } from "react";
import { useResume } from "@/contexts/ResumeContext";

type EducationProps = {
  data: ResumeEducationType;
  field: FormListFieldData;
};

const EducationAccordion: React.FC<EducationProps> = ({ data, field }) => {
  const { setResumeData } = useResume();
  const form = Form.useFormInstance();
  const [optionalVisible, setOptionalVisible] = useState<{
    [key in keyof ResumeEducationType]?: boolean;
  }>({
    url: !!data?.url,
    score: !!data?.score,
    courses: !!data?.courses?.length,
    endDate: !!data?.endDate,
  });

  const toggleOptionalField = (fld: keyof ResumeEducationType) => {
    setOptionalVisible((prev) => ({
      ...prev,
      [fld]: !prev[fld],
    }));
  };

  const removeField = (fieldName: keyof ResumeEducationType) => {
    const formValues = form.getFieldsValue();
    delete formValues.educationList[field.name][fieldName];
    form.setFieldsValue(formValues);
    setResumeData((prev) => ({
      ...prev,
      education: formValues.educationList,
    }));
    toggleOptionalField(fieldName);
  };

  const coursesItem: CollapseProps["items"] = [
    {
      key: "1",
      label: "Courses",
      extra: (
        <CloseOutlined
          onClick={(e) => {
            e.stopPropagation();
            removeField("courses");
          }}
          className="mt-2 text-red-500"
          title="Remove courses"
        />
      ),
      children: (
        <Form.List
          name={[field.name, "courses"]}
          rules={[
            {
              validator: async (_, names) => {
                if (!names || names.length === 0) {
                  return Promise.reject(
                    new Error("Please add at least one course!")
                  );
                }
              },
            },
          ]}
        >
          {(fields, { add, remove }, { errors }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Row key={key} gutter={8}>
                  <Col flex="auto">
                    <Form.Item
                      {...restField}
                      name={name}
                      rules={[{ required: true }]}
                    >
                      <Input placeholder="Enter course" />
                    </Form.Item>
                  </Col>
                  <Col>
                    <CloseOutlined
                      onClick={() => remove(name)}
                      className="mt-2 text-red-500"
                      title="Remove"
                    />
                  </Col>
                </Row>
              ))}
              <Form.Item noStyle>
                <Form.ErrorList errors={errors} className="mb-5 text-red-500" />
                <Button
                  type="dashed"
                  onClick={() => add()}
                  icon={<PlusOutlined />}
                >
                  Add Course
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      ),
    },
  ];

  return (
    <>
      <div className="flex space-x-2">
        <div className="flex-1">
          <Form.Item
            label="Institution"
            name={[field.name, "institution"]}
            rules={[
              { required: true, message: "Please enter the institution!" },
            ]}
          >
            <Input placeholder="Enter institution" />
          </Form.Item>
        </div>
      </div>
      <Row gutter={16}>
        <Col xs={24} sm={12}>
          <Form.Item
            label="Study Type"
            name={[field.name, "studyType"]}
            rules={[
              { required: true, message: "Please enter the study type!" },
            ]}
          >
            <Input placeholder="e.g. Bachelor's, Diploma" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item
            label="Area"
            name={[field.name, "area"]}
            rules={[
              { required: true, message: "Please enter the area of study!" },
            ]}
          >
            <Input placeholder="e.g. Computer Science" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24} sm={12}>
          <Form.Item
            label="Start Date"
            name={[field.name, "startDate"]}
            rules={[{ required: true, message: "Please select start date!" }]}
          >
            <DatePicker
              style={{ width: "100%" }}
              format="YYYY-MM"
              picker="month"
              placeholder="Select start date"
              disabledDate={(currentDate) =>
                currentDate && currentDate.isAfter(dayjs().endOf("month"))
              }
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
                  if (!endValue) return Promise.resolve();
                  const startValue = getFieldValue([
                    "educationList",
                    field.name,
                    "startDate",
                  ]);
                  if (!startValue) return Promise.resolve();
                  const startMonth = dayjs(startValue).startOf("month");
                  const endMonth = dayjs(endValue).startOf("month");
                  if (endMonth.isBefore(startMonth)) {
                    return Promise.reject(
                      new Error("End date must be after start date!")
                    );
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <DatePicker
              style={{ width: "100%" }}
              format="YYYY-MM"
              picker="month"
              placeholder="Current"
              disabledDate={(currentDate) =>
                !currentDate || currentDate.isAfter(dayjs().endOf("month"))
              }
            />
          </Form.Item>
        </Col>
      </Row>

      {/* Optional Fields */}
      {optionalVisible.url && (
        <div className="flex space-x-2">
          <div className="flex-1">
            <Form.Item
              label="Institution URL"
              name={[field.name, "url"]}
              rules={[
                {
                  type: "url",
                  message: "Please enter a valid URL!",
                },
              ]}
            >
              <Input placeholder="Enter institution website URL" />
            </Form.Item>
          </div>
          <CloseOutlined
            onClick={() => removeField("url")}
            className="mt-2 text-red-500"
            title="Remove field"
          />
        </div>
      )}

      {optionalVisible.score && (
        <div className="flex space-x-2">
          <div className="flex-1">
            <Form.Item label="Score" name={[field.name, "score"]}>
              <Input placeholder="e.g. 4.0 GPA" />
            </Form.Item>
          </div>
          <CloseOutlined
            onClick={() => removeField("score")}
            className="mt-2 text-red-500"
            title="Remove field"
          />
        </div>
      )}

      {optionalVisible.courses && (
        <Collapse items={coursesItem} size="small" ghost defaultActiveKey="1" />
      )}

      {/* Add hidden optional fields */}
      <Space wrap>
        {Object.entries(optionalVisible).map(
          ([fld, visible]) =>
            !visible && (
              <Button
                key={fld}
                type="dashed"
                onClick={() =>
                  toggleOptionalField(fld as keyof ResumeEducationType)
                }
                icon={<PlusOutlined />}
              >
                Add {fld.charAt(0).toUpperCase() + fld.slice(1)}
              </Button>
            )
        )}
      </Space>
    </>
  );
};

export default EducationAccordion;
