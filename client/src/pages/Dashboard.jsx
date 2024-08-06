import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../components/DashSidebar";
import DashProfile from "../components/DashProfile";
import DashPosts from "../components/DashPosts";
import DashUsers from "../components/DashUsers";
import DashComments from "../components/DashComments";
import DashboardComp from "../components/DashboardComp";

function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* sidebar */}
      <div className="md:w-56">
        <DashSidebar />
      </div>
      {/* sidebar end */}

      {/* profile... */}
      {tab === "profile" && <DashProfile />}
      {/* profile end */}

      {/* posts */}
      {tab === "posts" && <DashPosts />}
      {/* posts end */}

      {/* users start */}
      {tab === "users" && <DashUsers />}
      {/* users end */}

      {/* dashboard comments start */}
      {tab === "comments" && <DashComments />}
      {/* dashboard comments end */}

      {/* dashboard comments */}
      {tab === "dash" && <DashboardComp />}
      {/* dashboard comments end */}
    </div>
  );
}

export default Dashboard;
