import { ResumeWorkType } from "@/app/types/career";
import { useResume } from "@/contexts/ResumeContext";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Collapse, CollapseProps, Empty, Form } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import React, { useState } from "react";
import WorkExperience from "./WorkExperience";

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
              <WorkExperience
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
              >
                Add Work Experience
              </Button>
            </div>
          );
        }}
      </Form.List>
      <Form.Item>
        <Button
          className="mt-5"
          type="primary"
          htmlType="submit"
          loading={isSaving}
          disabled={!showSaveBtn}
        >
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};

export default WorkExperienceListForm;
