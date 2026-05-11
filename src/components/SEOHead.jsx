import React from 'react'
import { Helmet } from 'react-helmet-async'
import { DUMMY_SETTINGS } from '../data/dummyData'

const SEOHead = ({ title, description, image, url }) => {
  const fullTitle = title ? `${title} | ${DUMMY_SETTINGS.company_name}` : DUMMY_SETTINGS.company_name
  const fullDescription = description || DUMMY_SETTINGS.company_tagline

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:type" content="website" />
      {image && <meta property="og:image" content={image} />}
      {url && <meta property="og:url" content={url} />}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
    </Helmet>
  )
}

export default SEOHead
