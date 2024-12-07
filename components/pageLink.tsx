import Link from "next/link"
import { Card } from "./ui/card"

interface PageLinkProps {
  href: string
  name: string
  children?: React.ReactNode
}

export function PageLink({ href, name, children }: PageLinkProps) {
  return (
    <Link className="w-1/3 h-40" href={href}>
      <Card className="h-full flex justify-center items-center hover:bg-slate-200 hover:scale-105 transition-all">
        <div className="flex flex-col justify-center items-center">
          {children}
          <h2 className="text-xl font-bold">{name}</h2>
        </div>
      </Card>

    </Link>
  )
}
