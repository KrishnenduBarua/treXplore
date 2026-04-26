// Sample data for Bangladesh tourist places
const placesData = [
  {
    id: 1,
    name: "Cox's Bazar",
    division: "Chittagong",
    district: "Cox's Bazar",
    category: "Beach",
    description:
      "Cox's Bazar is the longest natural sea beach in the world, stretching over 120 kilometers. This beautiful destination offers stunning sunsets, water sports, and fresh seafood. The beach is known for its golden sand and the gentle waves of the Bay of Bengal.",
    image:
      "https://d34vm3j4h7f97z.cloudfront.net/optimized/3X/3/7/373e58571d420b9b1162dc45a2cde9196b4f6df6_2_690x387.jpeg",
    rating: 4.7,
    bestTime: "October to March",
    entryFee: "Free",
    parking: "Available",
    food: "Plenty of options",
    accommodation: "Hotels & Resorts available",
    gettingThere:
      "Regular bus and air services from Dhaka. The journey takes about 8-10 hours by road or 1 hour by air.",
  },
  {
    id: 2,
    name: "Sundarbans",
    division: "Khulna",
    district: "Bagerhat",
    category: "Forest",
    description:
      "The Sundarbans is the largest mangrove forest in the world and a UNESCO World Heritage Site. Home to the Royal Bengal Tiger, this unique ecosystem features rivers, creeks, and dense mangrove forests. It's a paradise for wildlife enthusiasts and nature lovers.",
    image:
      "https://dscdn.daily-sun.com/english/uploads/news_photos/2021/10/31/Sundarbans-ds.jpg",
    rating: 4.8,
    bestTime: "November to February",
    entryFee: "Permit required",
    parking: "Limited",
    food: "Basic facilities",
    accommodation: "Boats & nearby hotels",
    gettingThere:
      "Travel to Khulna first, then take a boat from Mongla port. Tours are organized from Dhaka as well.",
  },
  {
    id: 3,
    name: "Sajek Valley",
    division: "Chittagong",
    district: "Rangamati",
    category: "Hill Station",
    description:
      "Known as the 'Queen of Hills', Sajek Valley is one of the most beautiful hill stations in Bangladesh. Located in the Chittagong Hill Tracts, it offers breathtaking views of clouds, mountains, and valleys. The indigenous culture adds to its charm.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/e/e9/Sajek_Valley_2_%28cropped%29.jpg",
    rating: 4.9,
    bestTime: "October to April",
    entryFee: "Permission required",
    parking: "Limited",
    food: "Local restaurants",
    accommodation: "Resorts & cottages",
    gettingThere:
      "Travel to Khagrachari, then hire a local vehicle. The journey involves mountainous roads and takes several hours.",
  },
  {
    id: 4,
    name: "Ratargul Swamp Forest",
    division: "Sylhet",
    district: "Sylhet",
    category: "Forest",
    description:
      "Ratargul is a freshwater swamp forest, one of the few in the world. During monsoon, the forest remains submerged in 20-30 feet of water. Visitors can explore the forest by boat, witnessing unique aquatic plant life and birds.",
    image:
      "https://grandsylhet.com/wp-content/uploads/2025/02/Ratargul-Swamp-Forest-with-boat-1024x538.webp",
    rating: 4.6,
    bestTime: "June to October (Monsoon)",
    entryFee: "Minimal",
    parking: "Available",
    food: "Local food available",
    accommodation: "Hotels in Sylhet city",
    gettingThere:
      "Located 26 km from Sylhet city. Local transport and CNG available from Sylhet.",
  },
  {
    id: 5,
    name: "Srimangal Tea Gardens",
    division: "Sylhet",
    district: "Moulvibazar",
    category: "Tea Estate",
    description:
      "Known as the tea capital of Bangladesh, Srimangal is famous for its lush green tea gardens. The area is also rich in biodiversity with numerous forests and wildlife. Don't miss the famous seven-layer tea!",
    image:
      "https://royalbengaltours.com/wp-content/uploads/2019/08/serine-tea-estate-in-srimangal-for-holiday-trip.webp",
    rating: 4.7,
    bestTime: "October to March",
    entryFee: "Free (Tea gardens)",
    parking: "Available",
    food: "Local restaurants & tea stalls",
    accommodation: "Hotels & resorts",
    gettingThere:
      "Regular train and bus services from Dhaka. Takes about 4-5 hours by train.",
  },
  {
    id: 6,
    name: "Paharpur Buddhist Vihara",
    division: "Rajshahi",
    district: "Naogaon",
    category: "Historical",
    description:
      "Paharpur is a UNESCO World Heritage Site containing the ruins of the largest Buddhist monastery south of the Himalayas. Dating back to the 8th century, it's an important archaeological site showcasing ancient Bengal's Buddhist culture.",
    image:
      "https://bangladeshpost.net/webroot/uploads/featureimage/2019-11/5dd28ecb56051.jpg",
    rating: 4.5,
    bestTime: "November to February",
    entryFee: "Nominal",
    parking: "Available",
    food: "Limited options",
    accommodation: "Basic hotels nearby",
    gettingThere:
      "Located in Naogaon district. Best accessed via Rajshahi or Bogra, then local transport.",
  },
  {
    id: 7,
    name: "Kuakata Beach",
    division: "Barisal",
    district: "Patuakhali",
    category: "Beach",
    description:
      "Kuakata is unique as one of the few places where you can watch both sunrise and sunset from the beach. This virgin beach offers a tranquil escape with less crowd compared to Cox's Bazar.",
    image:
      "https://mindtrip.ai/cdn-cgi/image/format=webp,w=1200/https://images.mindtrip.ai/attractions/6ebf/9ac6/bcc7/2132/9ff4/bda3/3dba/518f",
    rating: 4.6,
    bestTime: "November to March",
    entryFee: "Free",
    parking: "Available",
    food: "Local restaurants",
    accommodation: "Hotels & guest houses",
    gettingThere:
      "Bus services from Dhaka via Barisal. Launch services also available via river route.",
  },
  {
    id: 8,
    name: "Saint Martin's Island",
    division: "Chittagong",
    district: "Cox's Bazar",
    category: "Island",
    description:
      "Bangladesh's only coral island, Saint Martin's offers crystal clear water, coral reefs, and a peaceful atmosphere. It's perfect for swimming, snorkeling, and enjoying fresh coconut water.",
    image:
      "https://coxsbazarlife.com/wp-content/uploads/2024/11/St-Martin.jpeg",
    rating: 4.8,
    bestTime: "November to March",
    entryFee: "Ship fare",
    parking: "Not applicable",
    food: "Local restaurants",
    accommodation: "Hotels & cottages",
    gettingThere:
      "Ships depart from Teknaf (near Cox's Bazar). Journey takes 2-3 hours depending on weather.",
  },
  {
    id: 9,
    name: "Ahsan Manzil",
    division: "Dhaka",
    district: "Dhaka",
    category: "Historical",
    description:
      "The Pink Palace of Dhaka, Ahsan Manzil was the residential palace of the Nawab of Dhaka. Now a museum, it showcases the lifestyle of the Nawabs and houses numerous artifacts from the Mughal and British periods.",
    image: "https://www.ahsanmanzilticket.gov.bd/images/NMB.jpg",
    rating: 4.4,
    bestTime: "October to March",
    entryFee: "Nominal",
    parking: "Limited",
    food: "Nearby Old Dhaka food",
    accommodation: "Hotels in Dhaka",
    gettingThere:
      "Located in Old Dhaka near Sadarghat. Easily accessible by rickshaw or Uber from anywhere in Dhaka.",
  },
  {
    id: 10,
    name: "Jaflong",
    division: "Sylhet",
    district: "Sylhet",
    category: "Natural Beauty",
    description:
      "Jaflong is a scenic spot at the border with India, known for its stone collections from the Piyain River. The area offers stunning views of hills, tea gardens, and crystal clear river water.",
    image:
      "https://dscdn.daily-sun.com/english/uploads/news_photos/2020/02/08/Jaflong-daily-sun.jpg",
    rating: 4.5,
    bestTime: "November to February",
    entryFee: "Free",
    parking: "Available",
    food: "Local restaurants",
    accommodation: "Hotels in Sylhet",
    gettingThere:
      "About 60 km from Sylhet city. Local transport and private cars available.",
  },
  {
    id: 11,
    name: "Rangamati",
    division: "Chittagong",
    district: "Rangamati",
    category: "Hill Station",
    description:
      "The district headquarters of Rangamati is a scenic town surrounded by Kaptai Lake. It offers boat rides, tribal culture experiences, and beautiful hilltop views. The hanging bridge is a major attraction.",
    image: "https://upload.wikimedia.org/wikipedia/commons/b/bc/Rangamati1.jpg",
    rating: 4.6,
    bestTime: "October to March",
    entryFee: "Free (Boat charges apply)",
    parking: "Available",
    food: "Local & tribal cuisine",
    accommodation: "Hotels & resorts",
    gettingThere:
      "Regular bus services from Chittagong. About 77 km from Chittagong city.",
  },
  {
    id: 12,
    name: "Kantajew Temple",
    division: "Rangpur",
    district: "Dinajpur",
    category: "Historical",
    description:
      "One of the finest examples of terracotta Hindu temples in Bangladesh. Built in the 18th century, it features intricate terracotta artwork depicting scenes from Hindu epics and everyday life.",
    image:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/55/96/11/kantajew-temple-kantajew.jpg?w=1200&h=-1&s=1",
    rating: 4.5,
    bestTime: "October to March",
    entryFee: "Nominal",
    parking: "Available",
    food: "Limited options",
    accommodation: "Hotels in Dinajpur",
    gettingThere:
      "Located 20 km north of Dinajpur town. Local transport available.",
  },
];

