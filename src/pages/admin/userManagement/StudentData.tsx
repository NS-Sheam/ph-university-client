import { Button, Pagination, Space, Table, TableColumnsType, TableProps } from "antd";
import { useState } from "react";
import { TQueryParams, TStudent } from "../../../types";
import { useGetAllStudentsQuery } from "../../../redux/features/admin/userManagement.api";

export type TTableData = Pick<TStudent, "fullName" | "id">;
const StudentData = () => {
  const [params, setParams] = useState<TQueryParams[] | []>([]);
  const [page, setPage] = useState<number>(1);
  const {
    data: studentData,
    isLoading,
    isFetching,
  } = useGetAllStudentsQuery([
    { name: "limit", value: 2 },
    { name: "page", value: page },
    { name: "sort", value: "id" },
    ...params,
  ]);

  const metaData = studentData?.meta;

  const tableData = studentData?.data?.map(({ _id, fullName, id }) => ({
    key: _id,
    fullName,
    id,
  }));

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      dataIndex: "fullName",
    },
    {
      title: "Id No.",
      dataIndex: "id",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: () => (
        <Space>
          <Button>Details</Button>
          <Button>Edit</Button>
          <Button>Block</Button>
        </Space>
      ),
      width: "1%",
    },
  ];

  const onChange: TableProps<TTableData>["onChange"] = (_pagination, filters, _sorter, extra) => {
    // console.log("params", pagination, filters, sorter, extra);
    if (extra.action === "filter") {
      const queryParams: TQueryParams[] = [];
      filters.name?.forEach((item) => queryParams.push({ name: "name", value: item }));
      filters.year?.forEach((item) => queryParams.push({ name: "year", value: item }));
      setParams(queryParams);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Table
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        onChange={onChange}
        pagination={false}
      />

      <Pagination
        current={page}
        onChange={(value) => setPage(value)}
        total={metaData?.total}
        pageSize={metaData?.limit}
      />
    </>
  );
};

export default StudentData;
