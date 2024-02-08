import { Button, Dropdown, Table, TableColumnsType, Tag } from "antd";
import {
  useGetAllRegisteredSemestersQuery,
  useUpdateRegisteredSemesterMutation,
} from "../../../redux/features/admin/courseManagement.api";
import moment from "moment";
import { TResponse, TSemester } from "../../../types";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

export type TTableData = Pick<TSemester, "startDate" | "endDate" | "status">;

const items = [
  {
    label: "Upcoming",
    key: "UPCOMING",
  },
  {
    label: "Ongoing",
    key: "ONGOING",
  },
  {
    label: "Ended",
    key: "ENDED",
  },
];
const RegisteredSemesters = () => {
  // const [params, setParams] = useState<TQueryParams[] | undefined>(undefined);
  const [semesterId, setSemesterId] = useState("");
  const { data: semesterData, isFetching } = useGetAllRegisteredSemestersQuery(undefined);

  const [updateSemesterStatus] = useUpdateRegisteredSemesterMutation();

  const tableData = semesterData?.data?.map(({ _id, academicSemester, status, startDate, endDate }) => ({
    key: _id,
    name: `${academicSemester.name} ${academicSemester.year}`,
    status,
    startDate: moment(new Date(startDate)).format("MMMM"),
    endDate: moment(new Date(endDate)).format("MMMM"),
  }));

  const handleStatusUpdate: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Updating semester status...");
    const updateData = {
      id: semesterId,
      data: {
        status: data.key,
      },
    };
    try {
      const res = (await updateSemesterStatus(updateData)) as TResponse<TSemester>;
      if (!res.error) {
        toast.success("Update semester status successfully", { id: toastId, duration: 2000 });
      }
    } catch (error) {
      toast.error("something went wrong", { id: toastId });
    }
  };

  const menuProps = {
    items,
    onClick: handleStatusUpdate,
  };

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (item) => {
        let color;
        if (item === "UPCOMING") {
          color = "blue";
        } else if (item === "ONGOING") {
          color = "green";
        } else if (item === "ENDED") {
          color = "red";
        }

        return <Tag color={color}>{item}</Tag>;
      },
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
    },
    {
      title: "End Date",
      dataIndex: "endDate",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record: any) => {
        return (
          <Dropdown
            menu={menuProps}
            trigger={["click"]}
          >
            <Button onClick={() => setSemesterId(record.key)}>Edit</Button>
          </Dropdown>
        );
      },
    },
  ];

  // const onChange: TableProps<TTableData>["onChange"] = (_pagination, filters, _sorter, extra) => {
  //   // console.log("params", pagination, filters, sorter, extra);
  //   if (extra.action === "filter") {
  //     const queryParams: TQueryParams[] = [];
  //     setParams(queryParams);
  //   }
  // };

  return (
    <Table
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
      // onChange={onChange}
    />
  );
};

export default RegisteredSemesters;
