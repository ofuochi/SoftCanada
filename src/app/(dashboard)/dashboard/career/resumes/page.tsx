"use client";

import { ResumeType } from "@/app/types/career";
import ResumeBuilder from "@/components/dashboard/career/cv-builder/ResumeBuilder";
import { ResumeTemplate } from "@/components/dashboard/career/cv-builder/ResumeTemplate";
import { sampleResumeDataMin } from "@/constants/sample-resume-data";
import { useApiClient } from "@/hooks/api-hook";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Flex, Popconfirm, Result, Skeleton } from "antd";
import { useState } from "react";
import useSWR from "swr";

const emptyResumeData: ResumeType = {
  templateId: 0,
  basics: {
    name: "",
    label: "",
    email: "",
    phone: "",
    summary: "",
  },
  work: [],
  education: [],
  skills: [],
};

export default function ResumesPage() {
  const [showCvBuilder, setShowCvBuilder] = useState(false);
  const [resumeData, setResumeData] = useState<ResumeType>(emptyResumeData);
  const { get, del } = useApiClient();
  const { data, error, isLoading, mutate } = useSWR<ResumeType[]>(
    `/api/resumes`,
    get,
    {
      shouldRetryOnError: false,
      revalidateOnFocus: false,
      dedupingInterval: 60000,
    }
  );

  if (isLoading) return <Skeleton active />;
  if (error && error.status >= 500) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Result
          status="500"
          title="500"
          subTitle="Sorry, something went wrong."
          extra={
            <Button type="primary" key="console" onClick={() => mutate()}>
              Retry
            </Button>
          }
        />
      </div>
    );
  }

  const handleResumeEditClick = (resume: ResumeType) => {
    setShowCvBuilder(true);
    setResumeData(resume);
  };

  const handleDeleteResume = async (resumeId: number) => {
    await del(`/api/resumes/${resumeId}`);
    data?.splice(data.indexOf(resumeData), 1);
  };

  return (
    <>
      {showCvBuilder ? (
        <ResumeBuilder data={resumeData} setShowCvBuilder={setShowCvBuilder} />
      ) : (
        <Flex wrap gap="large">
          <div className="w-72">
            <Button
              type="dashed"
              block
              icon={<PlusOutlined />}
              size="large"
              style={{ height: "100%", background: "#f0f0f0" }}
              onClick={() => handleResumeEditClick(emptyResumeData)}
            >
              Blank Resume
            </Button>
          </div>
          {data && data.length > 0
            ? data.map((resume, i) => (
                <Card
                  bordered={false}
                  size="small"
                  key={i}
                  className="w-72"
                  actions={[
                    <EditOutlined
                      key="edit"
                      onClick={() => handleResumeEditClick(resume)}
                    />,
                    <Popconfirm
                      key={i}
                      title="Delete the resume"
                      description="Are you sure to delete this resume?"
                      onConfirm={() => handleDeleteResume(resume.resumeId!)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <DeleteOutlined key="delete" />
                    </Popconfirm>,
                  ]}
                >
                  <div className="overflow-hidden h-80 pointer-events-none">
                    <div className="miniature-wrapper">
                      <ResumeTemplate data={resume} />
                    </div>
                  </div>
                </Card>
              ))
            : Array.from({ length: 5 }, (_, i) => (
                <Card
                  bordered={false}
                  size="small"
                  key={i}
                  className="w-72"
                  hoverable
                  onClick={() =>
                    handleResumeEditClick({
                      ...emptyResumeData,
                      templateId: i,
                    })
                  }
                >
                  <div className="overflow-hidden h-80 pointer-events-none">
                    <div className="miniature-wrapper">
                      <ResumeTemplate
                        data={{ ...sampleResumeDataMin, templateId: i }}
                      />
                    </div>
                  </div>
                </Card>
              ))}
        </Flex>
      )}
    </>
  );
}
