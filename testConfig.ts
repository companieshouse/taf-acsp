export const testConfig = {
  baseUrl: process.env.BASE_URL,
  userName: process.env.USERNAME,
  password: process.env.PASSWORD,
  empty_credentials: "Please provide USERNAME and PASSWORD",
  empty_url: "Please provide the BASE_URL",
  startPageTitle:
    " Apply to register as a Companies House authorised agent - GOV.UK",
  nameTitle:
    "What is your name? - Apply to register as a Companies House authorised agent - GOV.UK",
  dobTitle:
    "What is your date of Birth? - Apply to register as a Companies House authorised agent - GOV.UK",
  typeOfBusiness: "/what-business-type",
  soleTrader: {
    name: "/sole-trader/what-is-your-name",
    dateOfBirth: "/sole-trader/what-is-your-date-of-birth",
    nationality: "/sole-trader/what-is-your-nationality",
    whereDoYouLive: "/sole-trader/where-do-you-live",
    addressAutoLookUp: "/sole-trader/correspondence-address-lookup",
    addressSelect: "/sole-trader/select-your-correspondence-address",
    addressManualEntry: "/sole-trader/correspondence-address-manual-entry",
    whichSector: "/sole-trader/which-sector",
    whichSectorOther: "/sole-trader/which-sector-other",
  },
};
