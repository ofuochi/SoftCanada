import { ResumeType } from "@/app/types/career";
import { Col, Divider, Row, Space, Typography } from "antd";
import dayjs from "dayjs";
import { Globe, LucideLink, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import React from "react";
const { Title, Text } = Typography;

const ClassicTemplate: React.FC<{ data: ResumeType }> = ({ data }) => {
  const { basics, work, education, skills, references } = data;
  return (
    <div className="p-10 bg-white text-gray-800 min-h-[1123px]">
      {/* HEADER / BASICS SECTION */}
      <header className="mb-10">
        <Title className="!font-dm_sans" level={2} style={{ marginBottom: 0 }}>
          {basics?.name}
        </Title>
        {basics?.label && (
          <span className="!font-dm_sans block text-lg">{basics.label}</span>
        )}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-2.5 mt-2.5">
          {basics?.location && (
            <div className="flex items-center gap-0.5">
              <MapPin stroke="#ffffff" size={18} fill="#000000" />
              <Text>
                {basics.location.address && `${basics.location.address}, `}
                {basics.location.city && `${basics.location.city}, `}
                {basics.location.region && `${basics.location.region}, `}
                {basics.location.countryCode && basics.location.countryCode}
              </Text>
            </div>
          )}

          {basics?.email && (
            <span className="text-sm flex items-center gap-0.5">
              {" "}
              <Mail
                stroke="#ffffff"
                size={14}
                fill="#000000"
                className="mt-0.5"
              />{" "}
              {basics.email}
            </span>
          )}

          {basics?.phone && (
            <span className="text-sm flex items-center gap-0.5">
              {" "}
              <Phone
                stroke="#ffffff"
                size={14}
                fill="#000000"
                className="mt-0.5"
              />{" "}
              {basics.phone}
            </span>
          )}

          {basics?.url && (
            <span className="text-sm flex items-center gap-0.5">
              {" "}
              <Globe
                stroke="#ffffff"
                size={14}
                fill="#000000"
                className="mt-0.5"
              />{" "}
              <Link
                href={basics.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600"
              >
                {basics.url}
              </Link>
            </span>
          )}
        </section>
        {basics?.summary && (
          <section className="mt-8">
            <h3 className="text-2xl text-white font-medium font-dm_sans my-1 text-center bg-black rounded flex justify-center items-center py-0.5">
              Summary
            </h3>
            <div className="mt-2.5">
              <Text>{basics.summary}</Text>
            </div>
          </section>
        )}
        {basics?.profiles && basics.profiles.length > 0 && (
          <section className="mt-8">
            <h3 className="text-2xl text-white font-medium font-dm_sans my-1 text-center bg-black rounded flex justify-center items-center py-0.5">
              Profiles
            </h3>
            <ul className="list-none pl-0 grid grid-cols-1 sm:grid-cols-2 mt-2.5">
              {basics.profiles.map((profile, i) => (
                <li key={i} className="mb-2">
                  <Text strong>{profile?.network || "Unknown"}:</Text>{" "}
                  <a
                    href={profile?.url || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600"
                  >
                    {profile?.url || "Unknown"}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}
      </header>

      <section className="flex flex-col gap-6 font-dm_sans">
        {/* PROFESSIONAL EXPERIENCE */}
        <section>
          {work.length > 0 && (
            <h3 className="text-2xl text-white font-medium font-dm_sans my-1 text-center bg-black rounded flex justify-center items-center py-0.5">
              Professional Experience
            </h3>
          )}
          <div className="mt-3">
            {work.map((job, i) => (
              <div key={i} className="">
                {job?.url && (
                  <>
                    <span className="flex sm:items-center gap-1">
                      <LucideLink size={14} color="#000000" />
                      <Link
                        href={job.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600"
                      >
                        {job.url}
                      </Link>
                    </span>
                  </>
                )}
                <div className="flex items-center justify-between">
                  <div>
                    <Text className="!font-dm_sans" strong>
                      {job?.position || "Position not specified"}
                    </Text>
                    <Text className="!font-dm_sans">
                      , {job?.name || "Company not specified"}
                    </Text>
                  </div>
                  <Text className="!font-dm_sans !text-black" type="secondary">
                    {job?.startDate
                      ? dayjs(job.startDate).format("MMM YYYY")
                      : "Start date not specified"}{" "}
                    -{" "}
                    {job?.endDate
                      ? dayjs(job.endDate).format("MMM YYYY")
                      : "Present"}
                  </Text>
                </div>

                {job?.summary && (
                  <p className="mt-2 font-dm_sans">{job.summary}</p>
                )}
                {job?.highlights && job.highlights.length > 0 && (
                  <ul className="list-disc list-inside mt-2 font-dm_sans">
                    {job.highlights.map((hl, idx) => (
                      <li key={idx}>{hl}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* EDUCATION */}
        <section>
          {education.length > 0 && (
            <h3 className="text-2xl text-white font-medium font-dm_sans my-1 text-center bg-black rounded flex justify-center items-center py-0.5">
              Education
            </h3>
          )}
          <div className="mt-2.5">
            {education.map((edu, index) => (
              <div key={index} className="">
                {edu?.url && (
                  <div className="flex items-center gap-0.5">
                    <LucideLink size={14} color="#000000" />
                    <br />
                    <Link
                      href={edu?.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600"
                    >
                      {edu?.url}
                    </Link>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <Text className="!font-dm_sans" strong>
                    {edu?.institution}
                  </Text>
                  {edu?.startDate && dayjs(edu.startDate).format("MMM YYYY")} -{" "}
                  {(edu?.endDate && dayjs(edu.endDate).format("MMM YYYY")) ||
                    "Present"}
                </div>
                <Text className="!font-dm_sans">
                  {edu?.studyType}, {edu?.area}
                </Text>
                <br />
                {edu?.score && (
                  <Text className="!font-dm_sans"> GPA: {edu.score}</Text>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* SKILLS SECTION */}
        {skills && skills.length > 0 && (
          <section>
            <h3 className="text-2xl text-white font-medium font-dm_sans my-1 text-center bg-black rounded flex justify-center items-center py-0.5">
              Skills
            </h3>
            <div className="flex flex-wrap gap-2 mt-4 font-dm_sans">
              {skills.map((skill) => (
                <div
                  key={skill?.name || "unknown"}
                  className="bg-black text-white px-3 py-1 rounded"
                >
                  {skill?.name || "Skill name not specified"} (
                  {skill?.level || "Level not specified"})<br />
                  {skill?.keywords && skill.keywords.length > 0 && (
                    <Text className="!font-dm_sans" type="secondary">
                      {skill.keywords.join(", ")}
                    </Text>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* REFERENCES */}
        {references && references.length > 0 && (
          <section>
            <h3 className="text-2xl text-white font-medium font-dm_sans my-1 text-center bg-black rounded flex justify-center items-center py-0.5">
              References
            </h3>
            <section className="grid grid-cols-1 md:grid-cols-2">
              {references.map((ref, i) => (
                <div key={i} className="text-base mb-5 !font-dm_sans">
                  {ref?.name && ref?.reference && (
                    <div className="mt-1 !font-dm_sans">
                      {ref.name} -{" "}
                      <span className="font-medium">{ref.reference} </span>
                    </div>
                  )}
                  {ref?.email && (
                    <div className="mt-1 text-sm text-gray-600 !font-dm_sans">
                      Email:{" "}
                      <Link href={`mailto:${ref.email}`}>{ref.email}</Link>
                    </div>
                  )}
                </div>
              ))}
            </section>
          </section>
        )}
      </section>
    </div>
  );
};

export default ClassicTemplate;

