import { GetProp, UploadProps } from "antd";
import { Control, FieldErrors } from "react-hook-form";

export type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

export type PersonalInfo = {
  avatar?: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
};

export type Experience = {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
};

export type Education = {
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
  description: string;
};

export type Skill = { name: string };

export type ResumeData = {
  personalInfo: PersonalInfo;
  summary: string;
  skills: Skill[];
  experience: Experience[];
  education: Education[];
};

export type CvStepProps = {
  control: Control<ResumeData, unknown>;
  errors: FieldErrors<ResumeData>;
};

export type ResumeLocationType = {
  address?: string;
  postalCode?: string;
  city?: string;
  countryCode?: string;
  region?: string;
};

export type ResumeProfileType = {
  network?: string;
  username?: string;
  url?: string;
};

export type ResumeBasicsType = {
  name: string;
  email: string;
  phone: string;
  summary: string;
  url?: string;
  label?: string;
  image?: string;
  location?: ResumeLocationType;
  profiles?: ResumeProfileType[];
};

export type ResumeWorkType = {
  id: string;
  name: string;
  position: string;
  url?: string;
  startDate?: Date | string;
  endDate?: Date | string;
  summary?: string;
  highlights: string[];
};

export type ResumeVolunteerType = {
  organization: string;
  position: string;
  url?: string;
  startDate: string;
  endDate: string;
  summary?: string;
  highlights: string[];
};

export type ResumeEducationType = {
  institution: string;
  url?: string;
  area: string;
  studyType: string;
  startDate: string;
  endDate: string;
  score?: string;
  courses?: string[];
};

export type ResumeAwardType = {
  title: string;
  date: string;
  awarder: string;
  summary?: string;
};

export type ResumeCertificateType = {
  name: string;
  date: string;
  issuer: string;
  url?: string;
};

export type ResumePublicationType = {
  name: string;
  publisher: string;
  releaseDate: string;
  url?: string;
  summary?: string;
};

export type ResumeSkillType = {
  name: string;
  level?: string;
  keywords: string[];
};

export type ResumeLanguageType = {
  language: string;
  fluency: string;
};

export type ResumeInterestType = {
  name: string;
  keywords: string[];
};

export type ResumeReferenceType = {
  name: string;
  reference: string;
};

export type ResumeProjectType = {
  name: string;
  startDate: string;
  endDate: string;
  description?: string;
  highlights: string[];
  url?: string;
};

export type ResumeType = {
  id: string;
  templateId: number;
  basics: ResumeBasicsType;
  work: ResumeWorkType[];
  education: ResumeEducationType[];
  skills: ResumeSkillType[];
  volunteer?: ResumeVolunteerType[];
  awards?: ResumeAwardType[];
  certificates?: ResumeCertificateType[];
  publications?: ResumePublicationType[];
  languages?: ResumeLanguageType[];
  interests?: ResumeInterestType[];
  references?: ResumeReferenceType[];
  projects?: ResumeProjectType[];
};
