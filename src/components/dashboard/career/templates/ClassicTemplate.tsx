"use strict";
import { ResumeType } from "@/app/types/career";
import { Col, Divider, Row, Space, Typography } from "antd";
import dayjs from "dayjs";
import React from "react";
const { Title, Text } = Typography;

const ClassicTemplate: React.FC<{ data: ResumeType }> = ({ data }) => {
  return (
    <div className="p-10 bg-white text-gray-800 min-h-screen">
      {/* HEADER / BASICS SECTION */}
      <header className="mb-10">
        <Title level={1} style={{ marginBottom: 0 }}>
          {data.basics?.name || "Name Not Provided"}
        </Title>
        {data.basics?.label && (
          <Text type="secondary">{data.basics.label}</Text>
        )}
        <br />
        <Space direction="horizontal" className="mt-2">
          {data.basics?.email && <Text>{data.basics.email}</Text>}
          {data.basics?.phone && <Text>{data.basics.phone}</Text>}
          {data.basics?.url && (
            <a
              href={data.basics.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600"
            >
              {data.basics.url}
            </a>
          )}
        </Space>
        <div className="mt-2">
          {data.basics?.location && (
            <Text>
              {data.basics.location?.address
                ? `${data.basics.location.address}, `
                : ""}
              {data.basics.location?.city
                ? `${data.basics.location.city}, `
                : ""}
              {data.basics.location?.region
                ? `${data.basics.location.region}, `
                : ""}
              {data.basics.location?.countryCode || ""}
            </Text>
          )}
        </div>
        {data.basics?.summary && (
          <div className="mt-4">
            <Text>{data.basics.summary}</Text>
          </div>
        )}
        {data.basics?.profiles && data.basics.profiles.length > 0 && (
          <div className="mt-4">
            <Title level={4}>Profiles</Title>
            <Divider />
            <ul className="list-none pl-0">
              {data.basics.profiles.map((profile, i) => (
                <li key={i} className="mb-2">
                  <Text strong>{profile?.network || "Unknown"}:</Text>{" "}
                  <a
                    href={profile?.url || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600"
                  >
                    {profile?.username || "Unknown"}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>

      <Row gutter={[48, 48]}>
        <Col xs={24} md={12}>
          {/* WORK EXPERIENCE */}
          {data.work?.length > 0 && (
            <section className="mb-10">
              <Title level={3}>Work Experience</Title>
              <Divider />
              {data.work.map((job, i) => (
                <div key={i} className="mb-6">
                  <Text strong>{job?.position || "Position Not Provided"}</Text>{" "}
                  <Text>at {job?.name || "Company Not Provided"}</Text>
                  <br />
                  <Text type="secondary">
                    {job?.startDate
                      ? dayjs(job.startDate).format("MMM YYYY")
                      : "Unknown"}{" "}
                    -{" "}
                    {job?.endDate
                      ? dayjs(job.endDate).format("MMM YYYY")
                      : "Present"}
                  </Text>
                  {job?.url && (
                    <>
                      <br />
                      <a
                        href={job.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600"
                      >
                        {job.url}
                      </a>
                    </>
                  )}
                  {job?.summary && <p className="mt-2">{job.summary}</p>}
                  {job?.highlights && job?.highlights?.length > 0 && (
                    <ul className="list-disc list-inside mt-2">
                      {job.highlights.map((hl, idx) => (
                        <li key={idx}>{hl}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </section>
          )}

          {/* EDUCATION */}
          {data.education?.length > 0 && (
            <section className="mb-10">
              <Title level={3}>Education</Title>
              <Divider />
              {data.education.map((edu, i) => (
                <div key={i} className="mb-6">
                  <Text strong>
                    {edu?.studyType || "Study Type Not Provided"} in{" "}
                    {edu?.area || "Area Not Provided"}
                  </Text>{" "}
                  at{" "}
                  <Text strong>
                    {edu?.institution || "Institution Not Provided"}
                  </Text>
                  <br />
                  <Text type="secondary">
                    {edu?.startDate
                      ? dayjs(edu.startDate).format("MMM YYYY")
                      : "Unknown"}{" "}
                    -{" "}
                    {edu?.endDate
                      ? dayjs(edu.endDate).format("MMM YYYY")
                      : "Present"}
                  </Text>
                  {edu?.url && (
                    <>
                      <br />
                      <a
                        href={edu.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600"
                      >
                        {edu.url}
                      </a>
                    </>
                  )}
                  {edu?.score && <p className="mt-2">Score: {edu.score}</p>}
                  {edu?.courses && edu?.courses?.length > 0 && (
                    <div className="mt-2">
                      <Text strong>Courses:</Text>
                      <ul className="list-disc list-inside">
                        {edu.courses.map((course, idx) => (
                          <li key={idx}>{course}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </section>
          )}
          {/* Repeat similar patterns for other sections */}
        </Col>
        <Col xs={24} md={12}>
          {/* Handle other sections similarly */}
        </Col>
      </Row>
    </div>
  );
};

export default ClassicTemplate;
