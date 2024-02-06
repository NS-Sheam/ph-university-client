import { Table, TableProps } from "antd";
import { useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagement.api";

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}
const AcademicSemester = () => {
  const { data: semesterData } = useGetAllSemestersQuery(undefined);
  console.log(semesterData);

  const tableData = semesterData?.data?.map(({ _id, name, startMonth, endMonth, year }) => ({
    key: _id,
    name,
    startMonth,
    endMonth,
    year,
  }));

  const columns: TableColumnsTyps<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      filters: [
        {
          text: "Joe",
          value: "Joe",
        },
        {
          text: "Jim",
          value: "Jim",
        },
        {
          text: "Submenu",
          value: "Submenu",
          children: [
            {
              text: "Green",
              value: "Green",
            },
            {
              text: "Black",
              value: "Black",
            },
          ],
        },
      ],
    },
    {
      title: "Year",
      dataIndex: "year",
    },
    {
      title: "Start Month",
      dataIndex: "startMonth",
    },
    {
      title: "End Month",
      dataIndex: "endMonth",
    },
  ];

  const onChange: TableProps<DataType>["onChange"] = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  return (
    <Table
      columns={columns}
      dataSource={tableData}
      onChange={onChange}
    />
  );
};

export default AcademicSemester;
