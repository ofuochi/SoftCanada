import { ResumeType } from "@/app/types/career";
import StandardTemplate from "../templates/StandardTemplate";
import ModernTemplate from "../templates/ModernTemplate";
import CreativeTemplate from "../templates/CreativeTemplate";
import ElegantTemplate from "../templates/ElegantTemplate";
import ClassicTemplate from "../templates/ClassicTemplate";
import VisionTemplate from "../templates/VisionTemplate";

type Props = {
  data: ResumeType;
};

export const ResumeTemplate: React.FC<Props> = ({ data }) => {
  const templates: { [key: string]: JSX.Element } = {
    "0": <StandardTemplate data={data} />,
    "1": <ModernTemplate data={data} />,
    "2": <CreativeTemplate data={data} />,
    "3": <ElegantTemplate data={data} />,
    "4": <ClassicTemplate data={data} />,
    "5": <VisionTemplate data={data} />,
  };
  return templates[data.templateId];
};
