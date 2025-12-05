import React from "react";
import { useForm, useWatch } from "react-hook-form";
import UseAuth from "../../hooks/UseAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";

const Rider = () => {
  const {
    register,
    handleSubmit,
    control,
    // formState: { errors },
  } = useForm();
  const { user } = UseAuth();

  const axiosSecure = useAxiosSecure();

  const serviceCenters = useLoaderData();
  const regionsDuplicate = serviceCenters.map((c) => c.region);
  const regions = [...new Set(regionsDuplicate)];
  //   explore useWatch,useMemo useCallBack
  const districtByRegions = (region) => {
    const regionDistricts = serviceCenters.filter((c) => c.region === region);
    const districts = regionDistricts.map((d) => d.district);
    return districts;
  };

  const riderRegion = useWatch({ control, name: "region" });

  const handleRiderApplication = (data) => {
    console.log(data);
    axiosSecure.post("/riders", data).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title:
            "Your Application has been submitted. we will reach to you soon",
          showConfirmButton: false,
          timer: 2500,
        });
      }
    });
  };
  return (
    <div>
      <h2 className="text-4xl font-bold">Be A Rider</h2>
      <form
        onSubmit={handleSubmit(handleRiderApplication)}
        className="mt-12 p-4 text-black"
      >
        {/* sender and Receiver info */}
        <div className="grid-cols-1 gap-12">
          {/* sender details */}
          <fieldset className="fieldset">
            <h2 className="text-2xl font-semibold">Rider Details</h2>
            {/* name */}
            <label className="label">Your Name</label>
            <input
              type="text"
              {...register("name")}
              defaultValue={user?.displayName}
              className="input w-full"
              placeholder="Rider Name"
            />
            {/* Email */}
            <label className="label">Your Email</label>
            <input
              type="text"
              {...register("email")}
              defaultValue={user?.email}
              className="input w-full"
              placeholder="Rider Email"
            />
            {/* phone number */}
            <label className="label">Your Phone Number</label>
            <input
              type="tel"
              {...register("phone")}
              className="input w-full"
              placeholder="Your Phone Number"
            />
            {/* NID number */}
            <label className="label">Your NID Number</label>
            <input
              type="tel"
              {...register("nid")}
              className="input w-full"
              placeholder="Your NID Number"
            />
            {/* region */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Your Region</legend>
              <select
                defaultValue="Pick a Region"
                {...register("region")}
                className="select"
              >
                <option disabled={true}>Pick a Region</option>
                {regions.map((r, i) => (
                  <option key={i} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </fieldset>

            {/* district */}

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Your District</legend>
              <select
                defaultValue="Pick a District"
                {...register("district")}
                className="select"
              >
                <option disabled={true}>Pick a District</option>
                {districtByRegions(riderRegion).map((r, i) => (
                  <option key={i} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </fieldset>

            {/* address */}
            <label className="label">Your Address</label>
            <input
              type="text"
              {...register("address")}
              className="input w-full"
              placeholder="Your Address"
            />
          </fieldset>

          <fieldset className="fieldset">
            {/* Email*/}
            <label className="label">BIKE</label>
            <input
              type="text"
              {...register("bike")}
              className="input w-full"
              placeholder="Bike"
            />

            {/* instruction */}
            <label className="label">Delivery Instruction</label>
            <textarea
              {...register("deliveryInstruction")}
              className="textarea input w-full"
              placeholder="Delivery Instruction..."
              rows={4}
            />
          </fieldset>
        </div>
        <input
          type="submit"
          className="btn bg-[#CAEB66] mt-8 text-black"
          value="Apply as a rider"
        />
      </form>
    </div>
  );
};

export default Rider;
