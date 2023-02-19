import AppFooter from '../components/app-footer'
import AppHeader from '../components/app-header'

interface LayoutProps {
  children: React.ReactNode
}

const Layout = (props: LayoutProps) => {
  return (
    <>
      <AppHeader />
      <div className="min-h-auto">{props.children}</div>
      <AppFooter />
    </>
  )
}

export default Layout
