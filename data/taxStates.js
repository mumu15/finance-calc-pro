const taxStates = [
  {
    "slug": "alabama",
    "name": "Alabama",
    "abbr": "AL",
    "rate": 5,
    "fedRate": 22,
    "noTax": false,
    "desc": "a low-tax Southern state with a flat income tax rate"
  },
  {
    "slug": "alaska",
    "name": "Alaska",
    "abbr": "AK",
    "rate": 0,
    "fedRate": 22,
    "noTax": true,
    "desc": "the only state with no income tax AND no sales tax"
  },
  {
    "slug": "arizona",
    "name": "Arizona",
    "abbr": "AZ",
    "rate": 2.5,
    "fedRate": 22,
    "noTax": false,
    "desc": "a Sun Belt state with one of the lowest flat tax rates"
  },
  {
    "slug": "arkansas",
    "name": "Arkansas",
    "abbr": "AR",
    "rate": 4.4,
    "fedRate": 22,
    "noTax": false,
    "desc": "a low-cost Southern state with a moderate income tax"
  },
  {
    "slug": "california",
    "name": "California",
    "abbr": "CA",
    "rate": 9.3,
    "fedRate": 22,
    "noTax": false,
    "desc": "the highest-taxed large state in the US"
  },
  {
    "slug": "colorado",
    "name": "Colorado",
    "abbr": "CO",
    "rate": 4.4,
    "fedRate": 22,
    "noTax": false,
    "desc": "a flat-tax Western state with a moderate income tax rate"
  },
  {
    "slug": "connecticut",
    "name": "Connecticut",
    "abbr": "CT",
    "rate": 6.99,
    "fedRate": 22,
    "noTax": false,
    "desc": "a high-income New England state with progressive taxes"
  },
  {
    "slug": "delaware",
    "name": "Delaware",
    "abbr": "DE",
    "rate": 6.6,
    "fedRate": 22,
    "noTax": false,
    "desc": "a tax-friendly state with no sales tax"
  },
  {
    "slug": "florida",
    "name": "Florida",
    "abbr": "FL",
    "rate": 0,
    "fedRate": 22,
    "noTax": true,
    "desc": "one of the most popular no-income-tax states in the US"
  },
  {
    "slug": "georgia",
    "name": "Georgia",
    "abbr": "GA",
    "rate": 5.49,
    "fedRate": 22,
    "noTax": false,
    "desc": "a growing Southeast state with a flat income tax"
  },
  {
    "slug": "hawaii",
    "name": "Hawaii",
    "abbr": "HI",
    "rate": 11,
    "fedRate": 22,
    "noTax": false,
    "desc": "the highest marginal state income tax in the US"
  },
  {
    "slug": "idaho",
    "name": "Idaho",
    "abbr": "ID",
    "rate": 5.8,
    "fedRate": 22,
    "noTax": false,
    "desc": "a fast-growing Mountain West state with moderate taxes"
  },
  {
    "slug": "illinois",
    "name": "Illinois",
    "abbr": "IL",
    "rate": 4.95,
    "fedRate": 22,
    "noTax": false,
    "desc": "a flat-tax Midwest state with a significant total tax burden"
  },
  {
    "slug": "indiana",
    "name": "Indiana",
    "abbr": "IN",
    "rate": 3.15,
    "fedRate": 22,
    "noTax": false,
    "desc": "one of the lowest flat income tax rates in the Midwest"
  },
  {
    "slug": "iowa",
    "name": "Iowa",
    "abbr": "IA",
    "rate": 6,
    "fedRate": 22,
    "noTax": false,
    "desc": "a Midwest state with a moderate progressive tax system"
  },
  {
    "slug": "kansas",
    "name": "Kansas",
    "abbr": "KS",
    "rate": 5.7,
    "fedRate": 22,
    "noTax": false,
    "desc": "a Plains state with a two-bracket income tax system"
  },
  {
    "slug": "kentucky",
    "name": "Kentucky",
    "abbr": "KY",
    "rate": 4.5,
    "fedRate": 22,
    "noTax": false,
    "desc": "a Southern state with a flat income tax rate"
  },
  {
    "slug": "louisiana",
    "name": "Louisiana",
    "abbr": "LA",
    "rate": 4.25,
    "fedRate": 22,
    "noTax": false,
    "desc": "a Gulf Coast state with low income taxes but high sales tax"
  },
  {
    "slug": "maine",
    "name": "Maine",
    "abbr": "ME",
    "rate": 7.15,
    "fedRate": 22,
    "noTax": false,
    "desc": "a New England state with a high top income tax rate"
  },
  {
    "slug": "maryland",
    "name": "Maryland",
    "abbr": "MD",
    "rate": 5.75,
    "fedRate": 22,
    "noTax": false,
    "desc": "a high-income Mid-Atlantic state with additional county taxes"
  },
  {
    "slug": "massachusetts",
    "name": "Massachusetts",
    "abbr": "MA",
    "rate": 5,
    "fedRate": 22,
    "noTax": false,
    "desc": "a New England state with a flat income tax rate"
  },
  {
    "slug": "michigan",
    "name": "Michigan",
    "abbr": "MI",
    "rate": 4.25,
    "fedRate": 22,
    "noTax": false,
    "desc": "a Great Lakes state with a low flat income tax"
  },
  {
    "slug": "minnesota",
    "name": "Minnesota",
    "abbr": "MN",
    "rate": 9.85,
    "fedRate": 22,
    "noTax": false,
    "desc": "a Midwest state with one of the highest top marginal tax rates"
  },
  {
    "slug": "mississippi",
    "name": "Mississippi",
    "abbr": "MS",
    "rate": 5,
    "fedRate": 22,
    "noTax": false,
    "desc": "a low-cost Southern state with a flat income tax"
  },
  {
    "slug": "missouri",
    "name": "Missouri",
    "abbr": "MO",
    "rate": 4.95,
    "fedRate": 22,
    "noTax": false,
    "desc": "a centrally located state with a moderate tax burden"
  },
  {
    "slug": "montana",
    "name": "Montana",
    "abbr": "MT",
    "rate": 5.9,
    "fedRate": 22,
    "noTax": false,
    "desc": "a Big Sky state with a moderate progressive income tax"
  },
  {
    "slug": "nebraska",
    "name": "Nebraska",
    "abbr": "NE",
    "rate": 5.84,
    "fedRate": 22,
    "noTax": false,
    "desc": "a Plains state with a moderate income tax system"
  },
  {
    "slug": "nevada",
    "name": "Nevada",
    "abbr": "NV",
    "rate": 0,
    "fedRate": 22,
    "noTax": true,
    "desc": "a Western no-income-tax state popular for business relocation"
  },
  {
    "slug": "new-hampshire",
    "name": "New Hampshire",
    "abbr": "NH",
    "rate": 0,
    "fedRate": 22,
    "noTax": true,
    "desc": "a Live Free or Die state with no income tax on wages"
  },
  {
    "slug": "new-jersey",
    "name": "New Jersey",
    "abbr": "NJ",
    "rate": 10.75,
    "fedRate": 22,
    "noTax": false,
    "desc": "one of the highest total tax burden states in the US"
  },
  {
    "slug": "new-mexico",
    "name": "New Mexico",
    "abbr": "NM",
    "rate": 5.9,
    "fedRate": 22,
    "noTax": false,
    "desc": "a Southwest state with a moderate progressive tax system"
  },
  {
    "slug": "new-york",
    "name": "New York",
    "abbr": "NY",
    "rate": 10.9,
    "fedRate": 22,
    "noTax": false,
    "desc": "one of the highest-taxed states in America"
  },
  {
    "slug": "north-carolina",
    "name": "North Carolina",
    "abbr": "NC",
    "rate": 4.5,
    "fedRate": 22,
    "noTax": false,
    "desc": "a Southeast state transitioning to a low flat income tax"
  },
  {
    "slug": "north-dakota",
    "name": "North Dakota",
    "abbr": "ND",
    "rate": 2.9,
    "fedRate": 22,
    "noTax": false,
    "desc": "one of the lowest income tax states in the Midwest"
  },
  {
    "slug": "ohio",
    "name": "Ohio",
    "abbr": "OH",
    "rate": 3.99,
    "fedRate": 22,
    "noTax": false,
    "desc": "a Midwest state with a low top marginal tax rate"
  },
  {
    "slug": "oklahoma",
    "name": "Oklahoma",
    "abbr": "OK",
    "rate": 4.75,
    "fedRate": 22,
    "noTax": false,
    "desc": "a Plains state with a moderate income tax burden"
  },
  {
    "slug": "oregon",
    "name": "Oregon",
    "abbr": "OR",
    "rate": 9.9,
    "fedRate": 22,
    "noTax": false,
    "desc": "a Pacific Northwest state with a high income tax but no sales tax"
  },
  {
    "slug": "pennsylvania",
    "name": "Pennsylvania",
    "abbr": "PA",
    "rate": 3.07,
    "fedRate": 22,
    "noTax": false,
    "desc": "a Mid-Atlantic state with the lowest flat income tax rate"
  },
  {
    "slug": "rhode-island",
    "name": "Rhode Island",
    "abbr": "RI",
    "rate": 5.99,
    "fedRate": 22,
    "noTax": false,
    "desc": "the smallest state with a moderate progressive tax system"
  },
  {
    "slug": "south-carolina",
    "name": "South Carolina",
    "abbr": "SC",
    "rate": 6.4,
    "fedRate": 22,
    "noTax": false,
    "desc": "a Southeast state with a moderate progressive tax"
  },
  {
    "slug": "south-dakota",
    "name": "South Dakota",
    "abbr": "SD",
    "rate": 0,
    "fedRate": 22,
    "noTax": true,
    "desc": "a Plains state with no income tax and low overall tax burden"
  },
  {
    "slug": "tennessee",
    "name": "Tennessee",
    "abbr": "TN",
    "rate": 0,
    "fedRate": 22,
    "noTax": true,
    "desc": "a fast-growing no-income-tax Southeast state"
  },
  {
    "slug": "texas",
    "name": "Texas",
    "abbr": "TX",
    "rate": 0,
    "fedRate": 22,
    "noTax": true,
    "desc": "the largest no-income-tax state with booming job growth"
  },
  {
    "slug": "utah",
    "name": "Utah",
    "abbr": "UT",
    "rate": 4.65,
    "fedRate": 22,
    "noTax": false,
    "desc": "a fast-growing Western state with a low flat income tax"
  },
  {
    "slug": "vermont",
    "name": "Vermont",
    "abbr": "VT",
    "rate": 8.75,
    "fedRate": 22,
    "noTax": false,
    "desc": "a New England state with a high progressive tax system"
  },
  {
    "slug": "virginia",
    "name": "Virginia",
    "abbr": "VA",
    "rate": 5.75,
    "fedRate": 22,
    "noTax": false,
    "desc": "a prosperous Mid-Atlantic state with a moderate income tax"
  },
  {
    "slug": "washington",
    "name": "Washington",
    "abbr": "WA",
    "rate": 0,
    "fedRate": 22,
    "noTax": true,
    "desc": "a major Pacific Northwest no-income-tax state"
  },
  {
    "slug": "west-virginia",
    "name": "West Virginia",
    "abbr": "WV",
    "rate": 5.12,
    "fedRate": 22,
    "noTax": false,
    "desc": "an Appalachian state with a moderate income tax"
  },
  {
    "slug": "wisconsin",
    "name": "Wisconsin",
    "abbr": "WI",
    "rate": 7.65,
    "fedRate": 22,
    "noTax": false,
    "desc": "a Great Lakes state with a progressive income tax system"
  },
  {
    "slug": "wyoming",
    "name": "Wyoming",
    "abbr": "WY",
    "rate": 0,
    "fedRate": 22,
    "noTax": true,
    "desc": "a Western state with no income tax and minimal tax burden"
  }
]
module.exports = taxStates
