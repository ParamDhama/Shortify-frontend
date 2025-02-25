import { Routes, Route, Outlet } from "react-router-dom";
import Sidebar from "../components/Dashboard/SideBar";
// import Navbar from "../components/Dashboard/Navbar";
import DashboardCard from "../components/Dashboard/DashboardCard";
import ChartComponent from "../components/Dashboard/ChartComponent";
import LinkTable from "../components/Dashboard/LinkTable";
import RecentLinks from "../components/Dashboard/RecentLinks";
import RecentQRCode from "../components/Dashboard/RecentQRCode";
import ShortenUrl from "../components/Dashboard/ShortenUrl";
import Setting from "../components/Dashboard/Setting"
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import apiClient from "../api/apiClient";
import endpoints from "../api/endpoints";




function DashboardLayout() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  
  const handleCreateLink = () => {
    setIsCreateOpen(!isCreateOpen);
  }
  return (
    <div className="flex h-screen md:bg-gray-100 bg-white overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col  overflow-y-auto">

        {/* Main Dashboard Area */}
          {isCreateOpen ? <ShortenUrl close={handleCreateLink}/>:<>
        <div className="md:px-10 md:mt-10 mt-20 relative">
        <div className="flex md:justify-between justify-center mb-10">
          <h1 className="max-md:hidden text-sm font-bold">GENERATE LINKS</h1>
          <button onClick={handleCreateLink} className="bg-primary  text-white md:px-16 max-md:mx-6 max-md:w-full py-3 rounded-lg text-sm font-bold">Create New Link &#8594;</button>
        </div>
          
          <Outlet />  
        </div></>}
      </div>
    </div>
  );
}

function DashboardRoutes() {

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [itemDelete, setItemDelete] = useState(false);
  const [links,setLinks] = useState([])
  const [totalClicks, setTotalClicks] = useState(0);
  const [totalLinks, setTotalLinks] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");

      try {
        const token = localStorage.getItem("token");
        if (token) {
          const decodeToken = jwtDecode(token);
          const expiryDate = new Date(decodeToken.exp * 1000);
          const currentDate = new Date();

          if (expiryDate > currentDate) {
            apiClient.defaults.headers["Authorization"] = `Bearer ${token}`;
          } else {
            localStorage.removeItem("token");
          }
        }

        const res = await apiClient.get(endpoints.url.GET_URLS);
        console.log(res);

        setLinks(res.data.urls || { urls: [] });
        let clicks = 0;
        res.data.urls.forEach(link => {
          clicks += link.clicks;
        });
        setTotalClicks(clicks)
        setTotalLinks(res.data.urls.length);
      } catch (error) {
        setError("⚠️ Failed to fetch URLs. Please try again.");
        console.error("Error fetching URLs:", error);
      }
      setLoading(false);
    };

    fetchData();
  }, [itemDelete]);

  const handleDeleteUrl = async (slug) => {
    if (!window.confirm("Are you sure you want to delete this URL?")) return;

    try {
      await apiClient.delete(endpoints.url.DELETE_URL(slug));
      setItemDelete(!itemDelete);
    } catch (error) {
      console.error("Error deleting URL:", error);
    }
  };


  return (
    <Routes>
      {/* Dashboard Layout */}
      <Route path="/" element={<DashboardLayout />}>
        {/* Default Dashboard Overview */}
        <Route
          index
          element={
            <div className="grid md:grid-cols-2 grid-cols-1 gap-5 ">
            <div className="max-md: px-2">
              <h2 className="text-sm font-bold mx-4 text-gray-800">PERFORMANCE</h2>
              <div className="mt-4 ">
                <DashboardCard totalClicks={totalClicks} totalLinks={totalLinks} />
              </div>
              <div className="mt-6">
                <ChartComponent links={links}/>
              </div>
            </div>
            <RecentLinks links={links}/>
            
            <RecentQRCode links={links} handleDelete={handleDeleteUrl}/>
            </div>
          }
        />

        {/* Manage Links */}
        <Route path="links" element={<LinkTable links={links} handleDelete={handleDeleteUrl}/>} />


        {/* Settings */}
        <Route
          path="settings"
          element={
              <div className="mt-4">
                <Setting/>
              </div>
          }
        />
      </Route>
    </Routes>
  );
}

export default DashboardRoutes;
