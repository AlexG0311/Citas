import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, User } from "@heroui/react";
import { useNavigate } from 'react-router-dom';
import { useTheme } from "@/context/ThemeContext";
function UserProfile() {

  const { theme, toggleTheme } = useTheme();

  const navigate = useNavigate();

  const handleAction = async (key) => {
    if (key === "logout") {
      try {
        const res = await fetch("http://localhost:5000/logout", {
          method: "POST",
          credentials: "include", // ✅ Necesario para borrar cookie
        });

        if (res.ok) {
          navigate("/login"); // 🔐 Redirige al login
        } else {
          console.error("Error al cerrar sesión");
        }
      } catch (error) {
        console.error("Error de red al cerrar sesión", error);
      }
    }
  };

  return (
    <Dropdown placement="bottom-start"  className="dark:bg-black">
      <DropdownTrigger>
        <User
          as="button"
          avatarProps={{
            isBordered: true,
            src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
          }}
          className="transition-transform"
          description="@alexg11"
          name="Alex G"
        />
      </DropdownTrigger>
      
      <DropdownMenu aria-label="User Actions" variant="flat" onAction={handleAction}   closeOnSelect={false}>
        <DropdownItem key="profile" className="h-14 gap-30  dark:bg-black">
          
          <p className="font-bold text-black dark:text-white  ">Signed in as</p>
         
     
          <p className="font-bold text-black dark:text-white">@Alex G</p>
     
        </DropdownItem>
        <DropdownItem key="mode" className="h-14 gap-30  dark:bg-black">  
         <label className="toggle text-base-content ">
          <input type="checkbox" value="synthwave" className="theme-controller" onClick={toggleTheme}/>

        { theme === "light" ? ( <svg aria-label="sun" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41">
          </path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2">
          </path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></g></svg>
          ) : ( <svg aria-label="moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor">
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></g></svg>)
        }
          </label>
        </DropdownItem>
     
        <DropdownItem key="logout" color="danger" className="font-bold text-black dark:text-white">
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}


export default UserProfile;
