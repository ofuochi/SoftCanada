// templates/ModernTemplate.tsx
import { ResumeType } from "@/app/types/career";
import { Divider, Space, Typography } from "antd";
import React from "react";
const { Title, Text } = Typography;

const ModernTemplate: React.FC<{ data: ResumeType }> = ({ data }) => {
  const {
    basics,
    work,
    volunteer,
    education,
    awards,
    certificates,
    publications,
    skills,
    languages,
    interests,
    references,
    projects,
  } = data;

  return (
    <div className="p-10 bg-white text-gray-800 min-h-screen">
      {/* BASICS SECTION */}
      <header className="mb-10">
        <Title level={1} style={{ marginBottom: 0 }}>
          {basics.name}
        </Title>
        {basics.label && <Text type="secondary">{basics.label}</Text>}
        <br />
        <Space direction="horizontal" className="mt-2">
          {basics.email && <Text>{basics.email}</Text>}
          {basics.phone && <Text>{basics.phone}</Text>}
          {basics.url && (
            <a
              href={basics.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600"
            >
              {basics.url}
            </a>
          )}
        </Space>
        <div className="mt-2">
          {basics.location && (
            <Text>
              {basics.location.address && `${basics.location.address}, `}
              {basics.location.city && `${basics.location.city}, `}
              {basics.location.region && `${basics.location.region}, `}
              {basics.location.countryCode && basics.location.countryCode}
            </Text>
          )}
        </div>
        {basics.summary && (
          <div className="mt-4">
            <Text>{basics.summary}</Text>
          </div>
        )}
        {basics.profiles && basics.profiles.length > 0 && (
          <div className="mt-4">
            <Title level={4}>Profiles</Title>
            <Divider />
            <ul className="list-none pl-0">
              {basics.profiles.map((profile, i) => (
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

      {/* WORK EXPERIENCE SECTION */}
      {work && work.length > 0 && (
        <section className="mt-10">
          <Title level={3}>Work Experience</Title>
          <Divider />
          {work.map((job, i) => (
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

      {/* VOLUNTEER SECTION */}
      {volunteer && volunteer.length > 0 && (
        <section className="mt-10">
          <Title level={3}>Volunteer Experience</Title>
          <Divider />
          {volunteer.map((vol, i) => (
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

      {/* EDUCATION SECTION */}
      {education && education.length > 0 && (
        <section className="mt-10">
          <Title level={3}>Education</Title>
          <Divider />
          {education.map((edu, i) => (
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

      {/* AWARDS SECTION */}
      {awards && awards.length > 0 && (
        <section className="mt-10">
          <Title level={3}>Awards</Title>
          <Divider />
          {awards.map((award, i) => (
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

      {/* CERTIFICATES SECTION */}
      {certificates && certificates.length > 0 && (
        <section className="mt-10">
          <Title level={3}>Certificates</Title>
          <Divider />
          {certificates.map((cert, i) => (
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

      {/* PUBLICATIONS SECTION */}
      {publications && publications.length > 0 && (
        <section className="mt-10">
          <Title level={3}>Publications</Title>
          <Divider />
          {publications.map((pub, i) => (
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

      {/* PROJECTS SECTION */}
      {projects && projects.length > 0 && (
        <section className="mt-10">
          <Title level={3}>Projects</Title>
          <Divider />
          {projects.map((project, i) => (
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

      {/* SKILLS SECTION */}
      {skills && skills.length > 0 && (
        <section className="mt-10">
          <Title level={3}>Skills</Title>
          <Divider />
          <div className="flex flex-wrap gap-2 mt-4">
            {skills.map((skill) => (
              <div key={skill.name} className="bg-gray-100 px-3 py-1 rounded">
                {skill.name} ({skill.level})<br />
                {skill.keywords && skill.keywords.length > 0 && (
                  <Text type="secondary">{skill.keywords.join(", ")}</Text>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* LANGUAGES SECTION */}
      {languages && languages.length > 0 && (
        <section className="mt-10">
          <Title level={3}>Languages</Title>
          <Divider />
          <ul className="list-none pl-0">
            {languages.map((lang, i) => (
              <li key={i} className="mb-2">
                <Text strong>{lang.language}</Text> -{" "}
                <Text>{lang.fluency}</Text>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* INTERESTS SECTION */}
      {interests && interests.length > 0 && (
        <section className="mt-10">
          <Title level={3}>Interests</Title>
          <Divider />
          <ul className="list-disc list-inside">
            {interests.map((interest, i) => (
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

      {/* REFERENCES SECTION */}
      {references && references.length > 0 && (
        <section className="mt-10">
          <Title level={3}>References</Title>
          <Divider />
          {references.map((ref, i) => (
            <div key={i} className="mb-6">
              <Text strong>{ref.name}:</Text>
              <br />
              <Text>{ref.reference}</Text>
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

export default ModernTemplate;
