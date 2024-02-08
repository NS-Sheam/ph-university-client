import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import { Button, Col, Flex } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import { semesterStatusOptions } from "../../../constants/semester";
import { toast } from "sonner";
import { TResponse } from "../../../types/global";
import { useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagement.api";
import PHDatePicker from "../../../components/form/PHDatePicker";
import PHInput from "../../../components/form/PHInput";
import {
  useAddRegisteredSemesterMutation,
  useGetAllCoursesQuery,
} from "../../../redux/features/admin/courseManagement.api";

const CreateCourse = () => {
  const [addSemester] = useAddRegisteredSemesterMutation();
  const { data: courses } = useGetAllCoursesQuery(undefined);
  const preRequisiteCoursesOptions = courses?.data?.map((item) => {
    return {
      value: item._id,
      label: item.title,
    };
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating academic semester...");

    const courseData = {
      ...data,
      isDeleted: false,
      preRequisiteCourses: data.preRequisiteCourses.map((item) => ({
        course: item,
        isDeleted: false,
      })),
    };

    console.log(courseData);

    // try {
    //   const res = (await addSemester(semesterData)) as TResponse<any>;

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
          <PHInput
            type="text"
            name="title"
            label="Course Title"
          />
          <PHInput
            type="text"
            name="prefix"
            label="Course Prefix"
          />
          <PHInput
            type="text"
            name="code"
            label="Course Code"
          />
          <PHInput
            type="text"
            name="credits"
            label="Course Credits"
          />
          <PHSelect
            label="Pre-requisite Course"
            name="preRequisiteCourses"
            mode="multiple"
            options={preRequisiteCoursesOptions}
          />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateCourse;
