import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import { Button, Col, Flex } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import { monthOptions } from "../../../constants/global";
import { semesterOptions, semesterStatusOptions } from "../../../constants/semester";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicSemesterSchema } from "../../../schemas/academicManagement.schema";
import { toast } from "sonner";
import { TResponse } from "../../../types/global";
import { TAcademicSemester } from "../../../types/academicManagement.type";
import { useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagement.api";
import PHDatePicker from "../../../components/form/PHDatePicker";
import PHInput from "../../../components/form/PHInput";

const SemesterRegistration = () => {
  const { data: academicSemester } = useGetAllSemestersQuery([{ name: "sort", value: "year" }]);

  const academicSemesterOptions = academicSemester?.data?.map((item) => {
    return {
      value: item._id,
      label: `${item.name} ${item.year}`,
    };
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating academic semester...");

    const semesterData = {
      ...data,
    };
    console.log(semesterData);

    // try {
    //   console.log(semesterData);
    //   const res = (await addAcademicSemester(semesterData)) as TResponse<TAcademicSemester>;
    //   if (res.error) {
    //     toast.error(res.error.data.message, { id: toastId });
    //   } else {
    //     toast.success("Create academic semester successfully", { id: toastId, duration: 2000 });
    //   }
    // } catch (error) {
    //   toast.error("something went wrong", { id: toastId });
    // }
  };

  return (
    <Flex
      justify="center"
      align="center"
    >
      <Col span={6}>
        <PHForm onSubmit={onSubmit}>
          <PHSelect
            label="Name"
            name="name"
            options={academicSemesterOptions}
          />
          <PHSelect
            label="Status"
            name="status"
            options={semesterStatusOptions}
          />
          <PHDatePicker
            name="startDate"
            label="Start Date"
          />
          <PHDatePicker
            name="endDate"
            label="End Date"
          />
          <PHInput
            type="text"
            name="minCredit"
            label="Minimum Credit"
          />
          <PHInput
            type="text"
            name="maxCredit"
            label="Maximum Credit"
          />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default SemesterRegistration;
