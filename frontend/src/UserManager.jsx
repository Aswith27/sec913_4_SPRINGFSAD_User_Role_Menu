import { useEffect, useState } from 'react';
import './UserManager.css';
import { apibaseurl, callApi } from './lib';

function UserManager() {

    const [users, setUsers] = useState([]);

    useEffect(() => {

        callApi(
            "GET",
            apibaseurl + "/authservice/listusers",
            null,
            null,
            loadUsers
        );

    }, []);

    function loadUsers(res) {

        setUsers(res);
    }

    return (

        <div className="user-manager">

            <h2>User Manager</h2>

            <table>

                <thead>

                    <tr>
                        <th>ID</th>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Role</th>
                    </tr>

                </thead>

                <tbody>

                    {users.map((u) => (

                        <tr key={u.id}>

                            <td>{u.id}</td>
                            <td>{u.fullname}</td>
                            <td>{u.email}</td>
                            <td>{u.phone}</td>
                            <td>{u.role}</td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}

export default UserManager;