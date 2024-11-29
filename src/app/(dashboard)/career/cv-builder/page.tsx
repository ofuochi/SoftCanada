"use client";

import { FormValues } from "@/app/types/career";
import { EducationStep } from "@/components/dashboard/career/cv-builder/EducationStep";
import { ExperienceStep } from "@/components/dashboard/career/cv-builder/ExperienceStep";
import { PersonalInfoStep } from "@/components/dashboard/career/cv-builder/PersonalInfoStep";
import { SkillsStep } from "@/components/dashboard/career/cv-builder/SkillsStep";
import { SummaryStep } from "@/components/dashboard/career/cv-builder/SummaryStep";
import {
  DeleteOutlined,
  DownOutlined,
  FileOutlined,
  FileWordOutlined,
  LeftOutlined,
  RightOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Affix,
  Button,
  Card,
  Col,
  Divider,
  Dropdown,
  List,
  MenuProps,
  message,
  Modal,
  Row,
  Space,
  Steps,
  Tooltip,
  Typography,
} from "antd";
import { saveAs } from "file-saver";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import "./CvBuilderPage.css";

const { Step } = Steps;
const { Title, Text } = Typography;

const schema: yup.ObjectSchema<FormValues> = yup.object({
  personalInfo: yup
    .object({
      avatar: yup.string().optional(),
      fullName: yup.string().required("Full Name is required"),
      email: yup.string().email("Invalid email").required("Email is required"),
      phone: yup.string().required("Phone number is required"),
      address: yup.string().required("Address is required"),
    })
    .required(),
  summary: yup.string().required("Summary is required"),
  skills: yup
    .array(
      yup.object({ name: yup.string().required("Skill name is required") })
    )
    .min(1, "At least one skill is required")
    .required(),
  experience: yup
    .array(
      yup
        .object({
          company: yup.string().required("Company name is required"),
          position: yup.string().required("Position is required"),
          startDate: yup.string().required("Start date is required"),
          endDate: yup.string().required("End date is required"),
          description: yup.string().required("Description is required"),
        })
        .required()
    )
    .required(),
  education: yup
    .array(
      yup
        .object({
          institution: yup.string().required("Institution name is required"),
          degree: yup.string().required("Degree is required"),
          startDate: yup.string().required("Start date is required"),
          endDate: yup.string().required("End date is required"),
          description: yup.string().required("Description is required"),
        })
        .required()
    )
    .required(),
});

const initialData: FormValues = {
  personalInfo: {
    fullName: "",
    email: "",
    phone: "",
    address: "",
  },
  summary: "",
  skills: [],
  experience: [],
  education: [],
};

