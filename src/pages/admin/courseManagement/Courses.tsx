import { Button, Modal, Table } from "antd";
import { useAddFacultiesMutation, useGetAllCoursesQuery } from "../../../redux/features/admin/courseManagement.api";
import { useState } from "react";
import PHForm from "../../../components/form/PHForm";
import PHSelect from "../../../components/form/PHSelect";
import { useGetAllFacultiesQuery } from "../../../redux/features/admin/userManagement.api";
import { TResponse } from "../../../types";
import { toast } from "sonner";

const Courses = () => {
  const { data: courses, isFetching } = useGetAllCoursesQuery(undefined);
  const tableData = courses?.data?.map(({ _id, title, prefix, code }) => ({
    key: _id,
    title,
    code: `${prefix} ${code}`,
  }));
  const coloumns = [
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Code",
      dataIndex: "code",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => {
        return <AddFacultyModal facultyInfo={record} />;
      },
    },
  ];
  return (
    <Table
      loading={isFetching}
      dataSource={tableData}
      columns={coloumns}
    />
  );
};

const AddFacultyModal = ({ facultyInfo }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: facultiesData } = useGetAllFacultiesQuery(undefined);
  const [addFaculies] = useAddFacultiesMutation();
  const facultiesOptions = facultiesData?.data?.map((item) => ({
    value: item._id,
    label: item.fullName,
  }));

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleSubmit = async (data) => {
    const toastId = toast.loading("Adding faculties...");

    const facultyData = {
      courseId: facultyInfo.key,
      data,
    };
    try {
      const res = (await addFaculies(facultyData)) as TResponse<any>;
      if (!res.error) {
        toast.success("Add faculties successfully", { id: toastId, duration: 2000 });
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
          <PHSelect
            mode="multiple"
            label="Faculties"
            name="faculties"
            options={facultiesOptions}
          />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Modal>
    </>
  );
};

export default Courses;
