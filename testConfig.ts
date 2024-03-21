export const testConfig = {
  env: process.env.BASE_URL,
  empty_credentials: "Please provide USERNAME and PASSWORD",
  empty_url: "Please provide the BASE_URL",

  soleTrader: {
    name: "/sole-trader/what-is-your-name",
    dateOfBirth: "/sole-trader/what-is-your-date-of-birth",
    nationality: "/sole-trader/what-is-your-nationality",
    whereDoYouLive: "/sole-trader/where-do-you-live",
    addressAutoLookUp: "/sole-trader/correspondence-address-lookup",
    addressSelect: "/sole-trader/select-your-correspondence-address",
    addressManualEntry: "/sole-trader/correspondence-address-manual-entry",
    //addressConfirm: "http://cidev.aws.chdev.org/register-as-companies-house-authorised-agent/sole-trader/confirm-your-correspondence-address",
  },
};
