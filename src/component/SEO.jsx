import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function SEO({ title, description, keywords, ogImage, url }) {
    const siteName = "Smart POS";
    const defaultTitle = "Smart POS - The Best All-Purpose Point of Sale";
    const defaultDescription = "Smart POS is the leading all-purpose point of sale system designed specifically for businesses of all sizes.";
    const defaultKeywords = "POS, Point of Sale, All Purpose POS, Retail Software, Smart POS, Cash Register";
    const defaultImage = "https://smartpos.app/og-image.jpg"; // Replace with actual URL if available

    return (
        <Helmet>
            <title>{title ? `${title} | ${siteName}` : defaultTitle}</title>
            <meta name="description" content={description || defaultDescription} />
            <meta name="keywords" content={keywords || defaultKeywords} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={url || "https://smartpos.app"} />
            <meta property="og:title" content={title ? `${title} | ${siteName}` : defaultTitle} />
            <meta property="og:description" content={description || defaultDescription} />
            <meta property="og:image" content={ogImage || defaultImage} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={url || "https://smartpos.app"} />
            <meta property="twitter:title" content={title ? `${title} | ${siteName}` : defaultTitle} />
            <meta property="twitter:description" content={description || defaultDescription} />
            <meta property="twitter:image" content={ogImage || defaultImage} />
        </Helmet>
    );
}
