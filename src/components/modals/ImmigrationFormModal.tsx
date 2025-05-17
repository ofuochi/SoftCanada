import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import {
  Modal,
  Form,
  Input,
  Select,
  Radio,
  DatePicker,
  Button,
  Typography,
  Row,
  Col,
  message,
  Spin,
  Flex,
  InputNumber,
  Grid,
} from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import moment from "moment";
import { useApiClient } from "@/hooks/api-hook";
import { logEvent } from "@/utils/analytics";

const { TextArea } = Input;
const { Option } = Select;
const { Title } = Typography;
const { useBreakpoint } = Grid;

// Type definitions
type MaritalStatusType =
  | "Single"
  | "Married"
  | "Separated"
  | "Divorced"
  | "Widowed";
type YesNoType = "Yes" | "No";

type DegreeStatusType = "Completed" | "In Progress" | "Incomplete" | "On Hold";

type DegreeType = {
  degreeName: string;
  degreeCountry: string;
  degreeUniversity: string;
  degreeYear: string;
  degreeStatus: DegreeStatusType;
};

type WorkType = {
  jobTitle: string;
  yearsOfExperience: number;
  country: string;
};

type FormValues = {
  firstName?: string;
  lastName?: string;
  email?: string;
  mobile?: string;
  maritalStatus?: MaritalStatusType;
  dob?: moment.Moment;
  liveInCanada?: YesNoType;
  degreeCompleted?: DegreeType[];
  work?: WorkType[];
  country?: string;
  doneLanguageTest?: YesNoType;
  hasFamilyInCanada?: YesNoType;
  hasJobOffer?: YesNoType;
  comment?: string;
  formType?: string;
};

type ModalProps = {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

// Custom validator for phone number
const validateCanadianPhoneNumber = (_: any, value: string): Promise<void> => {
  const canadianPhoneRegex =
    /^(\+?1[-.\s]?)?\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})$/;
  if (!value || canadianPhoneRegex.test(value)) {
    return Promise.resolve();
  }
  return Promise.reject("Please enter a valid Canadian phone number");
};

