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
} from "antd";
import moment from "moment";
import { useApiClient } from "@/hooks/api-hook";
import { logEvent } from "@/utils/analytics";

const { TextArea } = Input;
const { Option } = Select;
const { Title } = Typography;

// Type definitions
type MaritalStatusType =
  | "Single"
  | "Married"
  | "Single with kid(s)"
  | "Married with kid(s)";
type YesNoType = "Yes" | "No";
type YesNoNAType = "Yes" | "No" | "N/A";
type ProvinceType =
  | "Ontario"
  | "Alberta"
  | "New Brunswick"
  | "Nova Scotia"
  | "Newfoundland & Labrador"
  | "PEI"
  | "British Columbia"
  | "Still in Nigeria or another country"
  | "Other";

type FormValues = {
  fullName?: string;
  email?: string;
  phoneNumber?: string;
  isCanadianResident?: YesNoType;
  interestedInGrant?: YesNoType;
  maritalStatus?: MaritalStatusType;
  spouseInterested?: YesNoNAType;
  spouseFullName?: string;
  spouseEmail?: string;
  spousePhoneNumber?: string;
  isInCanada?: YesNoType;
  province?: ProvinceType;
  arrivalDate?: moment.Moment;
  interestedInCourse?: YesNoType;
  selectedCourses?: string[];
  comments?: string;
};

