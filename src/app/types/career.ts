import { GetProp, UploadProps } from "antd";

export type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

export type ResumeLocationType = {
  address?: string;
  postalCode?: string;
  city?: string;
  countryCode?: string;
  region?: string;
};

export type ResumeProfileType = {
  id?: string;
  network?: string;
  username?: string;
  url?: string;
};

export type ResumeBasicsType = {
  id: string;
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
  id?: string;
  name?: string;
  position?: string;
  url?: string;
  startDate?: Date | string;
  endDate?: Date | string;
  summary?: string;
  highlights?: string[];
};

export type ResumeVolunteerType = {
  id?: string;
  organization: string;
  position: string;
  url?: string;
  startDate: string;
  endDate: string;
  summary?: string;
  highlights: string[];
};

export type ResumeEducationType = {
  id?: string;
  institution: string;
  url?: string;
  area: string;
  studyType: string;
  startDate: Date | string;
  endDate?: Date | string;
  score?: string;
  courses?: string[];
};

export type ResumeAwardType = {
  id?: string;
  title: string;
  date: string;
  awarder: string;
  summary?: string;
};

export type ResumeCertificateType = {
  id?: string;
  name: string;
  date: string;
  issuer: string;
  url?: string;
};

export type ResumePublicationType = {
  id?: string;
  name: string;
  publisher: string;
  releaseDate: string;
  url?: string;
  summary?: string;
};

export type ResumeSkillType = {
  id?: string;
  name: string;
  level?: string;
  keywords: string[];
};

export type ResumeLanguageType = {
  id?: string;
  language: string;
  fluency: string;
};

export type ResumeInterestType = {
  id?: string;
  name: string;
  keywords: string[];
};

export type ResumeReferenceType = {
  id?: string;
  name: string;
  reference: string;
  email: string;
};

export type ResumeProjectType = {
  id?: string;
  name: string;
  startDate: string;
  endDate: string;
  description?: string;
  highlights: string[];
  url?: string;
};

export type ResumeType = {
  id?: string;
  templateId: number;
  basics?: ResumeBasicsType;
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
