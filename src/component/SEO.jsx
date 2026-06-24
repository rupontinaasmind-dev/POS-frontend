import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function SEO({ title, description, keywords, ogImage, url }) {
    const siteName = "Markt POS";
    const defaultTitle = "Markt POS - The Best Point of Sale for Grocery Stores";
    const defaultDescription = "Markt POS is the leading point of sale system designed specifically for grocery stores, supermarkets, and specialty markets.";
    const defaultKeywords = "POS, Point of Sale, Grocery Store POS, Retail Software, Markt POS, Cash Register";
    const defaultImage = "https://marktpos.app/og-image.jpg"; // Replace with actual URL if available

    return (
        <Helmet>
            <title>{title ? `${title} | ${siteName}` : defaultTitle}</title>
            <meta name="description" content={description || defaultDescription} />
            <meta name="keywords" content={keywords || defaultKeywords} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={url || "https://marktpos.app"} />
            <meta property="og:title" content={title ? `${title} | ${siteName}` : defaultTitle} />
            <meta property="og:description" content={description || defaultDescription} />
            <meta property="og:image" content={ogImage || defaultImage} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={url || "https://marktpos.app"} />
            <meta property="twitter:title" content={title ? `${title} | ${siteName}` : defaultTitle} />
            <meta property="twitter:description" content={description || defaultDescription} />
            <meta property="twitter:image" content={ogImage || defaultImage} />
        </Helmet>
    );
}