// Sample blogs data
const blogsData = [
  {
    id: 1,
    placeId: 1,
    placeName: "Cox's Bazar",
    author: "Sarah Ahmed",
    authorAvatar:
      "https://ui-avatars.com/api/?name=Sarah+Ahmed&background=4f46e5&color=fff",
    title: "Sunrise at Cox's Bazar - A Magical Experience",
    content:
      "Waking up early to catch the sunrise at Cox's Bazar was absolutely worth it! The golden rays painting the longest beach in the world was a sight to behold. I spent three days here and every moment was memorable. The local seafood is incredibly fresh and delicious. Don't miss trying the grilled fish at the beach shacks!",
    rating: 5,
    date: "2026-01-15",
  },
  {
    id: 2,
    placeId: 1,
    placeName: "Cox's Bazar",
    author: "Rahul Das",
    authorAvatar:
      "https://ui-avatars.com/api/?name=Rahul+Das&background=10b981&color=fff",
    title: "Perfect Family Vacation Spot",
    content:
      "Cox's Bazar is perfect for families. The beach is safe for kids, and there are plenty of activities to keep everyone entertained. We enjoyed beach volleyball, parasailing, and collecting seashells. The hotels near the beach are comfortable and affordable.",
    rating: 4.5,
    date: "2026-01-10",
  },
  {
    id: 3,
    placeId: 3,
    placeName: "Sajek Valley",
    author: "Nadia Khan",
    authorAvatar:
      "https://ui-avatars.com/api/?name=Nadia+Khan&background=f59e0b&color=fff",
    title: "Above the Clouds - Sajek Valley",
    content:
      "Sajek Valley is truly the queen of hills! The journey was challenging but the destination was worth every bump on the road. Watching the clouds roll beneath you is surreal. The indigenous people are very friendly and their cultural traditions are fascinating. I highly recommend staying overnight to experience the starry night sky.",
    rating: 5,
    date: "2026-01-08",
  },
];

