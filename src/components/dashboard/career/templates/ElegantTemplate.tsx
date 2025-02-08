import { ResumeType } from "@/app/types/career";
import { Col, Divider, Row, Space, Typography } from "antd";
import dayjs from "dayjs";
import { Mail, MapPin, Phone, Link as LucideLink, Globe } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
const { Title, Text } = Typography;

const ElegantTemplate: React.FC<{ data: ResumeType }> = ({ data }) => {
  const { basics, work, education, skills, languages, interests, references } =
    data;

  return (
    <section className="bg-white text-gray-900 p-5 min-h-[1123px] !font-dm_sans">
      {basics?.image && (
        <div className="flex justify-center">
          <Image
            src={basics.image}
            width={80}
            height={80}
            className="rounded-full h-[80px] w-[80px]"
            alt="profileImageUrl"
          />
        </div>
      )}
      <section className="bg-white p-4 mb-6">
        {basics?.url && (
          <span className="flex justify-center sm:items-center gap-1">
            <Globe size={14} color="#000000" />
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
        {basics?.label && (
          <span className="!font-dm_sans text-center block text-lg">
            {basics.label}
          </span>
        )}

        {basics?.name && (
          <Title
            className="!font-dm_sans text-center"
            level={2}
            style={{ marginBottom: 0 }}
          >
            {basics.name}
          </Title>
        )}
        <section className="flex items-center max-2xl:flex-col-reverse 2xl:flex-wrap justify-center gap-x-2.5 gap-y-1 !font-dm_sans mt-2.5">
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
            <span className="text-sm flex items-center gap-1">
              {" "}
              <Phone stroke="#ffffff" size={14} fill="#000000" /> {basics.phone}
            </span>
          )}
        </section>

        {basics?.summary && (
          <p className="!font-dm_sans mt-5 text-justify">{basics.summary}</p>
        )}
      </section>

      <section className="flex flex-col gap-5 font-dm_sans">
        <section>
          <div>
            <div className="h-0.5 w-full border-b-2 border-b-black" />
            <h3 className="text-2xl text-black font-medium font-dm_sans my-1 text-center">
              Professional Experience
            </h3>
            <div className="h-0.5 w-full border-b-2 border-b-black" />
          </div>
          <div className="mt-2.5">
            {work.map((job, i) => (
              <div key={i} className="mb-6">
                <Text className="!font-dm_sans" type="secondary">
                  {job?.startDate
                    ? dayjs(job.startDate).format("MMM YYYY")
                    : "Start date not specified"}{" "}
                  -{" "}
                  {job?.endDate
                    ? dayjs(job.endDate).format("MMM YYYY")
                    : "Present"}
                </Text>
                <br />
                <Text className="!font-dm_sans" strong>
                  {job?.position || "Position not specified"}
                </Text>
                <Text className="!font-dm_sans">
                  , {job?.name || "Company not specified"}
                </Text>
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

        <section>
          <div>
            <div className="h-0.5 w-full border-b-2 border-b-black" />
            <h3 className="text-2xl text-black font-medium font-dm_sans my-1 text-center">
              Education
            </h3>
            <div className="h-0.5 w-full border-b-2 border-b-black" />
          </div>
          <div className="mt-2.5">
            {education.map((edu) => (
              <div key={edu?.institution} className="mb-4">
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
                <Text className="!font-dm_sans" strong>
                  {edu?.institution}
                </Text>
                <br />
                <Text className="!font-dm_sans">
                  {edu?.studyType}, {edu?.area} (
                  {edu?.startDate && dayjs(edu.startDate).format("MMM YYYY")} -{" "}
                  {(edu?.endDate && dayjs(edu.endDate).format("MMM YYYY")) ||
                    "Present"}
                  )
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
          <section className="mt-8">
            <div>
              <div className="h-0.5 w-full border-b-2 border-b-black" />
              <h3 className="text-2xl text-black font-medium font-dm_sans my-1 text-center">
                Skills
              </h3>
              <div className="h-0.5 w-full border-b-2 border-b-black" />
            </div>
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

        {/* LANGUAGES SECTION */}
        {languages && languages.length > 0 && (
          <section className="mt-8">
            <div>
              <div className="h-0.5 w-full border-b-2 border-b-black" />
              <h3 className="text-2xl text-black font-medium font-dm_sans my-1 text-center">
                Languages
              </h3>
              <div className="h-0.5 w-full border-b-2 border-b-black" />
            </div>
            <ul className="list-none pl-0">
              {languages.map((lang, i) => (
                <li key={i} className="mb-2">
                  <Text strong>
                    {lang?.language || "Language not specified"}
                  </Text>{" "}
                  - <Text>{lang?.fluency || "Fluency not specified"}</Text>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* INTERESTS SECTION */}
        {interests && interests.length > 0 && (
          <section className="mt-10">
            <div>
              <div className="h-0.5 w-full border-b-2 border-b-black" />
              <h3 className="text-2xl text-black font-medium font-dm_sans my-1 text-center">
                Interests
              </h3>
              <div className="h-0.5 w-full border-b-2 border-b-black" />
            </div>
            <ul className="list-disc list-inside">
              {interests.map((interest, i) => (
                <li key={i}>
                  <Text strong>
                    {interest?.name || "Interest name not specified"}
                  </Text>
                  {interest?.keywords && interest.keywords.length > 0 && (
                    <span>: {interest.keywords.join(", ")}</span>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* REFERENCES */}
        {data.references && data.references.length > 0 && (
          <section>
            <div>
              <div className="h-0.5 w-full border-b-2 border-b-black" />
              <h3 className="text-2xl text-black font-medium font-dm_sans my-1 text-center">
                References
              </h3>
              <div className="h-0.5 w-full border-b-2 border-b-black" />
            </div>
            <section className="grid grid-cols-1 md:grid-cols-2">
              {data.references.map((ref, i) => (
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
    </section>
  );
};

export default ElegantTemplate;