export default function CvBuilderPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [previewData, setPreviewData] = useState<FormValues | null>(null);

  const {
    control,
    handleSubmit,
    watch,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: initialData,
    mode: "onChange",
  });

  useEffect(() => {
    const subscription = watch((value) => {
      setPreviewData(value as FormValues);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const steps = [
    {
      title: "Personal Info",
      content: (
        <PersonalInfoStep
          control={control}
          setValue={setValue}
          errors={errors}
        />
      ),
    },
    {
      title: "Summary",
      content: <SummaryStep control={control} errors={errors} />,
    },
    {
      title: "Skills",
      content: <SkillsStep errors={errors} control={control} />,
    },
    {
      title: "Experience",
      content: <ExperienceStep errors={errors} control={control} />,
    },
    {
      title: "Education",
      content: <EducationStep errors={errors} control={control} />,
    },
  ];

  const onSubmit = (data: FormValues) => {
    localStorage.setItem("cvData", JSON.stringify(data));
    message.success({
      content: "Progress Saved",
    });
  };

  const handleDownload = (format: string) => {
    const cvContent = JSON.stringify(getValues(), null, 2); // Placeholder for actual content
    const blob = new Blob([cvContent], { type: "application/json" });

    if (format === "pdf") {
      saveAs(blob, "cv.pdf");
    } else if (format === "word") {
      saveAs(blob, "cv.docx");
    } else if (format === "json") {
      saveAs(blob, "cv.json");
    }
  };

  const handleStepChange = (direction: "next" | "prev") =>
    setCurrentStep((prev) => (direction === "next" ? prev + 1 : prev - 1));

  const handleReset = () => {
    Modal.confirm({
      title: "Reset CV Data",
      content:
        "Are you sure you want to reset your CV? This action cannot be undone.",
      onOk: () => {
        localStorage.removeItem("cvData");
        window.location.reload();
      },
    });
  };

  const downloadDropdowns: MenuProps["items"] = [
    {
      label: "Download as Word",
      icon: <FileWordOutlined />,
      key: "1",
      onClick: () => handleDownload("word"),
    },
    {
      label: "Download as JSON",
      key: "2",
      icon: <FileOutlined />,
      onClick: () => handleDownload("json"),
    },
  ];

  return (
    <div>
      <Affix offsetTop={0}>
        <Card>
          <Steps current={currentStep}>
            {steps.map((item) => (
              <Step key={item.title} title={item.title} />
            ))}
          </Steps>
        </Card>
      </Affix>

      <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
        <Col xs={24} md={12}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>{steps[currentStep].content}</div>
            <Divider />
            <Space>
              <Button
                type="default"
                disabled={currentStep === 0}
                icon={<LeftOutlined />}
                onClick={() => handleStepChange("prev")}
              >
                Previous
              </Button>
              <Button
                type="default"
                disabled={currentStep === steps.length - 1}
                icon={<RightOutlined />}
                onClick={() => handleStepChange("next")}
              >
                Next
              </Button>
              <Button type="primary" icon={<SaveOutlined />} htmlType="submit">
                Save Progress
              </Button>
              <Button
                type="default"
                danger
                icon={<DeleteOutlined />}
                onClick={handleReset}
              >
                Reset
              </Button>
            </Space>
          </form>
        </Col>
        <Col xs={24} md={12}>
          <Card
            extra={
              <Tooltip title="Download CV">
                <Dropdown.Button
                  icon={<DownOutlined />}
                  type="primary"
                  trigger={["click"]}
                  size="large"
                  menu={{ items: downloadDropdowns }}
                  onClick={() => handleDownload("pdf")}
                >
                  Download as PDF
                </Dropdown.Button>
              </Tooltip>
            }
            title={<Title level={3}>Canadian CV Preview</Title>}
          >
            <br />
            {previewData && (
              <div className="cv-preview">
                <Title>{previewData.personalInfo.fullName}</Title>
                <Text>{previewData.personalInfo.address}</Text>
                <br />
                <Text>{previewData.personalInfo.email}</Text>
                <br />
                <Text>{previewData.personalInfo.phone}</Text>
                <Divider />
                <Title level={4}>Professional Summary</Title>
                <Text>{previewData.summary}</Text>
                <Divider />
                <Title level={4}>Skills</Title>
                <List
                  dataSource={previewData.skills}
                  renderItem={(item) => <List.Item>{item.name}</List.Item>}
                />
                <Divider />
                <Title level={4}>Work Experience</Title>
                {previewData.experience.map((exp, index) => (
                  <div key={index}>
                    <Title level={5}>
                      {exp.position} at {exp.company}
                    </Title>
                    <Text>
                      {exp.startDate} - {exp.endDate}
                    </Text>
                    <p>{exp.description}</p>
                  </div>
                ))}
                <Divider />
                <Title level={4}>Education</Title>
                {previewData.education.map((edu, index) => (
                  <div key={index}>
                    <Title level={5}>
                      {edu.degree} at {edu.institution}
                    </Title>
                    <Text>
                      {edu.startDate} - {edu.endDate}
                    </Text>
                    <p>{edu.description}</p>
                  </div>
                ))}
              </div>
            )}
            <Divider />

            <Tooltip title="Download CV">
              <Dropdown.Button
                icon={<DownOutlined />}
                type="primary"
                trigger={["click"]}
                size="large"
                menu={{ items: downloadDropdowns }}
                onClick={() => handleDownload("pdf")}
              >
                Download as PDF
              </Dropdown.Button>
            </Tooltip>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
