import { Button, Table, TableColumnsType } from "antd";
import { useGetAllAcademicFacultiesQuery } from "../../../redux/features/admin/academicManagement.api";

export type TTableData = {
  key: string;
  name: string;
  createdAt: string;
};
const AcademicFaculty = () => {
  const { data: academicFacultyData, isLoading, isFetching } = useGetAllAcademicFacultiesQuery(undefined);

  const tableData = academicFacultyData?.data?.map(({ _id, name, createdAt }) => ({
    key: _id,
    name,
    createdAt,
  }));

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Sl No",
      dataIndex: "_id",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Faculty Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (text) => new Date(text).toLocaleDateString(),
      sorter: (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    },

    {
      title: "Action",
      dataIndex: "action",
      render: () => (
        <div>
          <Button>Edit</Button>
        </div>
      ),
    },
  ];

  // const onChange: TableProps<TTableData>["onChange"] = (_pagination, filters, _sorter, extra) => {
  //   // console.log("params", pagination, filters, sorter, extra);
  //   if (extra.action === "filter") {
  //     const queryParams: TQueryParams[] = [];
  //     filters.name?.forEach((item) => queryParams.push({ name: "name", value: item }));
  //     filters.year?.forEach((item) => queryParams.push({ name: "year", value: item }));
  //     setParams(queryParams);
  //   }
  // };

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <Table
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
    />
  );
};

export default AcademicFaculty;
