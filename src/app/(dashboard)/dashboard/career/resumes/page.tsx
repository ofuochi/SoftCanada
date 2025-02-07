"use client";

import {ResumeType} from "@/app/types/career";
import ResumeBuilder from "@/components/dashboard/career/cv-builder/ResumeBuilder";
import {ResumeTemplate} from "@/components/dashboard/career/cv-builder/ResumeTemplate";
import SelectResumeTemplateModal from "@/components/dashboard/career/cv-builder/SelectResumeTemplateModal";
import {emptyResumeData, sampleResumeDataMin,} from "@/constants/sample-resume-data";
import {ResumeProvider} from "@/contexts/ResumeContext";
import {useApiClient} from "@/hooks/api-hook";
import {DeleteOutlined, EditOutlined, PlusOutlined,} from "@ant-design/icons";
import {Button, Card, Flex, Popconfirm, Result, Skeleton} from "antd";
import {useState} from "react";
import useSWR from "swr";

export default function ResumesPage() {
  const [open, setOpen] = useState(false);
  const [showCvBuilder, setShowCvBuilder] = useState(false);
  const [resumeData, setResumeData] = useState<ResumeType>(emptyResumeData);
  const {get, del} = useApiClient();
  const {data, error, isLoading, mutate} = useSWR<ResumeType[]>(
    `/api/resumes`,
    get,
    {
      shouldRetryOnError: false,
      refreshInterval: 30000,
      dedupingInterval: 60000,
    }
  );

  if (isLoading)
    return (
      <div className="flex gap-6">
        <Skeleton.Node style={{width: "288px", height: "392px"}} active/>
        <Skeleton.Node style={{width: "288px", height: "392px"}} active/>
        <Skeleton.Node style={{width: "288px", height: "392px"}} active/>
      </div>
    );
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
    setOpen(false);
    setShowCvBuilder(true);
    setResumeData(resume);
  };

  const handleDeleteResume = async (resumeId: string) => {
    await del(`/api/resumes/${resumeId}`);
    mutate();
    // data?.splice(data.indexOf(resumeData), 1);
  };

  return (
    <>
      {showCvBuilder ? (
        <ResumeProvider initialData={resumeData}>
          <ResumeBuilder setShowCvBuilder={setShowCvBuilder}/>
        </ResumeProvider>
      ) : (
        <Flex wrap gap="large" className="">
          <div className="w-72">
            <Button
              type="dashed"
              block
              icon={<PlusOutlined/>}
              size="large"
              style={{height: "100%", background: "#f0f0f0"}}
              onClick={() =>
                data && data.length > 0
                  ? setOpen(true)
                  : handleResumeEditClick(emptyResumeData)
              }
              className="!font-dm_sans"
            >
              {data && data.length > 0 ? "New" : "Blank"} Resume
            </Button>
          </div>
          {data && data.length > 0
            ? data.map((resume) => (
              <Card
                bordered={false}
                size="small"
                key={resume.id}
                className="w-72"
                actions={[
                  <EditOutlined
                    key="edit"
                    onClick={() => handleResumeEditClick(resume)}
                  />,
                  <Popconfirm
                    key={resume.id}
                    title="Delete the resume"
                    description="Are you sure you want to delete this resume?"
                    onConfirm={() => handleDeleteResume(resume.id!)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <DeleteOutlined key="delete"/>
                  </Popconfirm>,
                ]}
              >
                <div className="overflow-hidden h-80 pointer-events-none">
                  <div className="miniature-wrapper">
                    <ResumeTemplate data={resume}/>
                  </div>
                </div>
              </Card>
            ))
            : Array.from({length: 5}, (_, i) => (
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
                      data={{...sampleResumeDataMin, templateId: i}}
                    />
                  </div>
                </div>
              </Card>
            ))}
        </Flex>
      )}
      <SelectResumeTemplateModal
        open={open}
        onCancel={() => setOpen(false)}
        onResumeSelected={handleResumeEditClick}
      />
    </>
  );
}

