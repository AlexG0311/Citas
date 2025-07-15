import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, User } from "@heroui/react";
import { useNavigate } from 'react-router-dom';

function UserProfile() {
  const navigate = useNavigate();

  const handleAction = async (key) => {
    if (key === "logout") {
      try {
        const res = await fetch("http://localhost:5000/admin/logout", {
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
    <Dropdown placement="bottom-start">
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
      
      <DropdownMenu aria-label="User Actions" variant="flat" onAction={handleAction}>
        <DropdownItem key="profile" className="h-14 gap-2">
          <p className="font-bold">Signed in as</p>
          <p className="font-bold">@Alex G</p>
        </DropdownItem>
     
        <DropdownItem key="logout" color="danger">
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

export default UserProfile;
