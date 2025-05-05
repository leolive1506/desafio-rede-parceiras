<p align="center">
    <img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/ec559a9f6bfd399b82bb44393651661b08aaf7ba/icons/folder-markdown-open.svg" align="center" width="30%">
</p>
<p align="center"><h1 align="center">Technical Test Rede Parceiras</h1></p>
<p align="center">
	<img src="https://img.shields.io/github/last-commit/leolive1506/desafio-rede-parceiras?style=default&logo=git&logoColor=white&color=0080ff" alt="last-commit">
	<img src="https://img.shields.io/github/languages/top/leolive1506/desafio-rede-parceiras?style=default&color=0080ff" alt="repo-top-language">
	<img src="https://img.shields.io/github/languages/count/leolive1506/desafio-rede-parceiras?style=default&color=0080ff" alt="repo-language-count">
</p>
<p align="center"><!-- default option, no dependency badges. -->
</p>
<p align="center">
	<!-- default option, no dependency badges. -->
</p>
<br>

##  Table of Contents

- [ Getting Started](#getting-started)
  - [ Prerequisites](#prerequisites)
  - [ Installation](#installation)
  - [ Usage](#usage)
  - [ Testing](#testing)
---

##  Getting Started

###  Prerequisites

Before getting started with desafio-rede-parceiras, ensure your runtime environment meets the following requirements:

- **Programming Language:** PHP 8.4
- **Programming Language:** Node 22.14.0
- **Package Manager:** Composer
- **Container Runtime:** Docker

###  Installation

Install desafio-rede-parceiras using one of the following methods:

**Build from source:**

1. Clone the desafio-rede-parceiras repository:
```sh
❯ git clone https://github.com/leolive1506/desafio-rede-parceiras
```

2. Navigate to the project directory:
```sh
❯ cd desafio-rede-parceiras
```

3. Install the project dependencies:

```sh
❯ composer install
```
```sh
❯ npm install
```

###  Usage

```sh
❯ cp .env.example .env
```

Run desafio-rede-parceiras using the following command:
**Using `docker`** &nbsp; [<img align="center" src="https://img.shields.io/badge/Docker-2CA5E0.svg?style={badge_style}&logo=docker&logoColor=white" />](https://www.docker.com/)

```sh
❯ php artisan key:generate
```

```sh
❯ ./vendor/bin/sail up -d
```

```sh
❯ ./vendor/bin/sail artisan migrate --seed
```

After running the seed command, initial data will be populated into the database, including:

- Product categories
- Products
- Users with different permission levels:

  - `user@gmail.com` &nbsp;|&nbsp; **Role:** `user`
  - `operator@gmail.com` &nbsp;|&nbsp; **Role:** `operator`
  - `admin@gmail.com` &nbsp;|&nbsp; **Role:** `admin`

The default password for all seeded users is `password`.

###  Testing
Run the test suite using the following command:

```sh
❯ ./vendor/bin/sail pest --parallel
```
---


## API Routes

See Insomnia file in `docs/Insomnia_2025-05-05.yaml`

### 🔐 Auth

---

### `POST /api/v1/login`

**Body**

```json
{
  "email": "admin@admin.com",
  "password": "password"
}
```

---

### `POST /api/v1/logout`

**Headers**

```text
Authorization: Bearer {token}
```

---

### `GET /api/v1/me`

**Headers**

```text
Authorization: Bearer {token}
```

---

### 📦 Products

---

### `GET /api/v1/v1/products/{product}/stock`

**Headers**

```text
Authorization: Bearer {token}
```
