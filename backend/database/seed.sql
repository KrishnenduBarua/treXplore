USE trexplore_db;

INSERT INTO places (
  id, name, division, district, category, description, image_url, rating, best_time,
  entry_fee, parking, food, accommodation, getting_there
) VALUES
(1, 'Cox''s Bazar', 'Chittagong', 'Cox''s Bazar', 'Beach', 'Cox''s Bazar is the longest natural sea beach in the world, stretching over 120 kilometers. This beautiful destination offers stunning sunsets, water sports, and fresh seafood. The beach is known for its golden sand and the gentle waves of the Bay of Bengal.', 'https://d34vm3j4h7f97z.cloudfront.net/optimized/3X/3/7/373e58571d420b9b1162dc45a2cde9196b4f6df6_2_690x387.jpeg', 4.7, 'October to March', 'Free', 'Available', 'Plenty of options', 'Hotels & Resorts available', 'Regular bus and air services from Dhaka. The journey takes about 8-10 hours by road or 1 hour by air.'),
(2, 'Sundarbans', 'Khulna', 'Bagerhat', 'Forest', 'The Sundarbans is the largest mangrove forest in the world and a UNESCO World Heritage Site. Home to the Royal Bengal Tiger, this unique ecosystem features rivers, creeks, and dense mangrove forests. It''s a paradise for wildlife enthusiasts and nature lovers.', 'https://dscdn.daily-sun.com/english/uploads/news_photos/2021/10/31/Sundarbans-ds.jpg', 4.8, 'November to February', 'Permit required', 'Limited', 'Basic facilities', 'Boats & nearby hotels', 'Travel to Khulna first, then take a boat from Mongla port. Tours are organized from Dhaka as well.'),
(3, 'Sajek Valley', 'Chittagong', 'Rangamati', 'Hill Station', 'Known as the Queen of Hills, Sajek Valley is one of the most beautiful hill stations in Bangladesh. Located in the Chittagong Hill Tracts, it offers breathtaking views of clouds, mountains, and valleys. The indigenous culture adds to its charm.', 'https://upload.wikimedia.org/wikipedia/commons/e/e9/Sajek_Valley_2_%28cropped%29.jpg', 4.9, 'October to April', 'Permission required', 'Limited', 'Local restaurants', 'Resorts & cottages', 'Travel to Khagrachari, then hire a local vehicle. The journey involves mountainous roads and takes several hours.'),
(4, 'Ratargul Swamp Forest', 'Sylhet', 'Sylhet', 'Forest', 'Ratargul is a freshwater swamp forest, one of the few in the world. During monsoon, the forest remains submerged in 20-30 feet of water. Visitors can explore the forest by boat, witnessing unique aquatic plant life and birds.', 'https://grandsylhet.com/wp-content/uploads/2025/02/Ratargul-Swamp-Forest-with-boat-1024x538.webp', 4.6, 'June to October (Monsoon)', 'Minimal', 'Available', 'Local food available', 'Hotels in Sylhet city', 'Located 26 km from Sylhet city. Local transport and CNG available from Sylhet.'),
(5, 'Srimangal Tea Gardens', 'Sylhet', 'Moulvibazar', 'Tea Estate', 'Known as the tea capital of Bangladesh, Srimangal is famous for its lush green tea gardens. The area is also rich in biodiversity with numerous forests and wildlife. Do not miss the famous seven-layer tea.', 'https://royalbengaltours.com/wp-content/uploads/2019/08/serine-tea-estate-in-srimangal-for-holiday-trip.webp', 4.7, 'October to March', 'Free (Tea gardens)', 'Available', 'Local restaurants & tea stalls', 'Hotels & resorts', 'Regular train and bus services from Dhaka. Takes about 4-5 hours by train.'),
(6, 'Paharpur Buddhist Vihara', 'Rajshahi', 'Naogaon', 'Historical', 'Paharpur is a UNESCO World Heritage Site containing the ruins of the largest Buddhist monastery south of the Himalayas. Dating back to the 8th century, it is an important archaeological site showcasing ancient Bengal''s Buddhist culture.', 'https://bangladeshpost.net/webroot/uploads/featureimage/2019-11/5dd28ecb56051.jpg', 4.5, 'November to February', 'Nominal', 'Available', 'Limited options', 'Basic hotels nearby', 'Located in Naogaon district. Best accessed via Rajshahi or Bogra, then local transport.'),
(7, 'Kuakata Beach', 'Barisal', 'Patuakhali', 'Beach', 'Kuakata is unique as one of the few places where you can watch both sunrise and sunset from the beach. This virgin beach offers a tranquil escape with less crowd compared to Cox''s Bazar.', 'https://mindtrip.ai/cdn-cgi/image/format=webp,w=1200/https://images.mindtrip.ai/attractions/6ebf/9ac6/bcc7/2132/9ff4/bda3/3dba/518f', 4.6, 'November to March', 'Free', 'Available', 'Local restaurants', 'Hotels & guest houses', 'Bus services from Dhaka via Barisal. Launch services also available via river route.'),
(8, 'Saint Martin''s Island', 'Chittagong', 'Cox''s Bazar', 'Island', 'Bangladesh''s only coral island, Saint Martin''s offers crystal clear water, coral reefs, and a peaceful atmosphere. It is perfect for swimming, snorkeling, and enjoying fresh coconut water.', 'https://coxsbazarlife.com/wp-content/uploads/2024/11/St-Martin.jpeg', 4.8, 'November to March', 'Ship fare', 'Not applicable', 'Local restaurants', 'Hotels & cottages', 'Ships depart from Teknaf (near Cox''s Bazar). Journey takes 2-3 hours depending on weather.'),
(9, 'Ahsan Manzil', 'Dhaka', 'Dhaka', 'Historical', 'The Pink Palace of Dhaka, Ahsan Manzil was the residential palace of the Nawab of Dhaka. Now a museum, it showcases the lifestyle of the Nawabs and houses numerous artifacts from the Mughal and British periods.', 'https://www.ahsanmanzilticket.gov.bd/images/NMB.jpg', 4.4, 'October to March', 'Nominal', 'Limited', 'Nearby Old Dhaka food', 'Hotels in Dhaka', 'Located in Old Dhaka near Sadarghat. Easily accessible by rickshaw or Uber from anywhere in Dhaka.'),
(10, 'Jaflong', 'Sylhet', 'Sylhet', 'Natural Beauty', 'Jaflong is a scenic spot at the border with India, known for its stone collections from the Piyain River. The area offers stunning views of hills, tea gardens, and crystal clear river water.', 'https://dscdn.daily-sun.com/english/uploads/news_photos/2020/02/08/Jaflong-daily-sun.jpg', 4.5, 'November to February', 'Free', 'Available', 'Local restaurants', 'Hotels in Sylhet', 'About 60 km from Sylhet city. Local transport and private cars available.'),
(11, 'Rangamati', 'Chittagong', 'Rangamati', 'Hill Station', 'The district headquarters of Rangamati is a scenic town surrounded by Kaptai Lake. It offers boat rides, tribal culture experiences, and beautiful hilltop views. The hanging bridge is a major attraction.', 'https://upload.wikimedia.org/wikipedia/commons/b/bc/Rangamati1.jpg', 4.6, 'October to March', 'Free (Boat charges apply)', 'Available', 'Local & tribal cuisine', 'Hotels & resorts', 'Regular bus services from Chittagong. About 77 km from Chittagong city.'),
(12, 'Kantajew Temple', 'Rangpur', 'Dinajpur', 'Historical', 'One of the finest examples of terracotta Hindu temples in Bangladesh. Built in the 18th century, it features intricate terracotta artwork depicting scenes from Hindu epics and everyday life.', 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/55/96/11/kantajew-temple-kantajew.jpg?w=1200&h=-1&s=1', 4.5, 'October to March', 'Nominal', 'Available', 'Limited options', 'Hotels in Dinajpur', 'Located 20 km north of Dinajpur town. Local transport available.')
ON DUPLICATE KEY UPDATE
  name = VALUES(name),
  division = VALUES(division),
  district = VALUES(district),
  category = VALUES(category),
  description = VALUES(description),
  image_url = VALUES(image_url),
  rating = VALUES(rating),
  best_time = VALUES(best_time),
  entry_fee = VALUES(entry_fee),
  parking = VALUES(parking),
  food = VALUES(food),
  accommodation = VALUES(accommodation),
  getting_there = VALUES(getting_there);

INSERT INTO users (id, name, email, phone, password_hash, avatar_url, bio, location)
VALUES
(1, 'Krish Barua', 'krish@gmail.com', '01882373776', '$2a$10$/x/G9C8DM3JaKOmhz9YQc.FNkKRGeXwNezUqNwfzmaTtCesCNKxqO', 'https://ui-avatars.com/api/?name=Krish+Barua&size=200&background=4f46e5&color=fff', 'Travel enthusiast exploring the beautiful places of Bangladesh.', 'Chattogram, Bangladesh'),
(2, 'Sarah Ahmed', 'sarah@example.com', NULL, '$2a$10$/x/G9C8DM3JaKOmhz9YQc.FNkKRGeXwNezUqNwfzmaTtCesCNKxqO', 'https://ui-avatars.com/api/?name=Sarah+Ahmed&background=4f46e5&color=fff', NULL, NULL),
(3, 'Rahul Das', 'rahul@example.com', NULL, '$2a$10$/x/G9C8DM3JaKOmhz9YQc.FNkKRGeXwNezUqNwfzmaTtCesCNKxqO', 'https://ui-avatars.com/api/?name=Rahul+Das&background=10b981&color=fff', NULL, NULL),
(4, 'Nadia Khan', 'nadia@example.com', NULL, '$2a$10$/x/G9C8DM3JaKOmhz9YQc.FNkKRGeXwNezUqNwfzmaTtCesCNKxqO', 'https://ui-avatars.com/api/?name=Nadia+Khan&background=f59e0b&color=fff', NULL, NULL)
ON DUPLICATE KEY UPDATE
  name = VALUES(name),
  phone = VALUES(phone),
  avatar_url = VALUES(avatar_url),
  bio = VALUES(bio),
  location = VALUES(location);

INSERT INTO blogs (id, place_id, user_id, title, content, rating, created_at)
VALUES
(1, 1, 2, 'Sunrise at Cox''s Bazar - A Magical Experience', 'Waking up early to catch the sunrise at Cox''s Bazar was absolutely worth it. The golden rays painting the longest beach in the world was a sight to behold. I spent three days here and every moment was memorable. The local seafood is incredibly fresh and delicious. Do not miss trying the grilled fish at the beach shacks.', 5.0, '2026-01-15 08:30:00'),
(2, 1, 3, 'Perfect Family Vacation Spot', 'Cox''s Bazar is perfect for families. The beach is safe for kids, and there are plenty of activities to keep everyone entertained. We enjoyed beach volleyball, parasailing, and collecting seashells. The hotels near the beach are comfortable and affordable.', 4.5, '2026-01-10 11:45:00'),
(3, 3, 4, 'Above the Clouds - Sajek Valley', 'Sajek Valley is truly the queen of hills. The journey was challenging but the destination was worth every bump on the road. Watching the clouds roll beneath you is surreal. The indigenous people are very friendly and their cultural traditions are fascinating. I highly recommend staying overnight to experience the starry night sky.', 5.0, '2026-01-08 09:15:00')
ON DUPLICATE KEY UPDATE
  title = VALUES(title),
  content = VALUES(content),
  rating = VALUES(rating),
  created_at = VALUES(created_at);

INSERT INTO favorites (user_id, place_id)
VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4)
ON DUPLICATE KEY UPDATE place_id = VALUES(place_id);
