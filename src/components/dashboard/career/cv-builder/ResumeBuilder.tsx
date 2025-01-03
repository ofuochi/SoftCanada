import {
  ResumeBasicsType,
  ResumeEducationType,
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
import EducationListForm from "./forms/EducationListForm";
import { ResumeTemplate } from "./ResumeTemplate";
import { useResume } from "@/contexts/ResumeContext";
import { VscTools } from "react-icons/vsc";
import SkillsForm from "./forms/SkillsForm";
import { GrUserManager } from "react-icons/gr";
import ReferencesForm from "./forms/ReferencesForm";

type Props = {
  setShowCvBuilder: (value: SetStateAction<boolean>) => void;
};

export type ResumeFormProp = {
  isSaving?: boolean;
  onSubmit: <K extends keyof ResumeType>(data: ResumeType[K]) => void;
};

const ResumeBuilder: React.FC<Props> = ({ setShowCvBuilder }) => {
  const { resumeData } = useResume();
  const { post, put } = useApiClient();
  const [resumeDataId, setResumeDataId] = useState<string>();
  const [inProgress, setInProgress] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const handleSubmit = async <T extends keyof ResumeType>(
    field: T,
    value: ResumeType[T]
  ) => {
    setInProgress(true);
    const reqData: ResumeType = { ...resumeData, [field]: value };
    try {
      if (resumeDataId) await put(`/api/resumes/${resumeDataId}`, reqData);
      else {
        const { id } = await post<ResumeType, ResumeType>(
          `/api/resumes`,
          reqData
        );
        setResumeDataId(id);
      }

      messageApi.success("Saved successfully!");
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
          isSaving={inProgress}
          onSubmit={(data) => handleSubmit("basics", data)}
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
          isSaving={inProgress}
          onSubmit={(data) => handleSubmit("work", data)}
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
      children: (
        <EducationListForm
          isSaving={inProgress}
          onSubmit={(data) => handleSubmit("education", data)}
        />
      ),
    },
    {
      key: "4",
      label: (
        <Space size={20}>
          <VscTools size={20} />
          <span>Skills</span>
        </Space>
      ),
      children: (
        <SkillsForm
          isSaving={inProgress}
          onSubmit={(data) => handleSubmit("skills", data)}
        />
      ),
    },
    {
      key: "5",
      label: (
        <Space size={20}>
          <GrUserManager size={20} />
          <span>References</span>
        </Space>
      ),
      children: (
        <ReferencesForm
          isSaving={inProgress}
          onSubmit={(data) => handleSubmit("references", data)}
        />
      ),
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
