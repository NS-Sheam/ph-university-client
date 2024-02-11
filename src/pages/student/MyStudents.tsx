import { useParams } from "react-router-dom";
import { useAddMarkMutation, useGetAllFacultyCoursesQuery } from "../../redux/features/faculty/facultyCourses.api";
import { Button, Modal, Table } from "antd";
import { useState } from "react";
import { toast } from "sonner";
import PHForm from "../../components/form/PHForm";
import PHInput from "../../components/form/PHInput";
import { TResponse } from "../../types";
import { FieldValues, SubmitHandler } from "react-hook-form";

const MyStudents = () => {
  const { registerSemesterId, courseId } = useParams();
  const { data: facultyCoursesData } = useGetAllFacultyCoursesQuery([
    { name: "semesterRegistration", value: registerSemesterId },
    { name: "course", value: courseId },
  ]);
  console.log(facultyCoursesData);

  const tableData = facultyCoursesData?.data?.map(({ _id, student, semesterRegistration, offeredCourse }) => ({
    key: _id,
    name: student.fullName,
    roll: student.id,
    semesterRegistration: semesterRegistration._id,
    student: student._id,
    offeredCourse: offeredCourse._id,
  }));

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },

    {
      title: "Roll",
      dataIndex: "roll",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => (
        <div>
          <AddMarksModal studentInfo={record} />
        </div>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={tableData}
    />
  );
};

const AddMarksModal = ({ studentInfo }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addMark] = useAddMarkMutation();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Updating marks...");

    const studentMark = {
      semesterRegistration: studentInfo.semesterRegistration,
      offeredCourse: studentInfo.offeredCourse,
      student: studentInfo.student,
    };
    const courseMarks = {};
    for (const key in data) {
      if (data[key]) {
        courseMarks[key] = Number(data[key]);
      }
    }
    studentMark.courseMarks = courseMarks;

    try {
      const res = (await addMark(studentMark)) as TResponse<any>;
      if (!res.error) {
        toast.success("Update course marks successfully", { id: toastId, duration: 2000 });
        handleCancel();
      }
    } catch (error) {
      toast.error("something went wrong", { id: toastId });
    }
  };

  return (
    <>
      <Button onClick={showModal}>Add Faculty</Button>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <PHForm onSubmit={handleSubmit}>
          <PHInput
            type="data"
            name="classTest1"
            label="Class Test 1"
          />
          <PHInput
            type="data"
            name="classTest2"
            label="Class Test 2"
          />
          <PHInput
            type="data"
            name="midTerm"
            label="Mid Term"
          />
          <PHInput
            type="data"
            name="finalTerm"
            label="Final Term"
          />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Modal>
    </>
  );
};

export default MyStudents;
