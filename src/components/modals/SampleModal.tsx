import { Button, Form, Input, Modal } from "antd";
import { Dispatch, SetStateAction } from "react";

type SampleModalProps = {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

type SampleModalFormType = {
  name: string;
  occupation: string;
};

const SampleModal: React.FC<SampleModalProps> = ({
  isModalOpen,
  setIsModalOpen,
}) => {
  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  const [form] = Form.useForm<SampleModalFormType>();

  return (
    <Modal
      centered
      title="Heading"
      open={isModalOpen}
      onOk={handleModalOpen}
      onCancel={handleModalClose}
    >
      <Form
        form={form}
        name="SampleModalForm"
        autoComplete="off"
        layout="vertical"
      >
        <section className="space-y-6 w-full max-w-[500px] mx-auto p-5">
          <Form.Item<SampleModalFormType>
            label="Full name"
            name="name"
            className="w-full"
            rules={[
              {
                required: true,
                message: "Please input your full name",
              },
            ]}
          >
            <Input className="h-9 !font-poppins border !border-[#CBCBCB]" />
          </Form.Item>
          <Form.Item<SampleModalFormType>
            label="Occupation"
            name="occupation"
            className="w-full"
            rules={[
              {
                required: true,
                message: "Please input your occupation",
              },
            ]}
          >
            <Input className="h-9 !font-poppins border !border-[#CBCBCB]" />
          </Form.Item>
          <Form.Item>
            <Button className="!bg-[#010B18] !border !border-[#010B18] !w-[167px] !h-[44px] rounded-[6px] !text-white !font-poppins">
              Submit
            </Button>
          </Form.Item>
        </section>
      </Form>
    </Modal>
  );
};

export default SampleModal;

