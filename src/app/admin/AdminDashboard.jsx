import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa6";
import { IoLogInOutline } from "react-icons/io5";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import NotiFication from "@/pages/NotiFications/Notification";
import { setNotificationRelatedState } from "@/store/Notification";
import HouseFormModal from "./schema/HouseModal";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationAddIcon from '@mui/icons-material/NotificationAdd';
import { AppBar, Toolbar, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, CssBaseline } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import PaymentIcon from "@mui/icons-material/Payment";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge from "@mui/material/Badge";
import AnalyticsIcon from '@mui/icons-material/Analytics';
import ChatIcon from '@mui/icons-material/Chat';

const Dashboard = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const { pathname } = useLocation();
  const { userId } = useParams()
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authState = useSelector((state) => state.auth.authState);
  const notificationState = useSelector((state) => state.notification.notificationRelatedState);

  const handleUserLogout = () => {
    toast.success("Logout Successful");
    localStorage.removeItem("token");
    navigate("/");
  };

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  const onNotification = () => {
    dispatch(setNotificationRelatedState({
      ...notificationState,
      hasNewNotification: true,
    }));
  };

  const onPaymentNavigation = () => {
    navigate('/PaymentHistory')
  };

  // Close the drawer when the pathname changes to a specific screen (e.g., profile or payment history)
  useEffect(() => {
    if (pathname === '/profile' || pathname === '/user/payment-history') {
      setDrawerOpen(false); // Close drawer when navigating to these pages
    } else {
      setDrawerOpen(true); // Open drawer on other pages
    }
  }, [pathname]); // Only run when the pathname changes

  const role= localStorage.getItem('role')

  return (
    <div className="dashboard">
      <CssBaseline />
      <AppBar style={{ backgroundColor: "#2b0057" }} position="fixed">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
          <SectionHeading className="text-2xl sm:text-3xl sm:text-left">
            {role === "admin" ? "Admin Dashboard" : "User Dashboard"}
          </SectionHeading>
          <Button size="icon" onClick={handleUserLogout} style={{ marginLeft: "auto" }}>
            <LogoutIcon />
          </Button>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
        <List style={{ width: 245 }}>
          <ListItem sx={{ backgroundColor: "#F3E6F4", marginTop: 1, borderRadius: 2 }} button component={Link} to="/">
            <ListItemIcon>
              <HomeIcon sx={{ color: "#2b0057" }} />
            </ListItemIcon>
            <ListItemText sx={{ color: "#2b0057" }} primary="Home" />
          </ListItem>
          <ListItem sx={{ backgroundColor: "#F3E6F4", marginTop: 0.4, borderRadius: 2 }} button component={Link} to={`/user/${authState.id}/payment-history`}>
            <ListItemIcon>
              <PaymentIcon sx={{ color: "#2b0057" }} />
            </ListItemIcon>
            <ListItemText sx={{ color: "#2b0057" }} primary="Payments" />
          </ListItem>
          <ListItem sx={{ backgroundColor: "#F3E6F4", marginTop: 0.4, borderRadius: 2 }} style={{ cursor: "pointer" }} button onClick={onNotification}>
            <ListItemIcon>
              {notificationState.notificationList.length >= 1 ? (
                <NotificationAddIcon sx={{ color: "red" }} />
              ) : (
                <NotificationsIcon sx={{ color: "#2b0057" }} />
              )}
            </ListItemIcon>
            <ListItemText sx={{ color: "#2b0057" }} primary="Notifications" />
          </ListItem>
          <ListItem sx={{ backgroundColor: "#F3E6F4", marginTop: 0.4, borderRadius: 2 }} button component={Link} to="/analytics">
            <ListItemIcon>
              <AnalyticsIcon sx={{ color: "#2b0057" }} />
            </ListItemIcon>
            <ListItemText sx={{ color: "#2b0057" }} primary="Analytics" />
          </ListItem>
          <ListItem sx={{ backgroundColor: "#F3E6F4", marginTop: 0.4, borderRadius: 2 }} button component={Link} to={`/profile/${authState.id}`}>
            <ListItemIcon>
              <AccountCircleIcon sx={{ color: "#2b0057" }} />
            </ListItemIcon>
            <ListItemText sx={{ color: "#2b0057" }} primary="Profile" />
          </ListItem>
          <ListItem sx={{ backgroundColor: "#F3E6F4", marginTop: 0.4, borderRadius: 2 }} button onClick={handleUserLogout}>
            <ListItemIcon>
              <ChatIcon sx={{ color: "#2b0057" }} />
            </ListItemIcon>
            <ListItemText sx={{ color: "#2b0057" }} primary="Chat" />
          </ListItem>
          <ListItem sx={{ backgroundColor: "#F3E6F4", marginTop: 0.4, borderRadius: 2 }} button onClick={handleUserLogout}>
            <ListItemIcon>
              <LogoutIcon sx={{ color: "#2b0057" }} />
            </ListItemIcon>
            <ListItemText sx={{ color: "#2b0057" }} primary="Logout" />
          </ListItem>
          
        </List>
      </Drawer>

      <main className="content" style={{ marginTop: "80px", padding: "20px" }}>
        <NotiFication />
        <div className="flex justify-center w-full mb-10">
          {localStorage.getItem('role')==='admin' && (
            <Button className="flex items-center" onClick={() => setOpen(true)}>
              <FaPlus className="-mb-0.5 w-4 h-4" />
              <span className="ml-2">Add New House</span>
            </Button>
          )}
        </div>

        <HouseFormModal onClose={() => setOpen(false)} open={open} />
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
