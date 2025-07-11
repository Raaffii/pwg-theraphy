-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: pwg
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
-- Table structure for table `accounts`
--

DROP TABLE IF EXISTS `accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accounts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `role` enum('Customer','Therapist') DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts`
--

LOCK TABLES `accounts` WRITE;
/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;
INSERT INTO `accounts` VALUES (1,NULL,'customer_mark@gmail.com','$2b$10$cZjtjAHA5Gh6/uTkbEdTi.WUm9760mLp0MXV0WCVzxc451T0X0wnu','Customer'),(2,NULL,'therapist_tomiyasu@gmail.com','$2b$10$1vznAkJxdGwLBLG.I7A5mO3Klm42t44qfUubUmYHUqI2S7PlXW5Xm','Therapist'),(3,NULL,'customer_steve@gmail.com','$2b$10$er6dcEm.tRz0voITH2J23.t2qHllRKIYit7c1TSoB5GbdPcGJ302G','Customer'),(4,NULL,'slaykcang@gmail.com','$2b$10$lfzzd0uyKRkJ21leQNHFd.mpVG8J3hnHwn5sgB6yoB4syJuvcyHuq',NULL),(5,NULL,'customer@gmail.com','$2b$10$4R47t1DS3aCmXaeZTxgO2eutZ2fuoJY2Zkb3pWwPzzQsfMtVtmOZ2','Customer');
/*!40000 ALTER TABLE `accounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bodyannotate`
--

DROP TABLE IF EXISTS `bodyannotate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bodyannotate` (
  `bodyannotedid` int NOT NULL AUTO_INCREMENT,
  `customerid` int DEFAULT NULL,
  `session_id` varchar(100) DEFAULT NULL,
  `body_image_id` int DEFAULT '1',
  `x_percent` decimal(5,2) DEFAULT NULL,
  `y_percent` decimal(5,2) DEFAULT NULL,
  `notes` text,
  `enteredby` int DEFAULT NULL,
  `entereddate` datetime DEFAULT NULL,
  `editedby` int DEFAULT NULL,
  `editeddate` datetime DEFAULT NULL,
  `active` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`bodyannotedid`),
  KEY `customerid` (`customerid`),
  CONSTRAINT `bodyannotate_ibfk_1` FOREIGN KEY (`customerid`) REFERENCES `customers` (`customerid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bodyannotate`
--

LOCK TABLES `bodyannotate` WRITE;
/*!40000 ALTER TABLE `bodyannotate` DISABLE KEYS */;
/*!40000 ALTER TABLE `bodyannotate` ENABLE KEYS */;
UNLOCK TABLES;

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
  `issueothers` text,
  `enteredby` int DEFAULT NULL,
  `entereddate` datetime DEFAULT NULL,
  `editedby` int DEFAULT NULL,
  `editeddate` datetime DEFAULT NULL,
  `active` tinyint(1) DEFAULT '1',
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
  PRIMARY KEY (`consentfrmid`),
  KEY `customerid` (`customerid`),
  KEY `therapistid` (`therapistid`),
  CONSTRAINT `consentfrm_ibfk_1` FOREIGN KEY (`customerid`) REFERENCES `customers` (`customerid`),
  CONSTRAINT `consentfrm_ibfk_2` FOREIGN KEY (`therapistid`) REFERENCES `therapists` (`therapistsid`)
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `consentfrm`
--

LOCK TABLES `consentfrm` WRITE;
/*!40000 ALTER TABLE `consentfrm` DISABLE KEYS */;
INSERT INTO `consentfrm` VALUES (38,7,1,'2025-07-19','2121','Arowave','Male',NULL,1,'Walk-in','','',1,0,0,1,0,0,'',5,'2025-07-10 12:55:21',NULL,NULL,1,0,0,0,0,0,0,0,0,0,0,0),(39,6,2,'2025-07-14','2132','iTeraCare','Male',NULL,1,'Walk-in','','',1,0,0,1,0,0,'0',1,'2025-07-11 09:12:23',1,'2025-07-11 23:16:58',1,0,1,0,0,0,0,0,0,0,0,1),(46,NULL,2,'2022-03-02','2132','7 Wonder','Male',NULL,1,'Walk-in','','',1,0,0,1,0,0,'',NULL,'2025-07-11 09:57:25',NULL,NULL,1,0,0,0,0,0,0,0,0,0,0,0),(47,NULL,2,'2022-03-02','2132','7 Wonder','Male',NULL,1,'Walk-in','','',1,0,0,1,0,0,'',NULL,'2025-07-11 09:58:00',NULL,NULL,1,0,0,0,0,0,0,0,0,0,0,0),(48,NULL,2,'2022-03-02','2132','7 Wonder','Male',NULL,1,'Walk-in','','',1,0,0,1,0,0,'',NULL,'2025-07-11 09:59:01',NULL,NULL,1,0,0,0,0,0,0,0,0,0,0,0),(55,44,2,'2022-03-02','2132','Prife LifeMeal','Male',NULL,1,'Walk-in','','',1,0,0,1,0,0,'',2,'2025-07-11 10:34:28',NULL,NULL,1,0,0,0,0,0,0,0,0,0,0,0),(57,49,1,'2025-07-16','2132','7 Wonder','Male',NULL,1,'Walk-in','Romeo Oreo','3123',1,0,0,0,0,0,'',2,'2025-07-11 23:20:37',NULL,NULL,1,0,0,0,0,0,1,0,1,0,1,0);
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
  CONSTRAINT `customer_interests_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer_interests`
