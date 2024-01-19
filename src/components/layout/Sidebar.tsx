import { Layout, Menu } from "antd";
const { Sider } = Layout;
import { sidebarItemsGenerator } from "../../utils/sidebarItemsGenerator";
import { adminPaths } from "../../router/admin.routes";
const Sidebar = () => {
  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
    >
      <div
        style={{
          color: "white",
          height: "4rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>PH University</h1>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={sidebarItemsGenerator(adminPaths, "admin")}
      />
    </Sider>
  );
};

export default Sidebar;