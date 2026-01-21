import { Head, usePage } from '@inertiajs/react';
import PortfolioApp from '../portfolio/PortfolioApp';
import { PortfolioItem, Profile, Skills } from '../portfolio/types';

type PortfolioPageProps = {
    profile: Profile;
    skills: Skills;
    portfolios: PortfolioItem[];
};

const Portfolio = () => {
    const { profile, skills, portfolios } = usePage<PortfolioPageProps>().props;

    return (
        <>
            <Head title="Personal Portofolio" />
            <PortfolioApp profile={profile} skills={skills} portfolios={portfolios} />
        </>
    );
};

export default Portfolio;