type ModalProps = {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

type SpouseSectionProps = {
  shouldShow: boolean;
};

type CourseSectionProps = {
  shouldShow: boolean;
  province?: ProvinceType;
};

// Constants for course options by province
const COURSE_OPTIONS: Record<string, string[]> = {
  ONTARIO: [
    "Accounting and Payroll Administrator",
    "Addictions & Community Services Worker",
    "Administrative Assistant",
    "Artificial Intelligence",
    "Business Administration",
    "Business Accounting Technician",
    "Business Service Essentials Co-op",
    "Business Administrative Professional",
    "Business and Digital Marketing Management",
    "Banking and Financial Services",
    "Business System Analysis & Project Management",
    "Big Data Analytics",
    "Conference and Event Planner",
    "Community Service Worker ( Instructor Led)",
    "Child and Youth Services Worker",
    "Computer Support Technician",
    "Cybersecurity Specialist",
    "Dental Administrative Assistant",
    "Dental Office Administration",
    "Dental Assisting",
    "Early Childcare Assistant (Instructor Led)",
    "Early Learning and Child Care Certificate",
    "Early Learning and Child Care Diploma",
    "Education Assistant",
    "Event Specialist",
    "Graphic Design Technology",
    "Graphics & Web Design/Development",
    "Hospitality Business Management",
    "Home Inspection",
    "Human Resources Administration",
    "Human Resources and Payroll Coordinator",
    "Human Resources Management",
    "Immigration Administrative Assistant ( Instructor Led )",
    "Logistics and Supply Chain Management ( Instructor Led )",
    "Marketing Coordinator",
    "Medical Office Assistant ( Instructor Led )",
    "Mobile Applications Development",
    "Marketing - Digital Engagement Strategy",
    "Medical Office Administrator",
    "Network Administration",
    "Network Systems Management",
    "Network Technician",
    "Legal Office Administrator",
    "Project Administration",
    "PC Support Specialist",
    "Paralegal (In-Person in Toronto)",
    "Personal Support Worker (Instructor Led)",
    "Pharmacy Assistant",
    "Payroll Administrator",
    "Software and Web Developer",
    "Social Media Specialist",
    "Social Media and Web Marketing",
    "Travel and Tourism",
    "Web Developer",
    "Web Designer",
    "Web and Mobile Applications Development",
    "Web Design and Analysis",
    "Veterinary Health Care Assistant",
    "Oil and Gas Administration",
    "Logistics and Supply Chain Management",
  ],
  ALBERTA_NB_NS_NFL_PEI: [
    "Accounting & Payroll Administration",
    "Addictions & Community Service Worker",
    "Administrative Assistant",
    "Business Administration",
    "Digital Marketing",
    "Education Assistant",
    "Graphic Design",
    "Health Care Aide",
    "Help Desk Analyst",
    "Legal Assistant",
    "Massage Therapy",
    "Massage Therapy (Advance)",
    "Medical Office Assistant & Unit Clerk",
    "Mobile Application Developer",
    "Network Administrator",
    "Pharmacy Assistant",
    "Web Design & Development",
    "Cyber Security",
    "Software Development",
    "Dental Office Administration",
  ],
  BRITISH_COLUMBIA: [
    "Accounting and Payroll Administrator",
    "Addictions and Community Service Worker",
    "Anatomy and Physiology Essentials- 3 Weeks (FT)",
    "Anatomy and Physiology Essentials - 5 Weeks (PT)",
    "Business and Digital Marketing Management",
    "Computer Aided Design and Drafting",
    "Computer Support Technician",
    "Cybersecurity Technician",
    "Data Analytics",
    "Data Analytics with Capstone",
    "Dental Assisting",
    "Dental Clinical Assistant",
    "Dental Chairside Assisting with Radiography",
    "Dental Reception (Certificate)",
    "Dental Reception with Radiography",
    "Dental Radiology",
    "Dental Receptionist",
    "Dental Office Administration - Radiology Specialization",
    "Education Assistant",
    "Early Childhood Education",
    "Early Childhood Education (Diploma)",
    "Early Childhood Education Infant - Toddler",
    "Early Childhood Education Post Basic",
    "Early Childhood Education Post Basic - Infant/Toddler (PT)",
    "Early Childhood Education Post Basic - Infant/Toddler (FT)",
    "Early Childhood Education Post Basic - Special Needs (PT)",
    "Early Childhood Education Post Basic Special Needs ( FT)",
    "Early Childhood Education Special Needs Educator",
    "English Essential",
    "English for Academic Purposes Advanced",
    "English for Academic Purposes Intermediate to High - Intermediate",
    "Foundations of Mathematics",
    "Global Supply Chain Management and International Trade",
    "Graphic Design Technology",
    "Health Care Assistant",
    "Hospitality Certificate of Specialization (certificate)",
    "Hospitality Management",
    "Human Anatomy and Physiology for Practical Nurses",
    "Human Resources and Payroll Coordinator",
    "Immigration Assistant",
    "Introduction to Massage Workshop",
    "IOD2 - Expanded Training in Orthodontics",
    "Law Enforcement Foundations",
    "Legal Administrative Assistant",
    "Logistics and Chain Supply Management",
    "Math Applications",
    "Medical Laboratory Assistant",
    "Medical Office Assistant",
    "Medical-Pharmacy Assistant",
    "Mobile Application Development",
    "Network Systems Administrator",
    "Network Systems Engineer",
    "Office Administration",
    "Paralegal",
    "Payroll & Income Tax Practitioner",
    "Pharmacy Assistant",
    "Pharmacy Assistant with Capstone",
    "Practical Nursing",
    "Professional Counsellor",
    "Rehabilitation Therapy Assistant",
    "Registered Massage Therapy",
    "Social Media Marketing",
    "Social Media and Web Marketing",
    "Social Service Worker - Foundations",
    "Social Services: Recovery Worker",
    "Social Services: Youth Worker",
    "Social Services Worker: Professional User Interface (UI) and User Experience (UX) Design",
    "Veterinary Health Care Assistant",
    "Warehouse and Distribution Management",
    "Web and Mobile Application Development",
    "Business and Digital Marketing Management with Co-op",
    "Hospitality Management with Co-op",
    "Business and Hospitality Essentials with Co-op",
  ],
};

// Custom validator for Canadian phone number
const validateCanadianPhoneNumber = (_: any, value: string): Promise<void> => {
  const canadianPhoneRegex =
    /^(\+?1[-.\s]?)?\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})$/;
  if (!value || canadianPhoneRegex.test(value)) {
    return Promise.resolve();
  }
  return Promise.reject("Please enter a valid Canadian phone number");
};

