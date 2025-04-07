import { Form, message, UploadFile } from "antd";
import { UploadChangeParam } from "antd/es/upload";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useApiClient } from "@/hooks/api-hook";
import { useDashboard } from "@/contexts/DashboardContext";
import { FileType, getBase64 } from "./fileUtils";

export type Expertise = {
  areaOfExpertise: string;
  yearsOfExperience: string;
};

export type AdvisorApplicationFormData = {
  title: string;
  phoneNumber: string;
  name: string;
  expertise: Expertise[];
  qualifications: string;
  image: File;
  motivationStatement?: string;
};

const convertAdvisorType = (advisorType: string): string | null => {
  const advisorMap: { [key: string]: string } = {
    finance_advisor: "Finance",
    career_advisor: "Career",
    immigration_advisor: "Immigration",
    study_advisor: "Study",
  };

  return advisorMap[advisorType] || null;
};

// Define validation rules
export const getValidationRules = () => ({
  name: [
    {
      required: true,
      message: "Please input your full name",
    },
  ],
  phoneNumber: [
    {
      required: true,
      message: "Please input your contact number",
    },
    {
      pattern:
        /^(\+1\s?)?(\([0-9]{3}\)|[0-9]{3})[\s\-]?[0-9]{3}[\s\-]?[0-9]{4}$/,
      message: "Please enter a valid US or Canadian phone number",
    },
  ],
  title: [
    {
      required: true,
      message: "Please input your title",
    },
  ],
  qualifications: [
    {
      required: true,
      message: "Please input your qualifications",
    },
  ],
  image: [
    {
      required: true,
      message: "Please upload your cover image",
    },
  ],
  expertise: [
    {
      required: true,
      message: "Please add at least one expertise",
    },
  ],
});

export function useAdvisorApplicationForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = searchParams.get("at");
  const { advisorType, setAdvisorType } = useDashboard();
  const { post, inProgress } = useApiClient();
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm<AdvisorApplicationFormData>();
  const { getFieldsError } = form;
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);

  // Allowed image types and max size
  const allowedTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/webp",
  ];
  const maxSize = 1 * 1024 * 1024; // 1MB

  useEffect(() => {
    if (type) {
      const convertedType = convertAdvisorType(type) || "";
      setAdvisorType(convertedType);
    }
  }, [type, setAdvisorType]);

  const handleSubmit = async (values: AdvisorApplicationFormData) => {
    const formData = new FormData();

    if (values.motivationStatement !== undefined) {
      formData.append(
        "Advisor.MotivationStatement",
        values.motivationStatement.toString()
      );
    }

    formData.append("Advisor.Name", values.name.toString());
    formData.append("Advisor.Title", values.title.toString());
    formData.append("Advisor.PhoneNumber", values.phoneNumber.toString());
    formData.append("Advisor.Qualification", values.qualifications.toString());
    formData.append("Advisor.expertise", JSON.stringify(values.expertise));
    formData.append("Advisor.AdvisorType", type!.toString());
    formData.append("Image", values.image);

    console.log(formData, "formData");

    try {
      await post("/api/advisors", formData);

      // Update session with new role
      await fetch("/api/auth/update-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          role: type,
        }),
      });

      // Reset form and notify user
      resetForm();
      router.push("/dashboard");
      messageApi.success("Application submitted successfully");
    } catch (error) {
      messageApi.error(error as string);
    }
  };

  const resetForm = () => {
    form.resetFields();
    setImageUrl(undefined);
  };

  const handleImageChange = (info: UploadChangeParam<UploadFile<any>>) => {
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj as FileType, (url) => {
        setImageUrl(url);
        form.setFieldValue("image", info.file.originFileObj);
      });
    }
  };

  const handleImageRemove = () => {
    setImageUrl(undefined);
  };

  const handleBeforeUpload = (file: File) => {
    // Check file type
    if (!allowedTypes.includes(file.type)) {
      const error = `File type ${file.type} is not supported. Please upload an image (JPEG, PNG, GIF, or WEBP)`;
      messageApi.error(error);
      return false;
    }

    // Check file size
    if (file.size > maxSize) {
      const error = `File size exceeds 1MB limit. Current file size: ${(
        file.size /
        1024 /
        1024
      ).toFixed(2)}MB`;
      messageApi.error(error);
      return false;
    }

    return true;
  };

  return {
    form,
    inProgress,
    imageUrl,
    advisorType,
    contextHolder,
    validationRules: getValidationRules(),
    handleSubmit,
    handleImageChange,
    handleImageRemove,
    handleBeforeUpload,
  };
}

