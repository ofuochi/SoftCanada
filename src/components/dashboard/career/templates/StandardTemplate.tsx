import { ResumeType } from "@/app/types/career";
import { Divider, Typography } from "antd";
import Link from "next/link";
import React from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

const { Title, Text } = Typography;

const StandardTemplate: React.FC<{ data: ResumeType }> = ({ data }) => {
  return (
    <div className="text-gray-800 min-h-screen font-sans">
      {/* HEADER */}
      <header className="mb-5">
        {data.basics?.name && (
          <Title level={1} className="mb-0 text-black font-bold">
            {data.basics.name}
          </Title>
        )}

        {/* CONTACT INFO */}
        {((data.basics?.email && data.basics?.phone) ||
          data.basics?.email ||
          data.basics?.phone) && (
          <div className="flex items-center space-x-2 text-base mt-1">
            {data.basics.email && <Text>{data.basics.email}</Text>}
            {data.basics.email && data.basics.phone && (
              <Text type="secondary">•</Text>
            )}
            {data.basics.phone && <Text>{data.basics.phone}</Text>}
            {data.basics?.url && <Text type="secondary">•</Text>}
            {data.basics?.url && (
              <Link
                href={data.basics.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600"
              >
                {data.basics.url}
              </Link>
            )}
          </div>
        )}
        {/* LOCATION */}
        {data.basics?.location && (
          <div className="text-base mt-1">
            {data.basics.location.address && (
              <>{data.basics.location.address}, </>
            )}
            {data.basics.location.city && <>{data.basics.location.city}, </>}
            {data.basics.location.region && (
              <>{data.basics.location.region}, </>
            )}
            {data.basics.location.countryCode && (
              <>{data.basics.location.countryCode}</>
            )}
          </div>
        )}

        {/* SOCIAL PROFILES */}
        {data.basics?.profiles?.[0]?.network &&
          data.basics.profiles[0]?.username && (
            <div className="text-base mt-2 ">
              {data.basics.profiles.map(
                (profile, i) =>
                  profile?.network &&
                  profile?.username && (
                    <div key={i}>
                      <Text strong>{profile.network}:</Text>{" "}
                      <a
                        href={profile?.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600"
                      >
                        {profile.username}
                      </a>
                    </div>
                  )
              )}
            </div>
          )}

        {/* CURRENT JOB TITLE */}
        {data.basics?.label && (
          <div className="text-base my-10 mt-3">
            <Text strong>Current Job Title</Text> : {data.basics.label}
          </div>
        )}
      </header>

      {/* SUMMARY */}
      {data.basics?.summary && (
        <section className="mb-8">
          <Title
            level={3}
            className="text-black font-bold uppercase tracking-wide mb-2"
          ></Title>
          <Divider orientation="left" style={{ borderColor: "#333" }}>
            <Title level={4} className="font-bold uppercase tracking-wide">
              Summary
            </Title>
          </Divider>
          <Text className="text-base">{data.basics.summary}</Text>
        </section>
      )}

      {/* WORK EXPERIENCE */}
      {data.work && data.work.length > 0 && (
        <section className="mb-8">
          <Divider orientation="left" style={{ borderColor: "#333" }}>
            <Title level={4} className="font-bold uppercase tracking-wide">
              Professional Experience
            </Title>
          </Divider>
          {data.work.map((job, i) => (
            <div key={i} className="mb-6">
              <div className="flex justify-between items-center">
                <Text className="font-semibold text-base">{job?.name}</Text>
                <Text type="secondary" className="text-base">
                  {dayjs(job?.startDate).format("MMM YYYY")} -{" "}
                  {(job?.endDate && dayjs(job?.endDate).format("MMM YYYY")) ||
                    "Present"}
                </Text>
              </div>
              {job?.position && (
                <div className="mt-1 text-base font-medium">
                  {job?.position}
                </div>
              )}
              {job?.summary && (
                <div className="mt-1 text-base">{job?.summary}</div>
              )}
              {job?.highlights && job?.highlights.length > 0 && (
                <ul className="list-disc ml-5 mt-1 text-base">
                  {job?.highlights.map((hl, idx) => (
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
        <section className="mb-8">
          <Divider orientation="left" style={{ borderColor: "#333" }}>
            <Title level={4} className="font-bold uppercase tracking-wide">
              Education
            </Title>
          </Divider>
          {data.education.map((edu, i) => (
            <div key={i} className="mb-6">
              <div className="flex justify-between items-center">
                <Text className="font-semibold text-base">
                  {edu.institution}
                </Text>
                <Text type="secondary" className="text-base">
                  {edu.endDate}
                </Text>
              </div>
              {edu.studyType && edu.area && (
                <div className="mt-1 text-base">
                  {edu.studyType}, {edu.area}
                </div>
              )}
              {edu.score && <div className="text-base mt-1">{edu.score}</div>}
              {edu.courses && edu.courses.length > 0 && (
                <ul className="list-disc ml-5 mt-1 text-base">
                  {edu.courses.map((course, idx) => (
                    <li key={idx}>{course}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {/* SKILLS */}
      {data.skills && data.skills.length > 0 && (
        <section className="mb-8">
          <Divider orientation="left" style={{ borderColor: "#333" }}>
            <Title level={4} className="font-bold uppercase tracking-wide">
              Technical Skills
            </Title>
          </Divider>
          {/* Display skills in multiple columns similar to the image */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-1 gap-x-4 text-base mt-2">
            {data.skills.map((skill, index) => (
              <div key={index} className="flex items-start space-x-2">
                <Text className="leading-tight">•</Text>
                <Text>
                  {skill.name}
                  {skill.level ? ` (${skill.level})` : ""}
                  {skill.keywords && skill.keywords.length > 0
                    ? `: ${skill.keywords.join(", ")}`
                    : ""}
                </Text>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* VOLUNTEER */}
      {data.volunteer && data.volunteer.length > 0 && (
        <section className="mb-8">
          <Divider orientation="left" style={{ borderColor: "#333" }}>
            <Title level={4} className="font-bold uppercase tracking-wide">
              Volunteer Experience
            </Title>
          </Divider>
          {data.volunteer.map((vol, i) => (
            <div key={i} className="mb-6">
              <div className="flex justify-between items-center">
                <Text className="font-semibold text-base">
                  {vol.organization}
                </Text>
                <Text type="secondary" className="text-base">
                  {vol.startDate} - {vol.endDate || "Present"}
                </Text>
              </div>
              {vol.position && (
                <div className="mt-1 text-base font-medium">{vol.position}</div>
              )}
              {vol.summary && (
                <div className="mt-1 text-base">{vol.summary}</div>
              )}
              {vol.highlights && vol.highlights.length > 0 && (
                <ul className="list-disc ml-5 mt-1 text-base">
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
        <section className="mb-8">
          <Divider orientation="left" style={{ borderColor: "#333" }}>
            <Title level={4} className="font-bold uppercase tracking-wide">
              Projects
            </Title>
          </Divider>
          {data.projects.map((project, i) => (
            <div key={i} className="mb-6">
              <div className="flex justify-between items-center">
                <Text className="font-semibold text-base">{project.name}</Text>
                <Text type="secondary" className="text-base">
                  {project.startDate} - {project.endDate || "Ongoing"}
                </Text>
              </div>
              {project.description && (
                <div className="mt-1 text-base">{project.description}</div>
              )}
              {project.highlights && project.highlights.length > 0 && (
                <ul className="list-disc ml-5 mt-1 text-base">
                  {project.highlights.map((hl, idx) => (
                    <li key={idx}>{hl}</li>
                  ))}
                </ul>
              )}
              {project.url && (
                <div className="mt-1 text-base">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600"
                  >
                    {project.url}
                  </a>
                </div>
              )}
            </div>
          ))}
        </section>
      )}

      {/* AWARDS */}
      {data.awards && data.awards.length > 0 && (
        <section className="mb-8">
          <Divider orientation="left" style={{ borderColor: "#333" }}>
            <Title level={4} className="font-bold uppercase tracking-wide">
              Awards
            </Title>
          </Divider>
          {data.awards.map((award, i) => (
            <div key={i} className="mb-6">
              <Text className="font-semibold text-base">{award.title}</Text>
              <div className="text-base text-gray-600 mt-1">
                {award.awarder}, {award.date}
              </div>
              {award.summary && (
                <div className="mt-1 text-base">{award.summary}</div>
              )}
            </div>
          ))}
        </section>
      )}

      {/* CERTIFICATES */}
      {data.certificates && data.certificates.length > 0 && (
        <section className="mb-8">
          <Divider orientation="left" style={{ borderColor: "#333" }}>
            <Title level={4} className="font-bold uppercase tracking-wide">
              Certificates
            </Title>
          </Divider>
          {data.certificates.map((cert, i) => (
            <div key={i} className="mb-6">
              <Text className="font-semibold text-base">{cert.name}</Text>
              <div className="text-base text-gray-600 mt-1">
                {cert.issuer}, {cert.date}
              </div>
              {cert.url && (
                <div className="mt-1 text-base">
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600"
                  >
                    {cert.url}
                  </a>
                </div>
              )}
            </div>
          ))}
        </section>
      )}

      {/* PUBLICATIONS */}
      {data.publications && data.publications.length > 0 && (
        <section className="mb-8">
          <Divider orientation="left" style={{ borderColor: "#333" }}>
            <Title level={4} className="font-bold uppercase tracking-wide">
              PUblications
            </Title>
          </Divider>
          {data.publications.map((pub, i) => (
            <div key={i} className="mb-6">
              <Text className="font-semibold text-base">{pub.name}</Text>
              <div className="text-base text-gray-600 mt-1">
                {pub.publisher}, {pub.releaseDate}
              </div>
              {pub.url && (
                <div className="mt-1 text-base">
                  <a
                    href={pub.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600"
                  >
                    {pub.url}
                  </a>
                </div>
              )}
              {pub.summary && (
                <div className="mt-1 text-base">{pub.summary}</div>
              )}
            </div>
          ))}
        </section>
      )}

      {/* LANGUAGES */}
      {data.languages && data.languages.length > 0 && (
        <section className="mb-8">
          <Divider orientation="left" style={{ borderColor: "#333" }}>
            <Title level={4} className="font-bold uppercase tracking-wide">
              Languages
            </Title>
          </Divider>
          <ul className="list-none pl-0 text-base">
            {data.languages.map((lang, i) => (
              <li key={i} className="mb-1">
                <Text className="font-semibold">{lang.language}</Text> -{" "}
                <Text>{lang.fluency}</Text>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* INTERESTS */}
      {data.interests && data.interests.length > 0 && (
        <section className="mb-8">
          <Divider orientation="left" style={{ borderColor: "#333" }}>
            <Title level={4} className="font-bold uppercase tracking-wide">
              Interests
            </Title>
          </Divider>
          <ul className="list-disc list-inside text-base">
            {data.interests.map((interest, i) => (
              <li key={i}>
                <Text className="font-semibold">{interest.name}</Text>
                {interest.keywords && interest.keywords.length > 0 && (
                  <>: {interest.keywords.join(", ")}</>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* REFERENCES */}
      {data.references && data.references.length > 0 && (
        <section>
          <Divider orientation="left" style={{ borderColor: "#333" }}>
            <Title level={4} className="font-bold uppercase tracking-wide">
              References
            </Title>
          </Divider>
          {data.references.map((ref, i) => (
            <div key={i} className="text-base">
              <Text className="font-semibold">{ref.name}:</Text>
              <div className="mt-1">{ref.reference}</div>
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

export default StandardTemplate;