--

LOCK TABLES `customer_interests` WRITE;
/*!40000 ALTER TABLE `customer_interests` DISABLE KEYS */;
INSERT INTO `customer_interests` VALUES (7,2),(7,4);
/*!40000 ALTER TABLE `customer_interests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer_packages`
--

DROP TABLE IF EXISTS `customer_packages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer_packages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `customer_id` int DEFAULT NULL,
  `package_id` int DEFAULT NULL,
  `purchase_date` date DEFAULT NULL,
  `expiry_date` date DEFAULT NULL,
  `remaining_sessions` int DEFAULT NULL,
  `original_sessions` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `customer_id` (`customer_id`),
  KEY `package_id` (`package_id`),
  CONSTRAINT `customer_packages_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customerid`),
  CONSTRAINT `customer_packages_ibfk_2` FOREIGN KEY (`package_id`) REFERENCES `packages` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer_packages`
--

LOCK TABLES `customer_packages` WRITE;
/*!40000 ALTER TABLE `customer_packages` DISABLE KEYS */;
/*!40000 ALTER TABLE `customer_packages` ENABLE KEYS */;
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
  `dateofbirth` date DEFAULT NULL,
  `referred_other` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`customerid`),
  UNIQUE KEY `account_id` (`account_id`),
  CONSTRAINT `customers_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES (6,'Romeo Milo','Madagascar@gmail.com','085555555','Jl. Madagascar','231','Indonesia','Superman',NULL,'Romeo Oreo','3123',1,NULL,NULL,NULL,NULL,1,'2020-01-09','spiderman'),(7,'Jackson Irvince','Madagascar@gmail.com','0831212','Jl. Madagascar','231','Indonesia','Soka',NULL,'Romeo Oreo','0831121',5,NULL,NULL,NULL,NULL,1,'2025-07-21','Abosa'),(44,'Rodas Oreosss','Madagascar@gmail.com','3123','','','','','2025-07-11','Romeo Oreo','3123',NULL,NULL,NULL,NULL,NULL,1,NULL,''),(45,'Chalisda Chelliana','rraaafffii@gmail.com','032121','','','','','2025-07-11','Romeo Oreo','3123',NULL,NULL,NULL,NULL,NULL,1,'2002-02-04',''),(46,'Brandon','Madagascar@gmail.com','0212312','','','','','2025-07-11','Romeo Oreo','3123',NULL,NULL,NULL,NULL,NULL,1,'1979-01-30',''),(47,'Brandon','Madagascar@gmail.com','0212312','','','','','2025-07-11','Romeo Oreo','3123',NULL,NULL,NULL,NULL,NULL,1,'1979-01-30',''),(48,'Brandon','Madagascar@gmail.com','0212312','','','','','2025-07-11','Romeo Oreo','3123',NULL,NULL,NULL,NULL,NULL,1,'1979-01-30',''),(49,'Brandon','Madagascar@gmail.com','0212312','','','','','2025-07-11','Romeo Oreo','3123',NULL,NULL,NULL,NULL,NULL,1,'1979-01-30','');
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
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
  KEY `evaluation_id` (`evaluation_id`),
  CONSTRAINT `evaluation_pain_areas_ibfk_1` FOREIGN KEY (`evaluation_id`) REFERENCES `evaluations` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `evaluation_pain_areas`
--

LOCK TABLES `evaluation_pain_areas` WRITE;
/*!40000 ALTER TABLE `evaluation_pain_areas` DISABLE KEYS */;
/*!40000 ALTER TABLE `evaluation_pain_areas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `evaluations`
--

