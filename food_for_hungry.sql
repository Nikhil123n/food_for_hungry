-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Oct 13, 2021 at 01:56 AM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `food_for_hungry`
--

-- --------------------------------------------------------

--
-- Table structure for table `contact`
--

CREATE TABLE `contact` (
  `id` int(11) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `subject` varchar(512) NOT NULL,
  `message` varchar(512) NOT NULL,
  `registered` char(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `donated_list`
--

CREATE TABLE `donated_list` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `donar_name` varchar(255) DEFAULT NULL,
  `phone_no` varchar(11) DEFAULT NULL,
  `alternate_phone_no` varchar(11) DEFAULT NULL,
  `type_of_food` varchar(255) DEFAULT NULL,
  `quantity` varchar(55) DEFAULT NULL,
  `date_of_collecting_food` varchar(255) DEFAULT NULL,
  `street_address` varchar(555) DEFAULT NULL,
  `pin_zip_code` varchar(6) DEFAULT NULL,
  `district_city` varchar(255) DEFAULT NULL,
  `state_province` varchar(255) DEFAULT NULL,
  `remarks` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `donated_list`
--

INSERT INTO `donated_list` (`id`, `email`, `name`, `donar_name`, `phone_no`, `alternate_phone_no`, `type_of_food`, `quantity`, `date_of_collecting_food`, `street_address`, `pin_zip_code`, `district_city`, `state_province`, `remarks`) VALUES
(21, 'nikul1245@gmail.com', 'nikul kumar', 'nikul kumar', '112233', '445566', 'bhaji roti', '1', '2021-10-11T13:12', 'andheri kurla road', '400001', 'mumbai', 'maharashtra', 'nothing, keep it up '),
(22, 'nikhil126@gmail.com', 'nikhil', 'nikhil', '6383927392', '4894327938', 'south indian', '5', '2021-10-26T01:02', 'kurla, station', '400072', 'mumbai', 'maharashtra', 'reach me out if in case you fail to manage resources'),
(36, 'ankitdubey@gmail.com', 'ankit dubey', 'ankit dubey', '8899776644', '6792537282', 'optional any food is fine', '1', '2021-10-06T01:02', 'opposite to dwarka hospital', '5654', 'navi mumbai', 'maharashtra', 'god bless you and keep this work ');

-- --------------------------------------------------------

--
-- Table structure for table `requested_list`
--

CREATE TABLE `requested_list` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `request_person_name` varchar(255) DEFAULT NULL,
  `phone_no` varchar(11) DEFAULT NULL,
  `alternate_phone_no` varchar(11) DEFAULT NULL,
  `quantity` varchar(55) DEFAULT NULL,
  `date_of_meal` varchar(255) DEFAULT NULL,
  `street_address` varchar(555) DEFAULT NULL,
  `pin_zip_code` varchar(6) DEFAULT NULL,
  `district_city` varchar(255) DEFAULT NULL,
  `state_province` varchar(255) DEFAULT NULL,
  `remarks` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `requested_list`
--

INSERT INTO `requested_list` (`id`, `email`, `name`, `request_person_name`, `phone_no`, `alternate_phone_no`, `quantity`, `date_of_meal`, `street_address`, `pin_zip_code`, `district_city`, `state_province`, `remarks`) VALUES
(36, 'ankitdubey@gmail.com', 'ankit dubey', 'ankit dubey', '99273827492', '7384284829', '2', '2021-10-20T13:20', 'GOREGAON EAST, MUMBAI Post office ', '400063', 'mumbai', 'maharashtra', ''),
(43, 'kailashsingh@gmail.com', 'kailash singh', 'kailash singh', '7738838836', '6638836773', '8', '2021-10-20T11:00', 'Mumbai central railway station', '400001', 'mumbai', 'maharashtra', 'Give a miss call when you reach nearby of the destination');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `password` varchar(511) NOT NULL,
  `age` int(56) NOT NULL,
  `phone_no` varchar(11) NOT NULL,
  `gender` varchar(99) NOT NULL,
  `category` varchar(255) NOT NULL,
  `tokens` varchar(512) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `name`, `password`, `age`, `phone_no`, `gender`, `category`, `tokens`) VALUES
(1, 'ankitp123@gmail.com', 'ankitp123', '12345678', 18, '123456789', 'male', '', ''),
(3, 'nagsen123@gmail.com', 'nagsen@123', '123456', 20, '1241241244', 'female', '', ''),
(21, 'nikul1245@gmail.com', 'nikul kumar', '$2a$08$JpIrHYE9pzenHUza8T03QucUWlS//cFp4mNoBYOWBrhJ/lcyGkZCK', 22, '9977883547', 'Male', 'Individual Persom', ''),
(22, 'nikhil126@gmail.com', 'nikhil', '$2a$08$c7L.H1N6MRY9N4T3Lhe3Iec/rZjTd7xv.YCiWwH1RRCUU/jZiiV0O', 24, '1122334484', 'Female', 'Individual Persom', ''),
(28, 'prabha@gmail.com', 'prabha', '$2a$08$f0GKLzNNq14H/yA4S.trw.PVUpdfhgeQIRj3EBKEsox8VXCb3MHFy', 45, '6382492639', 'Female', 'Individual Persom', '[object Promise]'),
(33, 'nagsenadakmaol@gmail.com', 'nagsem adakmol', '$2a$08$wrQw4p/DFGGgBVaTK8mIAub/OJuVEigvY64J0zMTA6vCqIhn84ZmG', 29, '9988778932', '', '', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5hZ3NlbmFkYWttYW9sQGdtYWlsLmNvbSIsImlhdCI6MTYzMzk5MjQ3OX0.O-zOfRKDXcP78CWC9hjPLUbuzcRvLMapmfsWixsAj4k'),
(36, 'ankitdubey@gmail.com', 'ankit dubey', '$2a$08$TcAikiLjBS1V6nrUtUwklu6akvKXAVKeU5B2NI5jtIl5wWC3KYRlq', 19, '1234512345', 'Male', 'NGO', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFua2l0ZHViZXlAZ21haWwuY29tIiwiaWF0IjoxNjMzOTkzMTI3fQ.NCFRUzmlcDRnUuQI04LY3gWRMCeRES0uQQ75InZxXDc'),
(39, 'ankitdubey78@gmail.com', 'ankit dubey', '$2a$08$Mje1uynXtGN7O9O1xIl7Q.umoqVcDWZ/F.635gZAT2TijXTLVHQe6', 18, '8839304819', 'Male', 'Restaurant', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFua2l0ZHViZXk3OEBnbWFpbC5jb20iLCJpYXQiOjE2MzQwMDEzNjV9.blR1wemVQIN8YnY6PQ4bQGwANmtko4ktQLo61XeQ1_Y'),
(40, 'rahuldhawle@gmail.com', 'rahul dhawle', '$2a$08$FFOTVCiufi/dnCKHoztaL.N.oDcTmV7vkoR9M.Wazp/BlAlSWvL3a', 19, '9985584482', 'Male', 'Restaurant', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJhaHVsZGhhd2xlQGdtYWlsLmNvbSIsImlhdCI6MTYzNDAwMTQ3Nn0.spS9a58BhV7LB3-_WYSDsiY014cZ3E1vsW2VcnLEWC0'),
(41, 'ankitdubey463@gmail.com', 'ankit', '$2a$08$vcGp6Ee.x9LEeMg.nqE2u.V9Dk2cy.Xkb2TyjRm5I7jZOL4XMnjm6', 22, '3648273947', 'Male', 'NGO', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFua2l0ZHViZXk0NjNAZ21haWwuY29tIiwiaWF0IjoxNjM0MDY4NTgyfQ.r9fkXYzyvmoGEB5XLaUbk94G_75WJJEPtFSetHbiFuw'),
(42, 'jayeshsanu@gmail.com', 'jayesh sanu ', '$2a$08$nuJ.yQU88ir.h987lL7xVOiWvrhlJSQzOnkOrVAd0hF2iI8jphMmy', 42, '8294274927', 'Male', 'Individual Persom', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpheWVzaHNhbnVAZ21haWwuY29tIiwiaWF0IjoxNjM0MDY4ODUxfQ.OTCc8ZainwNePaA6eyVAtLEWa844N9vNJrzUi_Gn-DI'),
(43, 'kailashsingh@gmail.com', 'kailash singh', '$2a$08$5wUmcoHH8iDbxRCkVhu5p.kXxAo5GTXDXhnurHO1v81CULc52P0X.', 28, '7738838837', 'Male', 'NGO', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImthaWxhc2hzaW5naEBnbWFpbC5jb20iLCJpYXQiOjE2MzQwNzk2OTR9.3P-UygJRNqxmN54rooh2WxooQlfTvZ89bhpfwDJDa9M');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `donated_list`
--
ALTER TABLE `donated_list`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `requested_list`
--
ALTER TABLE `requested_list`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `phone_no` (`phone_no`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `phone_no_2` (`phone_no`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
