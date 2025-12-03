import React from 'react';
import Banner from '../Banner/Banner';
import HowItWorks from '../../../components/HowItWorks/HowItWorks';
import Services from '../../services/Services';
import Brands from '../Brands/Brands';
import Reviews from './reviews/Reviews';

const reviewsPromise = fetch('/public/data/reviews.json').then(res => res.json());

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <HowItWorks></HowItWorks>
            <Services></Services>
            <Brands></Brands>
            <Reviews reviewsPromise={reviewsPromise}></Reviews>
        </div>
    );
};

export default Home;