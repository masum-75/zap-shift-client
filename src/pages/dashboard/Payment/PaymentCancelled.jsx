import React from 'react';
import { Link } from 'react-router';


const PaymentCancelled = () => {
    return (
        <div>
            <h2>Your payment is cancelled. Please Try again</h2>
            <Link to='/dashboard/my-parcels' className='btn btn-sm bg-[#CAEB66] text-black'>Try Again</Link>
            
        </div>
    );
};

export default PaymentCancelled;