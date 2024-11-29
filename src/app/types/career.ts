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

export type FormValues = {
  personalInfo: PersonalInfo;
  summary: string;
  skills: Skill[];
  experience: Experience[];
  education: Education[];
};

export type CvStepProps = {
  control: Control<FormValues, unknown>;
  errors: FieldErrors<FormValues>;
};
