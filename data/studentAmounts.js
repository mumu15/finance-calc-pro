const studentAmounts = [
  {
    "slug": "loan-5000",
    "name": "$5 000 Student Loan",
    "amount": 5000,
    "fedRate": 6.54,
    "pmt10": 57,
    "pmt20": 37,
    "pmt25": 34,
    "type": "typical undergrad loan"
  },
  {
    "slug": "loan-8000",
    "name": "$8 000 Student Loan",
    "amount": 8000,
    "fedRate": 6.54,
    "pmt10": 91,
    "pmt20": 60,
    "pmt25": 54,
    "type": "typical undergrad loan"
  },
  {
    "slug": "loan-10000",
    "name": "$10 000 Student Loan",
    "amount": 10000,
    "fedRate": 6.54,
    "pmt10": 114,
    "pmt20": 75,
    "pmt25": 68,
    "type": "typical undergrad loan"
  },
  {
    "slug": "loan-12000",
    "name": "$12 000 Student Loan",
    "amount": 12000,
    "fedRate": 6.54,
    "pmt10": 137,
    "pmt20": 90,
    "pmt25": 81,
    "type": "typical undergrad loan"
  },
  {
    "slug": "loan-15000",
    "name": "$15 000 Student Loan",
    "amount": 15000,
    "fedRate": 6.54,
    "pmt10": 171,
    "pmt20": 112,
    "pmt25": 102,
    "type": "typical undergrad loan"
  },
  {
    "slug": "loan-16000",
    "name": "$16 000 Student Loan",
    "amount": 16000,
    "fedRate": 6.54,
    "pmt10": 182,
    "pmt20": 120,
    "pmt25": 108,
    "type": "typical undergrad loan"
  },
  {
    "slug": "loan-18000",
    "name": "$18 000 Student Loan",
    "amount": 18000,
    "fedRate": 6.54,
    "pmt10": 205,
    "pmt20": 135,
    "pmt25": 122,
    "type": "typical undergrad loan"
  },
  {
    "slug": "loan-20000",
    "name": "$20 000 Student Loan",
    "amount": 20000,
    "fedRate": 6.54,
    "pmt10": 228,
    "pmt20": 150,
    "pmt25": 136,
    "type": "typical undergrad loan"
  },
  {
    "slug": "loan-22000",
    "name": "$22 000 Student Loan",
    "amount": 22000,
    "fedRate": 6.54,
    "pmt10": 250,
    "pmt20": 165,
    "pmt25": 149,
    "type": "typical undergrad loan"
  },
  {
    "slug": "loan-24000",
    "name": "$24 000 Student Loan",
    "amount": 24000,
    "fedRate": 6.54,
    "pmt10": 273,
    "pmt20": 180,
    "pmt25": 163,
    "type": "typical undergrad loan"
  },
  {
    "slug": "loan-25000",
    "name": "$25 000 Student Loan",
    "amount": 25000,
    "fedRate": 6.54,
    "pmt10": 284,
    "pmt20": 187,
    "pmt25": 169,
    "type": "typical undergrad loan"
  },
  {
    "slug": "loan-28000",
    "name": "$28 000 Student Loan",
    "amount": 28000,
    "fedRate": 6.54,
    "pmt10": 319,
    "pmt20": 209,
    "pmt25": 190,
    "type": "typical undergrad loan"
  },
  {
    "slug": "loan-30000",
    "name": "$30 000 Student Loan",
    "amount": 30000,
    "fedRate": 6.54,
    "pmt10": 341,
    "pmt20": 224,
    "pmt25": 203,
    "type": "grad school or high-cost undergrad"
  },
  {
    "slug": "loan-32000",
    "name": "$32 000 Student Loan",
    "amount": 32000,
    "fedRate": 6.54,
    "pmt10": 364,
    "pmt20": 239,
    "pmt25": 217,
    "type": "grad school or high-cost undergrad"
  },
  {
    "slug": "loan-33000",
    "name": "$33 000 Student Loan",
    "amount": 33000,
    "fedRate": 6.54,
    "pmt10": 375,
    "pmt20": 247,
    "pmt25": 224,
    "type": "grad school or high-cost undergrad"
  },
  {
    "slug": "loan-35000",
    "name": "$35 000 Student Loan",
    "amount": 35000,
    "fedRate": 6.54,
    "pmt10": 398,
    "pmt20": 262,
    "pmt25": 237,
    "type": "grad school or high-cost undergrad"
  },
  {
    "slug": "loan-38000",
    "name": "$38 000 Student Loan",
    "amount": 38000,
    "fedRate": 6.54,
    "pmt10": 432,
    "pmt20": 284,
    "pmt25": 258,
    "type": "grad school or high-cost undergrad"
  },
  {
    "slug": "loan-40000",
    "name": "$40 000 Student Loan",
    "amount": 40000,
    "fedRate": 6.54,
    "pmt10": 455,
    "pmt20": 299,
    "pmt25": 271,
    "type": "grad school or high-cost undergrad"
  },
  {
    "slug": "loan-42000",
    "name": "$42 000 Student Loan",
    "amount": 42000,
    "fedRate": 6.54,
    "pmt10": 478,
    "pmt20": 314,
    "pmt25": 285,
    "type": "grad school or high-cost undergrad"
  },
  {
    "slug": "loan-43000",
    "name": "$43 000 Student Loan",
    "amount": 43000,
    "fedRate": 6.54,
    "pmt10": 489,
    "pmt20": 322,
    "pmt25": 291,
    "type": "grad school or high-cost undergrad"
  },
  {
    "slug": "loan-45000",
    "name": "$45 000 Student Loan",
    "amount": 45000,
    "fedRate": 6.54,
    "pmt10": 512,
    "pmt20": 337,
    "pmt25": 305,
    "type": "grad school or high-cost undergrad"
  },
  {
    "slug": "loan-48000",
    "name": "$48 000 Student Loan",
    "amount": 48000,
    "fedRate": 6.54,
    "pmt10": 546,
    "pmt20": 359,
    "pmt25": 325,
    "type": "grad school or high-cost undergrad"
  },
  {
    "slug": "loan-50000",
    "name": "$50 000 Student Loan",
    "amount": 50000,
    "fedRate": 6.54,
    "pmt10": 569,
    "pmt20": 374,
    "pmt25": 339,
    "type": "grad school or high-cost undergrad"
  },
  {
    "slug": "loan-53000",
    "name": "$53 000 Student Loan",
    "amount": 53000,
    "fedRate": 6.54,
    "pmt10": 603,
    "pmt20": 396,
    "pmt25": 359,
    "type": "grad school or high-cost undergrad"
  },
  {
    "slug": "loan-55000",
    "name": "$55 000 Student Loan",
    "amount": 55000,
    "fedRate": 6.54,
    "pmt10": 626,
    "pmt20": 411,
    "pmt25": 373,
    "type": "grad school or high-cost undergrad"
  },
  {
    "slug": "loan-60000",
    "name": "$60 000 Student Loan",
    "amount": 60000,
    "fedRate": 6.54,
    "pmt10": 683,
    "pmt20": 449,
    "pmt25": 407,
    "type": "grad school or high-cost undergrad"
  },
  {
    "slug": "loan-63000",
    "name": "$63 000 Student Loan",
    "amount": 63000,
    "fedRate": 6.54,
    "pmt10": 717,
    "pmt20": 471,
    "pmt25": 427,
    "type": "grad school or high-cost undergrad"
  },
  {
    "slug": "loan-65000",
    "name": "$65 000 Student Loan",
    "amount": 65000,
    "fedRate": 6.54,
    "pmt10": 739,
    "pmt20": 486,
    "pmt25": 441,
    "type": "grad school or high-cost undergrad"
  },
  {
    "slug": "loan-70000",
    "name": "$70 000 Student Loan",
    "amount": 70000,
    "fedRate": 6.54,
    "pmt10": 796,
    "pmt20": 524,
    "pmt25": 474,
    "type": "grad school or high-cost undergrad"
  },
  {
    "slug": "loan-73000",
    "name": "$73 000 Student Loan",
    "amount": 73000,
    "fedRate": 6.54,
    "pmt10": 830,
    "pmt20": 546,
    "pmt25": 495,
    "type": "grad school or high-cost undergrad"
  },
  {
    "slug": "loan-75000",
    "name": "$75 000 Student Loan",
    "amount": 75000,
    "fedRate": 6.54,
    "pmt10": 853,
    "pmt20": 561,
    "pmt25": 508,
    "type": "grad school or high-cost undergrad"
  },
  {
    "slug": "loan-80000",
    "name": "$80 000 Student Loan",
    "amount": 80000,
    "fedRate": 6.54,
    "pmt10": 910,
    "pmt20": 598,
    "pmt25": 542,
    "type": "professional or medical school"
  },
  {
    "slug": "loan-83000",
    "name": "$83 000 Student Loan",
    "amount": 83000,
    "fedRate": 6.54,
    "pmt10": 944,
    "pmt20": 621,
    "pmt25": 562,
    "type": "professional or medical school"
  },
  {
    "slug": "loan-85000",
    "name": "$85 000 Student Loan",
    "amount": 85000,
    "fedRate": 6.54,
    "pmt10": 967,
    "pmt20": 636,
    "pmt25": 576,
    "type": "professional or medical school"
  },
  {
    "slug": "loan-90000",
    "name": "$90 000 Student Loan",
    "amount": 90000,
    "fedRate": 6.54,
    "pmt10": 1024,
    "pmt20": 673,
    "pmt25": 610,
    "type": "professional or medical school"
  },
  {
    "slug": "loan-93000",
    "name": "$93 000 Student Loan",
    "amount": 93000,
    "fedRate": 6.54,
    "pmt10": 1058,
    "pmt20": 696,
    "pmt25": 630,
    "type": "professional or medical school"
  },
  {
    "slug": "loan-95000",
    "name": "$95 000 Student Loan",
    "amount": 95000,
    "fedRate": 6.54,
    "pmt10": 1081,
    "pmt20": 711,
    "pmt25": 644,
    "type": "professional or medical school"
  },
  {
    "slug": "loan-100000",
    "name": "$100 000 Student Loan",
    "amount": 100000,
    "fedRate": 6.54,
    "pmt10": 1138,
    "pmt20": 748,
    "pmt25": 678,
    "type": "professional or medical school"
  },
  {
    "slug": "loan-110000",
    "name": "$110 000 Student Loan",
    "amount": 110000,
    "fedRate": 6.54,
    "pmt10": 1251,
    "pmt20": 823,
    "pmt25": 745,
    "type": "professional or medical school"
  },
  {
    "slug": "loan-115000",
    "name": "$115 000 Student Loan",
    "amount": 115000,
    "fedRate": 6.54,
    "pmt10": 1308,
    "pmt20": 860,
    "pmt25": 779,
    "type": "professional or medical school"
  },
  {
    "slug": "loan-120000",
    "name": "$120 000 Student Loan",
    "amount": 120000,
    "fedRate": 6.54,
    "pmt10": 1365,
    "pmt20": 898,
    "pmt25": 813,
    "type": "professional or medical school"
  },
  {
    "slug": "loan-130000",
    "name": "$130 000 Student Loan",
    "amount": 130000,
    "fedRate": 6.54,
    "pmt10": 1479,
    "pmt20": 972,
    "pmt25": 881,
    "type": "professional or medical school"
  },
  {
    "slug": "loan-140000",
    "name": "$140 000 Student Loan",
    "amount": 140000,
    "fedRate": 6.54,
    "pmt10": 1593,
    "pmt20": 1047,
    "pmt25": 949,
    "type": "professional or medical school"
  },
  {
    "slug": "loan-150000",
    "name": "$150 000 Student Loan",
    "amount": 150000,
    "fedRate": 6.54,
    "pmt10": 1706,
    "pmt20": 1122,
    "pmt25": 1017,
    "type": " medical, law, or MBA program"
  },
  {
    "slug": "loan-175000",
    "name": "$175 000 Student Loan",
    "amount": 175000,
    "fedRate": 6.54,
    "pmt10": 1991,
    "pmt20": 1309,
    "pmt25": 1186,
    "type": " medical, law, or MBA program"
  },
  {
    "slug": "loan-200000",
    "name": "$200 000 Student Loan",
    "amount": 200000,
    "fedRate": 6.54,
    "pmt10": 2275,
    "pmt20": 1496,
    "pmt25": 1355,
    "type": " medical, law, or MBA program"
  },
  {
    "slug": "loan-225000",
    "name": "$225 000 Student Loan",
    "amount": 225000,
    "fedRate": 6.54,
    "pmt10": 2559,
    "pmt20": 1683,
    "pmt25": 1525,
    "type": " medical, law, or MBA program"
  },
  {
    "slug": "loan-250000",
    "name": "$250 000 Student Loan",
    "amount": 250000,
    "fedRate": 6.54,
    "pmt10": 2844,
    "pmt20": 1870,
    "pmt25": 1694,
    "type": " medical, law, or MBA program"
  },
  {
    "slug": "loan-300000",
    "name": "$300 000 Student Loan",
    "amount": 300000,
    "fedRate": 6.54,
    "pmt10": 3413,
    "pmt20": 2244,
    "pmt25": 2033,
    "type": " medical, law, or MBA program"
  },
  {
    "slug": "loan-350000",
    "name": "$350 000 Student Loan",
    "amount": 350000,
    "fedRate": 6.54,
    "pmt10": 3981,
    "pmt20": 2618,
    "pmt25": 2372,
    "type": " medical, law, or MBA program"
  }
]
module.exports = studentAmounts
