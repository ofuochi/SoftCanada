"use client";

import React, {useState} from 'react';
import {Button, Card, Collapse, Divider, Form, FormProps, Input, List, Select, Space, Steps, Tabs, Tooltip} from 'antd';
import {DeleteOutlined, PlusOutlined, UserOutlined} from '@ant-design/icons';
import {saveAs} from 'file-saver';
import './CvBuilderPage.css';

const {Step} = Steps;
const {TabPane} = Tabs;
const {TextArea} = Input;
const {Panel} = Collapse;

type FieldType = {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
  };
  summary: string;
  skills: string[];
  experience: {
    title: string;
    description: string;
  }[];
};

const initialData: FieldType = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
  },
  summary: '',
  skills: [],
  experience: [],
};

export default function CvBuilderPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [cvData, setCvData] = useState(initialData);

  const [form] = Form.useForm();

  const steps = [
    {title: 'Personal Info', icon: <UserOutlined/>},
    {title: 'Summary'},
    {title: 'Skills'},
    {title: 'Experience'},
  ];

  const handleFormSubmit: FormProps<FieldType>['onFinish'] = (values) => {
    if (currentStep === steps.length - 1) {
      console.log('CV Completed:', cvData);
    } else {
      setCvData((prev) => ({
        ...prev,
        ...values,
      }));
      setCurrentStep(currentStep + 1);
    }
  };

  const handleSkillAdd = (value: string) => {
    setCvData((prev) => ({
      ...prev,
      skills: [...prev.skills, value],
    }));
    form.resetFields(['skillInput']);
  };

  const handleExperienceAdd = () => {
    setCvData((prev) => ({
      ...prev,
      experience: [...prev.experience, {title: '', description: ''}],
    }));
  };

  const handleExperienceDelete = (index: number) => {
    setCvData((prev) => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index),
    }));
  };

  const handleDownload = (format: string) => {
    const cvContent = JSON.stringify(cvData, null, 2); // Example
    const blob = new Blob([cvContent], {type: 'application/json'});

    if (format === 'pdf') {
      saveAs(blob, 'cv.pdf');
    } else if (format === 'word') {
      saveAs(blob, 'cv.docx');
    } else if (format === 'json') {
      saveAs(blob, 'cv.json');
    }
  };

  return (
    <div className="cv-builder">
      <div className="cv-form">
        <Steps current={currentStep}>
          {steps.map((step, index) => (
            <Step key={index} title={step.title} icon={step.icon}/>
          ))}
        </Steps>

        <Divider/>

        <Form
          layout="vertical"
          form={form}
          initialValues={cvData}
          onFinish={handleFormSubmit}
          onValuesChange={(_, allValues) => {
            setCvData((prev) => ({
              ...prev,
              ...allValues,
            }));
          }}
        >
          {currentStep === 0 && (
            <Card title="Personal Info" bordered>
              <Form.Item
                label="Full Name"
                name={['personalInfo', 'fullName']}
                rules={[{required: true, message: 'Please enter your name'}]}
              >
                <Input placeholder="Enter your full name"/>
              </Form.Item>
              <Form.Item
                label="Email"
                name={['personalInfo', 'email']}
                rules={[{type: 'email', message: 'Please enter a valid email'}]}
              >
                <Input placeholder="Enter your email"/>
              </Form.Item>
              <Form.Item
                label="Phone"
                name={['personalInfo', 'phone']}
                rules={[{required: true, message: 'Please enter your phone number'}]}
              >
                <Input placeholder="Enter your phone number"/>
              </Form.Item>
            </Card>
          )}

          {currentStep === 1 && (
            <Card title="Summary" bordered>
              <Form.Item label="Summary" name="summary">
                <TextArea placeholder="Write a brief summary about yourself" rows={4}/>
              </Form.Item>
            </Card>
          )}

          {currentStep === 2 && (
            <Card title="Skills" bordered>
              <Form.Item>
                <Input.Group compact>
                  <Form.Item name="skillInput" noStyle>
                    <Input placeholder="Add a skill"/>
                  </Form.Item>
                  <Tooltip title="Add Skill">
                    <Button type="primary" icon={<PlusOutlined/>}
                            onClick={() => handleSkillAdd(form.getFieldValue('skillInput'))}>
                      Add
                    </Button>
                  </Tooltip>
                </Input.Group>
              </Form.Item>

              <List
                dataSource={cvData.skills}
                renderItem={(item, index) => (
                  <List.Item key={index}>
                    <span>{item}</span>
                  </List.Item>
                )}
              />
            </Card>
          )}

          {currentStep === 3 && (
            <Card title="Experience" bordered>
              <Button type="dashed" icon={<PlusOutlined/>} block onClick={handleExperienceAdd}>
                Add Experience
              </Button>
              <Collapse>
                {cvData.experience.map((exp, index) => (
                  <Panel header={`Experience ${index + 1}`} key={index}>
                    <Form.Item label="Title">
                      <Input
                        placeholder="Experience Title"
                        value={exp.title}
                        onChange={(e) =>
                          setCvData((prev) => {
                            const updatedExperience = [...prev.experience];
                            updatedExperience[index].title = e.target.value;
                            return {...prev, experience: updatedExperience};
                          })
                        }
                      />
                    </Form.Item>
                    <Form.Item label="Description">
                      <TextArea
                        placeholder="Describe your experience"
                        value={exp.description}
                        rows={3}
                        onChange={(e) =>
                          setCvData((prev) => {
                            const updatedExperience = [...prev.experience];
                            updatedExperience[index].description = e.target.value;
                            return {...prev, experience: updatedExperience};
                          })
                        }
                      />
                    </Form.Item>
                    <Button
                      type="link"
                      danger
                      icon={<DeleteOutlined/>}
                      onClick={() => handleExperienceDelete(index)}
                    >
                      Delete
                    </Button>
                  </Panel>
                ))}
              </Collapse>
            </Card>
          )}

          <Divider/>
          <Space>
            <Button disabled={currentStep === 0} onClick={() => setCurrentStep(currentStep - 1)}>
              Previous
            </Button>
            <Button type="primary" htmlType="submit">
              {currentStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Space>
        </Form>
      </div>

      <div className="cv-preview">
        <Tabs defaultActiveKey="1">
          <TabPane tab="Full CV" key="1">
            <pre>{JSON.stringify(cvData, null, 2)}</pre>
          </TabPane>
          <TabPane tab="Personal Info" key="2">
            <pre>{JSON.stringify(cvData.personalInfo, null, 2)}</pre>
          </TabPane>
          <TabPane tab="Skills" key="3">
            <pre>{JSON.stringify(cvData.skills, null, 2)}</pre>
          </TabPane>
        </Tabs>
        <Divider/>
        <Select
          placeholder="Download as"
          style={{width: 200}}
          onChange={(format) => handleDownload(format)}
        >
          <Select.Option value="pdf">PDF</Select.Option>
          <Select.Option value="word">Word</Select.Option>
          <Select.Option value="json">JSON</Select.Option>
        </Select>
      </div>
    </div>
  );
}
