import React, { useState } from 'react';
import { TECollapse } from "tw-elements-react";
export default function InlinePage(): JSX.Element {

  const posts = [
    {
      post: 'Minister',
      specialties: [
        'Financial Law',
        'Macroeconomics',
        'Public Administration'
      ]
    },
    {
      post: 'Legal Department',
      specialties: [
        'Corporate Law',
        'Tax Law',
        'Labor Law',
        'Land Law',
        'Intellectual Property'
      ]
    },
    {
      post: 'Department of Revenue Policy and Administration Methodology',
      specialties: [
        'Public Finance',
        'Budgeting',
        'Financial Statement Analysis'
      ]
    },
    {
      post: 'Budget Process Coordination Management',
      specialties: [
        'Financial Control',
        'Audit',
        'Risk Management'
      ]
    },
    {
      post: 'Management of Social Program Budgeting Organization',
      specialties: [
        'Social Policy',
        'Social Protection',
        'Healthcare'
      ]
    },
    {
      post: 'Management of Economic Program Budgeting Organization',
      specialties: [
        'Economic Analysis',
        'Economic Forecasting',
        'Investment Policy'
      ]
    },
    {
      post: 'Department of Financial-Budgetary Control',
      specialties: [
        'Financial Monitoring',
        'Budget Execution Control',
        'Financial Discipline'
      ]
    },
    {
      post: 'Budget Execution Reporting Management',
      specialties: [
        'Financial Reporting',
        'Statistical Analysis',
        'Financial Analytics'
      ]
    },
    {
      post: 'Macroeconomic Policy Management',
      specialties: [
        'Macroeconomic Modeling',
        'Economic Stability',
        'Currency Regulation'
      ]
    },
    {
      post: 'International Cooperation Management',
      specialties: [
        'International Finance',
        'Foreign Economic Relations',
        'Diplomatic Relations'
      ]
    }
  ];
  
  


  const [activeElement, setActiveElement] = useState("");
  const handleClick = (value: string) => {
    setActiveElement(activeElement === value ? "" : value);
  };
  return (
    <div className='flex flex-col gap-[16px]'>
      {posts.map((post, index) => (

        <div key={index} id="accordionExample" >
          <div className=" border border-neutral-200 bg-white">
            <h2 className="mb-0" id="headingOne">
              <button
                className={`${activeElement === `${index}` && ""} !bg-[#fafafa] group relative flex w-full gap-[12px] items-center border-[1px]  px-5 py-4 text-left text-neutral-800  `}
                type="button"
                onClick={() => handleClick(`${index}`)}
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                <p className='order-2 w-full text-[14px]'>{post.post}</p>
                <span
                  className={`${activeElement === `${index}`
                    ? ` `
                    : `rotate-[0deg] fill-[#212529] dark:fill-white`
                    } order-1 flex rotate-[90deg] justify-center items-center h-5 w-5  transition-transform duration-200 ease-in-out `}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M9.39777 5.66233L3.36027 0.9467C3.34449 0.93428 3.32553 0.926562 3.30557 0.924431C3.2856 0.9223 3.26544 0.925844 3.2474 0.934655C3.22936 0.943466 3.21417 0.957188 3.20357 0.974243C3.19298 0.991299 3.18741 1.011 3.1875 1.03108V2.06634C3.1875 2.13197 3.2183 2.19491 3.2692 2.23509L8.09063 5.99983L3.2692 9.76456C3.21697 9.80474 3.1875 9.86768 3.1875 9.93331V10.9686C3.1875 11.0583 3.29063 11.1079 3.36027 11.053L9.39777 6.33733C9.44908 6.2973 9.4906 6.2461 9.51915 6.18761C9.5477 6.12913 9.56254 6.06491 9.56254 5.99983C9.56254 5.93475 9.5477 5.87052 9.51915 5.81204C9.4906 5.75356 9.44908 5.70235 9.39777 5.66233Z" fill="black" />
                  </svg>
                </span>
              </button>
            </h2>
            <TECollapse
              show={activeElement === `${index}`}
              className="!mt-0 !shadow-none"
            >
              <div className="px-5 py-4">
                <ul className='list-disc list-inside'>
                  {post.specialties.map((specialtie, index) => (
                    <li key={index}>
                      {specialtie}
                    </li>
                  ))}
                </ul>
              </div>
            </TECollapse>
          </div>
        </div>
      ))}
    </div>

  );
}
