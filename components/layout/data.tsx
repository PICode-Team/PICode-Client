import { DashboardOutlined, DescriptionOutlined, ChatOutlined, SettingsOutlined, DnsOutlined, ComputerOutlined, WorkOutlineOutlined, Description, CalendarViewDayOutlined, CalendarTodayOutlined } from '@material-ui/icons'

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
        url: '/workspace/container',
        icon: <ComputerOutlined />,
        title: 'Container',
      },
    ],
    subUrl: ['/code', '/codeview', '/container'],
  },
  issuespace: {
    url: '/issuespace',
    icon: <Description />,
    title: 'Issuespace',
  },
  calendarspace: {
    url: '/calendarspace',
    icon: <CalendarTodayOutlined />,
    title: 'CalendarSpace',
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
