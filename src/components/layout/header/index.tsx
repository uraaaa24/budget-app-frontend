import {
  RedirectToSignIn,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'

const Header = () => {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 p-4">
      <div className="ml-auto flex items-center gap-4 justify-end">
        <SignedOut>
          <RedirectToSignIn />
        </SignedOut>
        <SignedIn>
          <UserButton showName />
        </SignedIn>
      </div>
    </header>
  )
}

export default Header
