import { ResumeType } from "@/app/types/career";
import { useResume } from "@/contexts/ResumeContext";
import { useApiClient } from "@/hooks/api-hook";
import { LeftOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Collapse, CollapseProps, message, Space } from "antd";
import React, { SetStateAction, useState } from "react";
import { GrUserManager } from "react-icons/gr";
import { PiGraduationCap, PiSuitcaseSimpleThin } from "react-icons/pi";
import { RiProfileLine } from "react-icons/ri";
import { VscTools } from "react-icons/vsc";
import EducationListForm from "./forms/EducationListForm";
import PersonalInfoForm from "./forms/PersonalInfoForm";
import ReferencesForm from "./forms/ReferencesForm";
import SkillsForm from "./forms/SkillsForm";
import WorkExperienceListForm from "./forms/WorkExperienceListForm";
import { ResumeTemplate } from "./ResumeTemplate";
import { useResumeDownload } from "@/contexts/ResumeDownloadContext";
import { FileDown } from "lucide-react";
import { mutate } from "swr";

type Props = {
  setShowCvBuilder: (value: SetStateAction<boolean>) => void;
};

export type ResumeFormProp = {
  isSaving?: boolean;
  onSubmit: <K extends keyof ResumeType>(data: ResumeType[K]) => void;
};

const ResumeBuilder: React.FC<Props> = ({ setShowCvBuilder }) => {
  const { resumeData, resumeDataId, setResumeDataId } = useResume();
  const { registerResumeRef } = useResumeDownload();
  const { handleDownloadPdf } = useResumeDownload();

  const { post, put } = useApiClient();

  const [inProgress, setInProgress] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const handleSubmit = async <T extends keyof ResumeType>(
    field: T,
    value: ResumeType[T]
  ) => {
    setInProgress(true);
    const reqData: ResumeType = { ...resumeData, [field]: value };

    try {
      if (resumeDataId) {
        await put(`/api/resumes/${resumeDataId}`, reqData);
      } else {
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
          <span className="!font-lato text-[#4F4F4F] text-[15px]">
            Personal Information
          </span>
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
          <span className="!font-lato text-[#4F4F4F] text-[15px]">
            Work Experiences
          </span>
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
          <span className="!font-lato text-[#4F4F4F] text-[15px]">
            Education
          </span>
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
          <span className="!font-lato text-[#4F4F4F] text-[15px]">Skills</span>
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
          <span className="!font-lato text-[#4F4F4F] text-[15px]">
            References
          </span>
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
      <div className="flex flex-col xl:flex-row gap-5 justify-center">
        <div className="flex-grow xl:max-w-[460px] 2xl:max-w-[500px]">
          <div className="flex items-center justify-between">
            <button
              onMouseDown={async () => {
                setShowCvBuilder(false);
                await mutate(`/api/resumes`);
              }}
              className="my-4 bg-white w-full max-w-[200px] border border-[#CBCBCB] min-h-12 rounded flex items-center justify-center gap-[7px] cursor-pointer"
            >
              <LeftOutlined size={24} color="#010309" />
              <span className="text-[#010309] font-medium text-[13px] font-poppins">
                Back to Templates
              </span>
            </button>
            <button
              onClick={handleDownloadPdf}
              className="my-4 bg-[#010B18] w-full max-w-[200px] border border-[#010B18] min-h-12 rounded flex items-center justify-center gap-[7px] cursor-pointer"
            >
              <span className="text-white font-medium text-[13px] font-poppins">
                Download
              </span>
              <FileDown size={18} color="#ffffff" />
            </button>
          </div>
          <div className=" bg-white p-5 sticky top-0 max-h-[calc(100vh-4rem)] overflow-y-auto">
            <Collapse
              ghost
              items={items}
              expandIcon={({ isActive }) =>
                isActive ? (
                  <MinusOutlined color="#000000" size={14} />
                ) : (
                  <PlusOutlined color="#000000" size={14} />
                )
              }
              expandIconPosition="end"
            />
          </div>
        </div>

        <div
          className="w-full flex-1 bg-white"
          ref={(node) => registerResumeRef(node)}
        >
          <ResumeTemplate data={resumeData} />
        </div>
      </div>
    </>
  );
};

export default ResumeBuilder;

