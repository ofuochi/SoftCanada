import { ResumeType } from "@/app/types/career";
import { Divider, Typography } from "antd";
import dayjs from "dayjs";
import Link from "next/link";
import React from "react";

const { Title, Text } = Typography;

const StandardTemplate: React.FC<{ data: ResumeType }> = ({ data }) => {
  return (
    <div className="text-gray-800 min-h-[1123px] w-full max-w-[794px] !font-dm_sans p-8">
      {/* HEADER */}
      <header className="mb-2.5">
        {data.basics?.name && (
          <Title level={1} className="text-black font-bold !font-dm_sans">
            {data.basics.name}
          </Title>
        )}

        {/* CONTACT INFO */}
        {((data.basics?.email && data.basics?.phone) ||
          data.basics?.email ||
          data.basics?.phone) && (
          <div className="flex items-center space-x-2 text-base -mt-2.5 !font-dm_sans">
            {data.basics.email && (
              <Text className="!font-dm_sans">{data.basics.email}</Text>
            )}
            {data.basics.email && data.basics.phone && (
              <Text type="secondary" className="!font-dm_sans">
                •
              </Text>
            )}
            {data.basics.phone && (
              <Text className="!font-dm_sans">{data.basics.phone}</Text>
            )}
            {data.basics?.url && (
              <Text type="secondary" className="!font-dm_sans">
                •
              </Text>
            )}
            {data.basics?.url && (
              <Link
                href={data.basics.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 !font-dm_sans"
              >
                {data.basics.url}
              </Link>
            )}
          </div>
        )}
        {/* LOCATION */}
        {data.basics?.location && (
          <div className="text-base mt-1 !font-dm_sans">
            {data.basics.location.address && (
              <span className="!font-dm_sans">
                {data.basics.location.address},{" "}
              </span>
            )}
            {data.basics.location.city && <>{data.basics.location.city}, </>}
            {data.basics.location.region && (
              <span className="!font-dm_sans">
                {data.basics.location.region},{" "}
              </span>
            )}
            {data.basics.location.countryCode && (
              <span className="!font-dm_sans">
                {data.basics.location.countryCode}
              </span>
            )}
          </div>
        )}

        {/* SOCIAL PROFILES */}
        {data.basics?.profiles?.[0]?.network &&
          data.basics?.profiles[0]?.username &&
          data.basics?.profiles[0]?.url && (
            <div className="text-base !font-dm_sans mt-2.5">
              {data.basics.profiles.map(
                (profile, i) =>
                  profile?.network &&
                  profile?.username &&
                  profile.url && (
                    <div key={i}>
                      <Text strong className="!font-dm_sans">
                        {profile.network}:
                      </Text>{" "}
                      <a
                        href={profile.url ?? "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm !font-dm_sans"
                      >
                        {profile.url}
                      </a>
                    </div>
                  )
              )}
            </div>
          )}

        {/* CURRENT JOB TITLE */}
        {data.basics?.label && (
          <div className="text-base my-10 mt-3">
            <Text strong className="!font-dm_sans">
              Current Job Title
            </Text>{" "}
            : {data.basics.label}
          </div>
        )}
      </header>

      {/* SUMMARY */}
      {data.basics?.summary && (
        <section className="mb-8">
          <Title
            level={3}
            className="text-black font-bold uppercase tracking-wide mb-2 !font-dm_sans"
          ></Title>
          <Divider orientation="left" style={{ borderColor: "#333" }}>
            <Title
              level={4}
              className="font-bold uppercase tracking-wide !font-dm_sans"
            >
              Summary
            </Title>
          </Divider>
          <Text className="text-base !font-dm_sans">{data.basics.summary}</Text>
        </section>
      )}

      {/* WORK EXPERIENCE */}
      {data.work && data.work.length > 0 && (
        <section className="mb-8">
          <Divider orientation="left" style={{ borderColor: "#333" }}>
            <Title
              level={4}
              className="font-bold uppercase tracking-wide !font-dm_sans"
            >
              Professional Experience
            </Title>
          </Divider>
          {data.work.map((job, i) => (
            <div key={i} className="mb-6">
              <div className="flex justify-between items-center">
                <Link href={job?.url ?? "#"}>
                  <Text className="font-semibold text-base !font-dm_sans">
                    {job?.name}
                  </Text>
                </Link>
                <Text type="secondary" className="text-base !font-dm_sans">
                  {dayjs(job?.startDate).format("MMM YYYY")} -{" "}
                  {(job?.endDate && dayjs(job?.endDate).format("MMM YYYY")) ||
                    "Present"}
                </Text>
              </div>
              {job?.position && (
                <div className="mt-1 text-base font-medium !font-dm_sans">
                  {job?.position}
                </div>
              )}
              {job?.summary && (
                <div className="mt-1 text-base !font-dm_sans">
                  {job?.summary}
                </div>
              )}
              {job?.highlights && job?.highlights.length > 0 && (
                <ul className="list-disc ml-5 mt-1 text-[15px] !font-dm_sans">
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
            <Title
              level={4}
              className="font-bold uppercase tracking-wide !font-dm_sans"
            >
              Education
            </Title>
          </Divider>
          {data.education.map((edu, i) => (
            <div key={i} className="mb-6">
              <div className="flex justify-between items-center">
                <Link
                  target="_blank"
                  href={edu?.url ?? "#"}
                  rel="noopener noreferrer"
                >
                  <Text className="font-semibold text-base !font-dm_sans">
                    {edu?.institution}
                  </Text>
                </Link>
                <Text type="secondary" className="text-base !font-dm_sans">
                  {dayjs(edu?.startDate).format("MMM YYYY")} -{" "}
                  {(edu?.endDate && dayjs(edu?.endDate).format("MMM YYYY")) ||
                    "Present"}
                </Text>
              </div>
              {edu?.studyType && edu?.area && (
                <div className="mt-1 text-base !font-dm_sans">
                  {edu.studyType}, {edu.area}
                </div>
              )}
              {edu?.score && (
                <div className="text-base mt-1 !font-dm_sans">{edu.score}</div>
              )}
              {edu?.courses && edu.courses.length > 0 && (
                <ul className="list-disc ml-5 mt-1 text-base !font-dm_sans">
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
            <Title
              level={4}
              className="font-bold uppercase tracking-wide !font-dm_sans"
            >
              Technical Skills
            </Title>
          </Divider>
          {/* Display skills in multiple columns similar to the image */}
          <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-y-1 gap-x-4 text-base mt-2">
            {data.skills.map((skill, index) => (
              <div key={index} className="flex items-start space-x-2">
                <Text className="leading-tight">•</Text>
                <Text className="!font-dm_sans">
                  {skill?.name}
                  {skill?.level && ` (${skill.level})`}
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
            <Title
              level={4}
              className="font-bold uppercase tracking-wide !font-dm_sans"
            >
              Volunteer Experience
            </Title>
          </Divider>
          {data.volunteer.map((vol, i) => (
            <div key={i} className="mb-6">
              <div className="flex justify-between items-center">
                <Text className="font-semibold text-base !font-dm_sans">
                  {vol.organization}
                </Text>
                <Text type="secondary" className="text-base !font-dm_sans">
                  {vol.startDate} - {vol.endDate || "Present"}
                </Text>
              </div>
              {vol.position && (
                <div className="mt-1 text-base font-medium !font-dm_sans">
                  {vol.position}
                </div>
              )}
              {vol.summary && (
                <div className="mt-1 text-base !font-dm_sans">
                  {vol.summary}
                </div>
              )}
              {vol.highlights && vol.highlights.length > 0 && (
                <ul className="list-disc ml-5 mt-1 text-base !font-dm_sans">
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
            <Title
              level={4}
              className="font-bold uppercase tracking-wide !font-dm_sans"
            >
              Projects
            </Title>
          </Divider>
          {data.projects.map((project, i) => (
            <div key={i} className="mb-6">
              <div className="flex justify-between items-center">
                <Text className="font-semibold text-base !font-dm_sans">
                  {project.name}
                </Text>
                <Text type="secondary" className="text-base !font-dm_sans">
                  {project.startDate} - {project.endDate || "Ongoing"}
                </Text>
              </div>
              {project.description && (
                <div className="mt-1 text-base !font-dm_sans">
                  {project.description}
                </div>
              )}
              {project.highlights && project.highlights.length > 0 && (
                <ul className="list-disc ml-5 mt-1 text-base !font-dm_sans">
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
                    className="text-blue-600 !font-dm_sans"
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
            <Title
              level={4}
              className="font-bold uppercase tracking-wide !font-dm_sans"
            >
              Awards
            </Title>
          </Divider>
          {data.awards.map((award, i) => (
            <div key={i} className="mb-6">
              <Text className="font-semibold text-base !font-dm_sans">
                {award.title}
              </Text>
              <div className="text-base text-gray-600 mt-1 !font-dm_sans">
                {award.awarder}, {award.date}
              </div>
              {award.summary && (
                <div className="mt-1 text-base !font-dm_sans">
                  {award.summary}
                </div>
              )}
            </div>
          ))}
        </section>
      )}

      {/* CERTIFICATES */}
      {data.certificates && data.certificates.length > 0 && (
        <section className="mb-8">
          <Divider orientation="left" style={{ borderColor: "#333" }}>
            <Title
              level={4}
              className="font-bold uppercase tracking-wide !font-dm_sans"
            >
              Certificates
            </Title>
          </Divider>
          {data.certificates.map((cert, i) => (
            <div key={i} className="mb-6">
              <Text className="font-semibold text-base !font-dm_sans">
                {cert.name}
              </Text>
              <div className="text-base text-gray-600 mt-1 !font-dm_sans">
                {cert.issuer}, {cert.date}
              </div>
              {cert.url && (
                <div className="mt-1 text-base !font-dm_sans">
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 !font-dm_sans"
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
            <Title
              level={4}
              className="font-bold uppercase tracking-wide !font-dm_sans"
            >
              Publications
            </Title>
          </Divider>
          {data.publications.map((pub, i) => (
            <div key={i} className="mb-6">
              <Text className="font-semibold text-base !font-dm_sans">
                {pub.name}
              </Text>
              <div className="text-base text-gray-600 mt-1 !font-dm_sans">
                {pub.publisher}, {pub.releaseDate}
              </div>
              {pub.url && (
                <div className="mt-1 text-base !font-dm_sans">
                  <a
                    href={pub.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 !font-dm_sans"
                  >
                    {pub.url}
                  </a>
                </div>
              )}
              {pub.summary && (
                <div className="mt-1 text-base !font-dm_sans">
                  {pub.summary}
                </div>
              )}
            </div>
          ))}
        </section>
      )}

      {/* LANGUAGES */}
      {data.languages && data.languages.length > 0 && (
        <section className="mb-8">
          <Divider orientation="left" style={{ borderColor: "#333" }}>
            <Title
              level={4}
              className="font-bold uppercase tracking-wide !font-dm_sans"
            >
              Languages
            </Title>
          </Divider>
          <ul className="list-none pl-0 text-base">
            {data.languages.map((lang, i) => (
              <li key={i} className="mb-1">
                <Text className="font-semibold !font-dm_sans">
                  {lang.language}
                </Text>{" "}
                - <Text>{lang.fluency}</Text>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* INTERESTS */}
      {data.interests && data.interests.length > 0 && (
        <section className="mb-8">
          <Divider orientation="left" style={{ borderColor: "#333" }}>
            <Title
              level={4}
              className="font-bold uppercase tracking-wide !font-dm_sans"
            >
              Interests
            </Title>
          </Divider>
          <ul className="list-disc list-inside text-base !font-dm_sans">
            {data.interests.map((interest, i) => (
              <li key={i}>
                <Text className="font-semibold !font-dm_sans">
                  {interest.name}
                </Text>
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
            <Title
              level={4}
              className="font-bold uppercase tracking-wide !font-dm_sans"
            >
              References
            </Title>
          </Divider>
          {data.references.map((ref, i) => (
            <div key={i} className="text-base mb-5 !font-dm_sans">
              {ref?.name && ref?.reference && (
                <div className="mt-1 !font-dm_sans">
                  {ref.reference} : {ref.name}
                </div>
              )}
              {ref?.email && (
                <div className="mt-1 text-sm text-gray-600 !font-dm_sans">
                  Email: <a href={`mailto:${ref.email}`}>{ref.email}</a>
                </div>
              )}
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

export default StandardTemplate;

