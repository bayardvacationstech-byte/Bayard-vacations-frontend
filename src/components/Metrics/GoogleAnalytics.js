"use client";

import Script from "next/script";

const GoogleAnalytics = ({ gaId }) => {
  return (
    <>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
      />
      <Script
        id={`google-analytics-init-${gaId}`}
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());

                    gtag('config', '${gaId}');
                    `,
        }}
      />
    </>
  );
};

export default GoogleAnalytics;