// Form section components
const PersonalInfoSection: React.FC = () => {
  return (
    <div className="py-3 md:py-5">
      <Row gutter={[16, 8]}>
        <Col xs={24} md={12}>
          <Form.Item
            name="firstName"
            label="First Name"
            rules={[
              { required: true, message: "Please enter your first name" },
            ]}
          >
            <Input
              className="h-9 !font-poppins border !border-[#CBCBCB]"
              placeholder="Enter your first name"
            />
          </Form.Item>
        </Col>

        <Col xs={24} md={12}>
          <Form.Item
            name="lastName"
            label="Last Name"
            rules={[{ required: true, message: "Please enter your last name" }]}
          >
            <Input
              className="h-9 !font-poppins border !border-[#CBCBCB]"
              placeholder="Enter your last name"
            />
          </Form.Item>
        </Col>

        <Col xs={24} md={12}>
          <Form.Item
            name="email"
            label="Email Address"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email address" },
            ]}
          >
            <Input
              className="h-9 !font-poppins border !border-[#CBCBCB]"
              placeholder="Enter your email address"
            />
          </Form.Item>
        </Col>

        <Col xs={24} md={12}>
          <Form.Item
            name="mobile"
            label="Mobile Number"
            rules={[
              { required: true, message: "Please enter your mobile number" },
              { validator: validateCanadianPhoneNumber },
            ]}
          >
            <Input
              className="h-9 !font-poppins border !border-[#CBCBCB]"
              placeholder="Enter your mobile number"
            />
          </Form.Item>
        </Col>

        <Col xs={24} md={12}>
          <Form.Item
            name="maritalStatus"
            label="Marital Status"
            rules={[
              { required: true, message: "Please select your marital status" },
            ]}
          >
            <Select placeholder="Select marital status">
              <Option value="Single">Single</Option>
              <Option value="Married">Married</Option>
              <Option value="Separated">Separated</Option>
              <Option value="Divorced">Divorced</Option>
              <Option value="Widowed">Widowed</Option>
            </Select>
          </Form.Item>
        </Col>

        <Col xs={24} md={12}>
          <Form.Item
            name="dob"
            label="Date of Birth"
            rules={[
              { required: true, message: "Please select your date of birth" },
            ]}
          >
            <DatePicker
              style={{ width: "100%" }}
              format="YYYY-MM-DD"
              className="h-9 !font-poppins border !border-[#CBCBCB]"
            />
          </Form.Item>
        </Col>

        <Col xs={24} md={12}>
          <Form.Item
            name="country"
            label="Country of Citizenship"
            rules={[
              {
                required: true,
                message: "Please enter your country of citizenship",
              },
            ]}
          >
            <Input
              className="h-9 !font-poppins border !border-[#CBCBCB]"
              placeholder="Enter your country of citizenship"
            />
          </Form.Item>
        </Col>

        <Col xs={24} md={12}>
          <Form.Item
            name="liveInCanada"
            label="Do you currently live in Canada?"
            rules={[{ required: true, message: "Please select an option" }]}
          >
            <Radio.Group>
              <Radio value="Yes">Yes</Radio>
              <Radio value="No">No</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
};
const EducationSection: React.FC = () => {
  return (
    <div className="">
      <Form.List name="degreeCompleted">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <div
                key={key}
                className="mb-4 md:mb-6 p-3 md:p-4 bg-gray-50 rounded-md"
              >
                <Row gutter={[16, 8]} align="middle">
                  <Col xs={20} sm={22}>
                    <Row gutter={[16, 8]}>
                      <Col xs={24} md={12}>
                        <Form.Item
                          {...restField}
                          name={[name, "degreeName"]}
                          label="Degree/Diploma Name"
                          rules={[
                            {
                              required: true,
                              message: "Please enter degree name",
                            },
                          ]}
                        >
                          <Input placeholder="Enter degree/diploma name" />
                        </Form.Item>
                      </Col>
                      <Col xs={24} md={12}>
                        <Form.Item
                          {...restField}
                          name={[name, "degreeCountry"]}
                          label="Country of Study"
                          rules={[
                            { required: true, message: "Please enter country" },
                          ]}
                        >
                          <Input placeholder="Enter country" />
                        </Form.Item>
                      </Col>
                      <Col xs={24} md={12}>
                        <Form.Item
                          {...restField}
                          name={[name, "degreeUniversity"]}
                          label="Institution/University"
                          rules={[
                            {
                              required: true,
                              message: "Please enter institution name",
                            },
                          ]}
                        >
                          <Input placeholder="Enter institution name" />
                        </Form.Item>
                      </Col>
                      <Col xs={12}>
                        <Form.Item
                          {...restField}
                          name={[name, "degreeYear"]}
                          label="Year of Completion"
                          rules={[
                            { required: true, message: "Please enter year" },
                          ]}
                        >
                          <Input placeholder="e.g. 2020" />
                        </Form.Item>
                      </Col>
                      <Col xs={24}>
                        <Form.Item
                          {...restField}
                          name={[name, "degreeStatus"]}
                          label="Status"
                          rules={[
                            { required: true, message: "Please select status" },
                          ]}
                        >
                          <Select placeholder="Status">
                            <Option value="Completed">Completed</Option>
                            <Option value="In Progress">In Progress</Option>
                            <Option value="Incomplete">Incomplete</Option>
                            <Option value="On Hold">On Hold</Option>
                          </Select>
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>
                  <Col
                    xs={4}
                    sm={2}
                    className="flex justify-center items-center"
                  >
                    <Button
                      type="text"
                      danger
                      icon={<MinusCircleOutlined />}
                      onClick={() => remove(name)}
                      className=" md:mt-0"
                    />
                  </Col>
                </Row>
              </div>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                icon={<PlusOutlined />}
                block
                className="mt-2"
              >
                Add Education
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </div>
  );
};

const WorkExperienceSection: React.FC = () => {
  return (
    <div className="">
      <Form.List name="work">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <div
                key={key}
                className="mb-4 md:mb-6 p-3 md:p-4 bg-gray-50 rounded-md"
              >
                <Row gutter={[16, 8]} align="middle">
                  <Col xs={20} sm={22}>
                    <Row gutter={[16, 8]}>
                      <Col xs={24} md={12}>
                        <Form.Item
                          {...restField}
                          name={[name, "jobTitle"]}
                          label="Job Title"
                          rules={[
                            {
                              required: true,
                              message: "Please enter job title",
                            },
                          ]}
                        >
                          <Input placeholder="Enter job title" />
                        </Form.Item>
                      </Col>
                      <Col xs={12} md={12}>
                        <Form.Item
                          {...restField}
                          name={[name, "yearsOfExperience"]}
                          label="Years of Experience"
                          rules={[
                            {
                              required: true,
                              message: "Please enter years of experience",
                            },
                          ]}
                        >
                          <InputNumber
                            min={0}
                            max={50}
                            style={{ width: "100%" }}
                            placeholder="Years"
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24}>
                        <Form.Item
                          {...restField}
                          name={[name, "country"]}
                          label="Country"
                          rules={[
                            { required: true, message: "Please enter country" },
                          ]}
                        >
                          <Input placeholder="Country" />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>
                  <Col
                    xs={4}
                    sm={2}
                    className="flex justify-center items-center"
                  >
                    <Button
                      type="text"
                      danger
                      icon={<MinusCircleOutlined />}
                      onClick={() => remove(name)}
                      className=" md:mt-0"
                    />
                  </Col>
                </Row>
              </div>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                icon={<PlusOutlined />}
                block
                className="mt-2"
              >
                Add Work Experience
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </div>
  );
};

