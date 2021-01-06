-- MySQL dump 10.13  Distrib 8.0.20, for macos10.15 (x86_64)
--
-- Host: sql12.freemysqlhosting.net    Database: sql12351192
-- ------------------------------------------------------
-- Server version	5.5.62-0ubuntu0.14.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `billingInfo`
--

DROP TABLE IF EXISTS `billingInfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `billingInfo` (
  `user_id` varchar(50) NOT NULL,
  `firstName` text NOT NULL,
  `lastName` text NOT NULL,
  `phoneNumber` varchar(12) NOT NULL,
  `streetAddress` varchar(100) NOT NULL,
  `country` varchar(15) NOT NULL,
  `city` varchar(15) NOT NULL,
  `zipcode` varchar(10) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `billingInfo`
--

LOCK TABLES `billingInfo` WRITE;
/*!40000 ALTER TABLE `billingInfo` DISABLE KEYS */;
INSERT INTO `billingInfo` VALUES ('tB5ofa12aWesXAstGDLfeZuhXWf1','Ahad','Shah','+92315873101','B-465, B-Area, Kalaboard, Malir','Pakistan','Karachi','75080');
/*!40000 ALTER TABLE `billingInfo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `posted_by` varchar(50) NOT NULL,
  `image_url` varchar(150) NOT NULL,
  `title` varchar(100) NOT NULL,
  `sub_title` varchar(200) DEFAULT NULL,
  `state_city` varchar(50) NOT NULL,
  `price` int(11) NOT NULL,
  `established_on` int(11) DEFAULT NULL,
  `value_report` varchar(150) DEFAULT NULL,
  `short_description` varchar(500) NOT NULL,
  `long_description` varchar(2000) NOT NULL,
  `business_owners` varchar(100) DEFAULT NULL,
  `facilities` varchar(1500) DEFAULT NULL,
  `support_n_training` varchar(200) DEFAULT NULL,
  `reason_for_selling` varchar(200) DEFAULT NULL,
  `business_website` varchar(100) DEFAULT NULL,
  `demographic_information` varchar(100) DEFAULT NULL,
  `category` int(11) NOT NULL DEFAULT '1',
  `country` varchar(50) NOT NULL,
  `last_updated` bigint(14) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (1,'QwcHC08MjhSsO6PeSPprqkkEf1o2','https://firebasestorage.googleapis.com/v0/b/bizinissify-cea9d.appspot.com/o/post_full_image%402x.png?alt=media','Bar for Sale in Denver with forty seat patio and views of Downtown Sky','Organically Popular - Proven Record of Traffic History','New York, NY',250000,0,NULL,'adg','This Denver bar for sale by the restaurant brokers features an amazing location with a large patio that features incredible views of the Denver skyline. With sales tracking at right around $1,100,000 and the owner mostly absentee there is big time room for continued growth with a hands on owner. With actual bottom line of $83000 for the 9 1/2 months of 2019 February 15th- November 30th, a hands on owner could increase this to over $100k easily. We will have full year numbers posted soon.\nLocated on a very busy north/south street, this restaurant and bar for sale sits on a hill in North Denver overlooking downtown. The 7000 square foot facility features great visibility, access, signage and parking. The facility is spacious and very well maintained. It seats almost 200 in the dining room and easily accommodates large parties and groups in both booth and table seating, another 30 or so in the separate bar area and has a full length, beautiful patio that seats over 40 with some of the best views in Denver.\nThe fully equipped commercial kitchen at this bar for sale with restaurant is huge and well equipped. Walk-in cooler and freezer as well as a dedicated beer walk-in with a glycol system that delivers ice cold been to the many taps in the bar area. The hood system is one of the largest we’ve seen with plenty of room for the 2 fryers, 2 large flat tops, large char broiler, 10 burner stove with oven as well as plenty of hot and cold storage. This kitchen is very large and would support any concept or menu. We Sell Restaurants is offering this opportunity that also has an extensive camera system as the current bar for sale and grill operation is currently run absentee at times.\nThe true gem of this bar for sale is the outdoor patio. It runs the length of the building and overlooks downtown Denver with seating over forty. At night the lights of downtown shimmer and create a second to none ambiance. All the drinking and dining areas have large windows that allow those seat','','Equipment List Dining Room Aprox 80 chairs 1-4 top tables 4-6 top tables 16-4 top booths 1-8 top booth 5 lrg flat screen TVs Menu board 2 benches Host stand Display case 7 hi chairs SS hand sink SS shelving Bar 5-2 top tables 4-4 tops 24 bar stools 12 bar stools bar 6 flat screen TVs 2-3 door glass door coolers drop in beer cooler 4 comp sink ice well Patio 6 round 4 tops 5-2 tops 31 chairs 8 round hi top fours 3-2 top hi tops 20 bar stools BOH Walk-n beer cooler Walk-in cooler Walk-in freeezer 2 SS hand sinks bus cart ice well with SS shelving Hot wells Conveyor toaster microwave glass door reach-in fridge 25 hood 2 fryers 2 flat tops lrg grill 10 burner stove w oven 2 sm sandwich prep coolers 2 door reach-in cooler 5 station hot well 2 microwaves small cooler stand up freezer Veg prep sink slicer Ss hand snk Microwave 2 SS prep tables Mixer tri sinks SS hand sink 2 bread racks on wheels Camera system Printer computer file cabinet safe Alarm system The following equipment is leased Ice machine Dishwasher','As needed up to 2 weeks','New Career','http://www.wesellrestaurants.com','',1,'USA',1593961546140),(5,'QwcHC08MjhSsO6PeSPprqkkEf1o2','https://firebasestorage.googleapis.com/v0/b/bizinissify-cea9d.appspot.com/o/post_full_image%402x.png?alt=media','Bar for Sale in Denver with forty seat patio and views of Downtown Sky','Organically Popular - Proven Record of Traffic History','New York, NY',250000,NULL,NULL,'The “Original Muck Boot Company” brand is owned by Honeywell; however, Honeywell does not own the “MUCKBOOTS.COM” website nor has it made a claim against it.','This Denver bar for sale by the restaurant brokers features an amazing location with a large patio that features incredible views of the Denver skyline. With sales tracking at right around $1,100,000 and the owner mostly absentee there is big time room for continued growth with a hands on owner. With actual bottom line of $83000 for the 9 1/2 months of 2019 February 15th- November 30th, a hands on owner could increase this to over $100k easily. We will have full year numbers posted soon.\nLocated on a very busy north/south street, this restaurant and bar for sale sits on a hill in North Denver overlooking downtown. The 7000 square foot facility features great visibility, access, signage and parking. The facility is spacious and very well maintained. It seats almost 200 in the dining room and easily accommodates large parties and groups in both booth and table seating, another 30 or so in the separate bar area and has a full length, beautiful patio that seats over 40 with some of the best views in Denver.\nThe fully equipped commercial kitchen at this bar for sale with restaurant is huge and well equipped. Walk-in cooler and freezer as well as a dedicated beer walk-in with a glycol system that delivers ice cold been to the many taps in the bar area. The hood system is one of the largest we’ve seen with plenty of room for the 2 fryers, 2 large flat tops, large char broiler, 10 burner stove with oven as well as plenty of hot and cold storage. This kitchen is very large and would support any concept or menu. We Sell Restaurants is offering this opportunity that also has an extensive camera system as the current bar for sale and grill operation is currently run absentee at times.\nThe true gem of this bar for sale is the outdoor patio. It runs the length of the building and overlooks downtown Denver with seating over forty. At night the lights of downtown shimmer and create a second to none ambiance. All the drinking and dining areas have large windows that allow those seat',NULL,'Equipment List Dining Room Aprox 80 chairs 1-4 top tables 4-6 top tables 16-4 top booths 1-8 top booth 5 lrg flat screen TVs Menu board 2 benches Host stand Display case 7 hi chairs SS hand sink SS shelving Bar 5-2 top tables 4-4 tops 24 bar stools 12 bar stools bar 6 flat screen TVs 2-3 door glass door coolers drop in beer cooler 4 comp sink ice well Patio 6 round 4 tops 5-2 tops 31 chairs 8 round hi top fours 3-2 top hi tops 20 bar stools BOH Walk-n beer cooler Walk-in cooler Walk-in freeezer 2 SS hand sinks bus cart ice well with SS shelving Hot wells Conveyor toaster microwave glass door reach-in fridge 25 hood 2 fryers 2 flat tops lrg grill 10 burner stove w oven 2 sm sandwich prep coolers 2 door reach-in cooler 5 station hot well 2 microwaves small cooler stand up freezer Veg prep sink slicer Ss hand snk Microwave 2 SS prep tables Mixer tri sinks SS hand sink 2 bread racks on wheels Camera system Printer computer file cabinet safe Alarm system The following equipment is leased Ice machine Dishwasher','As needed up to 2 weeks','New Career','http://www.wesellrestaurants.com',NULL,1,'USA',1592636872949),(7,'QwcHC08MjhSsO6PeSPprqkkEf1o2','https://firebasestorage.googleapis.com/v0/b/bizinissify-cea9d.appspot.com/o/post_full_image%402x.png?alt=media','Bar for Sale in Denver with forty seat patio and views of Downtown Sky','Organically Popular - Proven Record of Traffic History','New York, NY',250000,0,NULL,'The “Original Muck Boot Company” brand is owned by Honeywell; however, Honeywell does not own the “MUCKBOOTS.COM” website nor has it made a claim against it.','This Denver bar for sale by the restaurant brokers features an amazing location with a large patio that features incredible views of the Denver skyline. With sales tracking at right around $1,100,000 and the owner mostly absentee there is big time room for continued growth with a hands on owner. With actual bottom line of $83000 for the 9 1/2 months of 2019 February 15th- November 30th, a hands on owner could increase this to over $100k easily. We will have full year numbers posted soon.\nLocated on a very busy north/south street, this restaurant and bar for sale sits on a hill in North Denver overlooking downtown. The 7000 square foot facility features great visibility, access, signage and parking. The facility is spacious and very well maintained. It seats almost 200 in the dining room and easily accommodates large parties and groups in both booth and table seating, another 30 or so in the separate bar area and has a full length, beautiful patio that seats over 40 with some of the best views in Denver.\nThe fully equipped commercial kitchen at this bar for sale with restaurant is huge and well equipped. Walk-in cooler and freezer as well as a dedicated beer walk-in with a glycol system that delivers ice cold been to the many taps in the bar area. The hood system is one of the largest we’ve seen with plenty of room for the 2 fryers, 2 large flat tops, large char broiler, 10 burner stove with oven as well as plenty of hot and cold storage. This kitchen is very large and would support any concept or menu. We Sell Restaurants is offering this opportunity that also has an extensive camera system as the current bar for sale and grill operation is currently run absentee at times.\nThe true gem of this bar for sale is the outdoor patio. It runs the length of the building and overlooks downtown Denver with seating over forty. At night the lights of downtown shimmer and create a second to none ambiance. All the drinking and dining areas have large windows that allow those seat','','Equipment List Dining Room Aprox 80 chairs 1-4 top tables 4-6 top tables 16-4 top booths 1-8 top booth 5 lrg flat screen TVs Menu board 2 benches Host stand Display case 7 hi chairs SS hand sink SS shelving Bar 5-2 top tables 4-4 tops 24 bar stools 12 bar stools bar 6 flat screen TVs 2-3 door glass door coolers drop in beer cooler 4 comp sink ice well Patio 6 round 4 tops 5-2 tops 31 chairs 8 round hi top fours 3-2 top hi tops 20 bar stools BOH Walk-n beer cooler Walk-in cooler Walk-in freeezer 2 SS hand sinks bus cart ice well with SS shelving Hot wells Conveyor toaster microwave glass door reach-in fridge 25 hood 2 fryers 2 flat tops lrg grill 10 burner stove w oven 2 sm sandwich prep coolers 2 door reach-in cooler 5 station hot well 2 microwaves small cooler stand up freezer Veg prep sink slicer Ss hand snk Microwave 2 SS prep tables Mixer tri sinks SS hand sink 2 bread racks on wheels Camera system Printer computer file cabinet safe Alarm system The following equipment is leased Ice machine Dishwasher','As needed up to 2 weeks','New Career','http://www.wesellrestaurants.com','',1,'USA',1593962235390);
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` varchar(50) NOT NULL,
  `name` text NOT NULL,
  `lastName` text,
  `email` varchar(50) NOT NULL,
  `profileImage` varchar(150) DEFAULT NULL,
  `role` enum('user','admin') NOT NULL DEFAULT 'user',
  `subscription` enum('normal','broker') DEFAULT NULL,
  `buyerNews` tinyint(1) NOT NULL DEFAULT '0',
  `brokerNews` tinyint(1) NOT NULL DEFAULT '0',
  `franchiseNews` tinyint(1) NOT NULL DEFAULT '0',
  `sellerNews` tinyint(1) NOT NULL DEFAULT '0',
  `listingAlerts` tinyint(1) NOT NULL DEFAULT '0',
  `marketingEmails` tinyint(1) NOT NULL DEFAULT '0',
  `state` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('QwcHC08MjhSsO6PeSPprqkkEf1o2','Jawad','Ali','ahad62426@gmail.com','https://firebasestorage.googleapis.com/v0/b/bizinissify-cea9d.appspot.com/o/profile%402x.png?alt=media','user',NULL,1,0,0,0,0,0,NULL),('tB5ofa12aWesXAstGDLfeZuhXWf1','Ahah','Shah','ahads62426@gmail.com',NULL,'user',NULL,1,0,0,0,0,0,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-07-11  9:49:50
