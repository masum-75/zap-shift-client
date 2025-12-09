import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaEye, FaUserCheck } from "react-icons/fa";
import { IoPersonRemoveSharp } from "react-icons/io5";
import { FaTrashCan } from "react-icons/fa6";
import Swal from "sweetalert2";

const ApproveRiders = () => {
  const axiosSecure = useAxiosSecure();

  const {refetch, data: riders = [] } = useQuery({
    queryKey: ["riders", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders");
      return res.data;
    },
  });

  const riderUpdateStatus = (rider, status)=>{
  const updateInfo = { status: status, email: rider.email };
    axiosSecure.patch(`/riders/${rider._id}`, updateInfo).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Rider status is set to ${status}`,
          showConfirmButton: false,
          timer: 2500,
        });
      }
    });
  }

  const handleApproval = (rider) => {
   riderUpdateStatus(rider, 'approved')
  };

  const handleRejected = rider =>{
    riderUpdateStatus(rider, 'reject')
  };
   // View rider details
  const handleView = (rider) => {
    Swal.fire({
      title: `${rider.name} - Details`,
      html: `
        <p><strong>Email:</strong> ${rider.email}</p>
        <p><strong>District:</strong> ${rider.district}</p>
        <p><strong>Status:</strong> ${rider.status}</p>
        <p><strong>Phone:</strong> ${rider.phone || "N/A"}</p>
      `,
      confirmButtonText: "Close",
    });
  };

  // Delete rider
  const handleDelete = (rider) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to delete ${rider.name}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/riders/${rider._id}`).then((res) => {
          if (res.data.deletedCount) {
            refetch();
            Swal.fire("Deleted!", `${rider.name} has been deleted.`, "success");
          }
        });
      }
    });
  };

  return (
    <div>
      <h2 className="text-4xl">Rider approval pending: {riders.length}</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>SL</th>
              <th>Name</th>
              <th>Email</th>
              <th>District</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {riders.map((rider, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{rider.name}</td>
                <td>{rider.email}</td>
                <td>{rider.district}</td>
                <td>
                    <p className={`${rider.status === 'approved' ? 'text-green-800' : 'text-red-500'}`}>{rider.status}</p>
                </td>
                <td>
                  <button
                    onClick={() => handleView(rider)}
                    className="btn "
                  >
                    <FaEye></FaEye>
                  </button>
                  <button
                    onClick={() => handleApproval(rider)}
                    className="btn "
                  >
                    <FaUserCheck></FaUserCheck>
                  </button>
                  <button onClick={()=>handleRejected (rider)} className="btn ">
                    <IoPersonRemoveSharp></IoPersonRemoveSharp>
                  </button>
                  <button 
                  onClick={() => handleDelete(rider)}
                  className="btn ">
                    <FaTrashCan></FaTrashCan>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApproveRiders;
