import { ResumeType } from "@/app/types/career";
import { Divider, Space, Typography } from "antd";
import dayjs from "dayjs";
import { Mail, MapPin, Phone, Link as LucideLink } from "lucide-react";
import Link from "next/link";
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
    <div className="bg-white text-gray-800 min-h-[1123px] p-5">
      {/* BASICS SECTION */}
      <header className="">
        <section className="flex flex-wrap gap-x-5 gap-y-2.5 items-end">
          <h2 className="!font-dm_san text-3xl font-semibold">
            {basics?.name ?? ""}
          </h2>
          <span className="!font-dm_sans text-base">
            {basics?.label ?? <Text type="secondary"></Text>}
          </span>
        </section>
        <section className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2.5 !font-dm_sans">
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
              <Phone
                stroke="#ffffff"
                size={14}
                fill="#000000"
                // className="mt-0.5"
              />{" "}
              {basics.phone}
            </span>
          )}
          {basics?.url && (
            <span className="flex sm:items-center gap-0.5">
              <LucideLink size={14} color="#000000" />
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

        {basics?.location && (
          <div className="mt-2.5 flex items-center gap-0.5">
            <MapPin stroke="#ffffff" size={18} fill="#000000" />
            <Text>
              {basics.location.address && `${basics.location.address}, `}
              {basics.location.city && `${basics.location.city}, `}
              {basics.location.region && `${basics.location.region}, `}
              {basics.location.countryCode && basics.location.countryCode}
            </Text>
          </div>
        )}
        {basics?.summary && (
          <section className="mt-8 flex flex-col gap-2.5">
            <div>
              <h3 className="text-2xl text-black font-medium font-dm_sans">
                Summary
              </h3>
              <div className="h-0.5 w-full border-b-2 border-b-black" />
            </div>
            <Text className="!font-dm_sans">{basics.summary}</Text>
          </section>
        )}
        {basics?.profiles && basics.profiles.length > 0 && (
          <div className="mt-8 flex flex-col gap-2.5">
            <div>
              <h3 className="text-2xl text-black font-medium font-dm_sans">
                Profiles
              </h3>
              <div className="h-0.5 w-full border-b-2 border-b-black" />
            </div>
            <ul className="list-none pl-0">
              {basics.profiles.map((profile, i) => (
                <li key={i} className="mb-2">
                  <Text strong>{profile?.network}:</Text>{" "}
                  <a
                    href={profile?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600"
                  >
                    {profile?.url}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>

      {/* WORK EXPERIENCE SECTION */}
      {work && work.length > 0 && (
        <section className="mt-8">
          <div>
            <h3 className="text-2xl text-black font-medium font-dm_sans">
              Work Experience
            </h3>
            <div className="h-0.5 w-full border-b-2 border-b-black" />
          </div>
          {work.map((job, i) => (
            <div key={i} className="mb-6 mt-2.5">
              <Text className="!font-dm_sans" strong>
                {job?.position || "Position not specified"}
              </Text>{" "}
              <Text className="!font-dm_sans">
                at {job?.name || "Company not specified"}
              </Text>
              <br />
              <Text className="!font-dm_sans" type="secondary">
                {job?.startDate
                  ? dayjs(job.startDate).format("MMM YYYY")
                  : "Start date not specified"}{" "}
                -{" "}
                {job?.endDate
                  ? dayjs(job.endDate).format("MMM YYYY")
                  : "Present"}
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
        </section>
      )}

      {/* VOLUNTEER SECTION */}
      {volunteer && volunteer.length > 0 && (
        <section className="mt-8">
          <div>
            <h3 className="text-2xl text-black font-medium font-dm_sans">
              Volunteer Experience
            </h3>
            <div className="h-0.5 w-full border-b-2 border-b-black" />
          </div>

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
        <section className="mt-8">
          <div>
            <h3 className="text-2xl text-black font-medium font-dm_sans">
              Education
            </h3>
            <div className="h-0.5 w-full border-b-2 border-b-black" />
          </div>
          {education.map((edu, i) => (
            <div key={i} className="mb-6 mt-2.5">
              <Text strong>
                {edu?.studyType} in {edu?.area}
              </Text>{" "}
              at <Text strong>{edu?.institution}</Text>
              <br />
              <Text type="secondary">
                {dayjs(edu?.startDate).format("MMM YYYY")} -{" "}
                {dayjs(edu?.endDate).format("MMM YYYY") || "Present"}
              </Text>
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
              {edu?.score && <p className="mt-2">Score: {edu.score}</p>}
              {edu?.courses && edu.courses.length > 0 && (
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
        <section className="mt-8">
          <div>
            <h3 className="text-2xl text-black font-medium font-dm_sans">
              Awards
            </h3>
            <div className="h-0.5 w-full border-b-2 border-b-black" />
          </div>
          {awards.map((award, i) => (
            <div key={i} className="mb-6">
              <Text strong>{award?.title}</Text>
              <br />
              <Text type="secondary">
                {award?.awarder}, {dayjs(award?.date).format("MMM YYYY")}
              </Text>
              {award?.summary && <p className="mt-2">{award.summary}</p>}
            </div>
          ))}
        </section>
      )}

      {/* CERTIFICATES SECTION */}
      {certificates && certificates.length > 0 && (
        <section className="mt-8">
          <div>
            <h3 className="text-2xl text-black font-medium font-dm_sans">
              Certificates
            </h3>
            <div className="h-0.5 w-full border-b-2 border-b-black" />
          </div>
          {certificates.map((cert, i) => (
            <div key={i} className="mb-6">
              <Text strong>
                {cert?.name || "Certificate name not specified"}
              </Text>
              <br />
              <Text type="secondary">
                {cert?.issuer || "Issuer not specified"},{" "}
                {cert?.date || "Date not specified"}
              </Text>
              {cert?.url && (
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
        <section className="mt-8">
          <div>
            <h3 className="text-2xl text-black font-medium font-dm_sans">
              Publications
            </h3>
            <div className="h-0.5 w-full border-b-2 border-b-black" />
          </div>
          {publications.map((pub, i) => (
            <div key={i} className="mb-6">
              <Text strong>
                {pub?.name || "Publication name not specified"}
              </Text>
              <br />
              <Text type="secondary">
                {pub?.publisher || "Publisher not specified"},{" "}
                {pub?.releaseDate || "Release date not specified"}
              </Text>
              {pub?.url && (
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
              {pub?.summary && <p className="mt-2">{pub.summary}</p>}
            </div>
          ))}
        </section>
      )}

      {/* PROJECTS SECTION */}
      {projects && projects.length > 0 && (
        <section className="mt-8">
          <div>
            <h3 className="text-2xl text-black font-medium font-dm_sans">
              Projects
            </h3>
            <div className="h-0.5 w-full border-b-2 border-b-black" />
          </div>
          {projects.map((project, i) => (
            <div key={i} className="mb-6">
              <Text strong>
                {project?.name || "Project name not specified"}
              </Text>
              <br />
              <Text type="secondary">
                {project?.startDate || "Start date not specified"} -{" "}
                {project?.endDate || "Ongoing"}
              </Text>
              {project?.url && (
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
              {project?.description && (
                <p className="mt-2">{project.description}</p>
              )}
              {project?.highlights && project.highlights.length > 0 && (
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
        <section className="mt-8">
          <div>
            <h3 className="text-2xl text-black font-medium font-dm_sans">
              Skills
            </h3>
            <div className="h-0.5 w-full border-b-2 border-b-black" />
          </div>
          <div className="flex flex-wrap gap-2 mt-4 font-dm_sans">
            {skills.map((skill) => (
              <div
                key={skill?.name || "unknown"}
                className="bg-gray-100 px-3 py-1 rounded"
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
            <h3 className="text-2xl text-black font-medium font-dm_sans">
              Languages
            </h3>
            <div className="h-0.5 w-full border-b-2 border-b-black" />
          </div>
          <ul className="list-none pl-0">
            {languages.map((lang, i) => (
              <li key={i} className="mb-2">
                <Text strong>{lang?.language || "Language not specified"}</Text>{" "}
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
            <h3 className="text-2xl text-black font-medium font-dm_sans">
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
      {/* REFERENCES SECTION */}
      {references && references.length > 0 && (
        <section className="mt-8">
          <div>
            <h3 className="text-2xl text-black font-medium font-dm_sans">
              References
            </h3>
            <div className="h-0.5 w-full border-b-2 border-b-black" />
          </div>
          <div className="mt-2 5 grid grid-cols-2 md:grid-cols-3">
            {references.map((ref, i) => (
              <div key={i} className="mb-6 flex flex-col">
                <Text className="!font-dm_sans" strong>
                  {ref?.name || "Name not specified"}:
                </Text>
                <Text className="!font-dm_sans">
                  {ref?.reference || "Reference not specified"}
                </Text>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ModernTemplate;

