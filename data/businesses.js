const businesses = [
  {
    "slug": "restaurant",
    "name": "Restaurant",
    "fixed": 15000,
    "varCost": 0.35,
    "price": 22,
    "unit": "meal",
    "desc": "food service with high fixed costs and variable ingredient costs"
  },
  {
    "slug": "coffee-shop",
    "name": "Coffee Shop",
    "fixed": 8000,
    "varCost": 0.3,
    "price": 5.5,
    "unit": "cup",
    "desc": "cafe business with equipment overhead and low per-unit costs"
  },
  {
    "slug": "retail-store",
    "name": "Retail Store",
    "fixed": 12000,
    "varCost": 0.5,
    "price": 45,
    "unit": "sale",
    "desc": "brick-and-mortar retail with inventory and lease costs"
  },
  {
    "slug": "e-commerce",
    "name": "E-Commerce Store",
    "fixed": 3000,
    "varCost": 0.45,
    "price": 55,
    "unit": "order",
    "desc": "online store with platform fees and fulfillment costs"
  },
  {
    "slug": "saas",
    "name": "SaaS Business",
    "fixed": 20000,
    "varCost": 0.05,
    "price": 99,
    "unit": "user/mo",
    "desc": "software as a service with low variable costs per user"
  },
  {
    "slug": "gym-fitness-studio",
    "name": "Gym / Fitness Studio",
    "fixed": 18000,
    "varCost": 0.1,
    "price": 60,
    "unit": "member/mo",
    "desc": "membership-based fitness business with heavy equipment overhead"
  },
  {
    "slug": "salon",
    "name": "Hair / Beauty Salon",
    "fixed": 7000,
    "varCost": 0.3,
    "price": 75,
    "unit": "client",
    "desc": "personal services business with chair rental and product costs"
  },
  {
    "slug": "trucking",
    "name": "Trucking Company",
    "fixed": 12000,
    "varCost": 0.55,
    "price": 3.5,
    "unit": "mile",
    "desc": "freight and logistics with fuel, maintenance, and driver costs"
  },
  {
    "slug": "cleaning-service",
    "name": "Cleaning Service",
    "fixed": 3000,
    "varCost": 0.4,
    "price": 150,
    "unit": "job",
    "desc": "residential and commercial cleaning with labor as primary cost"
  },
  {
    "slug": "landscaping",
    "name": "Landscaping Business",
    "fixed": 5000,
    "varCost": 0.45,
    "price": 200,
    "unit": "job",
    "desc": "outdoor services business with equipment and seasonal revenue"
  },
  {
    "slug": "photography-business",
    "name": "Photography Business",
    "fixed": 4000,
    "varCost": 0.2,
    "price": 500,
    "unit": "session",
    "desc": "professional photography with gear depreciation as major cost"
  },
  {
    "slug": "daycare",
    "name": "Daycare / Childcare",
    "fixed": 15000,
    "varCost": 0.3,
    "price": 1200,
    "unit": "child/mo",
    "desc": "childcare facility with staffing as dominant cost driver"
  },
  {
    "slug": "bakery",
    "name": "Bakery",
    "fixed": 8000,
    "varCost": 0.4,
    "price": 4.5,
    "unit": "item",
    "desc": "artisan food production with ingredient and equipment costs"
  },
  {
    "slug": "dental-practice",
    "name": "Dental Practice",
    "fixed": 35000,
    "varCost": 0.25,
    "price": 250,
    "unit": "patient",
    "desc": "healthcare services with equipment and malpractice overhead"
  },
  {
    "slug": "law-firm",
    "name": "Law Firm (Solo)",
    "fixed": 12000,
    "varCost": 0.2,
    "price": 350,
    "unit": "hour",
    "desc": "solo law practice with office and malpractice insurance costs"
  },
  {
    "slug": "marketing-agency",
    "name": "Marketing Agency",
    "fixed": 20000,
    "varCost": 0.3,
    "price": 5000,
    "unit": "client/mo",
    "desc": "full-service marketing agency with team and tool overhead"
  },
  {
    "slug": "tutoring-center",
    "name": "Tutoring Center",
    "fixed": 5000,
    "varCost": 0.4,
    "price": 60,
    "unit": "session",
    "desc": "educational services business with instructor costs"
  },
  {
    "slug": "yoga-studio",
    "name": "Yoga Studio",
    "fixed": 8000,
    "varCost": 0.15,
    "price": 20,
    "unit": "class",
    "desc": "wellness studio with lease and instructor compensation"
  },
  {
    "slug": "brewery",
    "name": "Craft Brewery",
    "fixed": 25000,
    "varCost": 0.3,
    "price": 5,
    "unit": "pint",
    "desc": "craft beer production with fermentation equipment overhead"
  },
  {
    "slug": "food-truck",
    "name": "Food Truck",
    "fixed": 5000,
    "varCost": 0.35,
    "price": 12,
    "unit": "item",
    "desc": "mobile food business with lower overhead than brick-and-mortar"
  },
  {
    "slug": "airbnb-rental",
    "name": "Airbnb / Short-Term Rental",
    "fixed": 3000,
    "varCost": 0.25,
    "price": 150,
    "unit": "night",
    "desc": "short-term vacation rental with platform fees and cleaning costs"
  },
  {
    "slug": "car-wash",
    "name": "Car Wash",
    "fixed": 15000,
    "varCost": 0.2,
    "price": 20,
    "unit": "wash",
    "desc": "auto services with water, chemicals, and equipment costs"
  },
  {
    "slug": "accounting-firm",
    "name": "Accounting Firm",
    "fixed": 10000,
    "varCost": 0.25,
    "price": 200,
    "unit": "hour",
    "desc": "professional services with software and malpractice insurance"
  },
  {
    "slug": "web-design-agency",
    "name": "Web Design Agency",
    "fixed": 12000,
    "varCost": 0.3,
    "price": 3000,
    "unit": "project",
    "desc": "digital services agency with software and contractor costs"
  },
  {
    "slug": "real-estate-brokerage",
    "name": "Real Estate Brokerage",
    "fixed": 8000,
    "varCost": 0.2,
    "price": 8000,
    "unit": "deal",
    "desc": "real estate transaction business with MLS and licensing costs"
  },
  {
    "slug": "pest-control",
    "name": "Pest Control Service",
    "fixed": 6000,
    "varCost": 0.4,
    "price": 180,
    "unit": "job",
    "desc": "home services with vehicle, chemicals, and licensing costs"
  },
  {
    "slug": "dog-grooming",
    "name": "Dog Grooming Salon",
    "fixed": 4000,
    "varCost": 0.3,
    "price": 80,
    "unit": "dog",
    "desc": "pet services with grooming equipment and product costs"
  },
  {
    "slug": "printing-shop",
    "name": "Printing / Copy Shop",
    "fixed": 10000,
    "varCost": 0.4,
    "price": 0.15,
    "unit": "page",
    "desc": "print services with equipment depreciation and ink costs"
  },
  {
    "slug": "IT-support",
    "name": "IT Support / MSP",
    "fixed": 10000,
    "varCost": 0.3,
    "price": 150,
    "unit": "hour",
    "desc": "managed IT services with software licenses and van costs"
  },
  {
    "slug": "moving-company",
    "name": "Moving Company",
    "fixed": 8000,
    "varCost": 0.45,
    "price": 1500,
    "unit": "move",
    "desc": "residential moving with truck depreciation and crew costs"
  },
  {
    "slug": "plumbing",
    "name": "Plumbing Business",
    "fixed": 6000,
    "varCost": 0.4,
    "price": 250,
    "unit": "job",
    "desc": "home services trade with van, tools, and licensing overhead"
  },
  {
    "slug": "electrician",
    "name": "Electrician Business",
    "fixed": 6000,
    "varCost": 0.35,
    "price": 250,
    "unit": "job",
    "desc": "electrical contracting with licensing, insurance, and tools"
  },
  {
    "slug": "HVAC",
    "name": "HVAC Company",
    "fixed": 8000,
    "varCost": 0.4,
    "price": 350,
    "unit": "job",
    "desc": "heating and cooling services with parts inventory and van costs"
  },
  {
    "slug": "car-dealership",
    "name": "Used Car Dealership",
    "fixed": 25000,
    "varCost": 0.85,
    "price": 15000,
    "unit": "car",
    "desc": "auto sales with inventory financing and lot lease overhead"
  },
  {
    "slug": "franchise-unit",
    "name": "Franchise Unit (Avg)",
    "fixed": 30000,
    "varCost": 0.45,
    "price": 50,
    "unit": "customer",
    "desc": "a typical franchise unit with royalties and corporate fees"
  },
  {
    "slug": "amazon-fba",
    "name": "Amazon FBA Seller",
    "fixed": 2000,
    "varCost": 0.6,
    "price": 35,
    "unit": "unit",
    "desc": "e-commerce fulfillment by Amazon with storage and referral fees"
  },
  {
    "slug": "wedding-venue",
    "name": "Wedding Venue",
    "fixed": 20000,
    "varCost": 0.25,
    "price": 8000,
    "unit": "event",
    "desc": "event space with mortgage, maintenance, and staffing costs"
  },
  {
    "slug": "dropshipping",
    "name": "Dropshipping Store",
    "fixed": 1500,
    "varCost": 0.65,
    "price": 45,
    "unit": "order",
    "desc": "no-inventory online retail with high supplier and ad costs"
  },
  {
    "slug": "flower-shop",
    "name": "Flower Shop",
    "fixed": 6000,
    "varCost": 0.5,
    "price": 60,
    "unit": "arrangement",
    "desc": "floral retail with perishable inventory and refrigeration costs"
  },
  {
    "slug": "music-school",
    "name": "Music School",
    "fixed": 5000,
    "varCost": 0.4,
    "price": 70,
    "unit": "lesson",
    "desc": "private music instruction with space and instrument costs"
  },
  {
    "slug": "bookkeeping-service",
    "name": "Bookkeeping Service",
    "fixed": 2000,
    "varCost": 0.2,
    "price": 500,
    "unit": "client/mo",
    "desc": "virtual bookkeeping with software and liability insurance"
  },
  {
    "slug": "online-course",
    "name": "Online Course Business",
    "fixed": 5000,
    "varCost": 0.05,
    "price": 297,
    "unit": "enrollment",
    "desc": "digital education with platform fees and near-zero delivery costs"
  },
  {
    "slug": "subscription-box",
    "name": "Subscription Box",
    "fixed": 4000,
    "varCost": 0.55,
    "price": 45,
    "unit": "box/mo",
    "desc": "curated subscription service with curation and fulfillment costs"
  },
  {
    "slug": "therapy-private",
    "name": "Therapy Private Practice",
    "fixed": 4000,
    "varCost": 0.15,
    "price": 175,
    "unit": "session",
    "desc": "mental health private practice with office and licensing costs"
  },
  {
    "slug": "pharmacy",
    "name": "Independent Pharmacy",
    "fixed": 40000,
    "varCost": 0.7,
    "price": 120,
    "unit": "Rx",
    "desc": "retail pharmacy with dispensing and compliance overhead"
  },
  {
    "slug": "childcare-app",
    "name": "Childcare / Tutoring App",
    "fixed": 15000,
    "varCost": 0.1,
    "price": 29,
    "unit": "subscriber",
    "desc": "two-sided marketplace app for education and childcare"
  },
  {
    "slug": "clothing-brand",
    "name": "Clothing Brand (D2C)",
    "fixed": 5000,
    "varCost": 0.45,
    "price": 65,
    "unit": "item",
    "desc": "direct-to-consumer apparel with design and fulfillment costs"
  },
  {
    "slug": "car-rental",
    "name": "Car Rental / Fleet",
    "fixed": 20000,
    "varCost": 0.3,
    "price": 80,
    "unit": "day",
    "desc": "vehicle rental with depreciation, insurance, and maintenance"
  },
  {
    "slug": "vending-machine",
    "name": "Vending Machine Business",
    "fixed": 2000,
    "varCost": 0.4,
    "price": 2.5,
    "unit": "sale",
    "desc": "automated retail with machine depreciation and restocking costs"
  },
  {
    "slug": "solar-installation",
    "name": "Solar Installation Company",
    "fixed": 15000,
    "varCost": 0.55,
    "price": 25000,
    "unit": "install",
    "desc": "residential solar with panels, inverters, and crew costs"
  }
]
module.exports = businesses
