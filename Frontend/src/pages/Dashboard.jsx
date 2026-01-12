import UrlForm from "../components/UrlFrom";
import UserUrl from "../components/UserUrl";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-4">
      <div className="p-8 rounded-lg shadow-md w-full max-w-3xl bg-gray-700 text-white mt-18">
        <h1 className="text-2xl font-bold text-center mb-6">URL Shortener</h1>
        <UrlForm />
        <UserUrl />
      </div>
    </div>
  );
};

export default Dashboard;
