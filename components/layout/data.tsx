import { DashboardOutlined, DescriptionOutlined, ChatOutlined, SettingsOutlined, DnsOutlined, ComputerOutlined, WorkOutlineOutlined } from '@material-ui/icons'

export const sidebarData = {
  dashboard: {
    url: '/',
    icon: <DashboardOutlined />,
    title: 'Dashboard',
  },
  workspace: {
    icon: <WorkOutlineOutlined />,
    title: 'Workspace',
    children: [
      {
        url: '/workspace/codespace',
        icon: <DnsOutlined />,
        title: 'Codespace',
        subUrl: ['/code'],
      },
      {
        url: '/container',
        icon: <ComputerOutlined />,
        title: 'Container',
      },
    ],
    subUrl: ['/code', '/codeview', '/container'],
  },
  note: {
    url: '/notespace',
    icon: <DescriptionOutlined />,
    title: 'Notespace',
  },
  chat: {
    url: '/chatspace',
    icon: <ChatOutlined />,
    title: 'Chatspace',
  },
  setting: {
    url: '/setting',
    icon: <SettingsOutlined />,
    title: 'Setting',
  },
}
