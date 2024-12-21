import { ResumeType } from "@/app/types/career";
import { Col, Divider, Row, Space, Typography } from "antd";
import React from "react";
const { Title, Text } = Typography;

const ClassicTemplate: React.FC<{ data: ResumeType }> = ({ data }) => {
  return (
    <div className="p-10 bg-white text-gray-800 min-h-screen">
      {/* HEADER / BASICS SECTION */}
      <header className="mb-10">
        <Title level={1} style={{ marginBottom: 0 }}>
          {data.basics?.name}
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
              {data.basics.location.address &&
                `${data.basics.location.address}, `}
              {data.basics.location.city && `${data.basics.location.city}, `}
              {data.basics.location.region &&
                `${data.basics.location.region}, `}
              {data.basics.location.countryCode &&
                data.basics.location.countryCode}
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
                  <Text strong>{profile.network}:</Text>{" "}
                  <a
                    href={profile.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600"
                  >
                    {profile.username}
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
          {data.work && data.work.length > 0 && (
            <section className="mb-10">
              <Title level={3}>Work Experience</Title>
              <Divider />
              {data.work.map((job, i) => (
                <div key={i} className="mb-6">
                  <Text strong>{job.position}</Text> <Text>at {job.name}</Text>
                  <br />
                  <Text type="secondary">
                    {job.startDate} - {job.endDate || "Present"}
                  </Text>
                  {job.url && (
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
                  {job.summary && <p className="mt-2">{job.summary}</p>}
                  {job.highlights && job.highlights.length > 0 && (
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
          {data.education && data.education.length > 0 && (
            <section className="mb-10">
              <Title level={3}>Education</Title>
              <Divider />
              {data.education.map((edu, i) => (
                <div key={i} className="mb-6">
                  <Text strong>
                    {edu.studyType} in {edu.area}
                  </Text>{" "}
                  at <Text strong>{edu.institution}</Text>
                  <br />
                  <Text type="secondary">
                    {edu.startDate} - {edu.endDate || "Present"}
                  </Text>
                  {edu.url && (
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
                  {edu.score && <p className="mt-2">Score: {edu.score}</p>}
                  {edu.courses && edu.courses.length > 0 && (
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

          {/* AWARDS */}
          {data.awards && data.awards.length > 0 && (
            <section className="mb-10">
              <Title level={3}>Awards</Title>
              <Divider />
              {data.awards.map((award, i) => (
                <div key={i} className="mb-6">
                  <Text strong>{award.title}</Text>
                  <br />
                  <Text type="secondary">
                    {award.awarder}, {award.date}
                  </Text>
                  {award.summary && <p className="mt-2">{award.summary}</p>}
                </div>
              ))}
            </section>
          )}

          {/* CERTIFICATES */}
          {data.certificates && data.certificates.length > 0 && (
            <section className="mb-10">
              <Title level={3}>Certificates</Title>
              <Divider />
              {data.certificates.map((cert, i) => (
                <div key={i} className="mb-6">
                  <Text strong>{cert.name}</Text>
                  <br />
                  <Text type="secondary">
                    {cert.issuer}, {cert.date}
                  </Text>
                  {cert.url && (
                    <>
                      <br />
                      <a
                        href={cert.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600"
                      >
                        {cert.url}
                      </a>
                    </>
                  )}
                </div>
              ))}
            </section>
          )}

          {/* PUBLICATIONS */}
          {data.publications && data.publications.length > 0 && (
            <section className="mb-10">
              <Title level={3}>Publications</Title>
              <Divider />
              {data.publications.map((pub, i) => (
                <div key={i} className="mb-6">
                  <Text strong>{pub.name}</Text>
                  <br />
                  <Text type="secondary">
                    {pub.publisher}, {pub.releaseDate}
                  </Text>
                  {pub.url && (
                    <>
                      <br />
                      <a
                        href={pub.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600"
                      >
                        {pub.url}
                      </a>
                    </>
                  )}
                  {pub.summary && <p className="mt-2">{pub.summary}</p>}
                </div>
              ))}
            </section>
          )}
        </Col>

        <Col xs={24} md={12}>
          {/* VOLUNTEER */}
          {data.volunteer && data.volunteer.length > 0 && (
            <section className="mb-10">
              <Title level={3}>Volunteer Experience</Title>
              <Divider />
              {data.volunteer.map((vol, i) => (
                <div key={i} className="mb-6">
                  <Text strong>{vol.position}</Text>{" "}
                  <Text>at {vol.organization}</Text>
                  <br />
                  <Text type="secondary">
                    {vol.startDate} - {vol.endDate || "Present"}
                  </Text>
                  {vol.url && (
                    <>
                      <br />
                      <a
                        href={vol.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600"
                      >
                        {vol.url}
                      </a>
                    </>
                  )}
                  {vol.summary && <p className="mt-2">{vol.summary}</p>}
                  {vol.highlights && vol.highlights.length > 0 && (
                    <ul className="list-disc list-inside mt-2">
                      {vol.highlights.map((hl, idx) => (
                        <li key={idx}>{hl}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </section>
          )}

          {/* PROJECTS */}
          {data.projects && data.projects.length > 0 && (
            <section className="mb-10">
              <Title level={3}>Projects</Title>
              <Divider />
              {data.projects.map((project, i) => (
                <div key={i} className="mb-6">
                  <Text strong>{project.name}</Text>
                  <br />
                  <Text type="secondary">
                    {project.startDate} - {project.endDate || "Ongoing"}
                  </Text>
                  {project.url && (
                    <>
                      <br />
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600"
                      >
                        {project.url}
                      </a>
                    </>
                  )}
                  {project.description && (
                    <p className="mt-2">{project.description}</p>
                  )}
                  {project.highlights && project.highlights.length > 0 && (
                    <ul className="list-disc list-inside mt-2">
                      {project.highlights.map((hl, idx) => (
                        <li key={idx}>{hl}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </section>
          )}

          {/* SKILLS */}
          {data.skills && data.skills.length > 0 && (
            <section className="mb-10">
              <Title level={3}>Skills</Title>
              <Divider />
              <div className="flex flex-wrap gap-2 mt-4">
                {data.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="bg-gray-100 px-3 py-1 rounded"
                  >
                    {skill.name} ({skill.level})<br />
                    {skill.keywords && skill.keywords.length > 0 && (
                      <Text type="secondary">{skill.keywords.join(", ")}</Text>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* LANGUAGES */}
          {data.languages && data.languages.length > 0 && (
            <section className="mb-10">
              <Title level={3}>Languages</Title>
              <Divider />
              <ul className="list-none pl-0">
                {data.languages.map((lang, i) => (
                  <li key={i} className="mb-2">
                    <Text strong>{lang.language}</Text> -{" "}
                    <Text>{lang.fluency}</Text>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* INTERESTS */}
          {data.interests && data.interests.length > 0 && (
            <section className="mb-10">
              <Title level={3}>Interests</Title>
              <Divider />
              <ul className="list-disc list-inside">
                {data.interests.map((interest, i) => (
                  <li key={i}>
                    <Text strong>{interest.name}</Text>
                    {interest.keywords && interest.keywords.length > 0 && (
                      <span>: {interest.keywords.join(", ")}</span>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* REFERENCES */}
          {data.references && data.references.length > 0 && (
            <section className="mb-10">
              <Title level={3}>References</Title>
              <Divider />
              {data.references.map((ref, i) => (
                <div key={i} className="mb-6">
                  <Text strong>{ref.name}:</Text>
                  <br />
                  <Text>{ref.reference}</Text>
                </div>
              ))}
            </section>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default ClassicTemplate;
