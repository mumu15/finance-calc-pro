const retirementAges = [
  {
    "slug": "age-22",
    "name": "Age 22",
    "age": 22,
    "retireAt": 65,
    "saved": 0,
    "monthly": 300,
    "rate": 8,
    "desc": "just starting your career with decades of compounding ahead"
  },
  {
    "slug": "age-25",
    "name": "Age 25",
    "age": 25,
    "retireAt": 65,
    "saved": 5000,
    "monthly": 400,
    "rate": 8,
    "desc": "in your mid-20s with your best saving years ahead"
  },
  {
    "slug": "age-28",
    "name": "Age 28",
    "age": 28,
    "retireAt": 65,
    "saved": 15000,
    "monthly": 500,
    "rate": 8,
    "desc": "in your late 20s building your financial foundation"
  },
  {
    "slug": "age-30",
    "name": "Age 30",
    "age": 30,
    "retireAt": 65,
    "saved": 25000,
    "monthly": 600,
    "rate": 8,
    "desc": "at 30 with strong earning potential and time to grow wealth"
  },
  {
    "slug": "age-32",
    "name": "Age 32",
    "age": 32,
    "retireAt": 65,
    "saved": 40000,
    "monthly": 700,
    "rate": 8,
    "desc": "in your early 30s with growing income and responsibilities"
  },
  {
    "slug": "age-35",
    "name": "Age 35",
    "age": 35,
    "retireAt": 65,
    "saved": 60000,
    "monthly": 800,
    "rate": 7.5,
    "desc": "at 35, a critical milestone for retirement readiness"
  },
  {
    "slug": "age-38",
    "name": "Age 38",
    "age": 38,
    "retireAt": 65,
    "saved": 85000,
    "monthly": 900,
    "rate": 7.5,
    "desc": "in your late 30s approaching peak earning years"
  },
  {
    "slug": "age-40",
    "name": "Age 40",
    "age": 40,
    "retireAt": 65,
    "saved": 100000,
    "monthly": 1000,
    "rate": 7,
    "desc": "at 40, the ideal time to get serious about retirement"
  },
  {
    "slug": "age-42",
    "name": "Age 42",
    "age": 42,
    "retireAt": 65,
    "saved": 120000,
    "monthly": 1100,
    "rate": 7,
    "desc": "in your early 40s with 23 years still to compound"
  },
  {
    "slug": "age-45",
    "name": "Age 45",
    "age": 45,
    "retireAt": 65,
    "saved": 150000,
    "monthly": 1200,
    "rate": 7,
    "desc": "at 45, a midpoint check on your retirement readiness"
  },
  {
    "slug": "age-48",
    "name": "Age 48",
    "age": 48,
    "retireAt": 65,
    "saved": 180000,
    "monthly": 1400,
    "rate": 6.5,
    "desc": "in your late 40s entering peak earning years"
  },
  {
    "slug": "age-50",
    "name": "Age 50",
    "age": 50,
    "retireAt": 65,
    "saved": 200000,
    "monthly": 1500,
    "rate": 6.5,
    "desc": "at 50, eligible for catch-up 401k contributions"
  },
  {
    "slug": "age-52",
    "name": "Age 52",
    "age": 52,
    "retireAt": 65,
    "saved": 220000,
    "monthly": 1700,
    "rate": 6,
    "desc": "in your early 50s with 13 years to maximize savings"
  },
  {
    "slug": "age-55",
    "name": "Age 55",
    "age": 55,
    "retireAt": 65,
    "saved": 280000,
    "monthly": 2000,
    "rate": 6,
    "desc": "at 55, a critical decade to accelerate retirement savings"
  },
  {
    "slug": "age-58",
    "name": "Age 58",
    "age": 58,
    "retireAt": 65,
    "saved": 350000,
    "monthly": 2200,
    "rate": 5.5,
    "desc": "in your late 50s with retirement in sight"
  },
  {
    "slug": "age-60",
    "name": "Age 60",
    "age": 60,
    "retireAt": 65,
    "saved": 400000,
    "monthly": 2500,
    "rate": 5,
    "desc": "at 60, just 5 years from traditional retirement age"
  },
  {
    "slug": "age-62",
    "name": "Age 62",
    "age": 62,
    "retireAt": 65,
    "saved": 500000,
    "monthly": 3000,
    "rate": 4.5,
    "desc": "at 62, eligible for early Social Security benefits"
  },
  {
    "slug": "age-retire-at-50",
    "name": "Retire at 50",
    "age": 30,
    "retireAt": 50,
    "saved": 50000,
    "monthly": 3000,
    "rate": 8,
    "desc": "the FIRE movement goal of extreme early retirement at 50"
  },
  {
    "slug": "age-retire-at-55",
    "name": "Retire at 55",
    "age": 30,
    "retireAt": 55,
    "saved": 30000,
    "monthly": 2000,
    "rate": 8,
    "desc": "retiring at 55 with a 25-year savings runway"
  },
  {
    "slug": "age-retire-at-60",
    "name": "Retire at 60",
    "age": 35,
    "retireAt": 60,
    "saved": 75000,
    "monthly": 1500,
    "rate": 7,
    "desc": "retiring at 60, five years before traditional retirement age"
  },
  {
    "slug": "behind-at-40",
    "name": "Behind on Savings at 40",
    "age": 40,
    "retireAt": 67,
    "saved": 20000,
    "monthly": 1500,
    "rate": 7,
    "desc": "catching up on retirement savings after starting late"
  },
  {
    "slug": "behind-at-50",
    "name": "Behind on Savings at 50",
    "age": 50,
    "retireAt": 67,
    "saved": 50000,
    "monthly": 2500,
    "rate": 6,
    "desc": "an aggressive catch-up plan for late retirement savers"
  },
  {
    "slug": "maxing-401k-30",
    "name": "Maxing 401k from Age 30",
    "age": 30,
    "retireAt": 65,
    "saved": 10000,
    "monthly": 1916,
    "rate": 8,
    "desc": "maxing out your 401k every year starting at age 30"
  },
  {
    "slug": "maxing-401k-40",
    "name": "Maxing 401k from Age 40",
    "age": 40,
    "retireAt": 65,
    "saved": 50000,
    "monthly": 1916,
    "rate": 7,
    "desc": "maxing out your 401k every year starting at age 40"
  },
  {
    "slug": "dual-income-35",
    "name": "Dual Income Couple at 35",
    "age": 35,
    "retireAt": 65,
    "saved": 80000,
    "monthly": 3000,
    "rate": 7.5,
    "desc": "a dual-income household building retirement wealth together"
  },
  {
    "slug": "self-employed-35",
    "name": "Self-Employed at 35",
    "age": 35,
    "retireAt": 65,
    "saved": 40000,
    "monthly": 2000,
    "rate": 7.5,
    "desc": "a freelancer or business owner building a solo 401k"
  },
  {
    "slug": "teacher-pension",
    "name": "Teacher with Pension at 35",
    "age": 35,
    "retireAt": 62,
    "saved": 30000,
    "monthly": 800,
    "rate": 6,
    "desc": "a teacher supplementing a defined benefit pension"
  },
  {
    "slug": "military-veteran",
    "name": "Military Veteran at 40",
    "age": 40,
    "retireAt": 60,
    "saved": 100000,
    "monthly": 1000,
    "rate": 6.5,
    "desc": "a military veteran with pension supplementing TSP savings"
  },
  {
    "slug": "doctor-late-start",
    "name": "Doctor Starting Late at 35",
    "age": 35,
    "retireAt": 65,
    "saved": 10000,
    "monthly": 3000,
    "rate": 8,
    "desc": "a physician who started saving late after long training"
  },
  {
    "slug": "nurse-age-40",
    "name": "Nurse at Age 40",
    "age": 40,
    "retireAt": 62,
    "saved": 60000,
    "monthly": 1200,
    "rate": 7,
    "desc": "a registered nurse planning early retirement at 62"
  },
  {
    "slug": "tech-worker-28",
    "name": "Tech Worker at 28",
    "age": 28,
    "retireAt": 50,
    "saved": 80000,
    "monthly": 3000,
    "rate": 9,
    "desc": "a high-earning tech worker targeting FIRE at 50"
  },
  {
    "slug": "single-mom-35",
    "name": "Single Parent at 35",
    "age": 35,
    "retireAt": 67,
    "saved": 15000,
    "monthly": 500,
    "rate": 7,
    "desc": "a single parent building retirement savings on one income"
  },
  {
    "slug": "entrepreneur-40",
    "name": "Entrepreneur at 40",
    "age": 40,
    "retireAt": 60,
    "saved": 200000,
    "monthly": 2500,
    "rate": 8,
    "desc": "a business owner with variable income planning for retirement"
  },
  {
    "slug": "age-65-still-working",
    "name": "Working Past 65",
    "age": 65,
    "retireAt": 70,
    "saved": 600000,
    "monthly": 1500,
    "rate": 4,
    "desc": "delaying retirement to maximize Social Security and savings"
  },
  {
    "slug": "minimize-1m-target",
    "name": "Path to $1M Retirement",
    "age": 30,
    "retireAt": 65,
    "saved": 10000,
    "monthly": 800,
    "rate": 8,
    "desc": "the roadmap to a $1 million retirement portfolio"
  },
  {
    "slug": "minimize-2m-target",
    "name": "Path to $2M Retirement",
    "age": 30,
    "retireAt": 65,
    "saved": 50000,
    "monthly": 1500,
    "rate": 8,
    "desc": "building a $2 million retirement nest egg"
  },
  {
    "slug": "3m-target",
    "name": "Path to $3M Retirement",
    "age": 30,
    "retireAt": 65,
    "saved": 100000,
    "monthly": 2500,
    "rate": 8,
    "desc": "an ambitious $3 million retirement goal"
  },
  {
    "slug": "roth-vs-traditional",
    "name": "Roth vs Traditional IRA Age 30",
    "age": 30,
    "retireAt": 65,
    "saved": 20000,
    "monthly": 583,
    "rate": 8,
    "desc": "comparing Roth and Traditional IRA strategies"
  },
  {
    "slug": "age-33",
    "name": "Age 33",
    "age": 33,
    "retireAt": 65,
    "saved": 30000,
    "monthly": 650,
    "rate": 8,
    "desc": "in your early 30s building momentum toward retirement"
  },
  {
    "slug": "age-36",
    "name": "Age 36",
    "age": 36,
    "retireAt": 65,
    "saved": 55000,
    "monthly": 750,
    "rate": 7.5,
    "desc": "in your mid-30s with compounding doing heavy lifting"
  },
  {
    "slug": "age-43",
    "name": "Age 43",
    "age": 43,
    "retireAt": 65,
    "saved": 110000,
    "monthly": 1050,
    "rate": 7,
    "desc": "in your early 40s intensifying your retirement contributions"
  },
  {
    "slug": "age-47",
    "name": "Age 47",
    "age": 47,
    "retireAt": 65,
    "saved": 160000,
    "monthly": 1300,
    "rate": 6.5,
    "desc": "in your late 40s with 18 years to retirement"
  },
  {
    "slug": "age-53",
    "name": "Age 53",
    "age": 53,
    "retireAt": 65,
    "saved": 240000,
    "monthly": 1800,
    "rate": 6,
    "desc": "in your early 50s with catch-up contributions available"
  },
  {
    "slug": "age-57",
    "name": "Age 57",
    "age": 57,
    "retireAt": 65,
    "saved": 320000,
    "monthly": 2100,
    "rate": 5.5,
    "desc": "in your late 50s with 8 years to final push"
  },
  {
    "slug": "age-27",
    "name": "Age 27",
    "age": 27,
    "retireAt": 65,
    "saved": 8000,
    "monthly": 450,
    "rate": 8,
    "desc": "in your late 20s with the greatest asset — time"
  },
  {
    "slug": "age-29",
    "name": "Age 29",
    "age": 29,
    "retireAt": 65,
    "saved": 18000,
    "monthly": 550,
    "rate": 8,
    "desc": "approaching 30 with strong financial habits forming"
  },
  {
    "slug": "age-31",
    "name": "Age 31",
    "age": 31,
    "retireAt": 65,
    "saved": 32000,
    "monthly": 620,
    "rate": 8,
    "desc": "in your early 30s balancing family costs and retirement"
  },
  {
    "slug": "age-37",
    "name": "Age 37",
    "age": 37,
    "retireAt": 65,
    "saved": 70000,
    "monthly": 850,
    "rate": 7.5,
    "desc": "in your late 30s with retirement gaining urgency"
  },
  {
    "slug": "age-44",
    "name": "Age 44",
    "age": 44,
    "retireAt": 65,
    "saved": 130000,
    "monthly": 1100,
    "rate": 7,
    "desc": "in your mid-40s with 21 years of compounding remaining"
  },
  {
    "slug": "age-49",
    "name": "Age 49",
    "age": 49,
    "retireAt": 65,
    "saved": 190000,
    "monthly": 1400,
    "rate": 6.5,
    "desc": "approaching 50 with retirement savings in full swing"
  }
]
module.exports = retirementAges
