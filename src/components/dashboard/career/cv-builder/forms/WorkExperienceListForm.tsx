import { ResumeType, ResumeWorkType } from "@/app/types/career";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Collapse, CollapseProps, Empty, Form } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import React, { Dispatch, SetStateAction, useState } from "react";
import WorkExperience from "./WorkExperience";

dayjs.extend(customParseFormat);

type Props = {
  setResumeData: Dispatch<SetStateAction<ResumeType>>;
  data: ResumeWorkType[];
  isSaving?: boolean;
  onSubmit: (work: ResumeWorkType[]) => void;
};

const WorkExperienceListForm: React.FC<Props> = ({
  setResumeData,
  data,
  isSaving,
  onSubmit,
}) => {
  const [form] = Form.useForm<{ workExperienceList: ResumeWorkType[] }>();
  const [activeKey, setActiveKey] = useState<string[]>([]);
  const [showSaveBtn, setShowSaveBtn] = useState(false);

  const workExperienceList = data.map((item) => ({
    ...item,
    startDate: item.startDate ? dayjs(item.startDate) : undefined,
    endDate: item.endDate ? dayjs(item.endDate) : undefined,
  }));

  return (
    <Form
      form={form}
      layout="vertical"
      disabled={isSaving}
      initialValues={{ workExperienceList }}
      onValuesChange={(_, allValues) => {
        setResumeData((prev) => ({
          ...prev,
          work: allValues.workExperienceList,
        }));
      }}
      onFinish={(values) => onSubmit(values.workExperienceList)}
    >
      <Form.List name="workExperienceList">
        {(fields, { add, remove }) => {
          const handleAdd = () => {
            add();
            setActiveKey([String(fields.length)]);
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
                form={form}
                data={data[field.name]}
                field={field}
              />
            ),
          }));

          setShowSaveBtn(items.length > 0);

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
                size="small"
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
      {showSaveBtn && (
        <Form.Item style={{ marginTop: 24 }}>
          <Button type="primary" htmlType="submit" loading={isSaving}>
            Save
          </Button>
        </Form.Item>
      )}
    </Form>
  );
};

export default WorkExperienceListForm;