// District data mapped to divisions
const districtData = {
  Dhaka: [
    "Dhaka",
    "Gazipur",
    "Narayanganj",
    "Tangail",
    "Kishoreganj",
    "Manikganj",
    "Munshiganj",
    "Narsingdi",
    "Rajbari",
    "Madaripur",
    "Gopalganj",
    "Shariatpur",
    "Faridpur",
  ],
  Chittagong: [
    "Chittagong",
    "Cox's Bazar",
    "Rangamati",
    "Bandarban",
    "Khagrachari",
    "Feni",
    "Lakshmipur",
    "Comilla",
    "Noakhali",
    "Brahmanbaria",
    "Chandpur",
  ],
  Sylhet: ["Sylhet", "Moulvibazar", "Habiganj", "Sunamganj"],
  Rajshahi: [
    "Rajshahi",
    "Bogra",
    "Pabna",
    "Sirajganj",
    "Natore",
    "Naogaon",
    "Chapainawabganj",
    "Joypurhat",
  ],
  Khulna: [
    "Khulna",
    "Bagerhat",
    "Satkhira",
    "Jessore",
    "Narail",
    "Magura",
    "Jhenaidah",
    "Chuadanga",
    "Kushtia",
    "Meherpur",
  ],
  Barisal: [
    "Barisal",
    "Patuakhali",
    "Bhola",
    "Pirojpur",
    "Jhalokati",
    "Barguna",
  ],
  Rangpur: [
    "Rangpur",
    "Dinajpur",
    "Gaibandha",
    "Kurigram",
    "Lalmonirhat",
    "Nilphamari",
    "Panchagarh",
    "Thakurgaon",
  ],
  Mymensingh: ["Mymensingh", "Jamalpur", "Netrokona", "Sherpur"],
};
