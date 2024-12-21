import { ResumeType } from "@/app/types/career";
import { Collapse, CollapseProps, FloatButton, Space } from "antd";
import React, { useState } from "react";
import { IoMdOptions } from "react-icons/io";
import { PiGraduationCap, PiSuitcaseSimpleThin } from "react-icons/pi";
import { RiProfileLine } from "react-icons/ri";
import PersonalInfoForm from "./PersonalInfoForm";
import { ResumeTemplate } from "./ResumeTemplate";

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

type Props = {
  data: ResumeType;
};

const ResumeBuilder: React.FC<Props> = ({ data }) => {
  const [resumeData, setResumeData] = useState<ResumeType>(data);

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
        <PersonalInfoForm setResumeData={setResumeData} data={data?.basics} />
      ),
    },
    {
      key: "2",
      label: (
        <Space size={20}>
          <PiSuitcaseSimpleThin size={20} />
          <span>Work Experience</span>
        </Space>
      ),
      children: <p>{text}</p>,
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
    <div className="flex flex-col lg:flex-row gap-5">
      <div className="flex-grow min-w-[300px] max-w-[900px]">
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
        tooltip="Select a different template"
        icon={<IoMdOptions />}
        // shape="square"
        style={{
          position: "fixed",
          bottom: 20,
          right: "auto",
        }}
      />
    </div>
  );
};

export default ResumeBuilder;
