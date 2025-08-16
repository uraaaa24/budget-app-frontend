import {
  RedirectToSignIn,
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from '@clerk/nextjs'

const Header = () => {
  return (
    <header className="flex h-24 shrink-0 items-center gap-2 p-8">
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
