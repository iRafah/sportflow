# ⚽ SportFlow

> Track Smart. Sell Better.

SportFlow is a performance-driven sales management system built for tracking sports clothing sales, clients, revenue, and installment payments.

It provides a modern SaaS-style dashboard with real-time insights, clean UX, and scalable architecture.

---

## 🚀 Tech Stack

### Backend
- Laravel
- PostgreSQL
- Eloquent ORM
- Service Layer Architecture

### Frontend
- React (via Inertia.js)
- Tailwind CSS
- Shadcn/ui
- Sonner (toast notifications)
- Recharts (analytics & charts)

---

## ✨ Features

### 🔐 Authentication
- Single-admin login system
- Session-based authentication
- Protected routes

### 🧾 Sales Management
- Create / Edit / Delete sales (modal-based)
- Installment tracking
- Payment status (Pago / Pendente)
- Smart pagination
- Linked to clients

### 👥 Client Management
- Create / Edit / Delete clients (modal-based)
- Searchable client list (case-insensitive)
- Shadcn Combobox for client selection

### 📊 Performance Dashboard
- Monthly Revenue
- Monthly Growth %
- Average Sale Value
- Revenue Trend Chart
- Paid vs Pending Donut Chart
- Top 5 Clients by Revenue

### 🔔 UX Enhancements
- Modal-driven CRUD
- Sonner toast notifications
- Responsive sidebar navigation
- Modern SaaS-style UI

---

## 🛠 Installation

### 1️⃣ Clone the repository

```bash
git clone https://github.com/iRafah/sportflow.git
cd sportflow
```

### 2️⃣ Install backend dependencies
```bash
composer install
```

### 3️⃣ Install frontend dependencies
```bash
npm install
```

### 4️⃣ Configure environment
Copy `.env.example`
```bash
cp .env.example .env
```

- Update database configuration:
```bash
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=sportflow
DB_USERNAME=postgres
DB_PASSWORD=yourpassword
```

- Generate key
```bash
php artisan key:generate
```

### 5️⃣ Run migrations
```bash
php artisan migrate
```

### 6️⃣ Create Admin User
```bash
php artisan tinker

use App\Models\User;
use Illuminate\Support\Facades\Hash;

User::create([
    'name' => 'Admin',
    'email' => 'your@email.com',
    'password' => Hash::make('yourpassword'),
]);
```

### 7️⃣ Run the project
```bash
php artisan serve
npm run dev
```

- Access:

`http://localhost:8000`