const ImmigrationSection: React.FC = () => {
  const screens = useBreakpoint();
  return (
    <div className="">
      <Row gutter={[16, 8]}>
        <Col span={24}>
          <Form.Item
            name="doneLanguageTest"
            label="Did you take language test?"
            rules={[{ required: true, message: "Please select an option" }]}
            className="mb-2 md:mb-4"
          >
            <Radio.Group
              className={screens.xs ? "flex flex-col space-y-1" : ""}
            >
              <Radio value="Yes">Yes</Radio>
              <Radio value="No">No</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item
            name="hasFamilyInCanada"
            label="Do you have family members in Canada?"
            rules={[{ required: true, message: "Please select an option" }]}
            className="mb-2 md:mb-4"
          >
            <Radio.Group
              className={screens.xs ? "flex flex-col space-y-1" : ""}
            >
              <Radio value="Yes">Yes</Radio>
              <Radio value="No">No</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item
            name="hasJobOffer"
            label="Do you have a job offer in Canada?"
            rules={[{ required: true, message: "Please select an option" }]}
            className="mb-2 md:mb-4"
          >
            <Radio.Group
              className={screens.xs ? "flex flex-col space-y-1" : ""}
            >
              <Radio value="Yes">Yes</Radio>
              <Radio value="No">No</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
};

const CommentsSection: React.FC = () => (
  <div className="">
    <Row gutter={[16, 8]}>
      <Col span={24}>
        <Form.Item name="comment" label="Messages">
          <TextArea
            rows={4}
            placeholder="Please provide any additional information or questions"
            className="resize-none"
          />
        </Form.Item>
      </Col>
    </Row>
  </div>
);

// Main Application Form Component
const ImmigrationFormModal: React.FC<ModalProps> = ({
  isModalOpen,
  setIsModalOpen,
}) => {
  const [form] = Form.useForm<FormValues>();
  const { post } = useApiClient();
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<FormValues>({});
  const [messageApi, contextHolder] = message.useMessage();

  // Reset the form when modal is closed
  useEffect(() => {
    if (!isModalOpen) {
      form.resetFields();
    }
  }, [isModalOpen, form]);

  // Handle form field changes
  const handleValuesChange = (
    changedValues: Partial<FormValues>,
    allValues: FormValues
  ) => {
    setFormValues(allValues);
  };

  if (isModalOpen)
    logEvent("click", {
      event_category: "immigration_modal",
      event_label: "CTA clicked",
    });

  const handleSubmit = async () => {
    logEvent("submit", {
      event_category: "immigration_modal",
      event_label: "Form submitted",
    });
    try {
      const formValues = await form.validateFields();

      const mappedData = {
        firstName: formValues.firstName || "",
        lastName: formValues.lastName || "",
        email: formValues.email || "",
        mobile: formValues.mobile || "",
        maritalStatus: formValues.maritalStatus || "",
        dob: formValues.dob?.format("YYYY-MM-DD") || "",
        liveInCanada: formValues.liveInCanada === "Yes",
        degreeCompleted: formValues.degreeCompleted || [],
        work: formValues.work || [],
        country: formValues.country || "",
        doneLanguageTest: formValues.doneLanguageTest === "Yes",
        hasFamilyInCanada: formValues.hasFamilyInCanada === "Yes",
        hasJobOffer: formValues.hasJobOffer === "Yes",
        comment: formValues.comment || "",
        formType: "immigration",
      };

      setSubmitting(true);
      await post("/api/Form/immigration-interest", mappedData, undefined, true);

      messageApi.success("Form submitted successfully!");
      setIsModalOpen(false);
    } catch (error) {
      messageApi.error("Failed to submit form. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleModalClose = () => setIsModalOpen(false);

  return (
    <>
      {contextHolder}
      <Modal
        title="Immigration Interest Form"
        open={isModalOpen}
        onCancel={handleModalClose}
        width={800}
        keyboard={!submitting}
        maskClosable={!submitting}
        closable={!submitting}
        footer={[
          <Button key="back" onClick={handleModalClose} disabled={submitting}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            className="!mr-10 !mb-8"
            onClick={handleSubmit}
            loading={submitting}
          >
            Submit
          </Button>,
        ]}
      >
        <Flex gap="middle" vertical>
          <Spin size="large" tip="Submitting..." spinning={submitting}>
            <Form
              form={form}
              layout="vertical"
              className="!px-10"
              onValuesChange={handleValuesChange}
              initialValues={{
                liveInCanada: undefined,
                doneLanguageTest: undefined,
                hasFamilyInCanada: undefined,
                hasJobOffer: undefined,
                degreeCompleted: [],
                work: [],
              }}
            >
              <PersonalInfoSection />
              <EducationSection />
              <WorkExperienceSection />
              <ImmigrationSection />
              <CommentsSection />
            </Form>
          </Spin>
        </Flex>
      </Modal>
    </>
  );
};

export default ImmigrationFormModal;