DROP TABLE IF EXISTS `evaluations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `evaluations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `customer_id` int DEFAULT NULL,
  `therapist_id` int DEFAULT NULL,
  `date` date DEFAULT NULL,
  `therapy_type` varchar(100) DEFAULT NULL,
  `duration_minutes` int DEFAULT NULL,
  `on_medication` tinyint(1) DEFAULT NULL,
  `medication_details` text,
  PRIMARY KEY (`id`),
  KEY `customer_id` (`customer_id`),
  KEY `therapist_id` (`therapist_id`),
  CONSTRAINT `evaluations_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customerid`),
  CONSTRAINT `evaluations_ibfk_2` FOREIGN KEY (`therapist_id`) REFERENCES `therapists` (`therapistsid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `evaluations`
--

LOCK TABLES `evaluations` WRITE;
/*!40000 ALTER TABLE `evaluations` DISABLE KEYS */;
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
-- Table structure for table `packages`
--

DROP TABLE IF EXISTS `packages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `packages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `included_product_id` int DEFAULT NULL,
  `sessions` int DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `expiry_days` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `included_product_id` (`included_product_id`),
  CONSTRAINT `packages_ibfk_1` FOREIGN KEY (`included_product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `packages`
--

LOCK TABLES `packages` WRITE;
/*!40000 ALTER TABLE `packages` DISABLE KEYS */;
/*!40000 ALTER TABLE `packages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pos_transaction_items`
--

DROP TABLE IF EXISTS `pos_transaction_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pos_transaction_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` int DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `unit_price` decimal(10,2) DEFAULT NULL,
  `total_price` decimal(10,2) DEFAULT NULL,
  `used_from_package_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `used_from_package_id` (`used_from_package_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `pos_transaction_items_ibfk_1` FOREIGN KEY (`used_from_package_id`) REFERENCES `customer_packages` (`id`),
  CONSTRAINT `pos_transaction_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pos_transaction_items`
--

LOCK TABLES `pos_transaction_items` WRITE;
/*!40000 ALTER TABLE `pos_transaction_items` DISABLE KEYS */;
/*!40000 ALTER TABLE `pos_transaction_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pos_transactions`
--

DROP TABLE IF EXISTS `pos_transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pos_transactions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `customer_id` int DEFAULT NULL,
  `therapist_id` int DEFAULT NULL,
  `transaction_items_id` int DEFAULT NULL,
  `transaction_date` datetime DEFAULT NULL,
  `total_amount` decimal(10,2) DEFAULT NULL,
  `payment_method` enum('Cash','Card','Online','Package') DEFAULT NULL,
  `remarks` text,
  PRIMARY KEY (`id`),
  KEY `customer_id` (`customer_id`),
  KEY `therapist_id` (`therapist_id`),
  KEY `transaction_items_id` (`transaction_items_id`),
  CONSTRAINT `pos_transactions_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customerid`),
  CONSTRAINT `pos_transactions_ibfk_2` FOREIGN KEY (`therapist_id`) REFERENCES `therapists` (`therapistsid`),
  CONSTRAINT `pos_transactions_ibfk_3` FOREIGN KEY (`transaction_items_id`) REFERENCES `pos_transaction_items` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pos_transactions`
--

LOCK TABLES `pos_transactions` WRITE;
/*!40000 ALTER TABLE `pos_transactions` DISABLE KEYS */;
/*!40000 ALTER TABLE `pos_transactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `productName` varchar(100) DEFAULT NULL,
  `type` enum('Service','Product','Package') DEFAULT NULL,
  `unit_price` decimal(10,2) DEFAULT NULL,
  `description` text,
  `active` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'iTeraCare','Product',150.00,'Good',1),(2,'7 Wonder','Product',150.00,'Good',0),(3,'iTera-Bio','Product',150.00,'Good',1),(4,'Arowave','Product',150.00,'Good',1),(5,'Prife LifeMeal','Product',150.00,'Good',1),(6,'Ti-Rest','Product',150.00,'Good',0),(7,'KH Alfalfa','Product',150.00,'Good',0);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `session_notes`
--

DROP TABLE IF EXISTS `session_notes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `session_notes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `customer_id` int DEFAULT NULL,
  `therapists_id` int DEFAULT NULL,
  `transactions_id` int DEFAULT NULL,
  `therapist_note` text,
  `created_at` datetime DEFAULT (now()),
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `customer_id` (`customer_id`),
  KEY `therapists_id` (`therapists_id`),
  KEY `transactions_id` (`transactions_id`),
  CONSTRAINT `session_notes_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customerid`),
  CONSTRAINT `session_notes_ibfk_2` FOREIGN KEY (`therapists_id`) REFERENCES `therapists` (`therapistsid`),
  CONSTRAINT `session_notes_ibfk_3` FOREIGN KEY (`transactions_id`) REFERENCES `pos_transactions` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `session_notes`
--

LOCK TABLES `session_notes` WRITE;
/*!40000 ALTER TABLE `session_notes` DISABLE KEYS */;
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
  `enteredby` int DEFAULT NULL,
  `entereddate` datetime DEFAULT NULL,
  `editedby` int DEFAULT NULL,
  `editeddate` datetime DEFAULT NULL,
  `active` tinyint(1) DEFAULT '1',
  `account_id` int DEFAULT NULL,
  PRIMARY KEY (`therapistsid`),
  KEY `account_id` (`account_id`),
  CONSTRAINT `therapists_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `therapists`
--

LOCK TABLES `therapists` WRITE;
/*!40000 ALTER TABLE `therapists` DISABLE KEYS */;
INSERT INTO `therapists` VALUES (1,'Virgin Van Djik',1,'2025-07-07 09:22:05',1,'2025-07-07 09:22:05',1,2),(2,'Sergio Ramos',1,'2025-07-07 09:22:05',1,'2025-07-07 09:22:05',1,NULL),(3,'Tomiyasu',1,'2025-07-07 09:22:05',1,'2025-07-07 09:22:05',1,NULL);
/*!40000 ALTER TABLE `therapists` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-07-11 23:22:34