// Helper function to get proper course options based on province
const getCourseOptions = (province?: ProvinceType): string[] => {
  if (province === "Ontario") {
    return COURSE_OPTIONS.ONTARIO;
  } else if (
    [
      "Alberta",
      "New Brunswick",
      "Nova Scotia",
      "Newfoundland & Labrador",
      "PEI",
    ].includes(province || "")
  ) {
    return COURSE_OPTIONS.ALBERTA_NB_NS_NFL_PEI;
  } else if (province === "British Columbia") {
    return COURSE_OPTIONS.BRITISH_COLUMBIA;
  }
  return [];
};

// Form section components
const PersonalInfoSection: React.FC = () => (
  <div className="py-5">
    <Title className="!font-poppins" level={5}>
      Personal Information
    </Title>
    <Row gutter={24}>
      <Col span={24}>
        <Form.Item
          name="fullName"
          label="Full Name"
          rules={[{ required: true, message: "Please enter your full name" }]}
        >
          <Input
            className="h-9 !font-poppins border !border-[#CBCBCB]"
            placeholder="Enter your full name"
          />
        </Form.Item>
      </Col>

      <Col span={12}>
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

      <Col span={12}>
        <Form.Item
          name="phoneNumber"
          label="Mobile Number"
          rules={[
            { required: true, message: "Please enter your mobile number" },
            { validator: validateCanadianPhoneNumber },
          ]}
        >
          <Input
            className="h-9 !font-poppins border !border-[#CBCBCB]"
            placeholder="Enter your Canadian mobile number"
          />
        </Form.Item>
      </Col>
    </Row>
  </div>
);

const ResidencySection: React.FC = () => (
  <div className=" ">
    <Title className="!font-poppins" level={5}>
      Residency Information
    </Title>
    <Row gutter={24}>
      <Col span={24}>
        <Form.Item
          name="isCanadianResident"
          label="ARE YOU A CANADIAN PERMANENT RESIDENT (PR or COPR) or CITIZEN?"
          rules={[
            { required: true, message: "Please select your residency status" },
          ]}
        >
          <Radio.Group>
            <Radio value="Yes">Yes</Radio>
            <Radio value="No">No</Radio>
          </Radio.Group>
        </Form.Item>
      </Col>

      <Col span={24}>
        <Form.Item
          name="interestedInGrant"
          label="Are you interested in accessing the grant and loan?"
          rules={[{ required: true, message: "Please select an option" }]}
        >
          <Radio.Group>
            <Radio value="Yes">Yes</Radio>
            <Radio value="No">No</Radio>
          </Radio.Group>
        </Form.Item>
      </Col>

      <Col span={24}>
        <Form.Item
          name="maritalStatus"
          label="Are you Married or Single? Do you have kids?"
          rules={[
            { required: true, message: "Please select your marital status" },
          ]}
        >
          <Radio.Group>
            <Radio value="Single">Single</Radio>
            <Radio value="Married">Married</Radio>
            <Radio value="Single with kid(s)">Single with kid(s)</Radio>
            <Radio value="Married with kid(s)">Married with kid(s)</Radio>
          </Radio.Group>
        </Form.Item>
      </Col>
    </Row>
  </div>
);

