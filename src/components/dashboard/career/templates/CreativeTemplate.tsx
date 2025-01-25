import { ResumeType } from "@/app/types/career";
import { MailOutlined, PhoneOutlined } from "@ant-design/icons";
import { Divider, Typography } from "antd";
import dayjs from "dayjs";
import { ExternalLink, MapPin } from "lucide-react";
import Link from "next/link";
import React from "react";
const { Title, Text } = Typography;

const CreativeTemplate: React.FC<{ data: ResumeType }> = ({ data }) => {
  const {
    basics,
    volunteer,
    awards,
    interests,
    work,
    education,
    skills,
    references,
  } = data;

  return (
    <div className="flex min-h-[150vh] w-full">
      <aside className="w-full max-w-[220px] bg-blue-900 text-white p-5">
        {basics?.name && (
          <h1 className="!font-dm_sans mt-2.5 block text-white font-semibold text-[33px]">
            {basics.name}
          </h1>
        )}
        {basics?.label && (
          <Text
            style={{ color: "#fff", fontSize: "18px" }}
            className="!font-dm_sans font-medium block"
          >
            {basics.label}
          </Text>
        )}
        {basics?.location && (
          <div className="flex items-center gap-2 mt-5">
            <MapPin color="#fff" size={20} />
            <Text
              className="!font-dm_sans block text-white"
              style={{ color: "#fffffF" }}
            >
              {basics.location.address}, {basics.location.postalCode}{" "}
              {basics.location.city}, {basics.location.countryCode}
            </Text>
          </div>
        )}
        {basics?.email && (
          <div className="flex gap-2 items-center mt-5">
            <MailOutlined size={8} color="#fff" />
            <Text
              className="!font-dm_sans font-medium"
              style={{ color: "#fff" }}
            >
              {basics.email}
            </Text>
          </div>
        )}
        {basics?.phone && (
          <div className="flex gap-2 items-center">
            <PhoneOutlined size={8} color="#fff" />
            <Text
              className="!font-dm_sans font-medium"
              style={{ color: "#fff" }}
            >
              {basics.phone}
            </Text>
          </div>
        )}

        {/* SOCIAL PROFILES */}
        {basics?.profiles?.[0]?.network && basics.profiles[0]?.username && (
          <>
            <p className="!font-dm_sans uppercase mt-5 text-white font-semibold text-xl">
              Social Profile
            </p>
            <div className="text-base !font-dm_sans">
              {basics.profiles.map(
                (profile, i) =>
                  profile?.network &&
                  profile?.username && (
                    <div key={i}>
                      <Text className="!font-dm_sans !text-white font-semibold">
                        {profile.network}:
                      </Text>{" "}
                      <a
                        href={profile?.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="!underline text-white hover:text-white text-sm !font-dm_sans"
                      >
                        {profile.username}
                      </a>
                    </div>
                  )
              )}
            </div>
          </>
        )}

        {/* INTERESTS */}
        {interests && interests.length > 0 && (
          <div className="mt-5">
            <Title
              className="!font-dm_sans uppercase"
              level={4}
              style={{ color: "white" }}
            >
              Interests
            </Title>
            <ul className="list-disc list-inside !font-dm_sans">
              {interests.map((interest) => (
                <li key={interest.name}>
                  <span className="font-semibold">{interest.name}:</span>
                  {interest.keywords.join(", ")}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* REFERENCES */}
        {references && references.length > 0 && (
          <section>
            <Title
              level={4}
              className="font-bold uppercase tracking-wide !font-dm_sans !text-white mt-5"
            >
              References
            </Title>
            {references.map((ref, i) => (
              <div key={i} className="text-sm mb-5 !font-dm_sans text-white">
                {ref?.name && ref?.reference && (
                  <div className="mt-1 !font-dm_sans">
                    <span className="font-semibold">{ref.reference}</span>:{" "}
                    {ref.name}
                  </div>
                )}
                {ref?.email && (
                  <div className="mt-1 text-sm text-white !font-dm_sans">
                    <span className="font-semibold">Email: </span>
                    <a
                      href={`mailto:${ref.email}`}
                      className="text-white underline hover:text-white hover:underline"
                    >
                      {ref.email}
                    </a>
                  </div>
                )}
              </div>
            ))}
          </section>
        )}
      </aside>
      <main className="flex-1 bg-gray-50 p-10">
        {/* SUMMARY */}
        {basics?.summary && (
          <section className="mb-8">
            <Divider orientation="left" style={{ borderColor: "#333" }}>
              <Title
                level={3}
                className="font-bold uppercase tracking-wide !font-dm_sans"
              >
                Summary
              </Title>
            </Divider>
            <Text className="text-lg !font-dm_sans">{basics.summary}</Text>
          </section>
        )}

        {/* WORK EXPERIENCE */}
        {work && work.length > 0 && (
          <section className="mb-8">
            <Divider orientation="left" style={{ borderColor: "#333" }}>
              <Title
                level={4}
                className="font-bold uppercase tracking-wide !font-dm_sans"
              >
                Professional Experience
              </Title>
            </Divider>
            {work.map((job, i) => (
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
        {education && education.length > 0 && (
          <section className="mb-8">
            <Divider orientation="left" style={{ borderColor: "#333" }}>
              <Title
                level={4}
                className="font-bold uppercase tracking-wide !font-dm_sans"
              >
                Education
              </Title>
            </Divider>
            {education.map((edu, i) => (
              <div key={i} className="mb-6">
                <div className="flex flex-col">
                  <Link
                    target="_blank"
                    href={edu?.url ?? "#"}
                    rel="noopener noreferrer"
                  >
                    <Text className="flex items-center font-semibold gap-1 text-base !font-dm_sans">
                      {edu?.institution}{" "}
                      {edu?.url && <ExternalLink size={12} color="#000000" />}
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
                  <div className="text-base mt-1 !font-dm_sans">
                    {edu.score}
                  </div>
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
        {skills && skills.length > 0 && (
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-1 gap-x-4 text-base mt-2">
              {skills.map((skill, index) => (
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

        {/* VOLUNTEER EXPERIENCE */}
        {volunteer && volunteer.length > 0 && (
          <Title className="!font-dm_sans uppercase" level={3}>
            Volunteer Experience
          </Title>
        )}
        {volunteer?.map((vol) => (
          <div key={vol.organization} className="mb-6">
            <Text className="!font-dm_sans" strong>
              {vol.position} at {vol.organization}
            </Text>
            <br />
            <Text className="!font-dm_sans" type="secondary">
              {vol.startDate} - {vol.endDate || "Present"}
            </Text>
            <p className="mt-2 !font-dm_sans">{vol.summary}</p>
            <ul className="list-disc list-inside !font-dm_sans">
              {vol.highlights.map((hl, i) => (
                <li key={i}>{hl}</li>
              ))}
            </ul>
          </div>
        ))}

        {awards && awards.length > 0 && (
          <Title level={3} className="mt-10 !font-dm_sans">
            Awards
          </Title>
        )}
        {awards?.map((award) => (
          <div key={award.title} className="mb-4">
            <Text className="!font-dm_sans" strong>
              {award.title}
            </Text>
            <br />
            <Text className="!font-dm_sans" type="secondary">
              {award.awarder}, {award.date}
            </Text>
            <p className="mt-2 !font-dm_sans">{award.summary}</p>
          </div>
        ))}
      </main>
    </div>
  );
};

export default CreativeTemplate;

