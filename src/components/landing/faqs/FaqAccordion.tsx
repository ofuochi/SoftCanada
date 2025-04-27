import { PlusCircleFilled } from "@ant-design/icons";
import { Collapse, CollapseProps, theme } from "antd";
import { CSSProperties } from "react";

const getItems: (panelStyle: CSSProperties) => CollapseProps["items"] = (
  panelStyle
) => [
  {
    key: "1",
    label:
      "What is Soft Canada, and how is it different from other immigration support services?",
    children: (
      <p>
        We're more than a service, we're a lifestyle-driven community built to
        support newcomers in Canada. While others focus only on logistics, we
        combine practical help with warmth, aesthetics, and belonging.
      </p>
    ),
    style: panelStyle,
  },
  {
    key: "2",
    label: "Is Soft Canada a government organisation?",
    children: (
      <p>
        No, we're an independent platform dedicated to supporting new immigrants
        through tailored services, community building, and trusted guidance.
      </p>
    ),
    style: panelStyle,
  },
  {
    key: "3",
    label: "Who is Soft Canada for?",
    children: (
      <p>
        We support international students, skilled workers, families, and
        professionals, anyone transitioning into life in Canada and looking for
        help, connection, and a sense of home.
      </p>
    ),
    style: panelStyle,
  },
  {
    key: "4",
    label:
      "Do I have to be a permanent resident or citizen to use your services?",
    children: (
      <p>
        Not at all. Whether you're on a study permit, work visa, permanent
        residency track, or just arrived, we're here to walk with you.
      </p>
    ),
    style: panelStyle,
  },
  {
    key: "5",
    label: "How do I join Soft Canada?",
    children: (
      <p>
        Simply create an account through our website to access toolkits, book
        advisor sessions, attend events, and explore resources.
      </p>
    ),
    style: panelStyle,
  },
  {
    key: "6",
    label: "What happens after I sign up?",
    children: (
      <p>
        You'll get a welcome guide, access to your dashboard, and the option to
        book a free discovery session with a Soft Advisor.
      </p>
    ),
    style: panelStyle,
  },
  {
    key: "7",
    label: "How do I find the right advisor for me?",
    children: (
      <p>
        Our advisor profiles include areas of expertise, lived experience, and
        languages spoken. You can choose based on what feels most aligned with
        your needs.
      </p>
    ),
    style: panelStyle,
  },
  {
    key: "8",
    label: "What kind of support do you offer?",
    children: (
      <p>
        We offer study grant support, one-on-one advisory sessions, settlement
        toolkits, community events, cultural orientation, job search guidance,
        housing support, and wellness referrals.
      </p>
    ),
    style: panelStyle,
  },
  {
    key: "9",
    label: "Are the sessions with advisors free?",
    children: (
      <p>
        Some of our services are free, but advisor sessions are paid. Each
        advisor sets their rate, and you'll see pricing before booking.
      </p>
    ),
    style: panelStyle,
  },
  {
    key: "10",
    label: "Can I get help finding housing or a job in Canada?",
    children: (
      <p>
        Yes, we provide curated housing resources, study advice, grant
        application and job search strategies tailored for newcomers.
      </p>
    ),
    style: panelStyle,
  },
  {
    key: "11",
    label: "Do you offer legal or immigration consulting?",
    children: (
      <p>
        While we don't provide legal advice, we can refer you to trusted
        partners and advisors who specialize in immigration consulting and legal
        support.
      </p>
    ),
    style: panelStyle,
  },
  {
    key: "12",
    label: "How do I access the Soft Canada digital toolkit?",
    children: (
      <p>
        Once you sign up, you'll find free online and downloadable resources
        covering Study, real estate, healthcare, banking, migration, housing,
        and more.
      </p>
    ),
    style: panelStyle,
  },
  {
    key: "13",
    label: "Do you host community events?",
    children: (
      <p>
        Yes! We organize cultural mixers, networking events, newcomer meetups,
        and wellness circles to help you build real connections.
      </p>
    ),
    style: panelStyle,
  },
  {
    key: "14",
    label: "Is Soft Canada active in my city?",
    children: (
      <p>
        We're building local hubs across Canada. While some events are
        in-person, many services are available online — no matter where you are.
      </p>
    ),
    style: panelStyle,
  },
  {
    key: "15",
    label: "Can I contribute or volunteer with Soft Canada?",
    children: (
      <p>
        Yes. We're building a Cultural Ambassador Program and love partnering
        with people who want to give back or mentor others.
      </p>
    ),
    style: panelStyle,
  },
  {
    key: "16",
    label: "How can I become a Soft Canada advisor?",
    children: (
      <p>
        Apply through our website. We welcome professionals, immigrants, and
        experts who want to share their wisdom and be paid for their time.
      </p>
    ),
    style: panelStyle,
  },
  {
    key: "17",
    label: "Are advisors paid for their sessions?",
    children: (
      <p>
        Yes — our advisors are compensated for their time, insight, and
        experience. This ensures high-quality support and professional service.
      </p>
    ),
    style: panelStyle,
  },
  {
    key: "18",
    label: "Can I become both a user and an advisor?",
    children: (
      <p>
        Absolutely. Many of our advisors began their journey as Soft Canada
        users. You're welcome to be both.
      </p>
    ),
    style: panelStyle,
  },
  {
    key: "19",
    label: "Is my information safe on your platform?",
    children: (
      <p>
        Yes. We follow best-in-class privacy protocols and never share your
        personal information without your consent.
      </p>
    ),
    style: panelStyle,
  },
  {
    key: "20",
    label: "I'm not very tech-savvy. Can I still use Soft Canada?",
    children: (
      <p>
        Absolutely. Our platform is designed to be simple and welcoming. And if
        you ever feel stuck, our team is just a message away.
      </p>
    ),
    style: panelStyle,
  },
];
const FaqAccordion: React.FC<{ searchTerm?: string }> = ({ searchTerm }) => {
  const { token } = theme.useToken();
  const panelStyle: React.CSSProperties = {
    marginBottom: 15,
    paddingTop: 10,
    paddingBottom: 10,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: "none",
  };

  const allItems = getItems(panelStyle)!;

  const filteredItems = allItems.filter((item) => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    const labelMatch = (item?.label as string)
      ?.toLowerCase()
      ?.includes(searchLower);
    const childrenText = item?.children?.toString() || "";
    const childrenString = typeof childrenText === "string" ? childrenText : "";
    const childrenMatch = childrenString.toLowerCase().includes(searchLower);
    return labelMatch || childrenMatch;
  });

  return (
    <Collapse
      accordion
      bordered={false}
      items={filteredItems}
      className="mt-[73px]"
      expandIconPosition="end"
      style={{ background: token.colorBgContainer }}
      expandIcon={({ isActive }) =>
        isActive ? (
          <PlusCircleFilled
            style={{
              color: token.colorTextHeading,
              fontSize: 20,
              transform: "rotate(45deg)",
            }}
          />
        ) : (
          <PlusCircleFilled
            style={{
              color: token.colorTextHeading,
              fontSize: 20,
            }}
          />
        )
      }
    />
  );
};

export default FaqAccordion;
