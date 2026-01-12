import UrlForm from "../components/UrlFrom";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-4">
      <div className="p-8 rounded-lg shadow-md w-full max-w-md bg-gray-700 text-white">
        <h1 className="text-2xl font-bold text-center mb-6">URL Shortener</h1>
        <UrlForm />
      </div>
    </div>
  );
};

export default Dashboard;
