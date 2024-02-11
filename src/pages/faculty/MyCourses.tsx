import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../components/form/PHForm";
import { useGetAllFacultyCoursesQuery } from "../../redux/features/faculty/facultyCourses.api";
import PHSelect from "../../components/form/PHSelect";
import { Button, Col, Flex } from "antd";
import { useNavigate } from "react-router-dom";

const MyCourses = () => {
  const { data: facultyCoursesData } = useGetAllFacultyCoursesQuery(undefined);
  const navigate = useNavigate();

  const semesterOpions = facultyCoursesData?.data?.map((item) => ({
    label: `${item.academicSemester.name} ${item.academicSemester.year}`,
    value: item.semesterRegistration?._id,
  }));
  const courseOpions = facultyCoursesData?.data?.map((item) => ({
    label: item.course?.title,
    value: item.course?._id,
  }));

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    navigate(`/faculty/courses/${data.semesterRegistration}/${data.course}`);
  };
  return (
    <Flex
      justify="center"
      align="middle"
    >
      <Col span={6}>
        <PHForm onSubmit={onSubmit}>
          <PHSelect
            options={semesterOpions}
            name="semesterRegistration"
            label="Semester Registration:"
          />
          <PHSelect
            options={courseOpions}
            name="course"
            label="Course:"
          />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default MyCourses;
