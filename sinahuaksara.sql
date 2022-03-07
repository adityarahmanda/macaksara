-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 07, 2022 at 09:06 AM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 7.3.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sinahuaksara`
--

-- --------------------------------------------------------

--
-- Table structure for table `sinahuaksara_quiz`
--

CREATE TABLE `sinahuaksara_quiz` (
  `quiz_id` varchar(64) NOT NULL,
  `title` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `sinahuaksara_quiz`
--

INSERT INTO `sinahuaksara_quiz` (`quiz_id`, `title`) VALUES
('arane-kewan', 'Arane Kewan');

-- --------------------------------------------------------

--
-- Table structure for table `sinahuaksara_quiz_level`
--

CREATE TABLE `sinahuaksara_quiz_level` (
  `level_id` int(64) NOT NULL,
  `quiz_id` varchar(64) NOT NULL,
  `level` int(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `sinahuaksara_quiz_level`
--

INSERT INTO `sinahuaksara_quiz_level` (`level_id`, `quiz_id`, `level`) VALUES
(1, 'arane-kewan', 1),
(2, 'arane-kewan', 2),
(3, 'arane-kewan', 3);

-- --------------------------------------------------------

--
-- Table structure for table `sinahuaksara_quiz_question`
--

CREATE TABLE `sinahuaksara_quiz_question` (
  `question_id` int(64) NOT NULL,
  `quiz_id` varchar(64) NOT NULL,
  `level_id` int(64) NOT NULL,
  `question` varchar(64) NOT NULL,
  `translation` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `sinahuaksara_quiz_question`
--

INSERT INTO `sinahuaksara_quiz_question` (`question_id`, `quiz_id`, `level_id`, `question`, `translation`) VALUES
(1, 'arane-kewan', 1, 'baya', 'buaya'),
(2, 'arane-kewan', 1, 'cêcak', 'cicak'),
(3, 'arane-kewan', 1, 'coro', 'kêcoak'),
(4, 'arane-kewan', 1, 'pe', 'ikan pari'),
(5, 'arane-kewan', 1, 'dara', 'burung mêrpati'),
(6, 'arane-kewan', 1, 'kupu', 'kupu-kupu'),
(7, 'arane-kewan', 1, 'kura', 'kura-kura'),
(8, 'arane-kewan', 1, 'tikus', 'tikus'),
(9, 'arane-kewan', 1, 'yuyu', 'kêtam'),
(10, 'arane-kewan', 2, 'ampal', 'ampal'),
(11, 'arane-kewan', 2, 'banyak', 'angsa'),
(12, 'arane-kewan', 2, 'celeng', 'babi'),
(13, 'arane-kewan', 2, 'nyambik', 'biawak'),
(14, 'arane-kewan', 2, 'tongkol', 'ikan tongkol'),
(15, 'arane-kewan', 2, 'lingsang', 'bêrang-bêrang'),
(16, 'arane-kewan', 2, 'lintah', 'lintah'),
(17, 'arane-kewan', 2, 'kalajêngking', 'kalajêngking'),
(18, 'arane-kewan', 2, 'kucing', 'kucing'),
(19, 'arane-kewan', 2, 'bandêng', 'bandêng'),
(20, 'arane-kewan', 3, 'mênjangan', 'rusa'),
(21, 'arane-kewan', 3, 'mênthok', 'êntok'),
(22, 'arane-kewan', 3, 'brati', 'bebek brati'),
(23, 'arane-kewan', 3, 'jangkrik', 'jangkrik'),
(24, 'arane-kewan', 3, 'krêmi', 'cacing krêmi'),
(25, 'arane-kewan', 3, 'kêmangga', 'laba-laba'),
(26, 'arane-kewan', 3, 'kwangwung', 'kumbang badak'),
(27, 'arane-kewan', 3, 'êmprit', 'burung pipit'),
(28, 'arane-kewan', 3, 'tambra', 'ikan sêmah'),
(29, 'arane-kewan', 3, 'kintêl', 'kodok bêlêntung'),
(30, 'arane-kewan', 3, 'sêmbilang', 'ikan sêmbilang');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `sinahuaksara_quiz`
--
ALTER TABLE `sinahuaksara_quiz`
  ADD PRIMARY KEY (`quiz_id`);

--
-- Indexes for table `sinahuaksara_quiz_level`
--
ALTER TABLE `sinahuaksara_quiz_level`
  ADD PRIMARY KEY (`level_id`),
  ADD UNIQUE KEY `level` (`level`),
  ADD KEY `quiz_id` (`quiz_id`);

--
-- Indexes for table `sinahuaksara_quiz_question`
--
ALTER TABLE `sinahuaksara_quiz_question`
  ADD PRIMARY KEY (`question_id`),
  ADD KEY `quiz_id` (`quiz_id`),
  ADD KEY `level_id` (`level_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `sinahuaksara_quiz_level`
--
ALTER TABLE `sinahuaksara_quiz_level`
  MODIFY `level_id` int(64) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `sinahuaksara_quiz_question`
--
ALTER TABLE `sinahuaksara_quiz_question`
  MODIFY `question_id` int(64) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `sinahuaksara_quiz_level`
--
ALTER TABLE `sinahuaksara_quiz_level`
  ADD CONSTRAINT `sinahuaksara_quiz_level_ibfk_1` FOREIGN KEY (`quiz_id`) REFERENCES `sinahuaksara_quiz` (`quiz_id`);

--
-- Constraints for table `sinahuaksara_quiz_question`
--
ALTER TABLE `sinahuaksara_quiz_question`
  ADD CONSTRAINT `sinahuaksara_quiz_question_ibfk_1` FOREIGN KEY (`quiz_id`) REFERENCES `sinahuaksara_quiz` (`quiz_id`),
  ADD CONSTRAINT `sinahuaksara_quiz_question_ibfk_2` FOREIGN KEY (`level_id`) REFERENCES `sinahuaksara_quiz_level` (`level_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
