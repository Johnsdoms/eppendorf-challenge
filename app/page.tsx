import { PageLink } from "@/components/pageLink";
import { KeyRound } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex items-center min-h-screen min-w-full">
      <main className="w-2/3 m-auto">
        <p className="pb-10">
          Pick route to check out my solutions for the respective tasks:
        </p>

        <PageLink href="/register" name="Register">
          <KeyRound size={48} />
        </PageLink>
      </main>
    </div>
  );
}
