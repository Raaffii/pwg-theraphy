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
) ENGINE=InnoDB AUTO_INCREMENT=80 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `consentfrm`
--

LOCK TABLES `consentfrm` WRITE;
/*!40000 ALTER TABLE `consentfrm` DISABLE KEYS */;
INSERT INTO `consentfrm` VALUES (38,7,2,'2025-06-25','2121','7 Wonder','Female',NULL,1,'Walk-in','','',1,0,0,1,0,0,'0',5,'2025-07-10 12:55:21',2,'2025-07-20 22:40:22',1,0,0,0,0,0,0,0,0,0,0,0),(39,6,2,'2025-06-27','2132','iTeraCare','Male',NULL,1,'Walk-in','Romeo Oreo','3123',1,0,1,1,0,0,'0',1,'2025-07-11 09:12:23',2,'2025-07-17 22:55:13',1,0,1,0,0,0,0,0,0,0,0,1),(46,NULL,2,'2022-03-02','2132','7 Wonder','Male',NULL,1,'Walk-in','','',1,0,0,1,0,0,'',NULL,'2025-07-11 09:57:25',NULL,NULL,1,0,0,0,0,0,0,0,0,0,0,0),(47,NULL,2,'2022-03-02','2132','7 Wonder','Male',NULL,1,'Walk-in','','',1,0,0,1,0,0,'',NULL,'2025-07-11 09:58:00',NULL,NULL,1,0,0,0,0,0,0,0,0,0,0,0),(48,NULL,2,'2022-03-02','2132','7 Wonder','Male',NULL,1,'Walk-in','','',1,0,0,1,0,0,'',NULL,'2025-07-11 09:59:01',NULL,NULL,1,0,0,0,0,0,0,0,0,0,0,0),(55,44,1,'2022-03-01','2132','iTeraCare','Male',NULL,1,'Walk-in','','',1,0,0,1,0,0,'0',2,'2025-07-11 10:34:28',2,'2025-07-20 16:40:30',1,0,0,0,0,0,0,0,0,0,0,0),(57,49,1,'2025-07-16','2132','7 Wonder','Male',NULL,1,'Walk-in','Romeo Oreo','3123',1,0,0,0,0,0,'',2,'2025-07-11 23:20:37',NULL,NULL,1,0,0,0,0,0,1,0,1,0,1,0),(60,53,2,'2025-07-16','2121','Arowave','Male',NULL,1,'Walk-in','','',1,0,0,1,0,0,'0',2,'2025-07-13 16:36:28',2,'2025-07-13 23:34:27',1,0,0,0,0,0,0,0,0,0,0,0),(62,62,2,'2025-07-18','2121','Arowave','Male',NULL,1,'Walk-in','','',1,0,0,1,0,0,'0',2,'2025-07-13 16:48:14',NULL,NULL,1,0,0,0,0,0,1,0,0,0,0,0),(63,63,2,'2025-07-18','2121','Arowave','Male',NULL,1,'Walk-in','','',1,0,0,1,0,0,'0',2,'2025-07-13 16:48:25',NULL,NULL,1,0,0,0,0,0,1,0,0,0,0,0),(64,64,1,'2025-07-18','2121','Arowave','Male',NULL,1,'Walk-in','','',1,0,0,1,0,0,'0',2,'2025-07-13 16:49:37',NULL,NULL,1,0,0,0,0,0,0,0,0,0,0,0),(66,66,1,'2025-07-18','2121','Arowave','Male',NULL,1,'Walk-in','','',1,0,0,1,0,0,'0',2,'2025-07-13 17:02:53',NULL,NULL,1,0,0,0,0,0,0,0,0,0,0,0),(67,68,1,'2025-07-29','2132','KH Alfalfa','Male',NULL,1,'Walk-in','','',1,0,0,1,0,0,'0',2,'2025-07-13 20:34:39',2,'2025-07-13 22:05:06',1,0,0,0,0,0,1,0,0,0,0,0),(70,71,2,'2025-07-11','2132','KH Alfalfa','Female',NULL,1,'Walk-in','','',0,0,0,0,0,0,'',2,'2025-07-14 10:44:59',NULL,NULL,1,0,0,0,0,0,1,0,1,0,0,0),(71,72,1,'2025-07-08','2132','Arowave','Male',NULL,1,'Walk-in','','',1,0,0,0,0,0,'',2,'2025-07-14 13:01:33',NULL,NULL,1,0,1,1,0,0,0,0,0,0,0,1),(73,74,2,'2025-07-04','2132','Prife LifeMeal','Male',NULL,1,'Walk-in','','',0,1,0,0,0,0,'',2,'2025-07-17 21:17:33',NULL,NULL,1,0,0,0,0,0,1,0,0,0,0,1),(74,75,2,'2025-07-10','2132','7 Wonder','Male',NULL,1,'Walk-in','','',0,0,0,0,1,0,'',2,'2025-07-17 21:44:24',NULL,NULL,1,0,0,0,0,0,0,0,0,0,0,1),(75,76,2,'2025-07-23','2132','7 Wonder','Male',NULL,1,'Walk-in','','',1,0,1,0,0,0,'',2,'2025-07-17 21:46:32',NULL,NULL,1,0,0,0,0,0,0,0,0,0,0,0),(76,77,1,'2025-07-10','2132','7 Wonder','Female',NULL,1,'Walk-in','','',1,0,0,1,0,0,'0',2,'2025-07-17 22:55:50',2,'2025-07-17 22:56:08',1,0,0,0,0,0,0,0,0,0,0,0),(77,78,3,'2025-07-12','12','7 Wonder','Female',NULL,1,'Walk-in','','',0,1,0,0,0,0,'',2,'2025-07-18 07:57:46',NULL,NULL,1,0,0,0,0,0,1,0,0,0,0,0),(79,80,1,'2025-07-10','1111','Arowave','Male',NULL,1,'Walk-in','','',0,0,0,0,0,0,'',7,'2025-07-22 08:52:15',NULL,NULL,1,0,0,0,0,0,1,0,0,0,0,1);
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
  CONSTRAINT `customers_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `userac` (`useracid`)
) ENGINE=InnoDB AUTO_INCREMENT=88 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES (6,'Cole Cole cole','Madagascar@gmail.com','085555555','Jl. Madagascar','231','Indonesia','Superman',NULL,'Romeo Oreo','3123',1,NULL,NULL,2,'2025-07-17 22:55:13',1,'2011-01-01','spiderman'),(7,'Evan soya','Madagascar@gmail.com','0831212','Jl. Madagascar','231','Indonesia','Soka',NULL,'Romeo Oreo','0831121',5,NULL,NULL,2,'2025-07-20 22:40:22',1,'2006-11-02','Abosa'),(44,'Rodas Oreosss','Madagascar@gmail.com','3123','','','','','2025-07-11','Romeo Oreo','3123',NULL,NULL,NULL,2,'2025-07-20 16:40:30',1,'2018-06-11',''),(45,'Chalisda Chelliana','rraaafffii@gmail.com','032121','','','','','2025-07-11','Romeo Oreo','3123',NULL,NULL,NULL,NULL,NULL,1,'2002-02-04',''),(46,'Brandon','Madagascar@gmail.com','0212312','','','','','2025-07-11','Romeo Oreo','3123',NULL,NULL,NULL,NULL,NULL,1,'1979-01-30',''),(47,'Brandon','Madagascar@gmail.com','0212312','','','','','2025-07-11','Romeo Oreo','3123',NULL,NULL,NULL,NULL,NULL,1,'1979-01-30',''),(48,'Brandon','Madagascar@gmail.com','0212312','','','','','2025-07-11','Romeo Oreo','3123',NULL,NULL,NULL,NULL,NULL,1,'1979-01-30',''),(49,'Brandon','Madagascar@gmail.com','0212312','','','','','2025-07-11','Romeo Oreo','3123',NULL,NULL,NULL,NULL,NULL,1,'1979-01-30',''),(50,'Jackson Irvincessssss','Madagascar@gmail.com','0831212','Jl. Madagascar','231','Indonesia','Soka','2025-07-13','Romeo Oreo','0831121',NULL,NULL,NULL,NULL,NULL,1,'2025-07-20','Abosa'),(51,'Jackson Irvincessssssddd','Madagascar@gmail.com','0831212','Jl. Madagascar','231','Indonesia','Soka','2025-07-13','Romeo Oreo','0831121',NULL,NULL,NULL,NULL,NULL,1,'2025-07-19','Abosa'),(52,'Jackson Irvincessssssddd','Madagascar@gmail.com','0831212','Jl. Madagascar','231','Indonesia','Soka','2025-07-13','Romeo Oreo','0831121',NULL,NULL,NULL,NULL,NULL,1,'2025-07-19','Abosa'),(53,'Hanya Jacksonaa','Madagascar@gmail.com','0831212','Jl. Madagascar','231','Indonesia','Soka','2025-07-13','Romeo Oreo','0831121',NULL,NULL,NULL,2,'2025-07-13 23:34:27',1,'2025-07-18','Abosa'),(54,'Jackson Irvincesaa','Madagascar@gmail.com','0831212','Jl. Madagascar','231','Indonesia','Soka','2025-07-13','Romeo Oreo','0831121',NULL,NULL,NULL,NULL,NULL,1,'2025-07-20','Abosa'),(62,'Jackson Irvince','Madagascar@gmail.com','0831212','Jl. Madagascar','231','Indonesia','Soka','2025-07-13','Romeo Oreo','0831121',NULL,NULL,NULL,NULL,NULL,1,'2007-06-20','Abosa'),(63,'Jackson Ironasa','Madagascar@gmail.com','0831212','Jl. Madagascar','231','Indonesia','Soka','2025-07-13','Romeo Oreo','0831121',NULL,NULL,NULL,NULL,NULL,1,'2007-06-20','Abosa'),(64,'Jackson Irvince','Madagascar@gmail.com','0831212','Jl. Madagascar','231','Indonesia','Soka','2025-07-13','Romeo Oreo','0831121',NULL,NULL,NULL,NULL,NULL,1,'2025-07-20','Abosa'),(65,'Jackson Irvincesasdaassssss','Madagascar@gmail.com','0831212','Jl. Madagascar','231','Indonesia','Soka','2025-07-13','Romeo Oreo','0831121',NULL,NULL,NULL,NULL,NULL,1,'2025-07-20','Abosa'),(66,'Rafael Tobasa','Madagascar@gmail.com','0831212','Jl. Madagascar','231','Indonesia','Soka','2025-07-13','Romeo Oreo','0831121',2,NULL,NULL,NULL,NULL,1,'2025-07-20','Abosa'),(68,'Govanos','govano@gmail.com','032121','','','','','2025-07-13','Romeo Oreo','3123',NULL,NULL,NULL,2,'2025-07-13 22:05:06',1,'2015-06-11',''),(69,'Barkos vvvvv','Madagascar@gmail.com','3123','','','','','2025-07-13','Romeo Oreo','3123',NULL,2,'2025-07-13 21:54:21',2,'2025-07-13 22:04:33',1,'2009-02-01',''),(70,'Simba','rraaafffii@gmail.com','083115266100','','','','','2025-07-13','Romeo Oreo','3123',NULL,2,'2025-07-13 23:36:44',NULL,NULL,1,'2019-05-06',''),(71,'Nami','rraaafffii@gmail.com','083115266100','','','','','2025-07-14','Romeo Oreo','3123',NULL,2,'2025-07-14 10:44:59',NULL,NULL,1,'2011-05-14',''),(72,'Marc rrrrrr','rraaafffii@gmail.com','083115266100','','','','','2025-07-14','Romeo Oreo','3123',NULL,2,'2025-07-14 13:01:33',NULL,NULL,1,'2008-06-10',''),(73,'GusMosa','Gusmosa','0823132','','','','','2025-07-17','Romeo Oreo','3123',NULL,2,'2025-07-17 21:16:20',NULL,NULL,1,'2018-05-16',''),(74,'Gusma Gusma','Gusma@gmail.com','0831212','','','','','2025-07-17','Rafi Rabbani','083115266100',NULL,2,'2025-07-17 21:17:33',NULL,NULL,1,'2012-06-04',''),(75,'Romeo Oreo','Madagascar@gmail.com','3123','','','','','2025-07-17','Romeo Oreo','3123',NULL,2,'2025-07-17 21:44:24',NULL,NULL,1,'2025-07-16',''),(76,'Ovaltine','Madagascar@gmail.com','3123','','','','','2025-07-17','Romeo Oreo','3123',NULL,2,'2025-07-17 21:46:32',NULL,NULL,1,'2018-06-12',''),(77,'Lionese','rraaafffii@gmail.com','083115266100','','','','','2025-07-17','Romeo Oreo','3123',NULL,2,'2025-07-17 22:55:50',2,'2025-07-17 22:56:08',1,'2021-06-16',''),(78,'VVVV','Madagascar@gmail.com','213122','','','','','2025-07-18','Romeo Oreo','3123',NULL,2,'2025-07-18 07:57:46',NULL,NULL,1,'2020-06-07',''),(79,'Orange Cat','Madagascar@gmail.com','03812313','','','','','2025-07-20','Romeo Oreo','3123',NULL,2,'2025-07-20 22:48:28',NULL,NULL,1,'2022-06-07',''),(80,'RomeROme','Madagascar@gmail.com','0832232','','','','','2025-07-22','Romeo Oreo','3123',NULL,7,'2025-07-22 08:52:15',NULL,NULL,1,'2011-06-07',''),(81,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL),(82,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL),(83,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL),(84,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL),(85,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL),(86,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL),(87,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL);
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
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
  PRIMARY KEY (`evalannotateid`)
) ENGINE=InnoDB AUTO_INCREMENT=310 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `evalannotate`
--

LOCK TABLES `evalannotate` WRITE;
/*!40000 ALTER TABLE `evalannotate` DISABLE KEYS */;
INSERT INTO `evalannotate` VALUES (263,122,'1',12.00,197.00,'Hurt hand',2,'2025-07-20 22:53:44',2,'2025-07-20 23:48:17',1,NULL,NULL),(264,122,'0',11.00,185.00,'woke',2,'2025-07-20 22:53:44',2,'2025-07-20 23:48:17',1,NULL,NULL),(265,122,'0',144.00,161.00,'hurt hand',2,'2025-07-20 22:53:44',2,'2025-07-20 23:48:17',1,NULL,NULL),(266,123,'1',55.00,261.00,'right knee',2,'2025-07-20 22:55:19',2,'2025-07-21 05:09:23',1,NULL,NULL),(267,123,'0',105.00,259.00,'walk good',2,'2025-07-20 22:55:19',2,'2025-07-21 05:09:23',1,NULL,NULL),(273,128,'0',101.00,237.00,'Right leg',2,'2025-07-21 09:44:26',2,'2025-07-21 09:44:49',1,NULL,NULL),(274,128,'1',101.00,254.00,'Knee feel hurt',2,'2025-07-21 09:44:26',2,'2025-07-21 09:44:49',1,NULL,NULL),(275,129,'0',58.00,262.00,'Unable to sit down. Very painfull when attempt to sujud',2,'2025-07-21 09:49:37',NULL,NULL,1,NULL,NULL);
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
  KEY `evaluation_id` (`evaluation_id`),
  CONSTRAINT `evaluation_pain_areas_ibfk_1` FOREIGN KEY (`evaluation_id`) REFERENCES `evaluations` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `evaluation_pain_areas`
--

LOCK TABLES `evaluation_pain_areas` WRITE;
/*!40000 ALTER TABLE `evaluation_pain_areas` DISABLE KEYS */;
INSERT INTO `evaluation_pain_areas` VALUES (122,'ON Right Leg'),(123,'Alergic to beef'),(128,'Legs Hurt'),(129,'behind the knee'),(130,'');
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
  `enteredby` int DEFAULT NULL,
  `entereddate` datetime DEFAULT NULL,
  `editedby` int DEFAULT NULL,
  `editeddate` datetime DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `customer_id` (`customer_id`),
  KEY `therapist_id` (`therapist_id`),
  CONSTRAINT `evaluations_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customerid`),
  CONSTRAINT `evaluations_ibfk_2` FOREIGN KEY (`therapist_id`) REFERENCES `therapists` (`therapistsid`)
) ENGINE=InnoDB AUTO_INCREMENT=137 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `evaluations`
--

LOCK TABLES `evaluations` WRITE;
/*!40000 ALTER TABLE `evaluations` DISABLE KEYS */;
INSERT INTO `evaluations` VALUES (122,7,2,'2025-06-24','7 Wonder',2,'2025-07-20 22:53:44',2,'2025-07-20 23:48:17',1),(123,7,2,'2025-06-24','7 Wonder',2,'2025-07-20 22:55:19',2,'2025-07-21 05:09:23',1),(128,7,2,'2025-06-24','7 Wonder',2,'2025-07-21 09:44:26',2,'2025-07-21 09:44:49',1),(129,68,1,'2025-07-28','KH Alfalfa',2,'2025-07-21 09:49:37',NULL,NULL,1),(130,68,1,'2025-07-28','KH Alfalfa',2,'2025-07-21 09:53:00',NULL,NULL,1);
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
  PRIMARY KEY (`session_notesid`)
) ENGINE=InnoDB AUTO_INCREMENT=93 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `session_notes`
--

LOCK TABLES `session_notes` WRITE;
/*!40000 ALTER TABLE `session_notes` DISABLE KEYS */;
INSERT INTO `session_notes` VALUES (78,7,2,122,NULL,23,1,'Vitamin','she cannot walk fast',2,'2025-07-20 22:53:44',2,'2025-07-20 23:48:17',1),(79,7,2,123,NULL,23,1,'Vitamin','Walk to fast',2,'2025-07-20 22:55:19',2,'2025-07-21 05:09:23',1),(84,7,2,128,NULL,20,1,'Vitamin','Cannot walked',2,'2025-07-21 09:44:26',2,'2025-07-21 09:44:49',1),(85,68,1,129,NULL,30,1,'High blood and high blood pressure','will come back again. and sign packaee',2,'2025-07-21 09:49:37',NULL,NULL,1),(86,68,1,130,NULL,30,0,'','treated custoemr with Trilogy ',2,'2025-07-21 09:53:00',NULL,NULL,1);
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
  CONSTRAINT `therapists_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `userac` (`useracid`)
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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userac`
--

LOCK TABLES `userac` WRITE;
/*!40000 ALTER TABLE `userac` DISABLE KEYS */;
INSERT INTO `userac` VALUES (1,NULL,'customer_mark@gmail.com','$2b$10$cZjtjAHA5Gh6/uTkbEdTi.WUm9760mLp0MXV0WCVzxc451T0X0wnu','Customer'),(2,NULL,'therapist_virgil@gmail.com','$2b$10$1vznAkJxdGwLBLG.I7A5mO3Klm42t44qfUubUmYHUqI2S7PlXW5Xm','Therapist'),(3,NULL,'customer_steve@gmail.com','$2b$10$er6dcEm.tRz0voITH2J23.t2qHllRKIYit7c1TSoB5GbdPcGJ302G','Customer'),(4,NULL,'slaykcang@gmail.com','$2b$10$lfzzd0uyKRkJ21leQNHFd.mpVG8J3hnHwn5sgB6yoB4syJuvcyHuq',NULL),(5,NULL,'customer@gmail.com','$2b$10$4R47t1DS3aCmXaeZTxgO2eutZ2fuoJY2Zkb3pWwPzzQsfMtVtmOZ2','Customer'),(7,NULL,'romeo@gmail.com','$2b$10$Q0fYpSXLg1wAxnEW.U2H1OFV0JAAQHtJaclLTnGi8QZAzfwdY2U0G','Therapist');
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

-- Dump completed on 2025-07-22  9:43:08
