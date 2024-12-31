import { ResumeType, ResumeWorkType } from "@/app/types/career";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Collapse,
  CollapseProps,
  Empty,
  Form,
  Input,
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

const WorkExperienceListForm: React.FC<Props> = ({
  setResumeData,
  data,
  isSaving,
  onSubmit,
}) => {
  const [form] = Form.useForm();
  const [activeKey, setActiveKey] = useState<string[]>([]);
  const [showSaveAllBtn, setShowSaveAllBtn] = useState(false);

  const workExperienceList = data.map((item) => ({
    ...item,
    startDate: item.startDate ? dayjs(item.startDate) : undefined,
    endDate: item.endDate ? dayjs(item.endDate) : undefined,
  }));

  return (
    <Form
      form={form}
      onFinish={onSubmit}
      initialValues={workExperienceList}
      onValuesChange={(_, allValues) => {
        setResumeData((prev) => ({
          ...prev,
          work: allValues,
        }));
      }}
    >
      <Form.List name="items">
        {(fields, { add, remove }) => {
          const handleAdd = () => {
            add();
            setActiveKey([String(fields.length)]);
          };

          const items: CollapseProps["items"] = fields.map((field) => ({
            key: String(field.name),
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
              <Space direction="vertical" size="small">
                <Form.Item
                  name={[field.name, "company"]}
                  label="Company"
                  rules={[{ required: true, message: "Company is required" }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name={[field.name, "position"]}
                  label="Position"
                  rules={[{ required: true, message: "Position is required" }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name={[field.name, "start"]}
                  label="Start"
                  rules={[{ required: true, message: "Start is required" }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name={[field.name, "end"]}
                  label="End"
                  rules={[{ required: true, message: "End is required" }]}
                >
                  <Input />
                </Form.Item>
              </Space>
            ),
          }));

          setShowSaveAllBtn(items.length > 0);

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
      {showSaveAllBtn && (
        <Form.Item style={{ marginTop: 24 }}>
          <Button type="primary" htmlType="submit" loading={isSaving}>
            Save All
          </Button>
        </Form.Item>
      )}
    </Form>
  );
};

export default WorkExperienceListForm;
