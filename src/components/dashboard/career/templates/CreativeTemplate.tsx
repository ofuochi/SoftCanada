import { ResumeType } from "@/app/types/career";
import { MailOutlined, PhoneOutlined } from "@ant-design/icons";
import { Divider, Typography } from "antd";
import { MapPin } from "lucide-react";
import React from "react";
const { Title, Text } = Typography;

const CreativeTemplate: React.FC<{ data: ResumeType }> = ({ data }) => {
  const { basics, volunteer, awards, interests } = data;

  return (
    <div className="flex min-h-screen w-full">
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
        {data.basics?.profiles?.[0]?.network &&
          data.basics.profiles[0]?.username && (
            <>
              <p className="!font-dm_sans mt-5 text-white font-semibold text-xl">
                Social Profile
              </p>
              <div className="text-base !font-dm_sans">
                {data.basics.profiles.map(
                  (profile, i) =>
                    profile?.network &&
                    profile?.username && (
                      <div key={i}>
                        <Text strong className="!font-dm_sans !text-white">
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
          <div className="mt-4">
            <Title
              className="!font-dm_sans"
              level={4}
              style={{ color: "white" }}
            >
              Interests
            </Title>
            <ul className="list-disc list-inside !font-dm_sans">
              {interests.map((interest) => (
                <li key={interest.name}>
                  {interest.name}: {interest.keywords.join(", ")}
                </li>
              ))}
            </ul>
          </div>
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

