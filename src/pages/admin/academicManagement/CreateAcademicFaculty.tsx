import { Button, Col, Flex } from "antd";
import PHForm from "../../../components/form/PHForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import PHInput from "../../../components/form/PHInput";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddAcademicFacultyMutation } from "../../../redux/features/admin/academicManagement.api";
import { TResponse } from "../../../types";
import { TAcademicFaculty } from "../../../types/academicManagement.type";

const CreateAcademicFaculty = () => {
  const [addAcademicFaculty] = useAddAcademicFacultyMutation();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating academic faculty...");

    try {
      const res = (await addAcademicFaculty(data)) as TResponse<TAcademicFaculty>;

      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Create academic semester successfully", { id: toastId, duration: 2000 });
      }
    } catch (error) {
      toast.error("something went wrong", { id: toastId });
    }
  };

  const academicFacultySchema = z.object({
    name: z.string({
      required_error: "Name is required",
    }),
  });

  return (
    <Flex
      justify="center"
      align="center"
    >
      <Col span={6}>
        <PHForm
          onSubmit={onSubmit}
          resolver={zodResolver(academicFacultySchema)}
        >
          <PHInput
            type="text"
            label="Academic Faculty"
            name="name"
          />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicFaculty;
