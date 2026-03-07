const budgetCities = [
  {
    "slug": "new-york",
    "name": "New York, NY",
    "rent": 3200,
    "food": 800,
    "transport": 150,
    "utilities": 200,
    "entertainment": 400,
    "misc": 300
  },
  {
    "slug": "san-francisco",
    "name": "San Francisco, CA",
    "rent": 3500,
    "food": 850,
    "transport": 120,
    "utilities": 180,
    "entertainment": 450,
    "misc": 350
  },
  {
    "slug": "los-angeles",
    "name": "Los Angeles, CA",
    "rent": 2800,
    "food": 750,
    "transport": 200,
    "utilities": 160,
    "entertainment": 380,
    "misc": 280
  },
  {
    "slug": "chicago",
    "name": "Chicago, IL",
    "rent": 2000,
    "food": 650,
    "transport": 120,
    "utilities": 160,
    "entertainment": 300,
    "misc": 250
  },
  {
    "slug": "houston",
    "name": "Houston, TX",
    "rent": 1500,
    "food": 600,
    "transport": 250,
    "utilities": 180,
    "entertainment": 250,
    "misc": 200
  },
  {
    "slug": "phoenix",
    "name": "Phoenix, AZ",
    "rent": 1700,
    "food": 600,
    "transport": 220,
    "utilities": 220,
    "entertainment": 250,
    "misc": 200
  },
  {
    "slug": "philadelphia",
    "name": "Philadelphia, PA",
    "rent": 1800,
    "food": 650,
    "transport": 110,
    "utilities": 150,
    "entertainment": 280,
    "misc": 220
  },
  {
    "slug": "san-antonio",
    "name": "San Antonio, TX",
    "rent": 1400,
    "food": 580,
    "transport": 240,
    "utilities": 170,
    "entertainment": 230,
    "misc": 190
  },
  {
    "slug": "san-diego",
    "name": "San Diego, CA",
    "rent": 2900,
    "food": 750,
    "transport": 180,
    "utilities": 170,
    "entertainment": 380,
    "misc": 280
  },
  {
    "slug": "dallas",
    "name": "Dallas, TX",
    "rent": 1700,
    "food": 620,
    "transport": 240,
    "utilities": 180,
    "entertainment": 270,
    "misc": 210
  },
  {
    "slug": "austin",
    "name": "Austin, TX",
    "rent": 2000,
    "food": 680,
    "transport": 220,
    "utilities": 170,
    "entertainment": 320,
    "misc": 250
  },
  {
    "slug": "seattle",
    "name": "Seattle, WA",
    "rent": 2600,
    "food": 780,
    "transport": 130,
    "utilities": 140,
    "entertainment": 380,
    "misc": 300
  },
  {
    "slug": "denver",
    "name": "Denver, CO",
    "rent": 2200,
    "food": 680,
    "transport": 180,
    "utilities": 150,
    "entertainment": 330,
    "misc": 260
  },
  {
    "slug": "boston",
    "name": "Boston, MA",
    "rent": 3000,
    "food": 800,
    "transport": 110,
    "utilities": 160,
    "entertainment": 400,
    "misc": 300
  },
  {
    "slug": "nashville",
    "name": "Nashville, TN",
    "rent": 1900,
    "food": 650,
    "transport": 210,
    "utilities": 160,
    "entertainment": 300,
    "misc": 240
  },
  {
    "slug": "miami",
    "name": "Miami, FL",
    "rent": 2600,
    "food": 720,
    "transport": 200,
    "utilities": 180,
    "entertainment": 380,
    "misc": 290
  },
  {
    "slug": "portland",
    "name": "Portland, OR",
    "rent": 2000,
    "food": 700,
    "transport": 120,
    "utilities": 140,
    "entertainment": 330,
    "misc": 260
  },
  {
    "slug": "las-vegas",
    "name": "Las Vegas, NV",
    "rent": 1700,
    "food": 620,
    "transport": 220,
    "utilities": 200,
    "entertainment": 300,
    "misc": 230
  },
  {
    "slug": "atlanta",
    "name": "Atlanta, GA",
    "rent": 1900,
    "food": 650,
    "transport": 220,
    "utilities": 160,
    "entertainment": 300,
    "misc": 240
  },
  {
    "slug": "minneapolis",
    "name": "Minneapolis, MN",
    "rent": 1800,
    "food": 660,
    "transport": 120,
    "utilities": 180,
    "entertainment": 290,
    "misc": 230
  },
  {
    "slug": "charlotte",
    "name": "Charlotte, NC",
    "rent": 1700,
    "food": 630,
    "transport": 210,
    "utilities": 150,
    "entertainment": 270,
    "misc": 220
  },
  {
    "slug": "raleigh",
    "name": "Raleigh, NC",
    "rent": 1700,
    "food": 620,
    "transport": 200,
    "utilities": 145,
    "entertainment": 260,
    "misc": 210
  },
  {
    "slug": "tampa",
    "name": "Tampa, FL",
    "rent": 1900,
    "food": 640,
    "transport": 210,
    "utilities": 170,
    "entertainment": 280,
    "misc": 230
  },
  {
    "slug": "orlando",
    "name": "Orlando, FL",
    "rent": 1800,
    "food": 620,
    "transport": 210,
    "utilities": 170,
    "entertainment": 300,
    "misc": 230
  },
  {
    "slug": "sacramento",
    "name": "Sacramento, CA",
    "rent": 2000,
    "food": 680,
    "transport": 180,
    "utilities": 160,
    "entertainment": 300,
    "misc": 240
  },
  {
    "slug": "pittsburgh",
    "name": "Pittsburgh, PA",
    "rent": 1400,
    "food": 580,
    "transport": 100,
    "utilities": 150,
    "entertainment": 240,
    "misc": 190
  },
  {
    "slug": "st-louis",
    "name": "St. Louis, MO",
    "rent": 1300,
    "food": 570,
    "transport": 180,
    "utilities": 150,
    "entertainment": 230,
    "misc": 180
  },
  {
    "slug": "salt-lake-city",
    "name": "Salt Lake City, UT",
    "rent": 1900,
    "food": 640,
    "transport": 190,
    "utilities": 140,
    "entertainment": 280,
    "misc": 220
  },
  {
    "slug": "kansas-city",
    "name": "Kansas City, MO",
    "rent": 1300,
    "food": 570,
    "transport": 190,
    "utilities": 150,
    "entertainment": 230,
    "misc": 180
  },
  {
    "slug": "columbus",
    "name": "Columbus, OH",
    "rent": 1300,
    "food": 570,
    "transport": 170,
    "utilities": 150,
    "entertainment": 230,
    "misc": 180
  },
  {
    "slug": "indianapolis",
    "name": "Indianapolis, IN",
    "rent": 1200,
    "food": 560,
    "transport": 190,
    "utilities": 150,
    "entertainment": 220,
    "misc": 175
  },
  {
    "slug": "richmond",
    "name": "Richmond, VA",
    "rent": 1500,
    "food": 600,
    "transport": 180,
    "utilities": 145,
    "entertainment": 250,
    "misc": 200
  },
  {
    "slug": "baltimore",
    "name": "Baltimore, MD",
    "rent": 1700,
    "food": 640,
    "transport": 110,
    "utilities": 155,
    "entertainment": 270,
    "misc": 220
  },
  {
    "slug": "memphis",
    "name": "Memphis, TN",
    "rent": 1200,
    "food": 560,
    "transport": 200,
    "utilities": 160,
    "entertainment": 220,
    "misc": 170
  },
  {
    "slug": "louisville",
    "name": "Louisville, KY",
    "rent": 1200,
    "food": 560,
    "transport": 180,
    "utilities": 150,
    "entertainment": 220,
    "misc": 175
  },
  {
    "slug": "oklahoma-city",
    "name": "Oklahoma City, OK",
    "rent": 1100,
    "food": 550,
    "transport": 220,
    "utilities": 160,
    "entertainment": 210,
    "misc": 165
  },
  {
    "slug": "omaha",
    "name": "Omaha, NE",
    "rent": 1200,
    "food": 560,
    "transport": 190,
    "utilities": 150,
    "entertainment": 215,
    "misc": 170
  },
  {
    "slug": "albuquerque",
    "name": "Albuquerque, NM",
    "rent": 1300,
    "food": 570,
    "transport": 200,
    "utilities": 155,
    "entertainment": 220,
    "misc": 175
  },
  {
    "slug": "tucson",
    "name": "Tucson, AZ",
    "rent": 1300,
    "food": 570,
    "transport": 200,
    "utilities": 190,
    "entertainment": 220,
    "misc": 175
  },
  {
    "slug": "fresno",
    "name": "Fresno, CA",
    "rent": 1500,
    "food": 600,
    "transport": 200,
    "utilities": 160,
    "entertainment": 250,
    "misc": 200
  },
  {
    "slug": "mesa",
    "name": "Mesa, AZ",
    "rent": 1600,
    "food": 590,
    "transport": 210,
    "utilities": 210,
    "entertainment": 250,
    "misc": 200
  },
  {
    "slug": "virginia-beach",
    "name": "Virginia Beach, VA",
    "rent": 1600,
    "food": 610,
    "transport": 190,
    "utilities": 145,
    "entertainment": 260,
    "misc": 205
  },
  {
    "slug": "colorado-springs",
    "name": "Colorado Springs, CO",
    "rent": 1800,
    "food": 640,
    "transport": 200,
    "utilities": 145,
    "entertainment": 270,
    "misc": 210
  },
  {
    "slug": "milwaukee",
    "name": "Milwaukee, WI",
    "rent": 1300,
    "food": 570,
    "transport": 110,
    "utilities": 170,
    "entertainment": 230,
    "misc": 180
  },
  {
    "slug": "detroit",
    "name": "Detroit, MI",
    "rent": 1100,
    "food": 550,
    "transport": 180,
    "utilities": 160,
    "entertainment": 210,
    "misc": 165
  },
  {
    "slug": "jacksonville",
    "name": "Jacksonville, FL",
    "rent": 1500,
    "food": 590,
    "transport": 210,
    "utilities": 165,
    "entertainment": 250,
    "misc": 195
  },
  {
    "slug": "cincinnati",
    "name": "Cincinnati, OH",
    "rent": 1200,
    "food": 560,
    "transport": 170,
    "utilities": 150,
    "entertainment": 220,
    "misc": 175
  },
  {
    "slug": "fort-worth",
    "name": "Fort Worth, TX",
    "rent": 1600,
    "food": 600,
    "transport": 230,
    "utilities": 175,
    "entertainment": 260,
    "misc": 200
  },
  {
    "slug": "el-paso",
    "name": "El Paso, TX",
    "rent": 1100,
    "food": 540,
    "transport": 210,
    "utilities": 155,
    "entertainment": 200,
    "misc": 160
  },
  {
    "slug": "washington-dc",
    "name": "Washington, DC",
    "rent": 2800,
    "food": 780,
    "transport": 130,
    "utilities": 170,
    "entertainment": 380,
    "misc": 290
  }
]
module.exports = budgetCities
