import React, { useEffect, useState } from 'react';
import './Home.css';
import { apibaseurl, callApi, imgurl } from '../lib';
import ProgressBar from './ProgressBar';
import Roles from '../Roles';
import AdminUsers from '../AdminUsers';
import UserManager from '../UserManager';

const Home = () => {

    const [fullname, setFullname] = useState("");
    const [isProgress, setIsProgress] = useState(false);
    const [menuList, setMenuList] = useState([]);
    const [selectedMenu, setSelectedMenu] = useState("Dashboard");

    useEffect(() => {

        const token = localStorage.getItem("token");

        if (!token)
            logout();

        else {

            setIsProgress(true);

            callApi(
                "GET",
                apibaseurl + "/authservice/uinfo",
                null,
                null,
                loadUinfo,
                token
            );
        }

    }, []);

    function loadUinfo(res) {

        setIsProgress(false);

        if (res.code != 200)
            return;

        setFullname(res.fullname);

        setMenuList(res.menulist);
    }

    function logout() {

        localStorage.clear();

        window.location.replace("/");
    }

    function handleMenuClick(menu) {

        setSelectedMenu(menu.menu);
    }

    function renderContent() {

        if(selectedMenu === "User Manager")
    return <UserManager />;

        if(selectedMenu === "Admin Users")
    return <AdminUsers />;

        if (selectedMenu === "Role")
            return <Roles />;

        return (
            <div>
                Content
            </div>
        );
    }

    return (

        <div className='home'>

            <div className='home-header'>

                <img src="/logo.png" alt='' />

                <div className='info'>

                    {fullname}

                    <img
                        src="/shutdown.png"
                        alt=''
                        onClick={() => logout()}
                    />

                </div>

            </div>

            <div className='home-workspace'>

                <div className='home-menus'>

                    <ul>

                        {menuList.map((m) => (

                            <li
                                key={m.mid}
                                onClick={() => handleMenuClick(m)}
                            >

                                <img src={imgurl + m.icon} alt='' />

                                {m.menu}

                            </li>

                        ))}

                    </ul>

                </div>

                <div className='home-content'>

                    {renderContent()}

                </div>

            </div>

            <div className='home-footer'>
                Copyright @ 2026. All rights reserved.
            </div>

            <ProgressBar isProgress={isProgress} />

        </div>
    );
}

export default Home;