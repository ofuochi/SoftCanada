import { ResumeData } from "@/app/types/career";
import renderTheme from "jsonresume-theme-elegant";

const elegantRenderFunction = (data: ResumeData) => renderTheme(data);

const classicRenderFunction = (data: ResumeData) => `
  <div>
    <h1>${data.personalInfo.fullName}</h1>
    <h2>${data.personalInfo.email}</h2>
    <h2>${data.personalInfo.phone}</h2>
    <h2>${data.personalInfo.address}</h2>
    <h2>${data.summary}</h2>
  </div>
`;

const modernRenderFunction = (data: ResumeData) => `
  <div>
    <h1>${data.personalInfo.fullName}</h1>
    <h2>${data.personalInfo.email}</h2>
    <h2>${data.personalInfo.phone}</h2>
    <h2>${data.personalInfo.address}</h2>
    <h2>${data.summary}</h2>
  </div>
`;

const creativeRenderFunction = (data: ResumeData) => `
  <div>
    <h1>${data.personalInfo.fullName}</h1>
    <h2>${data.personalInfo.email}</h2>
    <h2>${data.personalInfo.phone}</h2>
    <h2>${data.personalInfo.address}</h2>
    <h2>${data.summary}</h2>
  </div>
`;

type Template = {
  name: string;
  render: (data: ResumeData) => string;
};

const templates: Record<string, Template> = {
  elegant: { name: "Elegant", render: elegantRenderFunction },
  classic: { name: "Classic", render: classicRenderFunction },
  modern: { name: "Modern", render: modernRenderFunction },
  creative: { name: "Creative", render: creativeRenderFunction },
};

type Props = {
  templateId: string;
  data: ResumeData;
};

const ResumePreview: React.FC<Props> = ({ templateId, data }) => {
  if (!templateId) return <div>Please select a template</div>;

  const template = templates[templateId];
  if (!template) return <div>Template not found</div>;

  const html = template.render(data);

  return (
    <div className="p-6 bg-white overflow-auto w-full h-full">
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
};

export default ResumePreview;
