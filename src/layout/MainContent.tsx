import type { PropsWithChildren } from 'react'

function MainContent({ children }: PropsWithChildren) {
  return <main className="main-content">{children}</main>
}

export default MainContent
