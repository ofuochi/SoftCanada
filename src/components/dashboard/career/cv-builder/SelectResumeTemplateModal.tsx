import { Card, Modal, Row, Col } from "antd";
import React from "react";
import { ResumeTemplate } from "./ResumeTemplate";
import { ResumeType } from "@/app/types/career";
import {
  emptyResumeData,
  sampleResumeDataMin,
} from "@/constants/sample-resume-data";

type Props = {
  open?: boolean;
  onCancel: () => void;
  onResumeSelected: (resume: ResumeType) => void;
};

const SelectResumeTemplateModal: React.FC<Props> = ({
  open,
  onCancel,
  onResumeSelected,
}) => {
  return (
    <Modal
      title="Select Resume Template"
      centered
      open={open}
      onCancel={onCancel}
      footer={null}
      width={850}
    >
      <div className="pt-5">
        <Row gutter={[16, 16]} justify="start">
          {Array.from({ length: 5 }, (_, i) => (
            <Col key={i} xs={24} sm={12} md={8} lg={8}>
              <Card
                bordered={true}
                size="small"
                hoverable
                onClick={() =>
                  onResumeSelected({
                    ...emptyResumeData,
                    templateId: i,
                  })
                }
              >
                <div className="overflow-hidden h-80 pointer-events-none">
                  <div className="miniature-wrapper">
                    <ResumeTemplate
                      data={{ ...sampleResumeDataMin, templateId: i }}
                    />
                  </div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </Modal>
  );
};

export default SelectResumeTemplateModal;