const SpouseSection: React.FC<SpouseSectionProps> = ({ shouldShow }) => {
  if (!shouldShow) return null;

  return (
    <div className=" ">
      <Title className="!font-poppins" level={5}>
        Spouse Information
      </Title>
      <Row gutter={24}>
        <Col span={24}>
          <Form.Item
            name="spouseInterested"
            label="Your spouse may also be eligible for funding. Is your spouse interested?"
            rules={[{ required: true, message: "Please select an option" }]}
          >
            <Radio.Group>
              <Radio value="Yes">Yes</Radio>
              <Radio value="No">No</Radio>
              <Radio value="N/A">N/A</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item
            name="spouseFullName"
            label="Spouse Full Name"
            rules={[
              {
                required: true,
                message: "Please enter your spouse's full name",
              },
            ]}
          >
            <Input
              className="h-9 !font-poppins border !border-[#CBCBCB]"
              placeholder="Enter your spouse's full name"
            />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="spouseEmail"
            label="Spouse Email Address"
            rules={[
              { required: true, message: "Please enter your spouse's email" },
              { type: "email", message: "Please enter a valid email address" },
            ]}
          >
            <Input
              className="h-9 !font-poppins border !border-[#CBCBCB]"
              placeholder="Enter your spouse's email address"
            />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="spousePhoneNumber"
            label="Spouse Phone Number"
            rules={[
              {
                required: true,
                message: "Please enter your spouse's phone number",
              },
              { validator: validateCanadianPhoneNumber },
            ]}
          >
            <Input
              className="h-9 !font-poppins border !border-[#CBCBCB]"
              placeholder="Enter your spouse's Canadian phone number"
            />
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
};

const LocationSection: React.FC = () => (
  <div className=" ">
    <Title className="!font-poppins" level={5}>
      Location Information
    </Title>
    <Row gutter={24}>
      <Col span={24}>
        <Form.Item
          name="isInCanada"
          label="Are you currently in Canada?"
          rules={[{ required: true, message: "Please select an option" }]}
        >
          <Radio.Group>
            <Radio value="Yes">Yes</Radio>
            <Radio value="No">No</Radio>
          </Radio.Group>
        </Form.Item>
      </Col>

      <Col span={24}>
        <Form.Item
          name="province"
          label="Which Province do you reside in?"
          rules={[{ required: true, message: "Please select a province" }]}
        >
          <Select placeholder="Select a province">
            <Option value="Ontario">Ontario</Option>
            <Option value="Alberta">Alberta</Option>
            <Option value="New Brunswick">New Brunswick</Option>
            <Option value="Nova Scotia">Nova Scotia</Option>
            <Option value="Newfoundland & Labrador">
              Newfoundland & Labrador
            </Option>
            <Option value="PEI">PEI</Option>
            <Option value="British Columbia">British Columbia</Option>
            <Option value="Still in Nigeria or another country">
              Still in Nigeria or another country
            </Option>
            <Option value="Other">Other</Option>
          </Select>
        </Form.Item>
      </Col>

      <Col span={24}>
        <Form.Item
          name="arrivalDate"
          label="When did you (or will you) arrive in Canada?"
          rules={[{ required: true, message: "Please select a date" }]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
      </Col>
    </Row>
  </div>
);

const CourseSection: React.FC<CourseSectionProps> = ({
  shouldShow,
  province,
}) => {
  const courseOptions = getCourseOptions(province);

  return (
    <div className=" ">
      <Title className="!font-poppins" level={5}>
        Course Information
      </Title>
      <Row gutter={24}>
        <Col span={24}>
          <Form.Item
            name="interestedInCourse"
            label="Are you interested in taking up a course?"
            rules={[{ required: true, message: "Please select an option" }]}
          >
            <Radio.Group>
              <Radio value="Yes">Yes</Radio>
              <Radio value="No">No</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>

        {shouldShow && (
          <Col span={24}>
            <Form.Item
              name="selectedCourses"
              label="Which of these courses are you interested in taking?"
              rules={[
                {
                  required: true,
                  message: "Please select at least one course",
                },
              ]}
            >
              <Select
                mode="multiple"
                placeholder="Select courses you're interested in"
                style={{ width: "100%" }}
                optionFilterProp="children"
              >
                {courseOptions.map((course) => (
                  <Option key={course} value={course}>
                    {course}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        )}
      </Row>
    </div>
  );
};

const CommentsSection: React.FC = () => (
  <div className=" ">
    <Title className="!font-poppins" level={5}>
      Additional Messages
    </Title>
    <Row gutter={24}>
      <Col span={24}>
        <Form.Item name="comments" label="Messages">
          <TextArea
            rows={4}
            placeholder="Please provide any additional messages or questions"
          />
        </Form.Item>
      </Col>
    </Row>
  </div>
);

// Main Application Form Component
const ApplicationFormModal: React.FC<ModalProps> = ({
  isModalOpen,
  setIsModalOpen,
}) => {
  const [form] = Form.useForm<FormValues>();
  const { post } = useApiClient();
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<FormValues>({});
  const [messageApi, contextHolder] = message.useMessage();

  // Watch for changes in specific form fields to control conditional rendering
  const maritalStatus = Form.useWatch("maritalStatus", form);
  const isMarried =
    maritalStatus === "Married" || maritalStatus === "Married with kid(s)";

  const interestedInCourse = Form.useWatch("interestedInCourse", form);
  const showCourseSelection = interestedInCourse === "Yes";

  const province = Form.useWatch("province", form);

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

    // Reset spouse fields if marital status changes to non-married
    if ("maritalStatus" in changedValues) {
      const isNowMarried =
        changedValues.maritalStatus === "Married" ||
        changedValues.maritalStatus === "Married with kid(s)";

      if (!isNowMarried) {
        form.setFieldsValue({
          spouseInterested: undefined,
          spouseFullName: undefined,
          spouseEmail: undefined,
          spousePhoneNumber: undefined,
        });
      }
    }

    // Reset course selection if "interested in course" changes to No
    if (
      "interestedInCourse" in changedValues &&
      changedValues.interestedInCourse === "No"
    ) {
      form.setFieldsValue({
        selectedCourses: undefined,
      });
    }

    // Reset course selection if province changes
    if ("province" in changedValues) {
      form.setFieldsValue({
        selectedCourses: undefined,
      });
    }
  };

  if (isModalOpen) {
    logEvent("click", {
      event_category: "application_modal",
      event_label: "CTA clicked",
    });
  }

  const handleSubmit = async () => {
    logEvent("submit", {
      event_category: "application_modal",
      event_label: "Form submitted",
    });
    try {
      const formValues = await form.validateFields();

      // Map values to API endpoint structure
      const mappedData = {
        interestId: Date.now().toString(), // Convert to string
        firstName: formValues.fullName?.split(" ")[0] || "",
        lastName: formValues.fullName?.split(" ").slice(1).join(" ") || "",
        email: formValues.email || "",
        mobile: formValues.phoneNumber || "",
        isCitizen: formValues.isCanadianResident === "Yes",
        hasGrantLoanInterest: formValues.interestedInGrant === "Yes",
        maritalStatus: formValues.maritalStatus || "",
        isSpouseInterestInFunding: formValues.spouseInterested || "",
        spouseName: formValues.spouseFullName || "",
        spouseEmail: formValues.spouseEmail || "",
        spouseMobile: formValues.spousePhoneNumber || "",
        liveInCanada: formValues.isInCanada === "Yes",
        province: formValues.province || "",
        dateOfArrival: formValues.arrivalDate?.toISOString() || "",
        isTakingACourse: formValues.interestedInCourse === "Yes",
        courses: formValues.selectedCourses || [],
        preferredStartDate: "", // Not in form
        studyLevel: "", // Not in form
        comment: formValues.comments || "", // Map comments field
      };

      setSubmitting(true);
      await post("/api/form/study-interest", mappedData, undefined, true);

      messageApi.success("Form submitted successfully!");
      setIsModalOpen(false);
    } finally {
      setSubmitting(false);
    }
  };

  const handleModalClose = () => setIsModalOpen(false);

  return (
    <>
      {contextHolder}
      <Modal
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
                isCanadianResident: undefined,
                interestedInGrant: undefined,
                maritalStatus: undefined,
                isInCanada: undefined,
                province: undefined,
                interestedInCourse: undefined,
              }}
            >
              <PersonalInfoSection />
              <ResidencySection />
              <SpouseSection shouldShow={isMarried} />
              <LocationSection />
              <CourseSection
                shouldShow={showCourseSelection}
                province={province}
              />
              <CommentsSection />
            </Form>
          </Spin>
        </Flex>
      </Modal>
    </>
  );
};

export default ApplicationFormModal;

