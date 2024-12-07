import { PageLink } from "@/components/pageLink"
import { KeyRound, Table } from "lucide-react"

export default function Home() {
  return (
    <div className="flex items-center min-h-screen min-w-full">
      <main className="w-2/3 m-auto">
        <p className="pb-10">
          Pick route to check out my solutions for the respective tasks:
        </p>

        <div className="flex w-full gap-8">
          <PageLink href="/table" name="table">
            <Table size={48} />
          </PageLink>
          <PageLink href="/register" name="Register">
            <KeyRound size={48} />
          </PageLink>
        </div>
      </main>
    </div>
  )
}
