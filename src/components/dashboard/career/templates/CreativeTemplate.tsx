// templates/CreativeTemplate.tsx
import { ResumeType } from "@/app/types/career";
import { Typography } from "antd";
import React from "react";
const { Title, Text } = Typography;

const CreativeTemplate: React.FC<{ data: ResumeType }> = ({ data }) => {
  const { basics, volunteer, awards, interests } = data;

  return (
    <div className="flex min-h-screen">
      <aside className="w-1/4 bg-blue-900 text-white p-8">
        <Title level={2} style={{ color: "white" }}>
          {basics.name}
        </Title>
        <Text style={{ color: "#ddd" }}>{basics.label}</Text>
        <br />
        {basics.location && (
          <Text style={{ color: "#ccc" }}>
            {basics.location.city}, {basics.location.countryCode}
          </Text>
        )}
        <br />
        <Text style={{ color: "#ccc" }}>{basics.email}</Text>
        <br />
        <Text style={{ color: "#ccc" }}>{basics.phone}</Text>
        <div className="mt-4">
          <Title level={4} style={{ color: "white" }}>
            Interests
          </Title>
          <ul className="list-disc list-inside">
            {interests?.map((interest) => (
              <li key={interest.name}>
                {interest.name}: {interest.keywords.join(", ")}
              </li>
            ))}
          </ul>
        </div>
      </aside>
      <main className="flex-1 bg-gray-50 p-10">
        <Title level={3}>Volunteer Experience</Title>
        {volunteer?.map((vol) => (
          <div key={vol.organization} className="mb-6">
            <Text strong>
              {vol.position} at {vol.organization}
            </Text>
            <br />
            <Text type="secondary">
              {vol.startDate} - {vol.endDate || "Present"}
            </Text>
            <p className="mt-2">{vol.summary}</p>
            <ul className="list-disc list-inside">
              {vol.highlights.map((hl, i) => (
                <li key={i}>{hl}</li>
              ))}
            </ul>
          </div>
        ))}

        <Title level={3} className="mt-10">
          Awards
        </Title>
        {awards.map((award) => (
          <div key={award.title} className="mb-4">
            <Text strong>{award.title}</Text>
            <br />
            <Text type="secondary">
              {award.awarder}, {award.date}
            </Text>
            <p className="mt-2">{award.summary}</p>
          </div>
        ))}
      </main>
    </div>
  );
};

export default CreativeTemplate;
