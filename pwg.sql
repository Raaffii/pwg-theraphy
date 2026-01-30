-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: pwg_new
-- ------------------------------------------------------
-- Server version	8.0.42

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
-- Table structure for table `consent_health_conditions`
--

DROP TABLE IF EXISTS `consent_health_conditions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `consent_health_conditions` (
  `consent_id` int DEFAULT NULL,
  `condition_name` varchar(100) DEFAULT NULL,
  `has_condition` tinyint(1) DEFAULT NULL,
  `details` text,
  KEY `consent_id` (`consent_id`),
  CONSTRAINT `consent_health_conditions_ibfk_1` FOREIGN KEY (`consent_id`) REFERENCES `consentfrm` (`customerid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `consent_health_conditions`
--

LOCK TABLES `consent_health_conditions` WRITE;
/*!40000 ALTER TABLE `consent_health_conditions` DISABLE KEYS */;
/*!40000 ALTER TABLE `consent_health_conditions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `consentfrm`
--

DROP TABLE IF EXISTS `consentfrm`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `consentfrm` (
  `consentfrmid` int NOT NULL AUTO_INCREMENT,
  `customerid` int DEFAULT NULL,
  `therapistid` int DEFAULT NULL,
  `consentfrmdate` date DEFAULT NULL,
  `voucherno` varchar(50) DEFAULT NULL,
  `device_used` varchar(40) DEFAULT NULL,
  `gender` enum('Male','Female') DEFAULT NULL,
  `age` int DEFAULT NULL,
  `walkin` tinyint(1) DEFAULT '0',
  `nonwalkin` enum('Walk-in','Referral','Sponsor','Associate') DEFAULT NULL,
  `nonwalkinname` varchar(50) DEFAULT NULL,
  `nonwalkincontact` varchar(50) DEFAULT NULL,
  `implantbreast` tinyint(1) DEFAULT '0',
  `implantpacemaker` tinyint(1) DEFAULT '0',
  `implantelecmon` tinyint(1) DEFAULT '0',
  `implantmetal` tinyint(1) DEFAULT '0',
  `implanteyslens` tinyint(1) DEFAULT '0',
  `issueheartbypass` tinyint(1) DEFAULT '0',
  `issuecoheartdisease` tinyint(1) DEFAULT '0',
  `issuelungdisease` tinyint(1) DEFAULT '0',
  `issuediabetes` tinyint(1) DEFAULT '0',
  `issuestrokehistory` tinyint(1) DEFAULT '0',
  `issuehypertension` tinyint(1) DEFAULT '0',
  `issuepregnant` tinyint(1) DEFAULT '0',
  `issuecancer` tinyint(1) DEFAULT '0',
  `issuemenstruating` tinyint(1) DEFAULT '0',
  `issuesurgery` tinyint(1) DEFAULT '0',
  `issuehospitalninetydays` tinyint(1) DEFAULT '0',
  `issueseizure` tinyint(1) DEFAULT '0',
  `issueothers` text,
  `enteredby` int DEFAULT NULL,
  `entereddate` datetime DEFAULT NULL,
  `editedby` int DEFAULT NULL,
  `editeddate` datetime DEFAULT NULL,
  `active` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`consentfrmid`),
  KEY `customerid` (`customerid`),
  KEY `therapistid` (`therapistid`),
  CONSTRAINT `consentfrm_ibfk_1` FOREIGN KEY (`customerid`) REFERENCES `customers` (`customerid`),
  CONSTRAINT `consentfrm_ibfk_2` FOREIGN KEY (`therapistid`) REFERENCES `therapists` (`therapistsid`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `consentfrm`
--

LOCK TABLES `consentfrm` WRITE;
/*!40000 ALTER TABLE `consentfrm` DISABLE KEYS */;
INSERT INTO `consentfrm` VALUES (1,1,2,'2025-08-21','2132212','','Male',NULL,1,'Walk-in','','',0,0,1,0,0,1,0,1,0,0,0,0,0,0,0,0,0,'',1,'2025-08-12 06:11:49',NULL,NULL,1),(2,2,2,'2025-08-08','2132','','Female',NULL,1,'Walk-in','','',0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,'',1,'2025-08-12 06:33:26',NULL,NULL,1),(5,6,1,'2025-08-15','2132','Magnoseek','Male',NULL,1,'Walk-in','','',0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,'',1,'2025-08-19 05:23:23',NULL,NULL,1),(6,13,1,'2025-07-31','2132','Magnoseek','Male',NULL,1,'Walk-in','','',0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,'',1,'2025-08-21 08:29:33',NULL,NULL,1),(8,17,1,'2026-01-16','2132','Product E','Male',NULL,1,'Walk-in','','',0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,'',1,'2026-01-30 09:17:37',NULL,NULL,1),(9,18,1,'2026-01-23','2132','Product E','Female',NULL,1,'Walk-in','','',0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,'',1,'2026-01-30 09:18:37',NULL,NULL,1),(10,19,1,'2026-01-21','2132','Magnoseek','Male',NULL,1,'Walk-in','','',0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,'',1,'2026-01-30 09:19:39',NULL,NULL,1);
/*!40000 ALTER TABLE `consentfrm` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer_interests`
--

DROP TABLE IF EXISTS `customer_interests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer_interests` (
  `customer_id` int DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  KEY `customer_id` (`customer_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `customer_interests_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customerid`),
  CONSTRAINT `customer_interests_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`productid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer_interests`
--

LOCK TABLES `customer_interests` WRITE;
/*!40000 ALTER TABLE `customer_interests` DISABLE KEYS */;
/*!40000 ALTER TABLE `customer_interests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customers` (
  `customerid` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) DEFAULT NULL,
  `email` varchar(150) DEFAULT NULL,
  `contact_no` varchar(50) DEFAULT NULL,
  `address` text,
  `postalcode` varchar(6) DEFAULT NULL,
  `country` varchar(100) DEFAULT NULL,
  `referred_by` varchar(255) DEFAULT NULL,
  `registration_date` date DEFAULT NULL,
  `emergency_contact_name` varchar(255) DEFAULT NULL,
  `emergency_contact_no` varchar(50) DEFAULT NULL,
  `account_id` int DEFAULT NULL,
  `enteredby` int DEFAULT NULL,
  `entereddate` datetime DEFAULT NULL,
  `editedby` int DEFAULT NULL,
  `editeddate` datetime DEFAULT NULL,
  `active` tinyint(1) DEFAULT '1',
  `dateOfBirth` date DEFAULT NULL,
  `referred_other` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`customerid`),
  UNIQUE KEY `account_id` (`account_id`),
  CONSTRAINT `customers_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `userac` (`useracid`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES (1,'Romeo Oreo','Madagascar@gmail.com','3123','','','','','2025-08-12','Romeo Oreo','3123',3,1,'2025-08-12 06:11:49',NULL,NULL,1,'2011-06-13',''),(2,'Eva Eva','rraaafffii@gmail.com','083115266100','','','','','2025-08-12','Eric Jackson','32323',2,1,'2025-08-12 06:33:26',NULL,NULL,1,'2003-06-16',''),(3,'Romeo Oreo','Test@gmail.com','3123','','','','','2025-08-15','Romeo Oreo','3123',NULL,1,'2025-08-15 11:13:35',NULL,NULL,1,'2004-05-03',''),(4,'Ronaldo','Test@gmail.com','3123','','','','','2025-08-15','Romeo Oreo','3123',NULL,1,'2025-08-15 21:48:16',NULL,NULL,1,'2005-05-10',''),(5,'Ronaldo','Test@gmail.com','3123','','','','','2025-08-15','Romeo Oreo','3123',NULL,1,'2025-08-15 21:48:21',NULL,NULL,1,'2005-05-10',''),(6,'Mark Muller','rraaafffii@gmail.com','083115266100','','','','','2025-08-19','Romeo Oreo','3123',NULL,1,'2025-08-19 05:23:23',NULL,NULL,1,'2000-06-07',''),(13,'Comoja Braven','rraaafffii@gmail.com','08323132323','','','','','2025-08-21','Romeo Oreo','3123',NULL,1,'2025-08-21 08:29:33',NULL,NULL,1,'2011-06-08',''),(14,'Gerad Bale','rraaafffii@gmail.com','083115266100','','','','','2025-08-21','Romeo Oreo','3123',NULL,1,'2025-08-21 16:31:09',NULL,NULL,1,'2022-01-21',''),(15,'Gerad Bale','rraaafffii@gmail.com','083115266100','','','','','2025-08-21','Romeo Oreo','3123',NULL,1,'2025-08-21 16:31:24',NULL,NULL,1,'2022-01-21',''),(16,'Sofia The last','jo@gmail.com','03232','','','','','2025-08-21','323','322',NULL,1,'2025-08-21 16:32:32',1,'2025-08-21 16:40:36',1,'1993-06-15',''),(17,'Bano Baniex','Test@gmail.com','3123','','','','','2026-01-30','Romeo Oreo','3123',NULL,1,'2026-01-30 09:17:37',NULL,NULL,1,'2015-02-10',''),(18,'Romeo Oreo55','Test@gmail.com','3123','','','','','2026-01-30','','',NULL,1,'2026-01-30 09:18:37',NULL,NULL,1,'2007-02-06',''),(19,'Brandon','Test@gmail.com','3123','','','','','2026-01-30','Rafi Rabbani','083115266100',NULL,1,'2026-01-30 09:19:39',NULL,NULL,1,'2003-01-29','');
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `custpackages`
--

DROP TABLE IF EXISTS `custpackages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `custpackages` (
  `custpackageid` int NOT NULL AUTO_INCREMENT,
  `customerid` int DEFAULT NULL,
  `packageid` int DEFAULT NULL,
  `purchase_date` date DEFAULT NULL,
  `expiry_date` date DEFAULT NULL,
  `origsessions` int DEFAULT NULL,
  `remainsessions` int DEFAULT NULL,
  PRIMARY KEY (`custpackageid`),
  KEY `customerid` (`customerid`),
  KEY `packageid` (`packageid`),
  CONSTRAINT `custpackages_ibfk_1` FOREIGN KEY (`customerid`) REFERENCES `customers` (`customerid`),
  CONSTRAINT `custpackages_ibfk_2` FOREIGN KEY (`packageid`) REFERENCES `package` (`packageid`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `custpackages`
--

LOCK TABLES `custpackages` WRITE;
/*!40000 ALTER TABLE `custpackages` DISABLE KEYS */;
INSERT INTO `custpackages` VALUES (39,1,2,'2025-08-19','2025-08-19',15,90),(40,2,2,'2025-08-19','2025-08-19',15,45),(41,1,1,'2025-08-20','2025-08-20',10,28),(42,2,1,'2025-08-20','2025-08-20',10,10),(43,13,2,'2025-08-21','2025-08-21',15,15);
/*!40000 ALTER TABLE `custpackages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `evalannotate`
--

DROP TABLE IF EXISTS `evalannotate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `evalannotate` (
  `evalannotateid` int NOT NULL AUTO_INCREMENT,
  `evaluationid` int DEFAULT NULL,
  `bodyimageid` enum('1','0') DEFAULT NULL,
  `x_percent` decimal(5,2) DEFAULT NULL,
  `y_percent` decimal(5,2) DEFAULT NULL,
  `bodyimagenotes` text,
  `enteredby` int DEFAULT NULL,
  `entereddate` datetime DEFAULT NULL,
  `editedby` int DEFAULT NULL,
  `editeddate` datetime DEFAULT NULL,
  `active` tinyint(1) DEFAULT '1',
  `customerid` int DEFAULT NULL,
  `session_id` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`evalannotateid`),
  KEY `evaluationid` (`evaluationid`),
  KEY `customerid` (`customerid`),
  CONSTRAINT `evalannotate_ibfk_1` FOREIGN KEY (`evaluationid`) REFERENCES `evaluations` (`evaluationid`),
  CONSTRAINT `evalannotate_ibfk_2` FOREIGN KEY (`customerid`) REFERENCES `customers` (`customerid`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `evalannotate`
--

LOCK TABLES `evalannotate` WRITE;
/*!40000 ALTER TABLE `evalannotate` DISABLE KEYS */;
INSERT INTO `evalannotate` VALUES (8,4,'1',99.00,249.00,'Knee',1,'2025-08-12 06:26:55',1,'2025-08-12 06:31:13',1,NULL,NULL),(9,4,'0',68.00,121.00,'Stomach',1,'2025-08-12 06:26:55',1,'2025-08-12 06:31:13',1,NULL,NULL),(12,5,'1',98.00,221.00,'Knee2',1,'2025-08-12 06:31:59',1,'2025-08-12 06:32:15',1,NULL,NULL),(13,5,'0',92.00,254.00,'Knee 1',1,'2025-08-12 06:31:59',1,'2025-08-12 06:32:15',1,NULL,NULL),(16,6,'1',138.00,172.00,'cd',1,'2025-08-12 06:33:53',1,'2025-08-12 06:34:06',1,NULL,NULL),(17,6,'1',96.00,263.00,'Knee1',1,'2025-08-12 06:33:53',1,'2025-08-12 06:34:06',1,NULL,NULL),(18,6,'0',17.00,166.00,'Rig',1,'2025-08-12 06:33:53',1,'2025-08-12 06:34:06',1,NULL,NULL),(22,7,'0',53.00,249.00,NULL,1,'2025-08-15 21:53:38',1,'2025-08-15 21:53:51',1,NULL,NULL),(23,8,'0',123.00,139.00,'Hurt',1,'2025-08-21 08:30:08',NULL,NULL,1,NULL,NULL),(25,9,'0',84.00,86.00,'husasad',1,'2025-08-21 13:27:48',1,'2025-08-21 19:36:34',1,NULL,NULL),(26,9,'0',86.00,129.00,'back2',1,'2025-08-21 13:27:48',1,'2025-08-21 19:36:34',1,NULL,NULL);
/*!40000 ALTER TABLE `evalannotate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `evaluation_pain_areas`
--

DROP TABLE IF EXISTS `evaluation_pain_areas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `evaluation_pain_areas` (
  `evaluation_id` int DEFAULT NULL,
  `pain_area` varchar(50) DEFAULT NULL,
  `idevaluation_pain_areas` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`idevaluation_pain_areas`),
  KEY `evaluation_id` (`evaluation_id`),
  CONSTRAINT `evaluation_pain_areas_ibfk_1` FOREIGN KEY (`evaluation_id`) REFERENCES `evaluations` (`evaluationid`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `evaluation_pain_areas`
--

LOCK TABLES `evaluation_pain_areas` WRITE;
/*!40000 ALTER TABLE `evaluation_pain_areas` DISABLE KEYS */;
INSERT INTO `evaluation_pain_areas` VALUES (4,'Legs Hurt',3),(5,'I need Donutss',4),(6,'ON Right Leg',5),(7,'Legs Hurt',6),(8,'right hand',7),(9,'sds',8);
/*!40000 ALTER TABLE `evaluation_pain_areas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `evaluations`
--

DROP TABLE IF EXISTS `evaluations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `evaluations` (
  `evaluationid` int NOT NULL AUTO_INCREMENT,
  `customer_id` int DEFAULT NULL,
  `therapist_id` int DEFAULT NULL,
  `date` date DEFAULT NULL,
  `therapy_type` varchar(100) DEFAULT NULL,
  `enteredby` int DEFAULT NULL,
  `entereddate` datetime DEFAULT NULL,
  `editedby` int DEFAULT NULL,
  `editeddate` datetime DEFAULT NULL,
  `active` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`evaluationid`),
  KEY `customer_id` (`customer_id`),
  KEY `therapist_id` (`therapist_id`),
  CONSTRAINT `evaluations_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customerid`),
  CONSTRAINT `evaluations_ibfk_2` FOREIGN KEY (`therapist_id`) REFERENCES `therapists` (`therapistsid`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `evaluations`
--

LOCK TABLES `evaluations` WRITE;
/*!40000 ALTER TABLE `evaluations` DISABLE KEYS */;
INSERT INTO `evaluations` VALUES (4,1,2,'2025-08-20','',1,'2025-08-12 06:26:55',1,'2025-08-12 06:31:13',1),(5,1,2,'2025-08-20','',1,'2025-08-12 06:31:59',1,'2025-08-12 06:32:15',1),(6,2,2,'2025-08-07','',1,'2025-08-12 06:33:53',1,'2025-08-12 06:34:06',1),(7,5,1,'2025-08-21','Product B',1,'2025-08-15 21:53:38',1,'2025-08-15 21:53:51',1),(8,13,1,'2025-07-30','Magnoseek',1,'2025-08-21 08:30:08',NULL,NULL,1),(9,1,2,'2025-08-20','',1,'2025-08-21 13:27:48',1,'2025-08-21 19:36:34',1);
/*!40000 ALTER TABLE `evaluations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feedbacks`
--

DROP TABLE IF EXISTS `feedbacks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feedbacks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `customer_id` int DEFAULT NULL,
  `date` date DEFAULT NULL,
  `satisfaction_rating` tinyint DEFAULT NULL,
  `recommendation_rating` tinyint DEFAULT NULL,
  `overall_experience_rating` tinyint DEFAULT NULL,
  `what_makes_satisfied` text,
  `suggestions` text,
  PRIMARY KEY (`id`),
  KEY `customer_id` (`customer_id`),
  CONSTRAINT `feedbacks_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customerid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedbacks`
--

LOCK TABLES `feedbacks` WRITE;
/*!40000 ALTER TABLE `feedbacks` DISABLE KEYS */;
/*!40000 ALTER TABLE `feedbacks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `package`
--

DROP TABLE IF EXISTS `package`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `package` (
  `packageid` int NOT NULL AUTO_INCREMENT,
  `packagedesc` varchar(100) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT '0.00',
  `expiry_days` int DEFAULT NULL,
  `noofsession` int DEFAULT NULL,
  PRIMARY KEY (`packageid`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `package`
--

LOCK TABLES `package` WRITE;
/*!40000 ALTER TABLE `package` DISABLE KEYS */;
INSERT INTO `package` VALUES (1,'Trilogy',300.00,365,10),(2,'Trilogy - Itera 30min Bioite 30min Massage 30min for 10 visit',300.00,365,15);
/*!40000 ALTER TABLE `package` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `packagedetails`
--

DROP TABLE IF EXISTS `packagedetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `packagedetails` (
  `packagedetailsid` int NOT NULL AUTO_INCREMENT,
  `packageid` int DEFAULT NULL,
  `productid` int DEFAULT NULL,
  `consumeprice` decimal(10,2) DEFAULT '0.00',
  `enteredby` int DEFAULT NULL,
  `entereddate` datetime DEFAULT NULL,
  `editedby` int DEFAULT NULL,
  `editeddate` datetime DEFAULT NULL,
  `active` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`packagedetailsid`),
  KEY `productid` (`productid`),
  CONSTRAINT `packagedetails_ibfk_1` FOREIGN KEY (`productid`) REFERENCES `products` (`productid`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `packagedetails`
--

LOCK TABLES `packagedetails` WRITE;
/*!40000 ALTER TABLE `packagedetails` DISABLE KEYS */;
INSERT INTO `packagedetails` VALUES (1,1,6,20.00,NULL,NULL,NULL,NULL,1),(2,1,7,19.00,NULL,NULL,NULL,NULL,1),(3,2,6,20.00,NULL,NULL,NULL,NULL,1),(4,2,7,19.00,NULL,NULL,NULL,NULL,1);
/*!40000 ALTER TABLE `packagedetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `poshd`
--

DROP TABLE IF EXISTS `poshd`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `poshd` (
  `posid` int NOT NULL AUTO_INCREMENT,
  `customerid` int DEFAULT NULL,
  `therapist_id` int DEFAULT NULL,
  `walkin` tinyint(1) DEFAULT '1',
  `walkinname` varchar(50) DEFAULT NULL,
  `walkincontactno` varchar(10) DEFAULT NULL,
  `walkinemail` varchar(50) DEFAULT NULL,
  `transdate` datetime DEFAULT NULL,
  `total_amount` decimal(10,2) DEFAULT NULL,
  `remarks` text,
  `printed` tinyint DEFAULT NULL,
  `enteredby` int DEFAULT NULL,
  `entereddate` datetime DEFAULT NULL,
  `editedby` int DEFAULT NULL,
  `editeddate` datetime DEFAULT NULL,
  `active` tinyint(1) DEFAULT '1',
  `payment_method` enum('Cash','Card','Paynow') NOT NULL,
  `printdisc` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`posid`),
  KEY `customerid` (`customerid`),
  KEY `therapist_id` (`therapist_id`),
  CONSTRAINT `poshd_ibfk_1` FOREIGN KEY (`customerid`) REFERENCES `customers` (`customerid`),
  CONSTRAINT `poshd_ibfk_2` FOREIGN KEY (`therapist_id`) REFERENCES `therapists` (`therapistsid`)
) ENGINE=InnoDB AUTO_INCREMENT=285 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `poshd`
--

LOCK TABLES `poshd` WRITE;
/*!40000 ALTER TABLE `poshd` DISABLE KEYS */;
INSERT INTO `poshd` VALUES (269,1,1,1,'','','','2025-08-20 22:49:55',254.00,NULL,NULL,1,'2025-08-20 22:49:55',NULL,NULL,1,'Cash',1),(270,1,1,1,'','','','2025-08-20 22:52:15',22.00,NULL,NULL,1,'2025-08-20 22:52:15',NULL,NULL,1,'Cash',0),(271,1,1,1,'','','','2025-08-20 23:04:25',32.00,NULL,NULL,1,'2025-08-20 23:04:25',NULL,NULL,1,'Cash',0),(272,1,1,1,'','','','2025-08-20 23:13:31',760.00,NULL,NULL,1,'2025-08-20 23:13:31',NULL,NULL,1,'Cash',1),(273,1,1,1,'','','','2025-08-20 23:14:19',76.00,NULL,NULL,1,'2025-08-20 23:14:19',NULL,NULL,1,'Cash',0),(274,1,1,1,'','','','2025-08-21 07:53:55',96.00,NULL,NULL,1,'2025-08-21 07:53:55',NULL,NULL,1,'Cash',1),(275,13,1,1,'','','','2025-08-21 08:30:45',41.50,NULL,NULL,1,'2025-08-21 08:30:45',NULL,NULL,1,'Paynow',0),(276,13,1,1,'','','','2025-08-21 08:53:15',164.00,NULL,NULL,1,'2025-08-21 08:53:15',NULL,NULL,1,'Cash',1),(277,1,1,1,'','','','2025-08-21 08:55:36',0.00,NULL,NULL,1,'2025-08-21 08:55:36',NULL,NULL,1,'Card',0),(278,1,1,1,'','','','2025-08-21 12:59:01',312.00,NULL,NULL,1,'2025-08-21 12:59:01',NULL,NULL,1,'Cash',1),(279,1,1,1,'','','','2025-08-21 14:14:55',23.00,NULL,NULL,1,'2025-08-21 14:14:55',NULL,NULL,1,'Cash',0),(280,1,1,1,'','','','2025-10-08 12:52:10',190.00,NULL,NULL,1,'2025-10-08 12:52:10',NULL,NULL,1,'Cash',0),(281,2,1,1,'','','','2025-10-08 17:03:21',106.00,NULL,NULL,1,'2025-10-08 17:03:21',NULL,NULL,1,'Cash',0),(282,2,1,1,'','','','2025-10-08 17:04:58',106.00,NULL,NULL,1,'2025-10-08 17:04:58',NULL,NULL,1,'Card',0),(283,NULL,1,1,'','','','2026-01-05 09:56:33',160.00,NULL,NULL,1,'2026-01-05 09:56:33',NULL,NULL,1,'Cash',0),(284,1,1,1,'','','','2026-01-05 10:20:30',290.00,NULL,NULL,1,'2026-01-05 10:20:30',NULL,NULL,1,'Cash',0);
/*!40000 ALTER TABLE `poshd` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `poslines`
--

DROP TABLE IF EXISTS `poslines`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `poslines` (
  `poslinesid` int NOT NULL AUTO_INCREMENT,
  `posid` int DEFAULT NULL,
  `productcat` varchar(15) DEFAULT NULL,
  `itemid` int DEFAULT NULL,
  `qty` int NOT NULL DEFAULT '0',
  `unit_price` decimal(10,2) NOT NULL DEFAULT '0.00',
  `disc` decimal(10,2) DEFAULT NULL,
  `discpercent` char(1) DEFAULT NULL,
  `total_price` decimal(10,2) NOT NULL DEFAULT '0.00',
  `oriprice` decimal(10,2) NOT NULL DEFAULT '0.00',
  `remarks` varchar(40) DEFAULT NULL,
  `package` tinyint(1) DEFAULT '0',
  `enteredby` int DEFAULT NULL,
  `entereddate` datetime DEFAULT NULL,
  `editedby` int DEFAULT NULL,
  `editeddate` datetime DEFAULT NULL,
  `active` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`poslinesid`),
  KEY `posid` (`posid`),
  KEY `fk_itemid_products` (`itemid`),
  CONSTRAINT `fk_itemid_products` FOREIGN KEY (`itemid`) REFERENCES `products` (`productid`),
  CONSTRAINT `poslines_ibfk_1` FOREIGN KEY (`posid`) REFERENCES `poshd` (`posid`)
) ENGINE=InnoDB AUTO_INCREMENT=396 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `poslines`
--

LOCK TABLES `poslines` WRITE;
/*!40000 ALTER TABLE `poslines` DISABLE KEYS */;
INSERT INTO `poslines` VALUES (367,269,'Service',8,1,80.00,5.00,'0',75.00,80.00,NULL,0,1,'2025-08-20 22:49:55',NULL,NULL,1),(368,269,'Package',2,1,300.00,50.00,'1',150.00,300.00,NULL,1,1,'2025-08-20 22:49:55',NULL,NULL,1),(369,269,'Service',7,1,30.00,1.00,'0',29.00,30.00,NULL,0,1,'2025-08-20 22:49:55',NULL,NULL,1),(370,270,'Package',1,1,0.00,0.00,NULL,0.00,0.00,NULL,1,1,'2025-08-20 22:52:15',NULL,NULL,1),(371,270,'Product',2,1,22.00,0.00,'0',22.00,22.00,NULL,0,1,'2025-08-20 22:52:15',NULL,NULL,1),(372,271,'Product',2,1,22.00,5.00,'0',17.00,22.00,NULL,0,1,'2025-08-20 23:04:25',NULL,NULL,1),(373,271,'Service',7,1,30.00,50.00,'1',15.00,30.00,NULL,0,1,'2025-08-20 23:04:25',NULL,NULL,1),(374,272,'Service',8,2,80.00,0.00,'0',160.00,160.00,NULL,0,1,'2025-08-20 23:13:31',NULL,NULL,1),(375,272,'Package',1,2,300.00,0.00,NULL,600.00,600.00,NULL,1,1,'2025-08-20 23:13:31',NULL,NULL,1),(376,273,'Product',3,2,23.00,0.00,'0',46.00,46.00,NULL,0,1,'2025-08-20 23:14:19',NULL,NULL,1),(377,273,'Service',7,1,30.00,0.00,'0',30.00,30.00,NULL,0,1,'2025-08-20 23:14:19',NULL,NULL,1),(378,274,'Service',8,2,80.00,40.00,'1',96.00,160.00,NULL,0,1,'2025-08-21 07:53:55',NULL,NULL,1),(379,275,'Service',7,2,30.00,50.00,'1',30.00,60.00,NULL,0,1,'2025-08-21 08:30:45',NULL,NULL,1),(380,275,'Product',3,1,23.00,50.00,'1',11.50,23.00,NULL,0,1,'2025-08-21 08:30:45',NULL,NULL,1),(381,276,'Package',2,1,300.00,50.00,'1',150.00,300.00,NULL,1,1,'2025-08-21 08:53:15',NULL,NULL,1),(382,276,'Product',2,2,22.00,30.00,'0',14.00,44.00,NULL,0,1,'2025-08-21 08:53:15',NULL,NULL,1),(383,277,'Package',1,1,0.00,0.00,NULL,0.00,0.00,NULL,1,1,'2025-08-21 08:55:36',NULL,NULL,1),(384,278,'Package',2,2,300.00,50.00,'1',300.00,600.00,NULL,1,1,'2025-08-21 12:59:01',NULL,NULL,1),(385,278,'Product',2,1,22.00,10.00,'0',12.00,22.00,NULL,0,1,'2025-08-21 12:59:01',NULL,NULL,1),(386,279,'Product',3,1,23.00,0.00,'0',23.00,23.00,NULL,0,1,'2025-08-21 14:14:55',NULL,NULL,1),(387,280,'Service',8,2,80.00,0.00,'0',160.00,160.00,NULL,0,1,'2025-10-08 12:52:10',NULL,NULL,1),(388,280,'Service',7,1,30.00,0.00,'0',30.00,30.00,NULL,0,1,'2025-10-08 12:52:10',NULL,NULL,1),(389,281,'Service',7,1,30.00,2.00,'0',28.00,30.00,NULL,0,1,'2025-10-08 17:03:21',NULL,NULL,1),(390,281,'Service',8,1,80.00,2.00,'0',78.00,80.00,NULL,0,1,'2025-10-08 17:03:21',NULL,NULL,1),(391,282,'Service',8,1,80.00,2.00,'0',78.00,80.00,NULL,0,1,'2025-10-08 17:04:58',NULL,NULL,1),(392,282,'Service',7,1,30.00,2.00,'0',28.00,30.00,NULL,0,1,'2025-10-08 17:04:58',NULL,NULL,1),(393,283,'Service',8,2,80.00,0.00,'0',160.00,160.00,NULL,0,1,'2026-01-05 09:56:33',NULL,NULL,1),(394,284,'Package',1,1,300.00,21.00,'0',279.00,300.00,NULL,1,1,'2026-01-05 10:20:30',NULL,NULL,1),(395,284,'Product',2,1,22.00,50.00,'1',11.00,22.00,NULL,0,1,'2026-01-05 10:20:30',NULL,NULL,1);
/*!40000 ALTER TABLE `poslines` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `productid` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `productcat` enum('Service','Product') DEFAULT NULL,
  `unitprice` decimal(10,2) DEFAULT NULL,
  `baseprice` decimal(10,2) DEFAULT NULL,
  `packageprice` decimal(19,2) DEFAULT NULL,
  `description` text,
  `enteredby` int DEFAULT NULL,
  `entereddate` datetime DEFAULT NULL,
  `editedby` int DEFAULT NULL,
  `editeddate` datetime DEFAULT NULL,
  `active` tinyint(1) DEFAULT '1',
  `picture` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`productid`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Product A','Product',21.00,10.00,21.12,'Good Item',NULL,NULL,NULL,NULL,1,NULL),(2,'Product B','Product',22.00,10.00,21.12,'Good Item',NULL,NULL,NULL,NULL,1,NULL),(3,'Product C','Product',23.00,10.00,21.12,'Good Item',NULL,NULL,NULL,NULL,1,NULL),(4,'Product D','Product',24.00,10.00,21.12,'Good Item',NULL,NULL,NULL,NULL,1,'product-4.jpg'),(5,'Product E','Product',25.00,10.00,21.12,'Good Item',NULL,NULL,NULL,NULL,1,NULL),(6,'Biolite30','Service',30.00,20.00,20.00,'BioliteItera 30 min',NULL,NULL,NULL,NULL,1,'product-6.png'),(7,'Itera40','Service',30.00,20.00,19.00,'Itera 30 min',NULL,NULL,NULL,NULL,1,'product-7.png'),(8,'Magnoseek','Service',80.00,40.00,35.00,'Magnoseek Session',NULL,NULL,NULL,NULL,1,NULL),(11,'therapy 123','Product',231.00,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),(12,'Product A','Product',21.00,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),(16,'Product AB','Product',32.00,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),(18,'ew','Service',23.00,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),(20,'Product A','Product',23.00,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),(21,'gogo','Service',32.00,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'product-21.jfif');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `session_notes`
--

DROP TABLE IF EXISTS `session_notes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `session_notes` (
  `session_notesid` int NOT NULL AUTO_INCREMENT,
  `customer_id` int DEFAULT NULL,
  `therapists_id` int DEFAULT NULL,
  `evaluation_id` int DEFAULT NULL,
  `transactions_id` int DEFAULT NULL,
  `duration_minutes` int DEFAULT NULL,
  `on_medication` tinyint(1) DEFAULT NULL,
  `medication_details` text,
  `therapist_note` text,
  `enteredby` int DEFAULT NULL,
  `entereddate` datetime DEFAULT NULL,
  `editedby` int DEFAULT NULL,
  `editeddate` datetime DEFAULT NULL,
  `active` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`session_notesid`),
  KEY `customer_id` (`customer_id`),
  KEY `evaluation_id` (`evaluation_id`),
  KEY `transactions_id` (`transactions_id`),
  KEY `therapists_id` (`therapists_id`),
  CONSTRAINT `session_notes_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customerid`),
  CONSTRAINT `session_notes_ibfk_2` FOREIGN KEY (`therapists_id`) REFERENCES `therapists` (`therapistsid`),
  CONSTRAINT `session_notes_ibfk_3` FOREIGN KEY (`evaluation_id`) REFERENCES `evaluations` (`evaluationid`),
  CONSTRAINT `session_notes_ibfk_4` FOREIGN KEY (`transactions_id`) REFERENCES `poshd` (`posid`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `session_notes`
--

LOCK TABLES `session_notes` WRITE;
/*!40000 ALTER TABLE `session_notes` DISABLE KEYS */;
INSERT INTO `session_notes` VALUES (4,1,2,4,NULL,23,1,'Vitamin','Ok healthy and health',1,'2025-08-12 06:26:55',1,'2025-08-12 06:31:13',1),(5,1,2,5,NULL,12,1,'Choclat Donut','He healthy and he super healthy2',1,'2025-08-12 06:31:59',1,'2025-08-12 06:32:15',1),(6,2,2,6,NULL,21,1,'Vitamin','Test 1 2 3',1,'2025-08-12 06:33:53',1,'2025-08-12 06:34:06',1),(7,5,1,7,NULL,21,1,'Vitamin','Hurt light ',1,'2025-08-15 21:53:38',1,'2025-08-15 21:53:51',1),(8,13,1,8,NULL,32,0,'','Right Hand very hurt ',1,'2025-08-21 08:30:08',NULL,NULL,1),(9,1,2,9,NULL,22,1,'','sdadsa',1,'2025-08-21 13:27:48',1,'2025-08-21 19:36:34',1);
/*!40000 ALTER TABLE `session_notes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `therapists`
--

DROP TABLE IF EXISTS `therapists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `therapists` (
  `therapistsid` int NOT NULL AUTO_INCREMENT,
  `therapistname` varchar(50) DEFAULT NULL,
  `account_id` int DEFAULT NULL,
  `enteredby` int DEFAULT NULL,
  `entereddate` datetime DEFAULT NULL,
  `editedby` int DEFAULT NULL,
  `editeddate` datetime DEFAULT NULL,
  `active` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`therapistsid`),
  KEY `account_id` (`account_id`),
  CONSTRAINT `therapists_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `userac` (`useracid`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `therapists`
--

LOCK TABLES `therapists` WRITE;
/*!40000 ALTER TABLE `therapists` DISABLE KEYS */;
INSERT INTO `therapists` VALUES (1,'Tomiyasu',1,NULL,NULL,NULL,NULL,1),(2,'Virgil',NULL,NULL,NULL,NULL,NULL,1),(3,'Mark',NULL,NULL,NULL,NULL,NULL,1);
/*!40000 ALTER TABLE `therapists` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userac`
--

DROP TABLE IF EXISTS `userac`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userac` (
  `useracid` int NOT NULL AUTO_INCREMENT,
  `username` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `role` enum('Customer','Therapist') DEFAULT NULL,
  PRIMARY KEY (`useracid`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userac`
--

LOCK TABLES `userac` WRITE;
/*!40000 ALTER TABLE `userac` DISABLE KEYS */;
INSERT INTO `userac` VALUES (1,NULL,'therapist1@gmail.com','$2b$10$Q3RVfKwLZ/xTDVno11FIo.7U.Kgw.DtCScie7Hj7rRd1uSCdirF9O','Therapist'),(2,NULL,'user1@gmail.com','$2b$10$p5nJZB0KLezS7sDmuE/ORObGnf6AaqmCeSoCtCyf3.iXB0Ayt7Z/G','Customer'),(3,NULL,'user2@gmail.com','$2b$10$bWu0umGBdw4WWvmAHVxKCOaHaqDC4XphZiVd35iqCeX1KzhMnLIMK','Customer');
/*!40000 ALTER TABLE `userac` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-01-30 18:26:55
