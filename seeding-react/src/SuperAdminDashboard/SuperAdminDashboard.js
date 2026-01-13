import { useContext, useEffect, useState } from 'react';
import './SuperAdminDashboard.css';
import RegisterForm from '../register/registerFrom';
import apiFetch from '../middleware/apiFetch';
import Cookies from 'js-cookie';
import { UserContext } from '../context/UserContext';
import { useLocation, useNavigate } from 'react-router-dom';

const SuperAdminDashboard = ({ Token }) => {
    const navigate = useNavigate();
    const [TotalNumbers, settotalNumbers] = useState('');
    const { username } = useContext(UserContext);
    const [Info, setInfo] = useState([]);
    const [formOpen, setformOpen] = useState(false);
    const [editId, seteditId] = useState('');
    const [updateData, setUpdateData] = useState('');
    const location = useLocation();



    // useEffect(() => {
    //     const handler = () => {
    //         if(location.state.DashFlag){
    //             window.history.pushState(null,document.title,window.location.href)
    //         }

    //     }
    //     window.addEventListener('popstate', handler)

    // },[location])



    const ClickLogout = () => {
        navigate('/LogoutPopUp')

    }

    useEffect(() => {
        PassToChild();

    }, [])
    const PassToChild = () => {
        fetchTotalNumbers();
        fetchAndDisplaydata();
    }
    // const fetchTotalNumbers = async () => {
    //     try {
    //         const response = await fetch('http://localhost:3000/auth/NumberData', {
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             }
    //         })


    //         const data = await response.json();
    //         // console.log(data);

    //         settotalNumbers(data);
    //     } catch (error) {
    //         console.log(error);
    //     }

    // }

    const fetchTotalNumbers = async () => {
        try {
            const response = await apiFetch('http://localhost:3000/auth/NumberData', {
                method: 'GET',
            })
            const data = await response.json();
            console.log(data);

            settotalNumbers(data);
        } catch (error) {
            console.log(error);



        }

    }




    const fetchAndDisplaydata = async () => {
        try {
            const response = await apiFetch('http://localhost:3000/auth/get/getInfo', {
                method: 'GET',
                // headers: {
                //     'Content-Type': 'application/json',


                // }
            })
            const data = await response.json();
            setInfo(data);
        } catch (error) {

        }
    }
    const handleOnclick = () => {
        fetchAndDisplaydata();
    }
    const OpenForm = () => {
        setformOpen(true);
    }
    const CloseForm = () => {
        setformOpen(false);
        setUpdateData('');

    }
    const token = Cookies.get('token')
    const onClickdelete = async (id) => {
        try {
            const response = await apiFetch(`http://localhost:3000/auth/deleteUI/${id}`, {
                method: 'DELETE',
            })
            fetchAndDisplaydata();
            fetchTotalNumbers();
        } catch (error) {
            console.log(error);
        }
    }
    const onclickEdit = (item) => {
        seteditId(item.id);
        setUpdateData(item);
        // setformOpen(true)
    }

    const EmptyUpdateDate = () => {
        setUpdateData(null);
        seteditId(null);

    }
    return (
        <div className="dashboard">
            {/* Sidebar */}
            <aside className="sidebar">
                <div className="logo">
                    Super<span>Admin</span>
                </div>
                <nav className="nav">
                    <a className="active">Dashboard</a>
                    <a onClick={handleOnclick}>Users</a>
                </nav>
            </aside>
            {/* Main */}
            <main className="main">
                <div className="topbar">
                    <h1>Dashboard Overview</h1>
                    <div className="btn-wrapper">
                        <button className="register-btn" onClick={OpenForm}>Create</button>
                        {formOpen && (
                            <RegisterForm onClose={CloseForm} methods={PassToChild} editData={updateData} editId={editId} empty={EmptyUpdateDate} />)}
                    </div>
                    <div className="profile">
                        <div className="avatar">{username}</div>
                        <button className="logout-btn" onClick={ClickLogout}>Logout</button>
                    </div>
                </div>
                <section className="cards">
                    <div className="card success">
                        <h3>TotalUsers</h3>
                        <div className="value">{TotalNumbers.totalUser}</div>
                    </div>

                    <div className="card">
                        <h3>SuperAdmins</h3>
                        <div className="value">{TotalNumbers.superAdmin}</div>
                    </div>

                    <div className="card warning">
                        <h3>Admins</h3>
                        <div className="value">{TotalNumbers.admin}</div>
                    </div>

                    <div className="card danger">
                        <h3>Users</h3>
                        <div className="value">{TotalNumbers.user}</div>
                    </div>
                </section>

                {/* Table */}
                <section className="table-card">
                    <h2>TotalUsers</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Info.map((item) => {
                                const { id, username, email, name } = item;
                                return (
                                    <tr key={item.id}>
                                        <td>{username}</td>
                                        <td>{email}</td>
                                        <td>{name}</td>
                                        <td>
                                            <span className="status active">Active</span>
                                        </td>
                                        <td className="btn-row">
                                            <button className="register-btn edit-btn" onClick={() => { onclickEdit(item); OpenForm() }}>Edit</button>
                                            <button className="register-btn delete-btn" onClick={() => { onClickdelete(id) }}>Delete</button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </section>
            </main>
        </div>

    )
}
export default SuperAdminDashboard;