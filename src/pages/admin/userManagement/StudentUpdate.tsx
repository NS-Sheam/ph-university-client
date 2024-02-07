import { Button, Col, Divider, Row } from "antd";
import PHForm from "../../../components/form/PHForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useGetSingleStudentQuery, useUpdateStudentMutation } from "../../../redux/features/admin/userManagement.api";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import PHInput from "../../../components/form/PHInput";
import PHSelect from "../../../components/form/PHSelect";
import { bloodGroupOptions, genderOptions } from "../../../constants/global";
import {
  useGetAllAcademicDepartmentsQuery,
  useGetAllSemestersQuery,
} from "../../../redux/features/admin/academicManagement.api";
import PHDatePicker from "../../../components/form/PHDatePicker";
import dayjs from "dayjs";

const StudentUpdate = () => {
  const { studentId } = useParams();
  const navigate = useNavigate();

  const [updateStudent] = useUpdateStudentMutation();
  const { data: studentData, isLoading: studentIsLoading } = useGetSingleStudentQuery(studentId);
  const { data: sData, isLoading: sIsLoading } = useGetAllSemestersQuery(undefined);
  const { data: dData, isLoading: dIsLoading } = useGetAllAcademicDepartmentsQuery(undefined);

  const semesterOptions = sData?.data?.map((item) => {
    return {
      value: item._id,
      label: `${item.name} ${item.year}`,
    };
  });
  const departmentOptions = dData?.data?.map((item) => {
    return {
      value: item._id,
      label: item.name,
    };
  });

  const defaultStudentValues = {
    ...studentData?.data,
    dateOfBirth: dayjs(studentData?.data?.dateOfBirth, "YYYY-MM-DD"),
    admissionSemester: studentData?.data?.admissionSemester?._id,
    academicDepartment: studentData?.data?.academicDepartment?._id,
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Updating student...");

    try {
      const res = await updateStudent({ id: studentId, data: { student: data } });

      if (res) {
        toast.success("Student updated successfully!", { id: toastId });
        navigate("/admin/students-data");
      }
    } catch (error) {
      toast.error("Failed to update student!", { id: toastId });
    }
  };

  return (
    <Row>
      <Col span={24}>
        <PHForm
          onSubmit={onSubmit}
          defaultValues={defaultStudentValues}
        >
          <Divider>Personal Info.</Divider>
          <Row gutter={8}>
            <Col
              span={24}
              md={{ span: 12 }}
              lg={{ span: 8 }}
            >
              <PHInput
                type="text"
                name="name.firstName"
                label="Name"
              />
            </Col>
            <Col
              span={24}
              md={{ span: 12 }}
              lg={{ span: 8 }}
            >
              <PHInput
                type="text"
                name="name.middleName"
                label="Name"
              />
            </Col>
            <Col
              span={24}
              md={{ span: 12 }}
              lg={{ span: 8 }}
            >
              <PHInput
                type="text"
                name="name.lastName"
                label="Name"
              />
            </Col>
            <Col
              span={24}
              md={{ span: 12 }}
              lg={{ span: 8 }}
            >
              <PHSelect
                options={genderOptions}
                name="gender"
                label="Gender"
              />
            </Col>
            <Col
              span={24}
              md={{ span: 12 }}
              lg={{ span: 8 }}
            >
              <PHDatePicker
                name="dateOfBirth"
                label="Date of Birth"
              />
            </Col>
            <Col
              span={24}
              md={{ span: 12 }}
              lg={{ span: 8 }}
            >
              <PHSelect
                options={bloodGroupOptions}
                name="bloodGroup"
                label="Blood Group"
              />
            </Col>
          </Row>
          <Divider>Contact Info.</Divider>
          <Row gutter={8}>
            <Col
              span={24}
              md={{ span: 12 }}
              lg={{ span: 8 }}
            >
              <PHInput
                type="email"
                name="email"
                label="Email"
              />
            </Col>
            <Col
              span={24}
              md={{ span: 12 }}
              lg={{ span: 8 }}
            >
              <PHInput
                type="text"
                name="contactNo"
                label="Contact No."
              />
            </Col>
            <Col
              span={24}
              md={{ span: 12 }}
              lg={{ span: 8 }}
            >
              <PHInput
                type="text"
                name="emergencyContactNo"
                label="Emergency Contact No."
              />
            </Col>
            <Col
              span={24}
              md={{ span: 12 }}
              lg={{ span: 8 }}
            >
              <PHInput
                type="text"
                name="presentAddress"
                label="Present Address"
              />
            </Col>
            <Col
              span={24}
              md={{ span: 12 }}
              lg={{ span: 8 }}
            >
              <PHInput
                type="text"
                name="permanentAddress"
                label="Permanent Address"
              />
            </Col>
          </Row>
          <Divider>Guardian Info.</Divider>
          <Row gutter={8}>
            <Col
              span={24}
              md={{ span: 12 }}
              lg={{ span: 8 }}
            >
              <PHInput
                type="text"
                name="guardian.fatherName"
                label="Father's Name"
              />
            </Col>
            <Col
              span={24}
              md={{ span: 12 }}
              lg={{ span: 8 }}
            >
              <PHInput
                type="text"
                name="guardian.fatherOccupation"
                label="Father's Occupation"
              />
            </Col>
            <Col
              span={24}
              md={{ span: 12 }}
              lg={{ span: 8 }}
            >
              <PHInput
                type="text"
                name="guardian.fatherContactNo"
                label="Father's Contact No."
              />
            </Col>
            <Col
              span={24}
              md={{ span: 12 }}
              lg={{ span: 8 }}
            >
              <PHInput
                type="text"
                name="guardian.motherName"
                label="Mother's Name"
              />
            </Col>
            <Col
              span={24}
              md={{ span: 12 }}
              lg={{ span: 8 }}
            >
              <PHInput
                type="text"
                name="guardian.motherOccupation"
                label="Mother's Occupation"
              />
            </Col>
            <Col
              span={24}
              md={{ span: 12 }}
              lg={{ span: 8 }}
            >
              <PHInput
                type="text"
                name="guardian.motherContactNo"
                label="Mother's Contact No."
              />
            </Col>
          </Row>
          <Divider>Local Guardian Info.</Divider>
          <Row gutter={8}>
            <Col
              span={24}
              md={{ span: 12 }}
              lg={{ span: 8 }}
            >
              <PHInput
                type="text"
                name="localGuardian.name"
                label="Local Guardian's Name"
              />
            </Col>
            <Col
              span={24}
              md={{ span: 12 }}
              lg={{ span: 8 }}
            >
              <PHInput
                type="text"
                name="localGuardian.occupation"
                label="Local Guardian's Occupation"
              />
            </Col>
            <Col
              span={24}
              md={{ span: 12 }}
              lg={{ span: 8 }}
            >
              <PHInput
                type="text"
                name="localGuardian.contactNo"
                label="Local Guardian's Contact No."
              />
            </Col>
            <Col
              span={24}
              md={{ span: 12 }}
              lg={{ span: 8 }}
            >
              <PHInput
                type="text"
                name="localGuardian.address"
                label="Local Guardian's Address"
              />
            </Col>
          </Row>
          <Divider>Academic Info.</Divider>
          <Row gutter={8}>
            <Col
              span={24}
              md={{ span: 12 }}
              lg={{ span: 8 }}
            >
              {!studentIsLoading && (
                <PHSelect
                  options={semesterOptions}
                  name="admissionSemester"
                  label="Admission Semester"
                  disabled={sIsLoading}
                  // defaultValue={studentData?.data?.admissionSemester?.name}
                />
              )}
            </Col>
            <Col
              span={24}
              md={{ span: 12 }}
              lg={{ span: 8 }}
            >
              {!studentIsLoading && (
                <PHSelect
                  options={departmentOptions}
                  name="academicDepartment"
                  label="Academic Department"
                  disabled={dIsLoading}
                  // defaultValue={studentData?.data?.academicDepartment?.name}
                />
              )}
            </Col>
          </Row>
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Row>
  );
};

export default StudentUpdate;
