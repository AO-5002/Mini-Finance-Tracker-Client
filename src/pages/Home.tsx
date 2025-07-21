import LoginButton from "@/components/LoginBtn";
import LogoutButton from "@/components/LogoutBtn";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 min-h-screen bg-zinc-800">
      <h1 className="text-4xl font-IBM-Plex-Mono text-white">
        Mini-Finance Tracker
      </h1>
      <div className="flex items-center justify-center gap-4">
        <LoginButton />
        <LogoutButton />
      </div>
    </div>
  );
}
