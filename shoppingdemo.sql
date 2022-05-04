-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 04, 2022 at 04:03 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `shoppingdemo`
--

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `cartID` int(50) NOT NULL,
  `userID` varchar(50) NOT NULL,
  `prodID` int(50) NOT NULL,
  `Qnty` int(20) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`cartID`, `userID`, `prodID`, `Qnty`) VALUES
(9, 'jinushaji1208@gmail.com', 1, 3),
(10, 'jinushaji1208@gmail.com', 2, 2),
(13, 'jinushaji1208@gmail.com', 12, 2),
(14, 'jinushaji1208@gmail.com', 13, 1),
(15, 'jinu@gmail.com', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(20) NOT NULL,
  `userID` varchar(50) NOT NULL,
  `prodID` varchar(50) NOT NULL,
  `amount` varchar(50) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `userID`, `prodID`, `amount`) VALUES
(27, 'jinushaji1208@gmail.com', '4', '0'),
(28, 'jinushaji1208@gmail.com', '15', '70000'),
(29, 'jinushaji1208@gmail.com', '4', '25000'),
(30, 'jinu@gmail.com', '1', '15000');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `image` varchar(255) NOT NULL,
  `name` varchar(50) NOT NULL,
  `discription` varchar(100) NOT NULL,
  `price` int(50) NOT NULL,
  `id` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`image`, `name`, `discription`, `price`, `id`) VALUES
('download (3).jfif', 'vivo', 'good storage', 15000, 1),
('download.jfif', 'oppo', 'good camera', 18000, 2),
('download (2).jfif', 'redmi', 'good phone', 180000, 3),
('2b414a3f6852a8c1c8b9b5d0bb60d5779cf377ce.jpeg', 'iphone', 'very nice', 25000, 4),
('download.jfif', 'oppo', 'good phone', 30000, 5),
('lenovo-laptops-yoga-yoga-c-series-7i-14-subseries-gallery-10.jpg', 'Lenovo', '8GB/512GB SSD/Windows ', 49990, 11),
('71bJqS8ZLTL._SL1500_.jpg', 'HP', ' 8GB RAM/512GB ', 50000, 12),
('dell-xps-15-9570-backcover.jpg', 'Dell', '8GB DDR4, 1TB', 35000, 13),
('artImg198x166_7328.jpg', 'Acer', 'IPS Display Gaming Laptop ', 38000, 14),
('photo-1517336714731-489689fd1ca8.jpg', 'Apple', '8GB RAM, 256GB SSD ', 70000, 15);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `ID` int(2) NOT NULL,
  `Name` varchar(50) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `Phoneno` int(20) NOT NULL,
  `Password` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`ID`, `Name`, `Email`, `Phoneno`, `Password`) VALUES
(1, 'jinu', 'jinushaji1208@gmail.com', 1234567889, '6666'),
(2, 'aswany', 'aswany@gmail.com', 789456123, '2222'),
(3, 'jisha', 'jishashaji@gmail.com', 789456123, '1234'),
(4, 'jinu', 'jinu@gmail.com', 123456, '123');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`cartID`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `cartID` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `ID` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
