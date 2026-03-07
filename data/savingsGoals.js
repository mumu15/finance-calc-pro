const savingsGoals = [
  {
    "slug": "emergency-fund",
    "name": "Emergency Fund",
    "target": 15000,
    "months": 24,
    "rate": 4.5,
    "desc": "3-6 months of living expenses for financial security"
  },
  {
    "slug": "house-down-payment",
    "name": "House Down Payment",
    "target": 60000,
    "months": 36,
    "rate": 4.5,
    "desc": "saving for a 20% down payment on a median US home"
  },
  {
    "slug": "car-purchase",
    "name": "Car Purchase",
    "target": 20000,
    "months": 24,
    "rate": 4.5,
    "desc": "saving to buy a car without taking on debt"
  },
  {
    "slug": "vacation",
    "name": "Dream Vacation",
    "target": 8000,
    "months": 18,
    "rate": 4.5,
    "desc": "saving for an international vacation or bucket-list trip"
  },
  {
    "slug": "wedding",
    "name": "Wedding Fund",
    "target": 30000,
    "months": 30,
    "rate": 4.5,
    "desc": "saving for your wedding without starting married life in debt"
  },
  {
    "slug": "college",
    "name": "College Fund",
    "target": 80000,
    "months": 120,
    "rate": 5,
    "desc": "saving for a child's college education"
  },
  {
    "slug": "retirement-supplement",
    "name": "Retirement Supplement",
    "target": 500000,
    "months": 300,
    "rate": 7,
    "desc": "building supplemental retirement savings beyond your 401k"
  },
  {
    "slug": "business-startup",
    "name": "Business Startup",
    "target": 25000,
    "months": 36,
    "rate": 4.5,
    "desc": "saving capital to launch your own business"
  },
  {
    "slug": "home-renovation",
    "name": "Home Renovation",
    "target": 30000,
    "months": 30,
    "rate": 4.5,
    "desc": "saving for a major home improvement project"
  },
  {
    "slug": "travel-fund",
    "name": "Annual Travel Fund",
    "target": 5000,
    "months": 12,
    "rate": 4.5,
    "desc": "saving for regular travel and adventure experiences"
  },
  {
    "slug": "new-baby",
    "name": "New Baby Fund",
    "target": 20000,
    "months": 18,
    "rate": 4.5,
    "desc": "saving for the costs of having and raising a new child"
  },
  {
    "slug": "boat",
    "name": "Boat Purchase",
    "target": 30000,
    "months": 48,
    "rate": 4.5,
    "desc": "saving to buy a boat or watercraft outright"
  },
  {
    "slug": "motorcycle",
    "name": "Motorcycle Fund",
    "target": 12000,
    "months": 18,
    "rate": 4.5,
    "desc": "saving for a motorcycle purchase without financing"
  },
  {
    "slug": "holiday-gifts",
    "name": "Holiday Gift Fund",
    "target": 2000,
    "months": 12,
    "rate": 4.5,
    "desc": "saving throughout the year for holiday shopping"
  },
  {
    "slug": "solar-panels",
    "name": "Solar Panel Fund",
    "target": 25000,
    "months": 36,
    "rate": 4.5,
    "desc": "saving to install solar panels and cut energy bills"
  },
  {
    "slug": "investment-seed",
    "name": "Investment Starter Fund",
    "target": 10000,
    "months": 18,
    "rate": 4.5,
    "desc": "saving your first investment portfolio seed capital"
  },
  {
    "slug": "kids-sports",
    "name": "Kids Sports & Activities",
    "target": 5000,
    "months": 12,
    "rate": 4.5,
    "desc": "saving for children's extracurricular activities and sports"
  },
  {
    "slug": "pet",
    "name": "Pet Fund",
    "target": 5000,
    "months": 12,
    "rate": 4.5,
    "desc": "saving for a pet purchase and first-year expenses"
  },
  {
    "slug": "relocation",
    "name": "Relocation Fund",
    "target": 10000,
    "months": 18,
    "rate": 4.5,
    "desc": "saving to cover moving costs to a new city"
  },
  {
    "slug": "laptop-tech",
    "name": "Tech & Laptop Fund",
    "target": 3000,
    "months": 12,
    "rate": 4.5,
    "desc": "saving for a new computer or tech equipment upgrade"
  },
  {
    "slug": "charity",
    "name": "Charitable Giving Fund",
    "target": 10000,
    "months": 24,
    "rate": 4.5,
    "desc": "saving to make meaningful charitable donations"
  },
  {
    "slug": "sabbatical",
    "name": "Career Sabbatical Fund",
    "target": 40000,
    "months": 48,
    "rate": 4.5,
    "desc": "saving to take time off work for travel or study"
  },
  {
    "slug": "art-collection",
    "name": "Art Collection",
    "target": 20000,
    "months": 36,
    "rate": 4.5,
    "desc": "saving to invest in art as both passion and investment"
  },
  {
    "slug": "musical-instrument",
    "name": "Musical Instrument",
    "target": 5000,
    "months": 18,
    "rate": 4.5,
    "desc": "saving for a quality musical instrument purchase"
  },
  {
    "slug": "gym-fitness",
    "name": "Home Gym Setup",
    "target": 6000,
    "months": 12,
    "rate": 4.5,
    "desc": "saving to build a dedicated home gym space"
  },
  {
    "slug": "land-purchase",
    "name": "Land Purchase",
    "target": 50000,
    "months": 60,
    "rate": 4.5,
    "desc": "saving for a land purchase for building or investment"
  },
  {
    "slug": "rental-property",
    "name": "Rental Property Down Payment",
    "target": 50000,
    "months": 60,
    "rate": 5,
    "desc": "saving for a down payment on an investment property"
  },
  {
    "slug": "early-retirement",
    "name": "Early Retirement (FIRE)",
    "target": 1000000,
    "months": 240,
    "rate": 8,
    "desc": "achieving financial independence and early retirement"
  },
  {
    "slug": "new-roof",
    "name": "Roof Replacement",
    "target": 15000,
    "months": 24,
    "rate": 4.5,
    "desc": "saving for a new roof without taking on debt"
  },
  {
    "slug": "kitchen-renovation",
    "name": "Kitchen Renovation",
    "target": 35000,
    "months": 36,
    "rate": 4.5,
    "desc": "saving for a full kitchen remodel and upgrade"
  },
  {
    "slug": "bathroom-renovation",
    "name": "Bathroom Renovation",
    "target": 15000,
    "months": 24,
    "rate": 4.5,
    "desc": "saving for a bathroom remodel and upgrade"
  },
  {
    "slug": "pool-installation",
    "name": "Pool Installation",
    "target": 45000,
    "months": 48,
    "rate": 4.5,
    "desc": "saving to install an in-ground swimming pool"
  },
  {
    "slug": "adoption",
    "name": "Adoption Fund",
    "target": 40000,
    "months": 48,
    "rate": 4.5,
    "desc": "saving for adoption agency fees and legal costs"
  },
  {
    "slug": "anniversary-trip",
    "name": "Anniversary Trip",
    "target": 10000,
    "months": 24,
    "rate": 4.5,
    "desc": "saving for a milestone anniversary celebration trip"
  },
  {
    "slug": "study-abroad",
    "name": "Study Abroad Fund",
    "target": 15000,
    "months": 18,
    "rate": 4.5,
    "desc": "saving for a study abroad program or international course"
  },
  {
    "slug": "home-security",
    "name": "Home Security System",
    "target": 5000,
    "months": 12,
    "rate": 4.5,
    "desc": "saving for a comprehensive home security installation"
  },
  {
    "slug": "electric-vehicle",
    "name": "Electric Vehicle (EV)",
    "target": 45000,
    "months": 48,
    "rate": 4.5,
    "desc": "saving to buy an electric vehicle without financing"
  },
  {
    "slug": "college-textbooks",
    "name": "College Textbooks & Fees",
    "target": 6000,
    "months": 12,
    "rate": 4.5,
    "desc": "saving for college textbooks and miscellaneous fees"
  },
  {
    "slug": "franchise",
    "name": "Franchise Investment",
    "target": 100000,
    "months": 84,
    "rate": 5,
    "desc": "saving to buy into a franchise business opportunity"
  },
  {
    "slug": "legal-defense",
    "name": "Legal Defense Fund",
    "target": 15000,
    "months": 24,
    "rate": 4.5,
    "desc": "saving for potential legal fees and representation"
  },
  {
    "slug": "hurricane-prep",
    "name": "Hurricane / Disaster Prep",
    "target": 5000,
    "months": 12,
    "rate": 4.5,
    "desc": "saving for home disaster preparedness and resilience"
  },
  {
    "slug": "parents-care",
    "name": "Parents' Care Fund",
    "target": 30000,
    "months": 48,
    "rate": 4.5,
    "desc": "saving to help support aging parents' care needs"
  },
  {
    "slug": "health-savings",
    "name": "Health Savings (HSA Top-Up)",
    "target": 8000,
    "months": 12,
    "rate": 4.5,
    "desc": "maximizing health savings account contributions"
  },
  {
    "slug": "dividend-portfolio",
    "name": "Dividend Portfolio Starter",
    "target": 25000,
    "months": 36,
    "rate": 5,
    "desc": "building an initial dividend-paying investment portfolio"
  },
  {
    "slug": "gap-year",
    "name": "Gap Year Fund",
    "target": 20000,
    "months": 24,
    "rate": 4.5,
    "desc": "saving for a gap year of travel and exploration"
  },
  {
    "slug": "private-school",
    "name": "Private School Tuition",
    "target": 60000,
    "months": 60,
    "rate": 4.5,
    "desc": "saving to cover private school tuition costs"
  },
  {
    "slug": "tiny-home",
    "name": "Tiny Home Purchase",
    "target": 80000,
    "months": 60,
    "rate": 4.5,
    "desc": "saving to buy or build a tiny home debt-free"
  },
  {
    "slug": "wine-collection",
    "name": "Wine Collection",
    "target": 10000,
    "months": 24,
    "rate": 4.5,
    "desc": "investing in a curated wine collection over time"
  },
  {
    "slug": "side-hustle-capital",
    "name": "Side Hustle Startup Capital",
    "target": 8000,
    "months": 12,
    "rate": 4.5,
    "desc": "saving to launch a part-time side business"
  },
  {
    "slug": "sports-season-tickets",
    "name": "Sports Season Tickets",
    "target": 5000,
    "months": 12,
    "rate": 4.5,
    "desc": "saving for season tickets to your favorite team"
  }
]
module.exports = savingsGoals
