import {
  ResumeBasicsType,
  ResumeType,
  ResumeWorkType,
} from "@/app/types/career";
import { useApiClient } from "@/hooks/api-hook";
import { LeftOutlined } from "@ant-design/icons";
import { Collapse, CollapseProps, FloatButton, message, Space } from "antd";
import React, { SetStateAction, useState } from "react";
import { PiGraduationCap, PiSuitcaseSimpleThin } from "react-icons/pi";
import { RiProfileLine } from "react-icons/ri";
import PersonalInfoForm from "./forms/PersonalInfoForm";
import WorkExperienceListForm from "./forms/WorkExperienceListForm";
import { ResumeTemplate } from "./ResumeTemplate";

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

type Props = {
  data: ResumeType;
  setShowCvBuilder: (value: SetStateAction<boolean>) => void;
};

const ResumeBuilder: React.FC<Props> = ({ data, setShowCvBuilder }) => {
  const [resumeData, setResumeData] = useState<ResumeType>(data);
  const { post, put } = useApiClient();
  const [inProgress, setInProgress] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const handlePersonalInfoSubmit = async (basics: ResumeBasicsType) => {
    setInProgress(true);
    const reqData: ResumeType = { ...data, basics };
    try {
      if (data.id) await put(`/api/resumes/${data.id}`, reqData);
      else await post<ResumeType, ResumeType>(`/api/resumes`, reqData);

      messageApi.success("Personal information saved successfully!");
    } finally {
      setInProgress(false);
    }
  };

  const handleWorkExperienceSubmit = async (work: ResumeWorkType[]) => {
    setInProgress(true);
    const reqData: ResumeType = { ...data, work };
    try {
      if (data.id) await put(`/api/resumes/${data.id}`, reqData);
      else await post<ResumeType, ResumeType>(`/api/resumes`, reqData);

      messageApi.success("Work experience saved successfully!");
    } finally {
      setInProgress(false);
    }
  };

  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: (
        <Space size={20}>
          <RiProfileLine size={20} />
          <span>Personal Information</span>
        </Space>
      ),
      children: (
        <PersonalInfoForm
          setResumeData={setResumeData}
          data={data.basics}
          isSaving={inProgress}
          onSubmit={handlePersonalInfoSubmit}
        />
      ),
    },
    {
      key: "2",
      label: (
        <Space size={20}>
          <PiSuitcaseSimpleThin size={20} />
          <span>Work Experiences</span>
        </Space>
      ),
      children: (
        <WorkExperienceListForm
          setResumeData={setResumeData}
          data={data.work}
          isSaving={inProgress}
          onSubmit={handleWorkExperienceSubmit}
        />
      ),
    },
    {
      key: "3",
      label: (
        <Space size={20}>
          <PiGraduationCap size={20} />
          <span>Education</span>
        </Space>
      ),
      children: <p>{text}</p>,
    },
  ];

  return (
    <>
      {contextHolder}
      <div className="flex flex-col lg:flex-row gap-5">
        <div className="flex-grow min-w-[300px] max-w-[1000px]">
          <div className=" bg-white p-5 sticky top-0 max-h-[calc(100vh-4rem)] overflow-y-auto">
            <Collapse ghost items={items} expandIconPosition="end" />
          </div>
        </div>

        <div className="w-full lg:w-[210mm] flex-shrink-0 overflow-aut bg-white">
          <div className="p-10">
            <ResumeTemplate data={resumeData} />
          </div>
        </div>

        <FloatButton
          tooltip="Back to templates"
          icon={<LeftOutlined />}
          onClick={() => setShowCvBuilder(false)}
          style={{
            position: "fixed",
            bottom: 20,
            right: "auto",
          }}
        />
      </div>
    </>
  );
};

export default ResumeBuilder;
