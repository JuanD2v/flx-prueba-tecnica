import { Layout } from "antd";
import "./styles/Layout.css";

const LayoutCustom = ({ children }) => {
  const { Header, Content } = Layout;

  return (
    <Layout>
      <Header className="page-header">
        <img className="icon" src="flexxusLogo.png" alt="Flexxus Logo" />
      </Header>
      <Content className="page-content">
        {children}
      </Content>
    </Layout>
  )
}

export default LayoutCustom;