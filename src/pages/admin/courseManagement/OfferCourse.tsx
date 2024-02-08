import { Button, Col, Flex, Row } from "antd";
import PHForm from "../../../components/form/PHForm";
import {
  useGetAllAcademicDepartmentsQuery,
  useGetAllAcademicFacultiesQuery,
  useGetAllSemesterRegistrationQuery,
} from "../../../redux/features/admin/academicManagement.api";
import PHSelectWithWatch from "../../../components/form/PHSelectWithWatch";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import {
  useAddOfferCourseMutation,
  useGetAllCoursesQuery,
  useGetCourseFacultiesQuery,
} from "../../../redux/features/admin/courseManagement.api";
import PHSelect from "../../../components/form/PHSelect";
import PHTimePicker from "../../../components/form/PHTimePicker";
import moment from "moment";
import { toast } from "sonner";
import { TResponse } from "../../../types";
import PHInput from "../../../components/form/PHInput";

const OfferCourse = () => {
  const [id, setId] = useState("");
  const { data: courses } = useGetAllCoursesQuery(undefined);
  const { data: semesterRegistrations } = useGetAllSemesterRegistrationQuery(undefined);
  const { data: academicFaculties } = useGetAllAcademicFacultiesQuery(undefined);
  const { data: courseFaculties, isLoading: fIsLoading } = useGetCourseFacultiesQuery(id, { skip: !id });
  const { data: academicDepartments } = useGetAllAcademicDepartmentsQuery(undefined);
  const [addOfferCourse] = useAddOfferCourseMutation();

  const academicSemesterOptions = semesterRegistrations?.data?.map((item) => {
    return {
      value: item._id,
      label: `${item.academicSemester.name} ${item.academicSemester.year}`,
    };
  });

  const academicFacultyOptions = academicFaculties?.data?.map((item) => {
    return {
      value: item._id,
      label: item.name,
    };
  });

  const academicDepartmentOptions = academicDepartments?.data?.map((item) => {
    return {
      value: item._id,
      label: item.name,
    };
  });
  const courseOptions = courses?.data?.map((item) => {
    return {
      value: item._id,
      label: item.title,
    };
  });
  const courseFacultiesOption = courseFaculties?.data?.faculties?.map((item) => {
    return {
      value: item._id,
      label: item.fullName,
    };
  });

  const dayOptions = [
    {
      value: "Sat",
      label: "Saturday",
    },
    {
      value: "Sun",
      label: "Sunday",
    },
    {
      value: "Mon",
      label: "Monday",
    },
    {
      value: "Tue",
      label: "Tuesday",
    },
    {
      value: "Wed",
      label: "Wednesday",
    },
    {
      value: "Thu",
      label: "Thursday",
    },
    {
      value: "Fri",
      label: "Friday",
    },
  ];

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Offering course...");
    const offerCourseData = {
      ...data,
      startTime: moment(data.startTime.$d).format("HH:mm"),
      endTime: moment(data.endTime.$d).format("HH:mm"),
      maxCapacity: Number(data.maxCapacity),
      section: Number(data.section),
    };
    try {
      const res = (await addOfferCourse(offerCourseData)) as TResponse<any>;
      console.log(res);

      if (!res.error) {
        toast.success(res.message || "Offer course created successfully", { id: toastId, duration: 2000 });
      }
    } catch (error) {
      toast.error("something went wrong", { id: toastId });
    }
  };
  return (
    <Flex
      justify="center"
      align="center"
    >
      <Col span={18}>
        <PHForm onSubmit={onSubmit}>
          <Row gutter={8}>
            <Col span={12}>
              <PHSelect
                label="Semester Registration"
                name="semesterRegistration"
                options={academicSemesterOptions}
              />
              <PHSelect
                label="Academic Faculty"
                name="academicFaculty"
                options={academicFacultyOptions}
              />
            </Col>
            <Col span={12}>
              <PHSelect
                label="Academic Department"
                name="academicDepartment"
                options={academicDepartmentOptions}
              />
              <PHSelectWithWatch
                onValueChange={setId}
                label="Course"
                name="course"
                options={courseOptions}
              />
            </Col>
            <Col span={12}>
              <PHSelect
                label="Faculty"
                name="faculty"
                options={courseFacultiesOption}
                disabled={!id}
                loading={fIsLoading}
              />
              <PHSelect
                mode="multiple"
                options={dayOptions}
                label="Days"
                name="days"
              />
            </Col>
            <Col span={12}>
              <PHInput
                type="number"
                label="Maximum Capacity"
                name="maxCapacity"
              />
              <PHInput
                type="number"
                label="Section"
                name="section"
              />
            </Col>

            <Col span={12}>
              <PHTimePicker
                format="HH:mm"
                label="Start Time"
                name="startTime"
              />
            </Col>
            <Col span={12}>
              <PHTimePicker
                format="HH:mm"
                label="End Time"
                name="endTime"
              />
            </Col>
          </Row>
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default OfferCourse;
