import { ResumeWorkType } from "@/app/types/career";
import { useResume } from "@/contexts/ResumeContext";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Collapse, CollapseProps, Empty, Form } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import React, { useState } from "react";
import WorkExperienceAccordion from "./WorkExperienceAccordion";

dayjs.extend(customParseFormat);

export type WorkExperienceFormValues = {
  workExperienceList: ResumeWorkType[];
};

type Props = {
  isSaving?: boolean;
  onSubmit: (work: ResumeWorkType[]) => void;
};

const WorkExperienceListForm: React.FC<Props> = ({ isSaving, onSubmit }) => {
  const {
    resumeData: { work },
    setResumeData,
  } = useResume();
  const [form] = Form.useForm<WorkExperienceFormValues>();
  const [activeKey, setActiveKey] = useState<(string | number)[]>([]);
  const [showSaveBtn, setShowSaveBtn] = useState(false);

  const workExperienceList = work.map((item) => ({
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
      initialValues={{ workExperienceList }}
      onValuesChange={(_, { workExperienceList }) => {
        setResumeData((prev) => ({
          ...prev,
          work: workExperienceList,
        }));
        setShowSaveBtn(workExperienceList.length > 0);
      }}
      onFinish={({ workExperienceList }) => onSubmit(workExperienceList)}
    >
      <Form.List name="workExperienceList">
        {(fields, { add, remove }) => {
          const handleAdd = () => {
            add();
            setActiveKey([fields.length]);
          };
          const items: CollapseProps["items"] = fields.map((field) => ({
            key: field.name,
            label: `Work Experience ${field.name + 1}`,
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
              <WorkExperienceAccordion
                key={field.key}
                data={work[field.name]}
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
                Add Work Experience
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

export default WorkExperienceListForm;

