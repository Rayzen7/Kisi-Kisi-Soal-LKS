-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Waktu pembuatan: 15 Apr 2025 pada 23.47
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
-- Database: `lks_jt1_2025`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint UNSIGNED NOT NULL,
  `reserved_at` int UNSIGNED DEFAULT NULL,
  `available_at` int UNSIGNED NOT NULL,
  `created_at` int UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext,
  `cancelled_at` int DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `migrations`
--

CREATE TABLE `migrations` (
  `id` int UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data untuk tabel `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(11, '0001_01_01_000000_create_users_table', 1),
(12, '0001_01_01_000001_create_cache_table', 1),
(13, '0001_01_01_000002_create_jobs_table', 1),
(14, '2025_04_11_034210_create_personal_access_tokens_table', 1),
(15, '2025_04_11_034257_create_simrs_users_table', 1),
(16, '2025_04_11_041703_create_simrs_polikliniks_table', 2),
(17, '2025_04_11_062028_create_simrs_doctors_table', 3),
(18, '2025_04_11_065312_create_simrs_schedules_table', 4);

-- --------------------------------------------------------

--
-- Struktur dari tabel `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text,
  `payload` longtext NOT NULL,
  `last_activity` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data untuk tabel `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('9OXRFgfVYJM7TDNRMsGy46SQxEO6iSedMN4XAd9x', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoibDVwQjAySUlxSXFCU1BEUTFad1FBbU5aZFVTT0xUc3pmU21zdnJEbSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1744713937);

-- --------------------------------------------------------

--
-- Struktur dari tabel `simrs_doctors`
--

CREATE TABLE `simrs_doctors` (
  `doctor_id` varchar(15) NOT NULL,
  `doctor_name` varchar(255) NOT NULL,
  `doctor_gender` enum('M','F') NOT NULL,
  `doctor_phone_number` varchar(20) NOT NULL,
  `doctor_address` varchar(255) NOT NULL,
  `doctor_email` varchar(255) NOT NULL,
  `doctor_bio` text,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data untuk tabel `simrs_doctors`
--

INSERT INTO `simrs_doctors` (`doctor_id`, `doctor_name`, `doctor_gender`, `doctor_phone_number`, `doctor_address`, `doctor_email`, `doctor_bio`, `created_at`, `updated_at`) VALUES
('2562328', 'Fulan', 'M', '0812619271', 'Jl Menara Jaya', 'fulan@gmail.com', NULL, '2025-04-11 00:32:44', '2025-04-11 00:32:44'),
('3800915', 'Bayu', 'M', '08127182711', 'Jl Haji Yudar', 'bayu@gmail.com', 'This is Bayu', '2025-04-15 09:09:02', '2025-04-15 09:09:02');

-- --------------------------------------------------------

--
-- Struktur dari tabel `simrs_poliklinik`
--

CREATE TABLE `simrs_poliklinik` (
  `pol_id` varchar(10) NOT NULL,
  `pol_name` varchar(255) NOT NULL,
  `pol_description` text,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data untuk tabel `simrs_poliklinik`
--

INSERT INTO `simrs_poliklinik` (`pol_id`, `pol_name`, `pol_description`, `created_at`, `updated_at`) VALUES
('10940422', 'Poli Umum', 'Poli Umum Terbaik di Jakarta', '2025-04-15 09:33:45', '2025-04-15 09:33:45'),
('38733866', 'Poli Gigi', NULL, '2025-04-10 23:18:18', '2025-04-10 23:18:18'),
('64053532', 'Poli Mata', NULL, '2025-04-15 09:35:41', '2025-04-15 09:35:41');

-- --------------------------------------------------------

--
-- Struktur dari tabel `simrs_schedules`
--

CREATE TABLE `simrs_schedules` (
  `schedule_id` bigint UNSIGNED NOT NULL,
  `doctor_id` varchar(15) NOT NULL,
  `pol_id` varchar(10) NOT NULL,
  `schedule_date` date NOT NULL,
  `schedule_start` time NOT NULL,
  `schedule_end` time NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data untuk tabel `simrs_schedules`
--

INSERT INTO `simrs_schedules` (`schedule_id`, `doctor_id`, `pol_id`, `schedule_date`, `schedule_start`, `schedule_end`, `created_at`, `updated_at`) VALUES
(3, '2562328', '38733866', '2025-04-16', '06:00:00', '20:00:00', '2025-04-11 00:41:32', '2025-04-15 10:14:21'),
(5, '3800915', '10940422', '2025-04-16', '09:00:00', '12:00:00', '2025-04-15 10:16:32', '2025-04-15 10:16:32');

-- --------------------------------------------------------

--
-- Struktur dari tabel `simrs_users`
--

CREATE TABLE `simrs_users` (
  `user_id` bigint UNSIGNED NOT NULL,
  `user_username` varchar(255) NOT NULL,
  `user_full_name` varchar(255) NOT NULL,
  `user_password` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data untuk tabel `simrs_users`
--

INSERT INTO `simrs_users` (`user_id`, `user_username`, `user_full_name`, `user_password`, `created_at`, `updated_at`) VALUES
(1, 'Admin', 'Budiman', '$2y$12$DLYksu0veUfgmMyyFpPZ5ejxu3DWI50UbQlgFrBTIjoHbusaK/9Ia', '2025-04-10 20:58:23', '2025-04-10 20:58:23'),
(2, 'Admin1', 'Farhan', '$2y$12$eNlWz4N.6aTwtj1.diUYfuyGHWxj6s0BoflD56FPQ2jEWcobe0SWC', '2025-04-15 10:22:03', '2025-04-15 10:22:03');

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
-- Indeks untuk tabel `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indeks untuk tabel `simrs_doctors`
--
ALTER TABLE `simrs_doctors`
  ADD PRIMARY KEY (`doctor_id`);

--
-- Indeks untuk tabel `simrs_poliklinik`
--
ALTER TABLE `simrs_poliklinik`
  ADD PRIMARY KEY (`pol_id`);

--
-- Indeks untuk tabel `simrs_schedules`
--
ALTER TABLE `simrs_schedules`
  ADD PRIMARY KEY (`schedule_id`),
  ADD KEY `simrs_schedules_doctor_id_foreign` (`doctor_id`),
  ADD KEY `simrs_schedules_pol_id_foreign` (`pol_id`);

--
-- Indeks untuk tabel `simrs_users`
--
ALTER TABLE `simrs_users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

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
-- AUTO_INCREMENT untuk tabel `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT untuk tabel `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT untuk tabel `simrs_schedules`
--
ALTER TABLE `simrs_schedules`
  MODIFY `schedule_id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT untuk tabel `simrs_users`
--
ALTER TABLE `simrs_users`
  MODIFY `user_id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `simrs_schedules`
--
ALTER TABLE `simrs_schedules`
  ADD CONSTRAINT `simrs_schedules_doctor_id_foreign` FOREIGN KEY (`doctor_id`) REFERENCES `simrs_doctors` (`doctor_id`) ON DELETE RESTRICT,
  ADD CONSTRAINT `simrs_schedules_pol_id_foreign` FOREIGN KEY (`pol_id`) REFERENCES `simrs_poliklinik` (`pol_id`) ON DELETE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
