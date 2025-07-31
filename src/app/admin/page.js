"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();
  const [logs, setLogs] = useState([]);
  const [authenticated, setAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");

  const ADMIN_PASSWORD = "Sw@1$%7789"; 

  useEffect(() => {
    if (authenticated) {
      fetch("/api/logs")
        .then((res) => res.json())
        .then(setLogs)
        .catch(() => console.error("Failed to fetch logs"));
    }
  }, [authenticated]);

  const handleLogin = () => {
    if (passwordInput === ADMIN_PASSWORD) {
      setAuthenticated(true);
    } else {
      alert("❌ Incorrect Password");
    }
  };

  const downloadCSV = () => {
    const headers = ["Time", "IP", "City", "Country", "ISP"];
    const rows = logs.map((log) => [
      log.time,
      log.ip,
      log.city,
      log.country,
      log.org,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((e) => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "visitor_logs.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!authenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded shadow w-96">
          <h1 className="text-2xl font-bold mb-4 text-center  text-black">🔐 Admin Login</h1>
          <input
            type="password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            placeholder="Enter admin password"
            className="w-full px-4 py-2 border rounded mb-4 text-black"
          />
          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 text-black py-2 rounded hover:bg-blue-700 transition"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  const apiList = [
    "/api/log-ip – logs visitor IP/location",
    "/api/logs – fetches all logged visitors",
    "https://ipinfo.io/{ip}/json – external IP geolocation service"
  ];

  return (
    <div className="p-8 font-sans bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">🛠️ Admin Panel</h1>

      {/* <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">📡 API Endpoints Used</h2>
        <ul className="list-disc list-inside text-gray-600">
          {apiList.map((api, index) => (
            <li key={index}>{api}</li>
          ))}
        </ul>
      </section> */}

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold text-gray-700">🧾 Visitor Logs</h2>
          <button
            onClick={downloadCSV}
            className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition"
          >
            ⬇️ Download as CSV
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded border border-gray-200">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="px-4 py-2 text-left">Time</th>
                <th className="px-4 py-2 text-left">IP</th>
                <th className="px-4 py-2 text-left">City</th>
                <th className="px-4 py-2 text-left">Country</th>
                <th className="px-4 py-2 text-left">ISP</th>
              </tr>
            </thead>
            <tbody>
              {logs.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center text-gray-500 px-4 py-4">
                    No logs found.
                  </td>
                </tr>
              ) : (
                logs.map((log, index) => (
                  <tr key={index} className="border-t border-gray-200 hover:bg-gray-50">
                    <td className="px-4 py-2 text-black">{log.time}</td>
                    <td className="px-4 py-2 text-black">{log.ip}</td>
                    <td className="px-4 py-2 text-black">{log.city}</td>
                    <td className="px-4 py-2 text-black">{log.country}</td>
                    <td className="px-4 py-2 text-black">{log.org}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
