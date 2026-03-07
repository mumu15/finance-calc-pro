const satStates = [
  {
    "slug": "california",
    "name": "California",
    "abbr": "CA",
    "rate": 9.3,
    "noTax": false
  },
  {
    "slug": "texas",
    "name": "Texas",
    "abbr": "TX",
    "rate": 0,
    "noTax": true
  },
  {
    "slug": "new-york",
    "name": "New York",
    "abbr": "NY",
    "rate": 10.9,
    "noTax": false
  },
  {
    "slug": "florida",
    "name": "Florida",
    "abbr": "FL",
    "rate": 0,
    "noTax": true
  },
  {
    "slug": "illinois",
    "name": "Illinois",
    "abbr": "IL",
    "rate": 4.95,
    "noTax": false
  },
  {
    "slug": "pennsylvania",
    "name": "Pennsylvania",
    "abbr": "PA",
    "rate": 3.07,
    "noTax": false
  },
  {
    "slug": "ohio",
    "name": "Ohio",
    "abbr": "OH",
    "rate": 3.99,
    "noTax": false
  },
  {
    "slug": "georgia",
    "name": "Georgia",
    "abbr": "GA",
    "rate": 5.49,
    "noTax": false
  },
  {
    "slug": "north-carolina",
    "name": "North Carolina",
    "abbr": "NC",
    "rate": 4.5,
    "noTax": false
  },
  {
    "slug": "michigan",
    "name": "Michigan",
    "abbr": "MI",
    "rate": 4.25,
    "noTax": false
  },
  {
    "slug": "new-jersey",
    "name": "New Jersey",
    "abbr": "NJ",
    "rate": 10.75,
    "noTax": false
  },
  {
    "slug": "virginia",
    "name": "Virginia",
    "abbr": "VA",
    "rate": 5.75,
    "noTax": false
  },
  {
    "slug": "washington",
    "name": "Washington",
    "abbr": "WA",
    "rate": 0,
    "noTax": true
  },
  {
    "slug": "arizona",
    "name": "Arizona",
    "abbr": "AZ",
    "rate": 2.5,
    "noTax": false
  },
  {
    "slug": "massachusetts",
    "name": "Massachusetts",
    "abbr": "MA",
    "rate": 5,
    "noTax": false
  },
  {
    "slug": "tennessee",
    "name": "Tennessee",
    "abbr": "TN",
    "rate": 0,
    "noTax": true
  },
  {
    "slug": "indiana",
    "name": "Indiana",
    "abbr": "IN",
    "rate": 3.15,
    "noTax": false
  },
  {
    "slug": "missouri",
    "name": "Missouri",
    "abbr": "MO",
    "rate": 4.95,
    "noTax": false
  },
  {
    "slug": "maryland",
    "name": "Maryland",
    "abbr": "MD",
    "rate": 5.75,
    "noTax": false
  },
  {
    "slug": "wisconsin",
    "name": "Wisconsin",
    "abbr": "WI",
    "rate": 7.65,
    "noTax": false
  },
  {
    "slug": "colorado",
    "name": "Colorado",
    "abbr": "CO",
    "rate": 4.4,
    "noTax": false
  },
  {
    "slug": "minnesota",
    "name": "Minnesota",
    "abbr": "MN",
    "rate": 9.85,
    "noTax": false
  },
  {
    "slug": "south-carolina",
    "name": "South Carolina",
    "abbr": "SC",
    "rate": 6.4,
    "noTax": false
  },
  {
    "slug": "alabama",
    "name": "Alabama",
    "abbr": "AL",
    "rate": 5,
    "noTax": false
  },
  {
    "slug": "louisiana",
    "name": "Louisiana",
    "abbr": "LA",
    "rate": 4.25,
    "noTax": false
  },
  {
    "slug": "kentucky",
    "name": "Kentucky",
    "abbr": "KY",
    "rate": 4.5,
    "noTax": false
  },
  {
    "slug": "oregon",
    "name": "Oregon",
    "abbr": "OR",
    "rate": 9.9,
    "noTax": false
  },
  {
    "slug": "oklahoma",
    "name": "Oklahoma",
    "abbr": "OK",
    "rate": 4.75,
    "noTax": false
  },
  {
    "slug": "connecticut",
    "name": "Connecticut",
    "abbr": "CT",
    "rate": 6.99,
    "noTax": false
  },
  {
    "slug": "utah",
    "name": "Utah",
    "abbr": "UT",
    "rate": 4.65,
    "noTax": false
  },
  {
    "slug": "iowa",
    "name": "Iowa",
    "abbr": "IA",
    "rate": 6,
    "noTax": false
  },
  {
    "slug": "nevada",
    "name": "Nevada",
    "abbr": "NV",
    "rate": 0,
    "noTax": true
  },
  {
    "slug": "arkansas",
    "name": "Arkansas",
    "abbr": "AR",
    "rate": 4.4,
    "noTax": false
  },
  {
    "slug": "mississippi",
    "name": "Mississippi",
    "abbr": "MS",
    "rate": 5,
    "noTax": false
  },
  {
    "slug": "kansas",
    "name": "Kansas",
    "abbr": "KS",
    "rate": 5.7,
    "noTax": false
  },
  {
    "slug": "new-mexico",
    "name": "New Mexico",
    "abbr": "NM",
    "rate": 5.9,
    "noTax": false
  },
  {
    "slug": "nebraska",
    "name": "Nebraska",
    "abbr": "NE",
    "rate": 5.84,
    "noTax": false
  },
  {
    "slug": "idaho",
    "name": "Idaho",
    "abbr": "ID",
    "rate": 5.8,
    "noTax": false
  },
  {
    "slug": "west-virginia",
    "name": "West Virginia",
    "abbr": "WV",
    "rate": 5.12,
    "noTax": false
  },
  {
    "slug": "hawaii",
    "name": "Hawaii",
    "abbr": "HI",
    "rate": 11,
    "noTax": false
  },
  {
    "slug": "new-hampshire",
    "name": "New Hampshire",
    "abbr": "NH",
    "rate": 0,
    "noTax": true
  },
  {
    "slug": "maine",
    "name": "Maine",
    "abbr": "ME",
    "rate": 7.15,
    "noTax": false
  },
  {
    "slug": "rhode-island",
    "name": "Rhode Island",
    "abbr": "RI",
    "rate": 5.99,
    "noTax": false
  },
  {
    "slug": "delaware",
    "name": "Delaware",
    "abbr": "DE",
    "rate": 6.6,
    "noTax": false
  },
  {
    "slug": "montana",
    "name": "Montana",
    "abbr": "MT",
    "rate": 5.9,
    "noTax": false
  },
  {
    "slug": "vermont",
    "name": "Vermont",
    "abbr": "VT",
    "rate": 8.75,
    "noTax": false
  },
  {
    "slug": "north-dakota",
    "name": "North Dakota",
    "abbr": "ND",
    "rate": 2.9,
    "noTax": false
  },
  {
    "slug": "south-dakota",
    "name": "South Dakota",
    "abbr": "SD",
    "rate": 0,
    "noTax": true
  },
  {
    "slug": "alaska",
    "name": "Alaska",
    "abbr": "AK",
    "rate": 0,
    "noTax": true
  },
  {
    "slug": "wyoming",
    "name": "Wyoming",
    "abbr": "WY",
    "rate": 0,
    "noTax": true
  }
]
module.exports = satStates
