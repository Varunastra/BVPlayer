import React from 'react'
import ContentWrapper from '../components/containers/ContentWrapper';
import notFound from "../images/404.svg";

function NotFound() {
    return (
        <ContentWrapper>
            <div className="not-found">
                <h2>Sorry, but nothing found on this page</h2>
                <img src={notFound} alt="Not found" />
            </div>
        </ContentWrapper>
    )
};

export default NotFound;
