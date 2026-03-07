const rvbCities = [
  {
    "slug": "new-york",
    "name": "New York, NY",
    "medianHome": 750000,
    "medianRent": 3200,
    "appreciation": 3.5,
    "rent_advantage": false
  },
  {
    "slug": "san-francisco",
    "name": "San Francisco, CA",
    "medianHome": 1100000,
    "medianRent": 3500,
    "appreciation": 3,
    "rent_advantage": true
  },
  {
    "slug": "los-angeles",
    "name": "Los Angeles, CA",
    "medianHome": 800000,
    "medianRent": 2800,
    "appreciation": 3.5,
    "rent_advantage": true
  },
  {
    "slug": "chicago",
    "name": "Chicago, IL",
    "medianHome": 330000,
    "medianRent": 2000,
    "appreciation": 2.5,
    "rent_advantage": false
  },
  {
    "slug": "houston",
    "name": "Houston, TX",
    "medianHome": 310000,
    "medianRent": 1500,
    "appreciation": 3,
    "rent_advantage": false
  },
  {
    "slug": "phoenix",
    "name": "Phoenix, AZ",
    "medianHome": 400000,
    "medianRent": 1700,
    "appreciation": 4,
    "rent_advantage": false
  },
  {
    "slug": "philadelphia",
    "name": "Philadelphia, PA",
    "medianHome": 250000,
    "medianRent": 1800,
    "appreciation": 2.5,
    "rent_advantage": false
  },
  {
    "slug": "san-antonio",
    "name": "San Antonio, TX",
    "medianHome": 280000,
    "medianRent": 1400,
    "appreciation": 3,
    "rent_advantage": false
  },
  {
    "slug": "san-diego",
    "name": "San Diego, CA",
    "medianHome": 850000,
    "medianRent": 2900,
    "appreciation": 3.5,
    "rent_advantage": true
  },
  {
    "slug": "dallas",
    "name": "Dallas, TX",
    "medianHome": 360000,
    "medianRent": 1700,
    "appreciation": 3.5,
    "rent_advantage": false
  },
  {
    "slug": "austin",
    "name": "Austin, TX",
    "medianHome": 520000,
    "medianRent": 2000,
    "appreciation": 3,
    "rent_advantage": true
  },
  {
    "slug": "seattle",
    "name": "Seattle, WA",
    "medianHome": 700000,
    "medianRent": 2600,
    "appreciation": 3.5,
    "rent_advantage": true
  },
  {
    "slug": "denver",
    "name": "Denver, CO",
    "medianHome": 560000,
    "medianRent": 2200,
    "appreciation": 3,
    "rent_advantage": true
  },
  {
    "slug": "boston",
    "name": "Boston, MA",
    "medianHome": 650000,
    "medianRent": 3000,
    "appreciation": 3,
    "rent_advantage": true
  },
  {
    "slug": "nashville",
    "name": "Nashville, TN",
    "medianHome": 450000,
    "medianRent": 1900,
    "appreciation": 4,
    "rent_advantage": false
  },
  {
    "slug": "miami",
    "name": "Miami, FL",
    "medianHome": 600000,
    "medianRent": 2600,
    "appreciation": 4,
    "rent_advantage": false
  },
  {
    "slug": "portland",
    "name": "Portland, OR",
    "medianHome": 490000,
    "medianRent": 2000,
    "appreciation": 3,
    "rent_advantage": false
  },
  {
    "slug": "las-vegas",
    "name": "Las Vegas, NV",
    "medianHome": 380000,
    "medianRent": 1700,
    "appreciation": 3.5,
    "rent_advantage": false
  },
  {
    "slug": "atlanta",
    "name": "Atlanta, GA",
    "medianHome": 380000,
    "medianRent": 1900,
    "appreciation": 3.5,
    "rent_advantage": false
  },
  {
    "slug": "minneapolis",
    "name": "Minneapolis, MN",
    "medianHome": 330000,
    "medianRent": 1800,
    "appreciation": 2.5,
    "rent_advantage": false
  },
  {
    "slug": "charlotte",
    "name": "Charlotte, NC",
    "medianHome": 360000,
    "medianRent": 1700,
    "appreciation": 4,
    "rent_advantage": false
  },
  {
    "slug": "raleigh",
    "name": "Raleigh, NC",
    "medianHome": 390000,
    "medianRent": 1700,
    "appreciation": 4,
    "rent_advantage": false
  },
  {
    "slug": "tampa",
    "name": "Tampa, FL",
    "medianHome": 380000,
    "medianRent": 1900,
    "appreciation": 4,
    "rent_advantage": false
  },
  {
    "slug": "orlando",
    "name": "Orlando, FL",
    "medianHome": 360000,
    "medianRent": 1800,
    "appreciation": 3.5,
    "rent_advantage": false
  },
  {
    "slug": "sacramento",
    "name": "Sacramento, CA",
    "medianHome": 490000,
    "medianRent": 2000,
    "appreciation": 3,
    "rent_advantage": false
  },
  {
    "slug": "salt-lake-city",
    "name": "Salt Lake City, UT",
    "medianHome": 480000,
    "medianRent": 1900,
    "appreciation": 3.5,
    "rent_advantage": false
  },
  {
    "slug": "washington-dc",
    "name": "Washington, DC",
    "medianHome": 620000,
    "medianRent": 2800,
    "appreciation": 3,
    "rent_advantage": true
  },
  {
    "slug": "pittsburgh",
    "name": "Pittsburgh, PA",
    "medianHome": 200000,
    "medianRent": 1400,
    "appreciation": 2,
    "rent_advantage": false
  },
  {
    "slug": "detroit",
    "name": "Detroit, MI",
    "medianHome": 160000,
    "medianRent": 1100,
    "appreciation": 2,
    "rent_advantage": false
  },
  {
    "slug": "st-louis",
    "name": "St. Louis, MO",
    "medianHome": 220000,
    "medianRent": 1300,
    "appreciation": 2.5,
    "rent_advantage": false
  },
  {
    "slug": "kansas-city",
    "name": "Kansas City, MO",
    "medianHome": 250000,
    "medianRent": 1300,
    "appreciation": 3,
    "rent_advantage": false
  },
  {
    "slug": "columbus",
    "name": "Columbus, OH",
    "medianHome": 270000,
    "medianRent": 1300,
    "appreciation": 3,
    "rent_advantage": false
  },
  {
    "slug": "indianapolis",
    "name": "Indianapolis, IN",
    "medianHome": 240000,
    "medianRent": 1200,
    "appreciation": 2.5,
    "rent_advantage": false
  },
  {
    "slug": "baltimore",
    "name": "Baltimore, MD",
    "medianHome": 290000,
    "medianRent": 1700,
    "appreciation": 2.5,
    "rent_advantage": false
  },
  {
    "slug": "memphis",
    "name": "Memphis, TN",
    "medianHome": 180000,
    "medianRent": 1200,
    "appreciation": 2.5,
    "rent_advantage": false
  },
  {
    "slug": "louisville",
    "name": "Louisville, KY",
    "medianHome": 220000,
    "medianRent": 1200,
    "appreciation": 2.5,
    "rent_advantage": false
  },
  {
    "slug": "richmond",
    "name": "Richmond, VA",
    "medianHome": 310000,
    "medianRent": 1500,
    "appreciation": 3,
    "rent_advantage": false
  },
  {
    "slug": "oklahoma-city",
    "name": "Oklahoma City, OK",
    "medianHome": 210000,
    "medianRent": 1100,
    "appreciation": 2.5,
    "rent_advantage": false
  },
  {
    "slug": "omaha",
    "name": "Omaha, NE",
    "medianHome": 240000,
    "medianRent": 1200,
    "appreciation": 2.5,
    "rent_advantage": false
  },
  {
    "slug": "milwaukee",
    "name": "Milwaukee, WI",
    "medianHome": 210000,
    "medianRent": 1300,
    "appreciation": 2,
    "rent_advantage": false
  },
  {
    "slug": "cincinnati",
    "name": "Cincinnati, OH",
    "medianHome": 220000,
    "medianRent": 1200,
    "appreciation": 2.5,
    "rent_advantage": false
  },
  {
    "slug": "jacksonville",
    "name": "Jacksonville, FL",
    "medianHome": 310000,
    "medianRent": 1500,
    "appreciation": 3.5,
    "rent_advantage": false
  },
  {
    "slug": "colorado-springs",
    "name": "Colorado Springs, CO",
    "medianHome": 420000,
    "medianRent": 1800,
    "appreciation": 3,
    "rent_advantage": false
  },
  {
    "slug": "tucson",
    "name": "Tucson, AZ",
    "medianHome": 290000,
    "medianRent": 1300,
    "appreciation": 3,
    "rent_advantage": false
  },
  {
    "slug": "albuquerque",
    "name": "Albuquerque, NM",
    "medianHome": 280000,
    "medianRent": 1300,
    "appreciation": 2.5,
    "rent_advantage": false
  },
  {
    "slug": "virginia-beach",
    "name": "Virginia Beach, VA",
    "medianHome": 310000,
    "medianRent": 1600,
    "appreciation": 3,
    "rent_advantage": false
  },
  {
    "slug": "fort-worth",
    "name": "Fort Worth, TX",
    "medianHome": 320000,
    "medianRent": 1600,
    "appreciation": 3.5,
    "rent_advantage": false
  },
  {
    "slug": "el-paso",
    "name": "El Paso, TX",
    "medianHome": 200000,
    "medianRent": 1100,
    "appreciation": 2.5,
    "rent_advantage": false
  },
  {
    "slug": "fresno",
    "name": "Fresno, CA",
    "medianHome": 340000,
    "medianRent": 1500,
    "appreciation": 2.5,
    "rent_advantage": false
  },
  {
    "slug": "mesa",
    "name": "Mesa, AZ",
    "medianHome": 380000,
    "medianRent": 1600,
    "appreciation": 4,
    "rent_advantage": false
  }
]
module.exports = rvbCities
