import { useState } from 'react';
import './Roles.css';
import { apibaseurl, callApi } from './lib';

function Roles() {

    const [roleName, setRoleName] = useState("");
    const [menuName, setMenuName] = useState("");
    const [selectedRole, setSelectedRole] = useState("");

    const [menus, setMenus] = useState({
        dashboard: false,
        mytask: false,
        taskmanager: false,
        usermanager: false,
        myprofile: false,
        role: false
    });

    function addRole() {

        const data = {
            role: Date.now(),
            rolename: roleName
        };

        callApi(
            "POST",
            apibaseurl + "/authservice/addrole",
            data,
            null,
            roleResponse
        );
    }

    function roleResponse(res) {

        alert(res.message);

        setRoleName("");
    }

    function addMenu() {

        const data = {
            mid: Date.now(),
            menu: menuName,
            icon: "default.png"
        };

        callApi(
            "POST",
            apibaseurl + "/authservice/addmenu",
            data,
            null,
            menuResponse
        );
    }

    function menuResponse(res) {

        alert(res.message);

        setMenuName("");
    }

    function handleCheckbox(e) {

        const { name, checked } = e.target;

        setMenus({
            ...menus,
            [name]: checked
        });
    }

    function addMapping() {

        if(selectedRole === "")
        {
            alert("Select Role");
            return;
        }

        const roleId = parseInt(selectedRole);

        if(menus.dashboard)
            mapRole(roleId, 1);

        if(menus.mytask)
            mapRole(roleId, 2);

        if(menus.taskmanager)
            mapRole(roleId, 3);

        if(menus.usermanager)
            mapRole(roleId, 4);

        if(menus.myprofile)
            mapRole(roleId, 5);

        if(menus.role)
            mapRole(roleId, 6);

        alert("Mapping Completed");
    }

    function mapRole(roleId, menuId) {

        const data = {
            role: roleId,
            mid: menuId
        };

        callApi(
            "POST",
            apibaseurl + "/authservice/maprole",
            data,
            null,
            ()=>{}
        );
    }

    return (

        <div className="roles-page">

            <div className="role-box">

                <h3>Roles</h3>

                <div className="role-inputs">

                    <input
                        type="text"
                        placeholder="Enter role"
                        value={roleName}
                        onChange={(e) => setRoleName(e.target.value)}
                    />

                    <button onClick={() => addRole()}>
                        Add Role
                    </button>

                </div>

            </div>

            <div className="role-box">

                <h3>Menu</h3>

                <div className="role-inputs">

                    <input
                        type="text"
                        placeholder="Enter menu"
                        value={menuName}
                        onChange={(e) => setMenuName(e.target.value)}
                    />

                    <button onClick={() => addMenu()}>
                        Add
                    </button>

                </div>

            </div>

            <div className="role-box">

                <h3>Map Menu with Roles</h3>

                <div className="map-container">

                    <div className="left-side">

                        <select
                            value={selectedRole}
                            onChange={(e)=>setSelectedRole(e.target.value)}
                        >
                            <option value="">Select Role</option>
                            <option value="1">User</option>
                            <option value="2">Manager</option>
                            <option value="3">Admin</option>
                        </select>

                    </div>

                    <div className="middle-side">

                        <label>
                            <input
                                type="checkbox"
                                name="dashboard"
                                onChange={handleCheckbox}
                            />
                            Dashboard
                        </label>

                        <label>
                            <input
                                type="checkbox"
                                name="mytask"
                                onChange={handleCheckbox}
                            />
                            My Task
                        </label>

                        <label>
                            <input
                                type="checkbox"
                                name="taskmanager"
                                onChange={handleCheckbox}
                            />
                            Task Manager
                        </label>

                        <label>
                            <input
                                type="checkbox"
                                name="usermanager"
                                onChange={handleCheckbox}
                            />
                            User Manager
                        </label>

                        <label>
                            <input
                                type="checkbox"
                                name="myprofile"
                                onChange={handleCheckbox}
                            />
                            My Profile
                        </label>

                        <label>
                            <input
                                type="checkbox"
                                name="role"
                                onChange={handleCheckbox}
                            />
                            Role
                        </label>

                    </div>

                    <div className="right-side">

                        <button onClick={()=>addMapping()}>
                            Add
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Roles;