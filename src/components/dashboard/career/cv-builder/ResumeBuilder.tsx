import React, { SetStateAction, useState } from "react";
import { mutate } from "swr";
import { useApiClient } from "@/hooks/api-hook";
import { useResume } from "@/contexts/ResumeContext";
import { useResumeDownload } from "@/contexts/ResumeDownloadContext";
import { ResumeType } from "@/app/types/career";
import { Button, Collapse, CollapseProps, Grid, message, Space } from "antd";
import {
  DownloadOutlined,
  LeftOutlined,
  MinusOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { GrUserManager } from "react-icons/gr";
import { PiGraduationCap, PiSuitcaseSimpleThin } from "react-icons/pi";
import { RiProfileLine } from "react-icons/ri";
import { VscTools } from "react-icons/vsc";
import { FileDown } from "lucide-react";

import EducationListForm from "./forms/EducationListForm";
import PersonalInfoForm from "./forms/PersonalInfoForm";
import ReferencesForm from "./forms/ReferencesForm";
import SkillsForm from "./forms/SkillsForm";
import WorkExperienceListForm from "./forms/WorkExperienceListForm";
import { ResumeTemplate } from "./ResumeTemplate";

// IMPORTANT: Replace with your actual Splitter import path if necessary
import { Splitter } from "antd";

type Props = {
  setShowCvBuilder: (value: SetStateAction<boolean>) => void;
};

export type ResumeFormProp = {
  isSaving?: boolean;
  onSubmit: <K extends keyof ResumeType>(data: ResumeType[K]) => void;
};

const { useBreakpoint } = Grid;

const convertToFormData = (data: any) => {
  const formData = new FormData();

  const appendObject = (obj: any, prefix = "") => {
    Object.entries(obj).forEach(([key, value]) => {
      const formKey = prefix ? `${prefix}.${key}` : key;

      if (Array.isArray(value)) {
        // Convert entire array to JSON
        formData.append(formKey, JSON.stringify(value));
      } else if (typeof value === "object" && value !== null) {
        appendObject(value, formKey);
      } else {
        formData.append(formKey, String(value));
      }
    });
  };

  appendObject(data);
  return formData;
};

const ResumeBuilder: React.FC<Props> = ({ setShowCvBuilder }) => {
  const { resumeData, resumeDataId, setResumeDataId } = useResume();
  const { registerResumeRef, handleDownloadPdf } = useResumeDownload();
  const { post, put } = useApiClient();

  const [inProgress, setInProgress] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const screens = useBreakpoint();
  const isMobile = !screens.md;

  const handleSubmit = async <T extends keyof ResumeType>(
    field: T,
    value: ResumeType[T]
  ) => {
    setInProgress(true);
    const reqData: ResumeType = { ...resumeData, [field]: value };

    try {
      if (resumeDataId) {
        const imageName = resumeData.basics?.imageName;
        if (!imageName) {
          await put(`/api/resumes/${resumeDataId}`, reqData);
        } else {
          const newData = {
            resume: {
              ...reqData,
              basics: {
                ...reqData.basics,
                imageName: resumeData.basics?.imageName,
              },
            },
          };
          const formDataItem = convertToFormData(newData);
          await put(`/api/resumes/with-image/${resumeDataId}`, formDataItem, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
        }
      } else {
        const imageName = resumeData.basics?.imageName;
        if (!imageName) {
          const { id } = await post<ResumeType, ResumeType>(
            `/api/resumes`,
            reqData
          );
          setResumeDataId(id);
        } else {
          const newData = {
            resume: {
              ...reqData,
              basics: {
                ...reqData.basics,
                imageName: resumeData.basics?.imageName,
              },
            },
          };
          const formDataItem = convertToFormData(newData);
          const { id } = await post<ResumeType, FormData>(
            `/api/resumes/with-image`,
            formDataItem,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          setResumeDataId(id);
        }
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

      {isMobile && (
        <div className="flex flex-col gap-5 items-start">
          {/* Left Column - Form */}
          <div className="w-full flex-shrink-0">
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
            <div className="bg-white p-5">
              <Collapse
                ghost
                items={items}
                expandIcon={({ isActive }) =>
                  isActive ? (
                    <MinusOutlined size={14} />
                  ) : (
                    <PlusOutlined size={14} />
                  )
                }
                expandIconPosition="end"
              />
            </div>
          </div>

          {/* Right Column - A4 Preview */}
          <div className="flex-shrink-0 w-full xl:min-w-[210mm] xl:max-w-[210mm] print:mx-0">
            <div
              className="bg-white shadow-lg print:shadow-none"
              ref={(node) => registerResumeRef(node)}
            >
              <ResumeTemplate data={resumeData} />
            </div>
          </div>
        </div>
      )}

      {/* DESKTOP VIEW (Splitter) */}
      {!isMobile && (
        <Splitter style={{ width: "100%", height: "auto" }}>
          <Splitter.Panel defaultSize="40%" min="20%" max="70%">
            <div className="flex flex-col gap-5 items-start h-full">
              <div className="w-full">
                <div className="flex items-center justify-between mb-2">
                  <Button
                    onClick={() => {
                      setShowCvBuilder(false);
                      return mutate(`/api/resumes`);
                    }}
                    size="large"
                    className="!font-dm_sans !font-semibold"
                    icon={<LeftOutlined />}
                  >
                    Back to Templates
                  </Button>
                  <Button
                    onClick={handleDownloadPdf}
                    icon={<DownloadOutlined />}
                    iconPosition="end"
                    size="large"
                    variant="solid"
                    color="default"
                    className="!font-dm_sans !font-semibold"
                  >
                    Download Resume
                  </Button>
                </div>
                <div className="bg-white p-5 max-h-[calc(100vh-4rem)] overflow-y-auto sticky top-0">
                  <Collapse
                    ghost
                    items={items}
                    expandIcon={({ isActive }) =>
                      isActive ? (
                        <MinusOutlined size={14} />
                      ) : (
                        <PlusOutlined size={14} />
                      )
                    }
                    expandIconPosition="end"
                  />
                </div>
              </div>
            </div>
          </Splitter.Panel>

          {/* RIGHT PANEL (fixed A4) */}
          <Splitter.Panel>
            <div className="flex-shrink-0 w-full xl:min-w-[210mm] xl:max-w-[210mm] print:mx-0">
              <div
                ref={(node) => registerResumeRef(node)}
                className="bg-white border-1 overflow-hidden"
              >
                <ResumeTemplate data={resumeData} />
              </div>
            </div>
          </Splitter.Panel>
        </Splitter>
      )}
    </>
  );
};

export default ResumeBuilder;

