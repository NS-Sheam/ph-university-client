import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import { Button, Col, Divider, Row } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import { bloodGroupOptions, genderOptions } from "../../../constants/global";
import PHDatePicker from "../../../components/form/PHDatePicker";
import { useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagement.api";

const studentDummyData = {
  password: "student123",
  student: {
    name: {
      firstName: "Mr.",
      middleName: "Student",
      lastName: "2",
    },
    gender: "male",
    dateOfBirth: "1990-01-01",
    bloodGroup: "A+",

    email: "sheam2@gmail.com",
    contactNo: "123-456-7890",
    emergencyContactNo: "987-654-3210",
    presentAddress: "123 Main St, Cityville",
    permanentAddress: "123 Main St, Cityville",

    guardian: {
      fatherName: "John Smith Sr.",
      fatherOccupation: "Engineer",
      fatherContactNo: "111-222-3333",
      motherName: "Jane Smith",
      motherOccupation: "Doctor",
      motherContactNo: "444-555-6666",
    },
    localGuardian: {
      name: "Alice Doe",
      occupation: "Teacher",
      contactNo: "777-888-9999",
      address: "456 Oak St, Townsville",
    },

    admissionSemester: "65b9f6da048d3715e04080a1",
    academicDepartment: "65b9f5f2048d3715e040809a",
  },
};

const studentDefaultValues = {
  name: {
    firstName: "Mr.",
    middleName: "Student",
    lastName: "2",
  },
  gender: "male",
  bloodGroup: "A+",

  email: "sheam2@gmail.com",
  contactNo: "123-456-7890",
  emergencyContactNo: "987-654-3210",
  presentAddress: "123 Main St, Cityville",
  permanentAddress: "123 Main St, Cityville",

  guardian: {
    fatherName: "John Smith Sr.",
    fatherOccupation: "Engineer",
    fatherContactNo: "111-222-3333",
    motherName: "Jane Smith",
    motherOccupation: "Doctor",
    motherContactNo: "444-555-6666",
  },
  localGuardian: {
    name: "Alice Doe",
    occupation: "Teacher",
    contactNo: "777-888-9999",
    address: "456 Oak St, Townsville",
  },

  admissionSemester: "65b9f6da048d3715e04080a1",
  academicDepartment: "65b9f5f2048d3715e040809a",
};
const CreateStudent = () => {
  const { data: sData, isLoading: sIsLoading } = useGetAllSemestersQuery(undefined);
  const semesterOptions = sData?.data?.map((item) => {
    return {
      value: item._id,
      label: `${item.name} ${item.year}`,
    };
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };

  return (
    <Row>
      <Col span={24}>
        <PHForm
          onSubmit={onSubmit}
          defaultValues={studentDefaultValues}
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
              <PHSelect
                options={semesterOptions}
                name="admissionSemester"
                label="Admission Semester"
                disabled={sIsLoading}
              />
            </Col>
            <Col
              span={24}
              md={{ span: 12 }}
              lg={{ span: 8 }}
            >
              <PHSelect
                options={semesterOptions}
                name="academicDepartment"
                label="Academic Department"
              />
            </Col>
          </Row>
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Row>
  );
};

export default CreateStudent;
