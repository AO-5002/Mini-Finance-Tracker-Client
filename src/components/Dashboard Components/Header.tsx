import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "../LogoutBtn";

export default function Header() {
  const { user } = useAuth0();
  return (
    <div className="row-start-1 col-start-2 col-span-4 p-4 h-full w-full flex flex-row justify-between items-center gap-4">
      <div className="w-full h-full flex flex-col items-start justify-center ">
        <h1 className="text-3xl font-light tracking-wide">
          Hello, {user?.name}
        </h1>
        <h3 className="text-xs text-zinc-400">
          Create, track, and aggregate your transactions.
        </h3>
      </div>
      <LogoutButton />
    </div>
  );
}
