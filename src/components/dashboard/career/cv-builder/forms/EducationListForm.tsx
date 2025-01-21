import { ResumeEducationType } from "@/app/types/career";
import { useResume } from "@/contexts/ResumeContext";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Collapse, CollapseProps, Empty, Form } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import React, { useState } from "react";
import EducationAccordion from "./EducationAccordion";

dayjs.extend(customParseFormat);

export type EducationFormValues = {
  educationList: ResumeEducationType[];
};

type Props = {
  isSaving?: boolean;
  onSubmit: (education: ResumeEducationType[]) => void;
};

const EducationListForm: React.FC<Props> = ({ isSaving, onSubmit }) => {
  const {
    resumeData: { education },
    setResumeData,
  } = useResume();
  const [form] = Form.useForm<EducationFormValues>();
  const [activeKey, setActiveKey] = useState<(string | number)[]>([]);
  const [showSaveBtn, setShowSaveBtn] = useState(false);

  const educationList = education.map((item) => ({
    ...item,
    startDate: dayjs(item?.startDate),
    endDate: item?.endDate ? dayjs(item.endDate) : "",
  }));

  return (
    <Form
      form={form}
      layout="vertical"
      scrollToFirstError={{ behavior: "smooth", block: "end", focus: true }}
      disabled={isSaving}
      onFinishFailed={({ errorFields }) => {
        const activeKeys = errorFields.map(({ name }) => name[1]);
        setActiveKey(activeKeys);
      }}
      initialValues={{ educationList }}
      onValuesChange={(_, { educationList }) => {
        setResumeData((prev) => ({
          ...prev,
          education: educationList,
        }));
        setShowSaveBtn(educationList.length > 0);
      }}
      onFinish={({ educationList }) => onSubmit(educationList)}
    >
      <Form.List name="educationList">
        {(fields, { add, remove }) => {
          const handleAdd = () => {
            add();
            setActiveKey([fields.length]);
          };
          const items: CollapseProps["items"] = fields.map((field) => ({
            key: field.name,
            label: `Education ${field.name + 1}`,
            extra: (
              <CloseOutlined
                className="text-red-500"
                onClick={(e) => {
                  e.stopPropagation();
                  remove(field.name);
                }}
              />
            ),
            children: (
              <EducationAccordion
                key={field.key}
                data={education[field.name]}
                field={field}
              />
            ),
          }));
          return (
            <div className="flex flex-col gap-4">
              {items.length ? (
                <Collapse
                  items={items}
                  size="small"
                  activeKey={activeKey}
                  onChange={(key) => setActiveKey(key)}
                />
              ) : (
                <Empty />
              )}

              <Button
                type="dashed"
                onClick={handleAdd}
                icon={<PlusOutlined />}
                block
                className="!font-dm_sans"
              >
                Add Education
              </Button>
            </div>
          );
        }}
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

export default EducationListForm;

