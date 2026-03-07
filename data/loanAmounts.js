const loanAmounts = [
  {
    "slug": "loan-1000",
    "name": "$1 000 Personal Loan",
    "amount": 1000,
    "rate": 18,
    "term36": 34,
    "term60": 22
  },
  {
    "slug": "loan-1500",
    "name": "$1 500 Personal Loan",
    "amount": 1500,
    "rate": 18,
    "term36": 51,
    "term60": 33
  },
  {
    "slug": "loan-2000",
    "name": "$2 000 Personal Loan",
    "amount": 2000,
    "rate": 18,
    "term36": 68,
    "term60": 44
  },
  {
    "slug": "loan-2500",
    "name": "$2 500 Personal Loan",
    "amount": 2500,
    "rate": 18,
    "term36": 85,
    "term60": 56
  },
  {
    "slug": "loan-3000",
    "name": "$3 000 Personal Loan",
    "amount": 3000,
    "rate": 18,
    "term36": 103,
    "term60": 67
  },
  {
    "slug": "loan-4000",
    "name": "$4 000 Personal Loan",
    "amount": 4000,
    "rate": 18,
    "term36": 137,
    "term60": 89
  },
  {
    "slug": "loan-5000",
    "name": "$5 000 Personal Loan",
    "amount": 5000,
    "rate": 14,
    "term36": 171,
    "term60": 111
  },
  {
    "slug": "loan-6000",
    "name": "$6 000 Personal Loan",
    "amount": 6000,
    "rate": 14,
    "term36": 205,
    "term60": 133
  },
  {
    "slug": "loan-7000",
    "name": "$7 000 Personal Loan",
    "amount": 7000,
    "rate": 14,
    "term36": 239,
    "term60": 156
  },
  {
    "slug": "loan-8000",
    "name": "$8 000 Personal Loan",
    "amount": 8000,
    "rate": 14,
    "term36": 273,
    "term60": 178
  },
  {
    "slug": "loan-9000",
    "name": "$9 000 Personal Loan",
    "amount": 9000,
    "rate": 14,
    "term36": 308,
    "term60": 200
  },
  {
    "slug": "loan-10000",
    "name": "$10 000 Personal Loan",
    "amount": 10000,
    "rate": 14,
    "term36": 342,
    "term60": 222
  },
  {
    "slug": "loan-12000",
    "name": "$12 000 Personal Loan",
    "amount": 12000,
    "rate": 14,
    "term36": 410,
    "term60": 267
  },
  {
    "slug": "loan-15000",
    "name": "$15 000 Personal Loan",
    "amount": 15000,
    "rate": 11,
    "term36": 513,
    "term60": 334
  },
  {
    "slug": "loan-17000",
    "name": "$17 000 Personal Loan",
    "amount": 17000,
    "rate": 11,
    "term36": 581,
    "term60": 378
  },
  {
    "slug": "loan-20000",
    "name": "$20 000 Personal Loan",
    "amount": 20000,
    "rate": 11,
    "term36": 684,
    "term60": 445
  },
  {
    "slug": "loan-22000",
    "name": "$22 000 Personal Loan",
    "amount": 22000,
    "rate": 11,
    "term36": 752,
    "term60": 489
  },
  {
    "slug": "loan-25000",
    "name": "$25 000 Personal Loan",
    "amount": 25000,
    "rate": 11,
    "term36": 854,
    "term60": 556
  },
  {
    "slug": "loan-28000",
    "name": "$28 000 Personal Loan",
    "amount": 28000,
    "rate": 11,
    "term36": 957,
    "term60": 623
  },
  {
    "slug": "loan-30000",
    "name": "$30 000 Personal Loan",
    "amount": 30000,
    "rate": 11,
    "term36": 1025,
    "term60": 667
  },
  {
    "slug": "loan-35000",
    "name": "$35 000 Personal Loan",
    "amount": 35000,
    "rate": 11,
    "term36": 1196,
    "term60": 779
  },
  {
    "slug": "loan-40000",
    "name": "$40 000 Personal Loan",
    "amount": 40000,
    "rate": 11,
    "term36": 1367,
    "term60": 890
  },
  {
    "slug": "loan-45000",
    "name": "$45 000 Personal Loan",
    "amount": 45000,
    "rate": 11,
    "term36": 1538,
    "term60": 1001
  },
  {
    "slug": "loan-50000",
    "name": "$50 000 Personal Loan",
    "amount": 50000,
    "rate": 9,
    "term36": 1709,
    "term60": 1112
  },
  {
    "slug": "loan-55000",
    "name": "$55 000 Personal Loan",
    "amount": 55000,
    "rate": 9,
    "term36": 1880,
    "term60": 1223
  },
  {
    "slug": "loan-60000",
    "name": "$60 000 Personal Loan",
    "amount": 60000,
    "rate": 9,
    "term36": 2051,
    "term60": 1335
  },
  {
    "slug": "loan-65000",
    "name": "$65 000 Personal Loan",
    "amount": 65000,
    "rate": 9,
    "term36": 2222,
    "term60": 1446
  },
  {
    "slug": "loan-70000",
    "name": "$70 000 Personal Loan",
    "amount": 70000,
    "rate": 9,
    "term36": 2392,
    "term60": 1557
  },
  {
    "slug": "loan-75000",
    "name": "$75 000 Personal Loan",
    "amount": 75000,
    "rate": 9,
    "term36": 2563,
    "term60": 1668
  },
  {
    "slug": "loan-80000",
    "name": "$80 000 Personal Loan",
    "amount": 80000,
    "rate": 9,
    "term36": 2734,
    "term60": 1780
  },
  {
    "slug": "loan-85000",
    "name": "$85 000 Personal Loan",
    "amount": 85000,
    "rate": 9,
    "term36": 2905,
    "term60": 1891
  },
  {
    "slug": "loan-90000",
    "name": "$90 000 Personal Loan",
    "amount": 90000,
    "rate": 9,
    "term36": 3076,
    "term60": 2002
  },
  {
    "slug": "loan-95000",
    "name": "$95 000 Personal Loan",
    "amount": 95000,
    "rate": 9,
    "term36": 3247,
    "term60": 2113
  },
  {
    "slug": "loan-100000",
    "name": "$100 000 Personal Loan",
    "amount": 100000,
    "rate": 9,
    "term36": 3418,
    "term60": 2224
  },
  {
    "slug": "loan-7500",
    "name": "$7 500 Personal Loan",
    "amount": 7500,
    "rate": 14,
    "term36": 256,
    "term60": 167
  },
  {
    "slug": "loan-11000",
    "name": "$11 000 Personal Loan",
    "amount": 11000,
    "rate": 14,
    "term36": 376,
    "term60": 245
  },
  {
    "slug": "loan-16000",
    "name": "$16 000 Personal Loan",
    "amount": 16000,
    "rate": 11,
    "term36": 547,
    "term60": 356
  },
  {
    "slug": "loan-23000",
    "name": "$23 000 Personal Loan",
    "amount": 23000,
    "rate": 11,
    "term36": 786,
    "term60": 512
  },
  {
    "slug": "loan-32000",
    "name": "$32 000 Personal Loan",
    "amount": 32000,
    "rate": 11,
    "term36": 1094,
    "term60": 712
  },
  {
    "slug": "loan-42000",
    "name": "$42 000 Personal Loan",
    "amount": 42000,
    "rate": 11,
    "term36": 1435,
    "term60": 934
  },
  {
    "slug": "loan-52000",
    "name": "$52 000 Personal Loan",
    "amount": 52000,
    "rate": 9,
    "term36": 1777,
    "term60": 1157
  },
  {
    "slug": "loan-62000",
    "name": "$62 000 Personal Loan",
    "amount": 62000,
    "rate": 9,
    "term36": 2119,
    "term60": 1379
  },
  {
    "slug": "loan-72000",
    "name": "$72 000 Personal Loan",
    "amount": 72000,
    "rate": 9,
    "term36": 2461,
    "term60": 1602
  },
  {
    "slug": "loan-82000",
    "name": "$82 000 Personal Loan",
    "amount": 82000,
    "rate": 9,
    "term36": 2803,
    "term60": 1824
  },
  {
    "slug": "loan-92000",
    "name": "$92 000 Personal Loan",
    "amount": 92000,
    "rate": 9,
    "term36": 3144,
    "term60": 2046
  },
  {
    "slug": "loan-3500",
    "name": "$3 500 Personal Loan",
    "amount": 3500,
    "rate": 18,
    "term36": 120,
    "term60": 78
  },
  {
    "slug": "loan-6500",
    "name": "$6 500 Personal Loan",
    "amount": 6500,
    "rate": 14,
    "term36": 222,
    "term60": 145
  },
  {
    "slug": "loan-13000",
    "name": "$13 000 Personal Loan",
    "amount": 13000,
    "rate": 14,
    "term36": 444,
    "term60": 289
  },
  {
    "slug": "loan-18000",
    "name": "$18 000 Personal Loan",
    "amount": 18000,
    "rate": 11,
    "term36": 615,
    "term60": 400
  },
  {
    "slug": "loan-27000",
    "name": "$27 000 Personal Loan",
    "amount": 27000,
    "rate": 11,
    "term36": 923,
    "term60": 601
  },
  {
    "slug": "loan-37000",
    "name": "$37 000 Personal Loan",
    "amount": 37000,
    "rate": 11,
    "term36": 1265,
    "term60": 823
  },
  {
    "slug": "loan-47000",
    "name": "$47 000 Personal Loan",
    "amount": 47000,
    "rate": 11,
    "term36": 1606,
    "term60": 1045
  },
  {
    "slug": "loan-57000",
    "name": "$57 000 Personal Loan",
    "amount": 57000,
    "rate": 9,
    "term36": 1948,
    "term60": 1268
  },
  {
    "slug": "loan-67000",
    "name": "$67 000 Personal Loan",
    "amount": 67000,
    "rate": 9,
    "term36": 2290,
    "term60": 1490
  },
  {
    "slug": "loan-77000",
    "name": "$77 000 Personal Loan",
    "amount": 77000,
    "rate": 9,
    "term36": 2632,
    "term60": 1713
  }
]
module.exports = loanAmounts
