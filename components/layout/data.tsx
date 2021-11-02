import {
  DashboardOutlined,
  DescriptionOutlined,
  ChatOutlined,
  SettingsOutlined,
  DnsOutlined,
  ComputerOutlined,
  WorkOutlineOutlined,
  Description,
  CalendarViewDayOutlined,
  CalendarTodayOutlined,
} from '@material-ui/icons'

interface ISidebarData {
  [key: string]: {
    url?: string
    icon: JSX.Element
    title: string
    children?: INodeData[]
    subUrl?: string[]
  }
}

interface INodeData {
  url: string
  icon: JSX.Element
  title: string
  children?: ISidebarData[]
  subUrl?: string[]
}

export const sidebarData: ISidebarData = {
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
        subUrl: ['/codespace'],
      },
      {
        url: '/workspace/container',
        icon: <ComputerOutlined />,
        title: 'Container',
        subUrl: ['/workspace/visualization'],
      },
    ],
    subUrl: ['/workspace/container', '/workspace/codespace', '/workspace/visualization', '/codespace', '/codeview', '/container'],
  },
  issuespace: {
    url: '/issuespace',
    icon: <Description />,
    title: 'Issuespace',
  },
  calendarspace: {
    url: '/calendarspace',
    icon: <CalendarTodayOutlined />,
    title: 'Calendarspace',
  },
  notespace: {
    url: '/notespace',
    icon: <DescriptionOutlined />,
    title: 'Notespace',
  },
  chatspace: {
    url: '/chatspace',
    icon: <ChatOutlined />,
    title: 'Chatspace',
  },
  // setting: {
  //   url: '/setting',
  //   icon: <SettingsOutlined />,
  //   title: 'Setting',
  // },
}
