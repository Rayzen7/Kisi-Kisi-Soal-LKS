-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Waktu pembuatan: 02 Mar 2025 pada 09.52
-- Versi server: 8.0.30
-- Versi PHP: 8.3.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `lks-sumut`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `consultations`
--

CREATE TABLE `consultations` (
  `id` bigint UNSIGNED NOT NULL,
  `society_id` bigint UNSIGNED NOT NULL,
  `doctor_id` bigint UNSIGNED DEFAULT NULL,
  `status` enum('accepted','declined','pending') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `disease_history` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `current_symptoms` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `doctor_notes` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `consultations`
--

INSERT INTO `consultations` (`id`, `society_id`, `doctor_id`, `status`, `disease_history`, `current_symptoms`, `doctor_notes`) VALUES
(1, 3, 2, 'accepted', NULL, 'flu and cough', 'ok'),
(2, 4, NULL, 'pending', NULL, 'flu and cough', NULL),
(3, 5, 8, 'accepted', NULL, 'flu and cough', 'ok'),
(4, 6, 12, 'accepted', NULL, 'flu and cough', 'ok'),
(6, 8, 16, 'accepted', NULL, 'flu and cough', 'ok'),
(7, 9, 23, 'accepted', NULL, 'flu and cough', 'ok'),
(8, 10, 21, 'accepted', NULL, 'flu and cough', 'ok'),
(9, 11, 17, 'accepted', NULL, 'flu and cough', 'ok'),
(11, 13, 3, 'accepted', NULL, 'flu and cough', 'ok'),
(12, 14, 21, 'accepted', NULL, 'flu and cough', 'ok'),
(13, 15, NULL, 'declined', NULL, 'flu and cough', NULL),
(14, 18, NULL, 'pending', NULL, 'flu and cough', NULL),
(15, 19, NULL, 'pending', NULL, 'flu and cough', NULL),
(16, 20, 36, 'accepted', NULL, 'flu and cough', 'ok'),
(17, 21, 43, 'accepted', NULL, 'flu and cough', 'ok'),
(18, 22, 36, 'accepted', NULL, 'flu and cough', 'ok'),
(19, 23, 46, 'accepted', NULL, 'flu and cough', 'ok'),
(20, 24, 46, 'accepted', NULL, 'flu and cough', 'ok'),
(21, 25, 26, 'accepted', NULL, 'flu and cough', 'ok'),
(22, 26, 33, 'accepted', NULL, 'flu and cough', 'ok'),
(23, 27, 36, 'accepted', NULL, 'flu and cough', 'ok'),
(24, 28, 47, 'accepted', NULL, 'flu and cough', 'ok'),
(25, 29, 36, 'accepted', NULL, 'flu and cough', 'ok'),
(26, 30, NULL, 'declined', NULL, 'flu and cough', NULL),
(27, 33, NULL, 'pending', NULL, 'flu and cough', NULL),
(28, 34, NULL, 'pending', NULL, 'flu and cough', NULL),
(29, 35, 56, 'accepted', NULL, 'flu and cough', 'ok'),
(30, 36, 72, 'accepted', NULL, 'flu and cough', 'ok'),
(31, 37, 53, 'accepted', NULL, 'flu and cough', 'ok'),
(32, 38, 56, 'accepted', NULL, 'flu and cough', 'ok'),
(33, 39, 71, 'accepted', NULL, 'flu and cough', 'ok'),
(34, 40, 62, 'accepted', NULL, 'flu and cough', 'ok'),
(35, 41, 58, 'accepted', NULL, 'flu and cough', 'ok'),
(36, 42, 67, 'accepted', NULL, 'flu and cough', 'ok'),
(37, 43, 53, 'accepted', NULL, 'flu and cough', 'ok'),
(38, 44, 53, 'accepted', NULL, 'flu and cough', 'ok'),
(39, 45, NULL, 'declined', NULL, 'flu and cough', NULL),
(47, 7, 8, 'accepted', NULL, 'Flue', 'ok');

-- --------------------------------------------------------

--
-- Struktur dari tabel `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint UNSIGNED NOT NULL,
  `reserved_at` int UNSIGNED DEFAULT NULL,
  `available_at` int UNSIGNED NOT NULL,
  `created_at` int UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `medicals`
--

CREATE TABLE `medicals` (
  `id` bigint UNSIGNED NOT NULL,
  `spot_id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `role` enum('officer','doctor') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'officer',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `medicals`
--

INSERT INTO `medicals` (`id`, `spot_id`, `user_id`, `role`, `name`) VALUES
(1, 1, 1, 'doctor', 'Dr. Kamila Wibisono'),
(2, 1, 2, 'doctor', 'Dr. Maya Kusmawati'),
(3, 1, 3, 'doctor', 'Dr. Gaduh Prasetyo'),
(4, 1, 4, 'officer', 'Indra Usamah'),
(5, 1, 5, 'officer', 'Kalim Yulianti'),
(6, 2, 6, 'doctor', 'Dr. Eva Mandasari'),
(7, 2, 7, 'doctor', 'Dr. Jatmiko Handayani'),
(8, 2, 8, 'doctor', 'Dr. Ratna Riyanti'),
(9, 2, 9, 'officer', 'Ayu Iswahyudi'),
(10, 2, 10, 'officer', 'Azalea Mulyani'),
(11, 3, 11, 'doctor', 'Dr. Hesti Andriani'),
(12, 3, 12, 'doctor', 'Dr. Kusuma Nasyidah'),
(13, 3, 13, 'doctor', 'Dr. Gaman Sihotang'),
(14, 3, 14, 'officer', 'Bella Habibi'),
(15, 3, 15, 'officer', 'Titin Agustina'),
(16, 4, 16, 'doctor', 'Dr. Ami Kurniawan'),
(17, 4, 17, 'doctor', 'Dr. Hasta Riyanti'),
(18, 4, 18, 'doctor', 'Dr. Laila Hassanah'),
(19, 4, 19, 'officer', 'Martana Hakim'),
(20, 4, 20, 'officer', 'Aurora Siregar'),
(21, 5, 21, 'doctor', 'Dr. Tina Prastuti'),
(22, 5, 22, 'doctor', 'Dr. Farhunnisa Widiastuti'),
(23, 5, 23, 'doctor', 'Dr. Olga Hartati'),
(24, 5, 24, 'officer', 'Tira Purwanti'),
(25, 5, 25, 'officer', 'Darmanto Nuraini'),
(26, 6, 26, 'doctor', 'Dr. Okto Pradana'),
(27, 6, 27, 'doctor', 'Dr. Dian Hariyah'),
(28, 6, 28, 'doctor', 'Dr. Ganda Gunawan'),
(29, 6, 29, 'officer', 'Najam Rajata'),
(30, 6, 30, 'officer', 'Hani Maulana'),
(31, 7, 31, 'doctor', 'Dr. Galak Uyainah'),
(32, 7, 32, 'doctor', 'Dr. Eka Suartini'),
(33, 7, 33, 'doctor', 'Dr. Asmianto Kusumo'),
(34, 7, 34, 'officer', 'Prayitna Yuniar'),
(35, 7, 35, 'officer', 'Banawi Prastuti'),
(36, 8, 36, 'doctor', 'Dr. Kania Maulana'),
(37, 8, 37, 'doctor', 'Dr. Salwa Mansur'),
(38, 8, 38, 'doctor', 'Dr. Dagel Puspita'),
(39, 8, 39, 'officer', 'Jamal Rahimah'),
(40, 8, 40, 'officer', 'Ami Prastuti'),
(41, 9, 41, 'doctor', 'Dr. Puput Suryatmi'),
(42, 9, 42, 'doctor', 'Dr. Hani Uyainah'),
(43, 9, 43, 'doctor', 'Dr. Aditya Kusmawati'),
(44, 9, 44, 'officer', 'Agnes Permadi'),
(45, 9, 45, 'officer', 'Edison Susanti'),
(46, 10, 46, 'doctor', 'Dr. Winda Pertiwi'),
(47, 10, 47, 'doctor', 'Dr. Emil Nuraini'),
(48, 10, 48, 'doctor', 'Dr. Raden Sinaga'),
(49, 10, 49, 'officer', 'Sadina Nurdiyanti'),
(50, 10, 50, 'officer', 'Jessica Habibi'),
(51, 11, 51, 'doctor', 'Dr. Maya Napitupulu'),
(52, 11, 52, 'doctor', 'Dr. Nurul Utama'),
(53, 11, 53, 'doctor', 'Dr. Asmianto Ardianto'),
(54, 11, 54, 'officer', 'Cawisono Wulandari'),
(55, 11, 55, 'officer', 'Candrakanta Palastri'),
(56, 12, 56, 'doctor', 'Dr. Uda Sitorus'),
(57, 12, 57, 'doctor', 'Dr. Paiman Zulaika'),
(58, 12, 58, 'doctor', 'Dr. Eko Putra'),
(59, 12, 59, 'officer', 'Mariadi Samosir'),
(60, 12, 60, 'officer', 'Chandra Januar'),
(61, 13, 61, 'doctor', 'Dr. Padma Hariyah'),
(62, 13, 62, 'doctor', 'Dr. Taufik Uyainah'),
(63, 13, 63, 'doctor', 'Dr. Maria Laksmiwati'),
(64, 13, 64, 'officer', 'Harjo Tamba'),
(65, 13, 65, 'officer', 'Vanesa Palastri'),
(66, 14, 66, 'doctor', 'Dr. Diah Mulyani'),
(67, 14, 67, 'doctor', 'Dr. Syahrini Farida'),
(68, 14, 68, 'doctor', 'Dr. Fitria Winarsih'),
(69, 14, 69, 'officer', 'Clara Pratiwi'),
(70, 14, 70, 'officer', 'Dian Habibi'),
(71, 15, 71, 'doctor', 'Dr. Aurora Wulandari'),
(72, 15, 72, 'doctor', 'Dr. Safina Hassanah'),
(73, 15, 73, 'doctor', 'Dr. Cinthia Adriansyah'),
(74, 15, 74, 'officer', 'Wadi Prakasa'),
(75, 15, 75, 'officer', 'Parman Namaga');

-- --------------------------------------------------------

--
-- Struktur dari tabel `migrations`
--

CREATE TABLE `migrations` (
  `id` int UNSIGNED NOT NULL,
  `migration` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(3, '2021_10_21_133122_create_regionals_table', 1),
(4, '2021_10_21_133148_create_spots_table', 1),
(5, '2021_10_21_133201_create_societies_table', 1),
(6, '2021_10_21_133223_create_vaccines_table', 1),
(7, '2021_10_21_133229_create_spot_vaccines_table', 1),
(8, '2021_10_21_133242_create_medicals_table', 1),
(9, '2021_10_21_133254_create_vaccinations_table', 1),
(10, '2021_10_21_144953_create_consultations_table', 1),
(11, '0001_01_01_000000_create_users_table', 2),
(12, '0001_01_01_000001_create_cache_table', 2),
(13, '0001_01_01_000002_create_jobs_table', 2),
(14, '2025_02_12_121849_create_personal_access_tokens_table', 2);

-- --------------------------------------------------------

--
-- Struktur dari tabel `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(82, 'App\\Models\\User', 7, 'access_token', '9ffadc9f58d008867a5386c0cd7bcf6c20572b963dacce393e26473cea98a9fc', '[\"*\"]', NULL, NULL, '2025-03-02 02:45:59', '2025-03-02 02:45:59');

-- --------------------------------------------------------

--
-- Struktur dari tabel `regionals`
--

CREATE TABLE `regionals` (
  `id` bigint UNSIGNED NOT NULL,
  `province` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `district` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `regionals`
--

INSERT INTO `regionals` (`id`, `province`, `district`) VALUES
(1, 'DKI Jakarta', 'Central Jakarta'),
(2, 'DKI Jakarta', 'South Jakarta'),
(3, 'West Java', 'Bandung');

-- --------------------------------------------------------

--
-- Struktur dari tabel `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('gyyQUxkwirDbOr4s1WWkXCuqHYRcQQA25q2AQZDj', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiUm5TMFNMV2tSbzE3b2tvaVVQZVdqb0I5cGhoVVF6RW40NUxYTUNVOSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1740658859),
('RzdMI0hzOBuJEr9DxcehIR9gb9MY5F2fku92bR44', NULL, '127.0.0.1', 'PostmanRuntime/7.43.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiUnFlRWUySkhabkE4QTJxMFdaTml4RmFJaVlnZE92TDExWTQ5WTdXZiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1739414004),
('sDvwFkOUheHX473lRRZ03JDH238BgljljC49EVHI', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoianhxRVRKWExpdDQ4akpTWWtkZjFEc2NYdklZRllITWhnRWhIZ1dRYiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1739506304),
('VE82hLcv5hGo1u9EnVSCm2lFdy1ao6hAwG4JNjVs', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiODNoaEZ4SjdjT3J6d1ZnMktXMEJydUhVdGphTEpJdm9LVU9sOVR6YiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1739396669);

-- --------------------------------------------------------

--
-- Struktur dari tabel `societies`
--

CREATE TABLE `societies` (
  `id` bigint UNSIGNED NOT NULL,
  `id_card_number` char(8) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `born_date` date NOT NULL,
  `gender` enum('male','female') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `regional_id` bigint UNSIGNED NOT NULL,
  `login_tokens` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `societies`
--

INSERT INTO `societies` (`id`, `id_card_number`, `password`, `name`, `born_date`, `gender`, `address`, `regional_id`, `login_tokens`) VALUES
(1, '20210001', '121212', 'Omar Gunawan', '1990-04-18', 'male', 'Jln. Baranang Siang No. 479, DKI Jakarta', 1, NULL),
(2, '20210002', '121212', 'Nilam Sinaga', '1998-09-11', 'female', 'Gg. Sukajadi No. 26, DKI Jakarta', 1, NULL),
(3, '20210003', '121212', 'Rosman Lailasari', '1983-02-12', 'male', 'Jln. Moch. Ramdan No. 242, DKI Jakarta', 1, NULL),
(4, '20210004', '121212', 'Ifa Adriansyah', '1993-05-17', 'female', 'Gg. Setia Budi No. 215, DKI Jakarta', 1, NULL),
(5, '20210005', '121212', 'Sakura Susanti', '1973-11-05', 'male', 'Kpg. B.Agam 1 No. 729, DKI Jakarta', 1, NULL),
(6, '20210006', '121212', 'Jail Utama', '2001-12-28', 'male', 'Kpg. Cikutra Timur No. 57, DKI Jakarta', 1, NULL),
(7, '20210007', '121212', 'Gawati Wibowo', '1971-08-23', 'male', 'Kpg. Bara No. 346, DKI Jakarta', 1, NULL),
(8, '20210008', '121212', 'Pia Rajata', '1976-08-04', 'male', 'Kpg. Yohanes No. 445, DKI Jakarta', 1, NULL),
(9, '20210009', '121212', 'Darmaji Suartini', '1999-10-05', 'male', 'Gg. Kusmanto No. 622, DKI Jakarta', 1, NULL),
(10, '20210010', '121212', 'Kiandra Tamba', '1988-05-31', 'male', 'Ki. Sutarto No. 66, DKI Jakarta', 1, NULL),
(11, '20210011', '121212', 'Manah Thamrin', '1989-06-20', 'female', 'Jln. Baung No. 871, DKI Jakarta', 1, NULL),
(12, '20210012', '121212', 'Banara Ardianto', '1978-10-27', 'male', 'Ki. Yos Sudarso No. 411, DKI Jakarta', 1, NULL),
(13, '20210013', '121212', 'Anggabaya Mustofa', '1979-05-11', 'female', 'Psr. Pacuan Kuda No. 351, DKI Jakarta', 1, NULL),
(14, '20210014', '121212', 'Emong Purnawati', '1979-07-15', 'male', 'Jln. Jayawijaya No. 141, DKI Jakarta', 1, NULL),
(15, '20210015', '121212', 'Nardi Pertiwi', '1981-05-14', 'male', 'Psr. Barasak No. 554, DKI Jakarta', 1, NULL),
(16, '20210016', '121212', 'Ina Nasyiah', '1971-05-21', 'female', 'Ds. Suryo No. 100, DKI Jakarta', 2, NULL),
(17, '20210017', '121212', 'Jinawi Wastuti', '1994-06-18', 'male', 'Ki. Sugiono No. 918, DKI Jakarta', 2, NULL),
(18, '20210018', '121212', 'Marsudi Utama', '1979-06-04', 'female', 'Kpg. Cikapayang No. 229, DKI Jakarta', 2, NULL),
(19, '20210019', '121212', 'Ilsa Gunarto', '1992-06-11', 'female', 'Gg. Baing No. 871, DKI Jakarta', 2, NULL),
(20, '20210020', '121212', 'Hani Pratiwi', '1990-07-10', 'male', 'Dk. Yap Tjwan Bing No. 528, DKI Jakarta', 2, NULL),
(21, '20210021', '121212', 'Najwa Pratiwi', '1996-11-05', 'male', 'Kpg. Raden No. 688, DKI Jakarta', 2, NULL),
(22, '20210022', '121212', 'Samiah Haryanto', '1985-10-26', 'male', 'Gg. Juanda No. 863, DKI Jakarta', 2, NULL),
(23, '20210023', '121212', 'Olga Safitri', '1971-03-04', 'male', 'Psr. Ir. H. Juanda No. 728, DKI Jakarta', 2, NULL),
(24, '20210024', '121212', 'Halim Winarsih', '1974-11-16', 'male', 'Dk. Nakula No. 730, DKI Jakarta', 2, NULL),
(25, '20210025', '121212', 'Vivi Widodo', '1988-09-19', 'male', 'Kpg. Astana Anyar No. 983, DKI Jakarta', 2, NULL),
(26, '20210026', '121212', 'Dian Firmansyah', '1985-04-01', 'male', 'Kpg. Baha No. 855, DKI Jakarta', 2, NULL),
(27, '20210027', '121212', 'Patricia Usada', '1986-08-28', 'male', 'Psr. Ters. Jakarta No. 993, DKI Jakarta', 2, NULL),
(28, '20210028', '121212', 'Soleh Mandasari', '1988-09-28', 'female', 'Ki. Flores No. 869, DKI Jakarta', 2, NULL),
(29, '20210029', '121212', 'Kamal Pranowo', '1976-08-10', 'male', 'Jln. Baung No. 80, DKI Jakarta', 2, NULL),
(30, '20210030', '121212', 'Ade Kusmawati', '1996-08-29', 'male', 'Jln. Kiaracondong No. 398, DKI Jakarta', 2, NULL),
(31, '20210031', '121212', 'Irwan Sinaga', '1976-10-06', 'female', 'Dk. Basmol Raya No. 714, West Java', 3, NULL),
(32, '20210032', '121212', 'Lulut Lestari', '1981-03-31', 'male', 'Ds. Cihampelas No. 933, West Java', 3, NULL),
(33, '20210033', '121212', 'Balijan Rahimah', '1972-04-25', 'female', 'Ki. Ciwastra No. 539, West Java', 3, NULL),
(34, '20210034', '121212', 'Kasiyah Sitompul', '1975-01-14', 'male', 'Dk. Sutarto No. 434, West Java', 3, NULL),
(35, '20210035', '121212', 'Wulan Nasyidah', '1974-11-04', 'male', 'Dk. Mahakam No. 367, West Java', 3, NULL),
(36, '20210036', '121212', 'Damar Palastri', '1981-03-24', 'female', 'Jr. Teuku Umar No. 547, West Java', 3, NULL),
(37, '20210037', '121212', 'Gamanto Simanjuntak', '1972-01-13', 'female', 'Jln. Salam No. 421, West Java', 3, NULL),
(38, '20210038', '121212', 'Lukita Gunarto', '1998-11-27', 'female', 'Jr. HOS. Cjokroaminoto (Pasirkaliki) No. 9, West Java', 3, NULL),
(39, '20210039', '121212', 'Malika Nashiruddin', '1989-07-05', 'male', 'Psr. Kartini No. 960, West Java', 3, NULL),
(40, '20210040', '121212', 'Siska Hutapea', '1972-03-30', 'female', 'Ki. Wora Wari No. 501, West Java', 3, NULL),
(41, '20210041', '121212', 'Laras Sirait', '1971-01-13', 'male', 'Psr. Basmol Raya No. 859, West Java', 3, NULL),
(42, '20210042', '121212', 'Embuh Mulyani', '1996-08-05', 'male', 'Kpg. Wahidin No. 512, West Java', 3, NULL),
(43, '20210043', '121212', 'Mutia Nashiruddin', '1985-05-08', 'female', 'Ds. Hang No. 765, West Java', 3, NULL),
(44, '20210044', '121212', 'Pangestu Lazuardi', '2001-08-02', 'male', 'Dk. Bass No. 886, West Java', 3, NULL),
(45, '20210045', '121212', 'Gaduh Suwarno', '1971-07-27', 'female', 'Psr. Basuki No. 591, West Java', 3, NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `spots`
--

CREATE TABLE `spots` (
  `id` bigint UNSIGNED NOT NULL,
  `regional_id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `serve` tinyint NOT NULL DEFAULT '1',
  `capacity` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `spots`
--

INSERT INTO `spots` (`id`, `regional_id`, `name`, `address`, `serve`, `capacity`) VALUES
(1, 1, 'Pranowo Hospital', 'Ds. Hasanuddin No. 676, DKI Jakarta', 2, 15),
(2, 1, 'Halimah Hospital', 'Kpg. Yoga No. 60, DKI Jakarta', 1, 15),
(3, 1, 'Wulandari Hospital', 'Jr. Adisucipto No. 210, DKI Jakarta', 2, 15),
(4, 1, 'Maulana Hospital', 'Psr. Suprapto No. 991, DKI Jakarta', 3, 15),
(5, 1, 'Hartati Hospital', 'Dk. Bagonwoto  No. 389, DKI Jakarta', 2, 15),
(6, 2, 'Aryani Hospital', 'Jr. Juanda No. 16, DKI Jakarta', 3, 15),
(7, 2, 'Dabukke Hospital', 'Jln. Ciwastra No. 12, DKI Jakarta', 3, 15),
(8, 2, 'Hutasoit Hospital', 'Kpg. Jaksa No. 737, DKI Jakarta', 3, 15),
(9, 2, 'Saefullah Hospital', 'Kpg. Bayan No. 527, DKI Jakarta', 2, 15),
(10, 2, 'Suryatmi Hospital', 'Jln. Raya Ujungberung No. 103, DKI Jakarta', 1, 15),
(11, 3, 'Mangunsong Hospital', 'Psr. Kiaracondong No. 711, West Java', 2, 15),
(12, 3, 'Simbolon Hospital', 'Gg. Bakhita No. 398, West Java', 3, 15),
(13, 3, 'Wijaya Hospital', 'Jln. Cemara No. 234, West Java', 1, 15),
(14, 3, 'Budiman Hospital', 'Jln. Thamrin No. 547, West Java', 1, 15),
(15, 3, 'Wasita Hospital', 'Dk. Bank Dagang Negara No. 373, West Java', 1, 15);

-- --------------------------------------------------------

--
-- Struktur dari tabel `spot_vaccines`
--

CREATE TABLE `spot_vaccines` (
  `id` bigint UNSIGNED NOT NULL,
  `spot_id` bigint UNSIGNED NOT NULL,
  `vaccine_id` bigint UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `spot_vaccines`
--

INSERT INTO `spot_vaccines` (`id`, `spot_id`, `vaccine_id`) VALUES
(1, 1, 2),
(2, 1, 4),
(3, 1, 5),
(4, 2, 2),
(5, 2, 4),
(6, 2, 5),
(7, 3, 1),
(8, 3, 3),
(9, 3, 5),
(10, 4, 2),
(11, 4, 4),
(12, 4, 5),
(13, 5, 1),
(14, 5, 2),
(15, 5, 5),
(16, 6, 1),
(17, 6, 2),
(18, 6, 5),
(19, 7, 2),
(20, 7, 4),
(21, 7, 5),
(22, 8, 1),
(23, 8, 2),
(24, 8, 5),
(25, 9, 1),
(26, 9, 3),
(27, 9, 4),
(28, 10, 2),
(29, 10, 4),
(30, 10, 5),
(31, 11, 1),
(32, 11, 3),
(33, 11, 4),
(34, 12, 1),
(35, 12, 3),
(36, 12, 4),
(37, 13, 1),
(38, 13, 2),
(39, 13, 3),
(40, 13, 4),
(41, 14, 1),
(42, 14, 3),
(43, 14, 5),
(44, 15, 1),
(45, 15, 3),
(46, 15, 4);

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` bigint UNSIGNED NOT NULL,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `username`, `password`) VALUES
(1, 'doctor2', '$2y$12$V0RJbYij1YeZbvJ4DbYOuuzHPOygZI6bd8D.FwgQpfvnfdl3k3SaC'),
(2, 'doctor3', '$2y$12$V0RJbYij1YeZbvJ4DbYOuuzHPOygZI6bd8D.FwgQpfvnfdl3k3SaC'),
(3, 'doctor4', '$2y$12$V0RJbYij1YeZbvJ4DbYOuuzHPOygZI6bd8D.FwgQpfvnfdl3k3SaC'),
(4, 'officer2', '$2y$12$V0RJbYij1YeZbvJ4DbYOuuzHPOygZI6bd8D.FwgQpfvnfdl3k3SaC'),
(5, 'officer3', '$2y$12$V0RJbYij1YeZbvJ4DbYOuuzHPOygZI6bd8D.FwgQpfvnfdl3k3SaC'),
(6, 'doctor5', '$2y$12$V0RJbYij1YeZbvJ4DbYOuuzHPOygZI6bd8D.FwgQpfvnfdl3k3SaC'),
(7, 'doctor6', '$2y$12$V0RJbYij1YeZbvJ4DbYOuuzHPOygZI6bd8D.FwgQpfvnfdl3k3SaC'),
(8, 'doctor7', '$2y$12$V0RJbYij1YeZbvJ4DbYOuuzHPOygZI6bd8D.FwgQpfvnfdl3k3SaC'),
(9, 'officer5', '$2y$12$V0RJbYij1YeZbvJ4DbYOuuzHPOygZI6bd8D.FwgQpfvnfdl3k3SaC'),
(10, 'officer6', '$2y$12$V0RJbYij1YeZbvJ4DbYOuuzHPOygZI6bd8D.FwgQpfvnfdl3k3SaC'),
(11, 'doctor8', '$2y$12$V0RJbYij1YeZbvJ4DbYOuuzHPOygZI6bd8D.FwgQpfvnfdl3k3SaC'),
(12, 'doctor9', '$2y$12$V0RJbYij1YeZbvJ4DbYOuuzHPOygZI6bd8D.FwgQpfvnfdl3k3SaC'),
(13, 'doctor10', '$2y$12$V0RJbYij1YeZbvJ4DbYOuuzHPOygZI6bd8D.FwgQpfvnfdl3k3SaC'),
(14, 'officer8', '$2y$12$V0RJbYij1YeZbvJ4DbYOuuzHPOygZI6bd8D.FwgQpfvnfdl3k3SaC'),
(15, 'officer9', '$2y$12$V0RJbYij1YeZbvJ4DbYOuuzHPOygZI6bd8D.FwgQpfvnfdl3k3SaC'),
(16, 'doctor11', '$2y$12$V0RJbYij1YeZbvJ4DbYOuuzHPOygZI6bd8D.FwgQpfvnfdl3k3SaC'),
(17, 'doctor12', '$2y$12$V0RJbYij1YeZbvJ4DbYOuuzHPOygZI6bd8D.FwgQpfvnfdl3k3SaC'),
(18, 'doctor13', '$2y$12$V0RJbYij1YeZbvJ4DbYOuuzHPOygZI6bd8D.FwgQpfvnfdl3k3SaC'),
(19, 'officer11', '$2y$12$V0RJbYij1YeZbvJ4DbYOuuzHPOygZI6bd8D.FwgQpfvnfdl3k3SaC'),
(20, 'officer12', '$2y$12$V0RJbYij1YeZbvJ4DbYOuuzHPOygZI6bd8D.FwgQpfvnfdl3k3SaC'),
(21, 'doctor14', '$2y$12$V0RJbYij1YeZbvJ4DbYOuuzHPOygZI6bd8D.FwgQpfvnfdl3k3SaC'),
(22, 'doctor15', '$2y$12$V0RJbYij1YeZbvJ4DbYOuuzHPOygZI6bd8D.FwgQpfvnfdl3k3SaC'),
(23, 'doctor16', '$2y$12$V0RJbYij1YeZbvJ4DbYOuuzHPOygZI6bd8D.FwgQpfvnfdl3k3SaC'),
(24, 'officer14', '$2y$12$V0RJbYij1YeZbvJ4DbYOuuzHPOygZI6bd8D.FwgQpfvnfdl3k3SaC'),
(25, 'officer15', '$2y$12$V0RJbYij1YeZbvJ4DbYOuuzHPOygZI6bd8D.FwgQpfvnfdl3k3SaC'),
(26, 'doctor17', '$2y$12$V0RJbYij1YeZbvJ4DbYOuuzHPOygZI6bd8D.FwgQpfvnfdl3k3SaC'),
(27, 'doctor18', '$2y$12$V0RJbYij1YeZbvJ4DbYOuuzHPOygZI6bd8D.FwgQpfvnfdl3k3SaC'),
(28, 'doctor19', '$2y$12$V0RJbYij1YeZbvJ4DbYOuuzHPOygZI6bd8D.FwgQpfvnfdl3k3SaC'),
(29, 'officer17', '$2y$12$V0RJbYij1YeZbvJ4DbYOuuzHPOygZI6bd8D.FwgQpfvnfdl3k3SaC'),
(30, 'officer18', '$2y$12$V0RJbYij1YeZbvJ4DbYOuuzHPOygZI6bd8D.FwgQpfvnfdl3k3SaC'),
(31, 'doctor20', '$2y$12$V0RJbYij1YeZbvJ4DbYOuuzHPOygZI6bd8D.FwgQpfvnfdl3k3SaC'),
(32, 'doctor21', '$2y$12$V0RJbYij1YeZbvJ4DbYOuuzHPOygZI6bd8D.FwgQpfvnfdl3k3SaC'),
(33, 'doctor22', '$2y$12$V0RJbYij1YeZbvJ4DbYOuuzHPOygZI6bd8D.FwgQpfvnfdl3k3SaC'),
(34, 'officer20', '$2y$12$V0RJbYij1YeZbvJ4DbYOuuzHPOygZI6bd8D.FwgQpfvnfdl3k3SaC'),
(35, 'officer21', '$2y$12$V0RJbYij1YeZbvJ4DbYOuuzHPOygZI6bd8D.FwgQpfvnfdl3k3SaC'),
(36, 'doctor23', '$2y$12$V0RJbYij1YeZbvJ4DbYOuuzHPOygZI6bd8D.FwgQpfvnfdl3k3SaC'),
(37, 'doctor24', '$2y$12$V0RJbYij1YeZbvJ4DbYOuuzHPOygZI6bd8D.FwgQpfvnfdl3k3SaC'),
(38, 'doctor25', '$2y$12$V0RJbYij1YeZbvJ4DbYOuuzHPOygZI6bd8D.FwgQpfvnfdl3k3SaC'),
(39, 'officer23', '$2y$12$V0RJbYij1YeZbvJ4DbYOuuzHPOygZI6bd8D.FwgQpfvnfdl3k3SaC'),
(40, 'officer24', '$2y$12$V0RJbYij1YeZbvJ4DbYOuuzHPOygZI6bd8D.FwgQpfvnfdl3k3SaC'),
(41, 'doctor26', '$2y$12$V0RJbYij1YeZbvJ4DbYOuuzHPOygZI6bd8D.FwgQpfvnfdl3k3SaC'),
(42, 'doctor27', '$2y$12$V0RJbYij1YeZbvJ4DbYOuuzHPOygZI6bd8D.FwgQpfvnfdl3k3SaC'),
(43, 'doctor28', '$2y$12$V0RJbYij1YeZbvJ4DbYOuuzHPOygZI6bd8D.FwgQpfvnfdl3k3SaC'),
(44, 'officer26', '$2y$12$V0RJbYij1YeZbvJ4DbYOuuzHPOygZI6bd8D.FwgQpfvnfdl3k3SaC'),
(45, 'officer27', '$2y$12$V0RJbYij1YeZbvJ4DbYOuuzHPOygZI6bd8D.FwgQpfvnfdl3k3SaC'),
(46, 'doctor29', '$2y$12$V0RJbYij1YeZbvJ4DbYOuuzHPOygZI6bd8D.FwgQpfvnfdl3k3SaC'),
(47, 'doctor30', '$2y$12$V0RJbYij1YeZbvJ4DbYOuuzHPOygZI6bd8D.FwgQpfvnfdl3k3SaC'),
(48, 'doctor31', '$2y$12$V0RJbYij1YeZbvJ4DbYOuuzHPOygZI6bd8D.FwgQpfvnfdl3k3SaC'),
(49, 'officer29', '$2y$12$V0RJbYij1YeZbvJ4DbYOuuzHPOygZI6bd8D.FwgQpfvnfdl3k3SaC'),
(50, 'officer30', '$2y$12$V0RJbYij1YeZbvJ4DbYOuuzHPOygZI6bd8D.FwgQpfvnfdl3k3SaC'),
(51, 'doctor32', '$2y$12$V0RJbYij1YeZbvJ4DbYOuuzHPOygZI6bd8D.FwgQpfvnfdl3k3SaC'),
(52, 'doctor33', '$2y$12$V0RJbYij1YeZbvJ4DbYOuuzHPOygZI6bd8D.FwgQpfvnfdl3k3SaC'),
(53, 'doctor34', '$2y$12$V0RJbYij1YeZbvJ4DbYOuuzHPOygZI6bd8D.FwgQpfvnfdl3k3SaC'),
(54, 'officer32', '$2y$12$V0RJbYij1YeZbvJ4DbYOuuzHPOygZI6bd8D.FwgQpfvnfdl3k3SaC'),
(55, 'officer33', '$2y$12$V0RJbYij1YeZbvJ4DbYOuuzHPOygZI6bd8D.FwgQpfvnfdl3k3SaC'),
(56, 'doctor35', '$2y$12$V0RJbYij1YeZbvJ4DbYOuuzHPOygZI6bd8D.FwgQpfvnfdl3k3SaC'),
(57, 'doctor36', '$2y$12$V0RJbYij1YeZbvJ4DbYOuuzHPOygZI6bd8D.FwgQpfvnfdl3k3SaC'),
(58, 'doctor37', '$2y$12$V0RJbYij1YeZbvJ4DbYOuuzHPOygZI6bd8D.FwgQpfvnfdl3k3SaC'),
(59, 'officer35', '$2y$12$V0RJbYij1YeZbvJ4DbYOuuzHPOygZI6bd8D.FwgQpfvnfdl3k3SaC'),
(60, 'officer36', '$2y$12$V0RJbYij1YeZbvJ4DbYOuuzHPOygZI6bd8D.FwgQpfvnfdl3k3SaC'),
(61, 'doctor38', '$2y$12$V0RJbYij1YeZbvJ4DbYOuuzHPOygZI6bd8D.FwgQpfvnfdl3k3SaC'),
(62, 'doctor39', '$2y$12$V0RJbYij1YeZbvJ4DbYOuuzHPOygZI6bd8D.FwgQpfvnfdl3k3SaC'),
(63, 'doctor40', '$2y$12$V0RJbYij1YeZbvJ4DbYOuuzHPOygZI6bd8D.FwgQpfvnfdl3k3SaC'),
(64, 'officer38', '$2y$12$V0RJbYij1YeZbvJ4DbYOuuzHPOygZI6bd8D.FwgQpfvnfdl3k3SaC'),
(65, 'officer39', '$2y$12$V0RJbYij1YeZbvJ4DbYOuuzHPOygZI6bd8D.FwgQpfvnfdl3k3SaC'),
(66, 'doctor41', '$2y$12$V0RJbYij1YeZbvJ4DbYOuuzHPOygZI6bd8D.FwgQpfvnfdl3k3SaC'),
(67, 'doctor42', '$2y$12$V0RJbYij1YeZbvJ4DbYOuuzHPOygZI6bd8D.FwgQpfvnfdl3k3SaC'),
(68, 'doctor43', '$2y$12$V0RJbYij1YeZbvJ4DbYOuuzHPOygZI6bd8D.FwgQpfvnfdl3k3SaC'),
(69, 'officer41', '$2y$12$V0RJbYij1YeZbvJ4DbYOuuzHPOygZI6bd8D.FwgQpfvnfdl3k3SaC'),
(70, 'officer42', '$2y$12$V0RJbYij1YeZbvJ4DbYOuuzHPOygZI6bd8D.FwgQpfvnfdl3k3SaC'),
(71, 'doctor44', '$2y$12$V0RJbYij1YeZbvJ4DbYOuuzHPOygZI6bd8D.FwgQpfvnfdl3k3SaC'),
(72, 'doctor45', '$2y$12$V0RJbYij1YeZbvJ4DbYOuuzHPOygZI6bd8D.FwgQpfvnfdl3k3SaC'),
(73, 'doctor46', '$2y$12$V0RJbYij1YeZbvJ4DbYOuuzHPOygZI6bd8D.FwgQpfvnfdl3k3SaC'),
(74, 'officer44', '$2y$12$V0RJbYij1YeZbvJ4DbYOuuzHPOygZI6bd8D.FwgQpfvnfdl3k3SaC'),
(75, 'officer45', '$2y$12$V0RJbYij1YeZbvJ4DbYOuuzHPOygZI6bd8D.FwgQpfvnfdl3k3SaC');

-- --------------------------------------------------------

--
-- Struktur dari tabel `vaccinations`
--

CREATE TABLE `vaccinations` (
  `id` bigint UNSIGNED NOT NULL,
  `dose` tinyint NOT NULL DEFAULT '1',
  `date` date NOT NULL,
  `society_id` bigint UNSIGNED NOT NULL,
  `spot_id` bigint UNSIGNED DEFAULT NULL,
  `vaccine_id` bigint UNSIGNED DEFAULT NULL,
  `doctor_id` bigint UNSIGNED DEFAULT NULL,
  `officer_id` bigint UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `vaccinations`
--

INSERT INTO `vaccinations` (`id`, `dose`, `date`, `society_id`, `spot_id`, `vaccine_id`, `doctor_id`, `officer_id`) VALUES
(2, 1, '2021-10-25', 8, 5, NULL, NULL, NULL),
(3, 1, '2021-09-01', 9, 3, 1, 23, 10),
(4, 1, '2021-09-01', 10, 4, 5, 21, 15),
(5, 1, '2021-09-01', 11, 4, 5, 16, 25),
(6, 2, '2021-10-27', 11, 5, 2, 1, 24),
(7, 1, '2021-09-01', 12, 5, 1, 8, 24),
(8, 2, '2021-10-27', 12, 2, NULL, NULL, NULL),
(9, 1, '2021-09-01', 13, 1, 5, 2, 14),
(10, 2, '2021-10-27', 13, 4, 1, 1, 15),
(11, 1, '2021-09-01', 14, 3, 5, 21, 15),
(12, 2, '2021-10-27', 14, 3, 1, 22, 15),
(13, 1, '2021-10-25', 22, 7, NULL, NULL, NULL),
(14, 1, '2021-10-25', 23, 9, NULL, NULL, NULL),
(15, 1, '2021-09-01', 24, 9, 3, 46, 50),
(16, 1, '2021-09-01', 25, 8, 5, 28, 40),
(17, 1, '2021-09-01', 26, 6, 5, 31, 29),
(18, 2, '2021-10-27', 26, 8, NULL, NULL, NULL),
(19, 1, '2021-09-01', 27, 6, 2, 38, 39),
(20, 2, '2021-10-27', 27, 8, NULL, NULL, NULL),
(21, 1, '2021-09-01', 28, 8, 2, 48, 44),
(22, 2, '2021-10-27', 28, 6, 5, 46, 44),
(23, 1, '2021-09-01', 29, 10, 3, 38, 30),
(24, 2, '2021-10-27', 29, 9, 2, 37, 30),
(25, 1, '2021-10-25', 37, 13, NULL, NULL, NULL),
(26, 1, '2021-10-25', 38, 15, NULL, NULL, NULL),
(27, 1, '2021-09-01', 39, 11, 4, 72, 59),
(28, 1, '2021-09-01', 40, 12, 2, 62, 59),
(29, 1, '2021-09-01', 41, 15, 1, 56, 70),
(30, 2, '2021-10-27', 41, 15, NULL, NULL, NULL),
(31, 1, '2021-09-01', 42, 12, 2, 66, 54),
(32, 2, '2021-10-27', 42, 15, NULL, NULL, NULL),
(33, 1, '2021-09-01', 43, 13, 3, 52, 65),
(34, 2, '2021-10-27', 43, 14, 4, 52, 64),
(35, 1, '2021-09-01', 44, 13, 3, 52, 54),
(36, 2, '2021-10-27', 44, 14, 4, 53, 54),
(85, 1, '2021-06-08', 7, 4, 2, 13, 19),
(86, 2, '2021-09-01', 7, 3, 5, 1, 14);

-- --------------------------------------------------------

--
-- Struktur dari tabel `vaccines`
--

CREATE TABLE `vaccines` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `vaccines`
--

INSERT INTO `vaccines` (`id`, `name`) VALUES
(1, 'Sinovac'),
(2, 'AstraZeneca'),
(3, 'Moderna'),
(4, 'Pfizer'),
(5, 'Sinnopharm');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indeks untuk tabel `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indeks untuk tabel `consultations`
--
ALTER TABLE `consultations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `consultations_society_id_foreign` (`society_id`),
  ADD KEY `consultations_doctor_id_foreign` (`doctor_id`);

--
-- Indeks untuk tabel `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indeks untuk tabel `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indeks untuk tabel `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `medicals`
--
ALTER TABLE `medicals`
  ADD PRIMARY KEY (`id`),
  ADD KEY `medicals_spot_id_foreign` (`spot_id`),
  ADD KEY `medicals_user_id_foreign` (`user_id`);

--
-- Indeks untuk tabel `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indeks untuk tabel `regionals`
--
ALTER TABLE `regionals`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indeks untuk tabel `societies`
--
ALTER TABLE `societies`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `societies_id_card_number_unique` (`id_card_number`),
  ADD KEY `societies_regional_id_foreign` (`regional_id`);

--
-- Indeks untuk tabel `spots`
--
ALTER TABLE `spots`
  ADD PRIMARY KEY (`id`),
  ADD KEY `spots_regional_id_foreign` (`regional_id`);

--
-- Indeks untuk tabel `spot_vaccines`
--
ALTER TABLE `spot_vaccines`
  ADD PRIMARY KEY (`id`),
  ADD KEY `spot_vaccines_spot_id_foreign` (`spot_id`),
  ADD KEY `spot_vaccines_vaccine_id_foreign` (`vaccine_id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_username_unique` (`username`);

--
-- Indeks untuk tabel `vaccinations`
--
ALTER TABLE `vaccinations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `vaccinations_society_id_foreign` (`society_id`),
  ADD KEY `vaccinations_spot_id_foreign` (`spot_id`),
  ADD KEY `vaccinations_vaccine_id_foreign` (`vaccine_id`),
  ADD KEY `vaccinations_doctor_id_foreign` (`doctor_id`),
  ADD KEY `vaccinations_officer_id_foreign` (`officer_id`);

--
-- Indeks untuk tabel `vaccines`
--
ALTER TABLE `vaccines`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `consultations`
--
ALTER TABLE `consultations`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT untuk tabel `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `medicals`
--
ALTER TABLE `medicals`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;

--
-- AUTO_INCREMENT untuk tabel `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT untuk tabel `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=83;

--
-- AUTO_INCREMENT untuk tabel `regionals`
--
ALTER TABLE `regionals`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `societies`
--
ALTER TABLE `societies`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT untuk tabel `spots`
--
ALTER TABLE `spots`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT untuk tabel `spot_vaccines`
--
ALTER TABLE `spot_vaccines`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;

--
-- AUTO_INCREMENT untuk tabel `vaccinations`
--
ALTER TABLE `vaccinations`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=87;

--
-- AUTO_INCREMENT untuk tabel `vaccines`
--
ALTER TABLE `vaccines`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `consultations`
--
ALTER TABLE `consultations`
  ADD CONSTRAINT `consultations_doctor_id_foreign` FOREIGN KEY (`doctor_id`) REFERENCES `medicals` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `consultations_society_id_foreign` FOREIGN KEY (`society_id`) REFERENCES `societies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `medicals`
--
ALTER TABLE `medicals`
  ADD CONSTRAINT `medicals_spot_id_foreign` FOREIGN KEY (`spot_id`) REFERENCES `spots` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `medicals_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `societies`
--
ALTER TABLE `societies`
  ADD CONSTRAINT `societies_regional_id_foreign` FOREIGN KEY (`regional_id`) REFERENCES `regionals` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `spots`
--
ALTER TABLE `spots`
  ADD CONSTRAINT `spots_regional_id_foreign` FOREIGN KEY (`regional_id`) REFERENCES `regionals` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `spot_vaccines`
--
ALTER TABLE `spot_vaccines`
  ADD CONSTRAINT `spot_vaccines_spot_id_foreign` FOREIGN KEY (`spot_id`) REFERENCES `spots` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `spot_vaccines_vaccine_id_foreign` FOREIGN KEY (`vaccine_id`) REFERENCES `vaccines` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `vaccinations`
--
ALTER TABLE `vaccinations`
  ADD CONSTRAINT `vaccinations_doctor_id_foreign` FOREIGN KEY (`doctor_id`) REFERENCES `medicals` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `vaccinations_officer_id_foreign` FOREIGN KEY (`officer_id`) REFERENCES `medicals` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `vaccinations_society_id_foreign` FOREIGN KEY (`society_id`) REFERENCES `societies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `vaccinations_spot_id_foreign` FOREIGN KEY (`spot_id`) REFERENCES `spots` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `vaccinations_vaccine_id_foreign` FOREIGN KEY (`vaccine_id`) REFERENCES `vaccines` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
