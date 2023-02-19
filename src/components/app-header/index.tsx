import { signIn, signOut, useSession } from 'next-auth/react'

// Ui
import { Navbar, Button } from 'react-daisyui'

const AppHeader = () => {
  const { data: sessionData } = useSession()

  return (
    <div className="component-preview flex w-full items-center justify-center gap-2 p-4 font-sans">
      <Navbar>
        <div className="flex-1">
          <Button className="text-xl normal-case" color="ghost">
            Agency Tools
          </Button>
        </div>
        <div className="flex-none">
          <Button
            color="primary"
            onClick={sessionData ? () => void signOut() : () => void signIn()}
          >
            {sessionData ? 'Sign out' : 'Sign in'}
          </Button>
        </div>
      </Navbar>
    </div>
  )
}

export default AppHeader
