"use client";
import { Layout, Row, Col, Typography, Divider, Avatar, List } from "antd";
import styles from "@/app/Template1.module.css";
import { useUser } from "@auth0/nextjs-auth0/client";

const { Content } = Layout;
const { Title, Text, Paragraph } = Typography;

export const Template1 = () => {
  const { user } = useUser();
  return (
    <Layout className={styles.layout}>
      <Content className={styles.content}>
        <div className={styles.profileSection}>
          <Row align="middle" className={styles.headerRow}>
            <Col flex="120px">
              <Avatar
                size={120}
                src={user?.picture}
                alt="Michael Truss"
                className={styles.avatar}
              />
            </Col>
            <Col flex="auto">
              <Title level={2} className={styles.name}>
                Michael Truss
              </Title>
              <Text className={styles.position}>Product Developer</Text>
              <br />
              <Text className={styles.contact}>
                MichaelTTruss@gmail.com • Portfolio • MichaelLinkedIn.com •
                Nigeria
              </Text>
            </Col>
          </Row>
        </div>

        <Divider className={styles.divider} />

        <section className={styles.section}>
          <Title level={4} className={styles.sectionTitle}>
            Professional Summary
          </Title>
          <Text className={styles.text}>
            Dedicated and results-oriented Product Developer with 2 years of
            experience in Fin-Tech. Proven ability to translate complex
            technical concepts into innovative solutions that meet user needs
            and drive business growth. Skilled in programming languages,
            frameworks, tools.
          </Text>
        </section>

        <Divider className={styles.divider} />

        <Row gutter={[24, 24]}>
          <Col span={12}>
            <section className={styles.section}>
              <Title level={4} className={styles.sectionTitle}>
                Education
              </Title>
              <Text className={styles.text}>
                <b>University of Benin</b>
              </Text>
              <Text className={styles.text}>07/2015 - 09/2021</Text>
              <Text className={styles.text}>
                B.Sc. Computer Science, Nigeria
              </Text>
              <Text className={styles.text}>
                Second class upper (4.00 GPA) Honors degree
              </Text>
            </section>
          </Col>
          <Col span={12}>
            <section className={styles.section}>
              <Title level={4} className={styles.sectionTitle}>
                Experience
              </Title>
              <Text className={styles.text}>
                <b>Mid-Level Product Designer</b>
              </Text>
              <Paragraph>
                <Text className={styles.text}>
                  06/2019 - 10/2021 Remote • Canada
                </Text>
              </Paragraph>
              <List>
                <List.Item>
                  <ul className={styles.bullets}>
                    <li>
                      Led the development of Elena, a Chatbot support, from
                      inception to launch.
                    </li>
                    <li>
                      Implemented 10 key features, including AI chatbot, in-app
                      shop, and auto-scheduling.
                    </li>
                    <li>
                      Mentored junior developers and provided technical guidance
                      to the team.
                    </li>
                  </ul>
                </List.Item>
              </List>
            </section>
          </Col>
        </Row>

        <Divider className={styles.divider} />

        <Row gutter={[24, 24]}>
          <Col span={12}>
            <section className={styles.section}>
              <Title level={4} className={styles.sectionTitle}>
                Technical Skills
              </Title>
              <ul className={styles.bullets}>
                <li>Programming Languages: Python, Java, JavaScript, C++</li>
                <li>Frameworks: React, Angular, Django, Spring Boot</li>
                <li>Databases: SQL, NoSQL (MongoDB, Cassandra)</li>
                <li>Cloud Platforms: AWS, GCP, Azure</li>
                <li>Tools: Git, Docker, Kubernetes, Jira, Confluence</li>
                <li>Methodologies: Agile, Scrum, Kanban</li>
              </ul>
            </section>
          </Col>
          <Col span={12}>
            <section className={styles.section}>
              <Title level={4} className={styles.sectionTitle}>
                Certifications
              </Title>
              <ul className={styles.bullets}>
                <li>Certified Scrum Product Owner (CSPO)</li>
                <li>Certified SAFe® 5 Practitioner</li>
                <li>Certified Product Manager (CPM)</li>
                <li>AWS Certified Developer - Associate</li>
              </ul>
            </section>
          </Col>
        </Row>

        <Divider className={styles.divider} />

        <section className={styles.section}>
          <Title level={4} className={styles.sectionTitle}>
            Projects
          </Title>
          <ul className={styles.bullets}>
            <li>Certified Scrum Product Owner (CSPO)</li>
            <li>Certified SAFe® 5 Practitioner</li>
            <li>Certified Product Manager (CPM)</li>
            <li>AWS Certified Developer - Associate</li>
          </ul>
        </section>
      </Content>
    </Layout>
  );
};
