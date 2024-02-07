import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import { Button, Col, Divider, Form, Input, Row } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import { bloodGroupOptions, genderOptions } from "../../../constants/global";
import PHDatePicker from "../../../components/form/PHDatePicker";
import { useGetAllAcademicDepartmentsQuery } from "../../../redux/features/admin/academicManagement.api";
import { useAddFacultyMutation } from "../../../redux/features/admin/userManagement.api";
import { toast } from "sonner";
import { TFaculty, TResponse } from "../../../types";

const facultyDefaultValues = {
  name: {
    firstName: "Mr.",
    middleName: "Mridul",
    lastName: "Das",
  },
  gender: "male",
  bloodGroup: "B+",
  // dateOfBirth: "1990-01-01",
  email: "mridul@example.com",
  contactNo: "12344567890",
  emergencyContactNo: "9876543210",
  presentAddress: "123 Main Street, City",
  permanentAddress: "456 Oak Avenue, Town",
  academicDepartment: "65b9f5f2048d3715e040809a",
  designation: "Professor",
  profileImg: "path/to/profile/image.jpg",
};

const CreateFaculty = () => {
  const [addFaculty] = useAddFacultyMutation();

  const { data: dData, isLoading: dIsLoading } = useGetAllAcademicDepartmentsQuery(undefined);

  const departmentOptions = dData?.data?.map((item) => {
    return {
      value: item._id,
      label: item.name,
    };
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Adding Faculty...");

    const facultyData = {
      password: "faculty123",
      faculty: data,
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(facultyData));
    formData.append("file", data.image);
    try {
      const res = (await addFaculty(formData)) as TResponse<TFaculty>;
      console.log(res);
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else toast.success("Faculty Added Successfully", { id: toastId });
    } catch (error) {
      toast.error("Failed to Add Faculty", { id: toastId });
    }
  };

  return (
    <Row>
      <Col span={24}>
        <PHForm
          onSubmit={onSubmit}
          defaultValues={facultyDefaultValues}
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
                label="First Name"
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
                label="Middle Name"
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
                label="Last Name"
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
            <Col
              span={24}
              md={{ span: 12 }}
              lg={{ span: 8 }}
            >
              <Controller
                name="image"
                render={({ field: { onChange, value, ...field } }) => (
                  <Form.Item label="Image">
                    <Input
                      type="file"
                      value={value?.fileName}
                      {...field}
                      onChange={(e) => {
                        onChange(e.target.files?.[0]);
                      }}
                    />
                  </Form.Item>
                )}
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
          <Divider>Academic Info.</Divider>
          <Row gutter={8}>
            <Col
              span={24}
              md={{ span: 12 }}
              lg={{ span: 8 }}
            >
              <PHInput
                type="text"
                name="designation"
                label="Designation"
              />
            </Col>
            <Col
              span={24}
              md={{ span: 12 }}
              lg={{ span: 8 }}
            >
              <PHSelect
                options={departmentOptions}
                name="academicDepartment"
                label="Academic Department"
                disabled={dIsLoading}
              />
            </Col>
          </Row>
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Row>
  );
};

export default CreateFaculty;
