import { ResumeType } from "@/app/types/career";
import { Col, Divider, Row, Space, Typography } from "antd";
import React from "react";
const { Title, Text } = Typography;

const ElegantTemplate: React.FC<{ data: ResumeType }> = ({ data }) => {
  const { basics, work, education, skills, languages } = data;

  return (
    <div className="bg-gray-50 text-gray-900 p-6 min-h-screen">
      <div className="bg-white p-4 mb-6 shadow">
        <Title level={2} style={{ marginBottom: 0 }}>
          {basics?.name ?? ""}
        </Title>
        <Text type="secondary">{basics?.label}</Text>
        <div className="mt-2">
          <Text>
            {basics?.email} | {basics?.phone} | {basics?.location?.city},{" "}
            {basics?.location?.countryCode}
          </Text>
        </div>
      </div>

      <Row gutter={24}>
        <Col span={16}>
          <Space direction="vertical" style={{ width: "100%" }}>
            <Title level={3}>Professional Experience</Title>
            <Divider />
            {work.map((job) => (
              <div key={job.name} className="mb-4">
                <Text strong>
                  {job.position} at {job.name}
                </Text>
                <br />
                <Text type="secondary">
                  {String(job.startDate)} - {String(job.endDate) || "Present"}
                </Text>
                <p className="mt-2">{job.summary}</p>
                <ul className="list-disc list-inside">
                  {job.highlights?.map((hl, i) => <li key={i}>{hl}</li>) ?? []}
                </ul>
              </div>
            ))}

            <Title level={3}>Education</Title>
            <Divider />
            {education.map((edu) => (
              <div key={edu.institution} className="mb-4">
                <Text strong>{edu.institution}</Text>
                <br />
                <Text>
                  {edu.studyType} in {edu.area} ({edu.startDate.toString()} -{" "}
                  {edu.endDate?.toString() || "Present"})
                </Text>
                {edu.score && <Text> - GPA: {edu.score}</Text>}
              </div>
            ))}
          </Space>
        </Col>
        <Col span={8}>
          <Title level={3}>Skills</Title>
          <Divider />
          <ul className="list-none pl-0">
            {skills.map((skill) => (
              <li key={skill.name} className="mb-2">
                <Text strong>{skill.name}</Text>{" "}
                <Text type="secondary">({skill.level})</Text>
                <br />
                <Text type="secondary">{skill.keywords.join(", ")}</Text>
              </li>
            ))}
          </ul>

          <Title level={3} className="mt-6">
            Languages
          </Title>
          <Divider />
          <ul className="list-none pl-0">
            {languages?.map((lang) => (
              <li key={lang.language} className="mb-2">
                <Text strong>{lang.language}</Text> -{" "}
                <Text>{lang.fluency}</Text>
              </li>
            ))}
          </ul>
        </Col>
      </Row>
    </div>
  );
};

export default ElegantTemplate;

