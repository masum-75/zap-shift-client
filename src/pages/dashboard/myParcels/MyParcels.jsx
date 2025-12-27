import { useQuery } from "@tanstack/react-query";
import React from "react";
import UseAuth from "../../../hooks/UseAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { HiOutlineDocumentMagnifyingGlass } from "react-icons/hi2";
import Swal from "sweetalert2";
import { Link } from "react-router";

const MyParcels = () => {
  const { user } = UseAuth();
  const axiosSecure = useAxiosSecure();
  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["myParcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
  });

  const handleParcelDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {

        axiosSecure.delete(`/parcels/${id}`)
        .then(res=>{
            console.log(res.data);

            if(res.data.deletedCount){
                refetch();
               Swal.fire({
          title: "Deleted!",
          text: "Your parcel request has been deleted.",
          icon: "success",
        });
            }
        })
       
      }
    });
  };
  const handlePayment = async(parcel) =>{
    const paymentInfo ={
      cost: parcel.cost,
      parcelName: parcel.parcelName,
      senderEmail: parcel.senderEmail,
      parcelId: parcel._id,
    }

    const res = await axiosSecure.post('/payment-checkout-session', paymentInfo)
    window.location.href = res.data.url;
  }
  return (
    <div>
      <h2>Here is my parcels : {parcels.length}</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>SL</th>
              <th>Name</th>
              <th>Cost</th>
              <th>Payment</th>
              <th>Tracking ID</th>
              <th>Delivery Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={parcel._id}>
                <th>{index + 1}</th>
                <td>{parcel.parcelName}</td>
                <td>{parcel.cost}</td>
                <td>{
                  parcel.paymentStatus==='paid' ?
                  <span className="text-green-500">paid</span> 
                  : <button onClick={()=>handlePayment(parcel)} className="btn btn-sm bg-[#CAEB66] text-black">pay</button>
                  // <Link to={`/dashboard/payment/${parcel._id}`}>
                  //   <button className="btn btn-sm bg-[#CAEB66] text-black">pay</button>
                  // </Link>
                    }</td>
                <td>{parcel.trackingId}</td>
                <td>{parcel.deliveryStatus}</td>
                <td className="">
                  <button className="btn btn-square hover:bg-[#CAEB66]">
                    <HiOutlineDocumentMagnifyingGlass />
                  </button>
                  <button className="btn btn-square mx-2 hover:bg-[#CAEB66]">
                    <FaRegEdit />
                  </button>
                  <button
                    onClick={() => handleParcelDelete(parcel._id)}
                    className="btn btn-square hover:bg-[#CAEB66]"
                  >
                    <MdDeleteForever />
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

export default MyParcels;
