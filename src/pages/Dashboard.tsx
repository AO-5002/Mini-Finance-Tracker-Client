import TrackerLayout from "@/layouts/TrackerLayout";
import { useAuth0 } from "@auth0/auth0-react";
import Header from "@/components/Dashboard Components/Header";
import Analytics from "@/components/Dashboard Components/Analytics/Analytics";
import TransactionTable from "@/components/Dashboard Components/Transactions/TransactionTable";

const Dashboard = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) return <div>Loading...</div>;

  return (
    isAuthenticated && (
      <TrackerLayout>
        <Header />
        <Analytics />
        <TransactionTable />
      </TrackerLayout>
    )
  );
};

export default Dashboard;
