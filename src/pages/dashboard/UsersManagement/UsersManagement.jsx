import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaUserShield } from "react-icons/fa";
import { FiShieldOff } from "react-icons/fi";
import Swal from "sweetalert2";

const UsersManagement = () => {
  const axiosSecure = useAxiosSecure();

  const {refetch, data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users`);
      return res.data;
    },
  });

  const handleMakeAdmin = (user) => {
  Swal.fire({
    title: "Are you sure?",
    text: `You want to make ${user.displayName} an admin?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, make admin!"
  }).then((result) => {
    if (result.isConfirmed) {
      const roleInfo = { role: "admin" };

      axiosSecure.patch(`/users/${user._id}/role`, roleInfo).then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          Swal.fire({
            icon: "success",
            title: `${user.displayName} is now an admin`,
            timer: 2000,
            showConfirmButton: false,
          });
        }
      });
    }
  });
};
  const handleRemoveAdmin = (user) => {
  Swal.fire({
    title: "Are you sure?",
    text: `Remove ${user.displayName} from admin role?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Remove Admin"
  }).then((result) => {
    if (result.isConfirmed) {
      const roleInfo = { role: "user" };

      axiosSecure.patch(`/users/${user._id}/role`, roleInfo).then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          Swal.fire({
            icon: "success",
            title: `${user.displayName} is removed from admin`,
            timer: 2000,
            showConfirmButton: false,
          });
        }
      });
    }
  });
};

  return (
    <div>
      <h2 className="text-4xl">Manage Users: {users.length}</h2>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Admin Actions</th>
              <th>Other Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={user.photoURL}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user.displayName}</div>
                      <div className="text-sm opacity-50">{user.role}</div>
                    </div>
                  </div>
                </td>
                <td>
                  {user.email}
                  
                </td>
                <td>
                  {user.role}
                  
                </td>
                <td>
                    {user.role === 'admin' ? <button onClick={()=>handleRemoveAdmin(user)} className="btn bg-red-400"><FiShieldOff></FiShieldOff></button> : <button
                       onClick={()=>handleMakeAdmin(user)}
                       className="btn bg-green-500"><FaUserShield></FaUserShield></button>
                    }
                </td>
                <th>
                  <button className="btn btn-ghost btn-xs">Actions</button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersManagement;
