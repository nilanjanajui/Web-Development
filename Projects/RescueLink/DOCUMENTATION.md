# 🛟 RescueLink — Comprehensive System & Page Documentation

Welcome to the central technical documentation for **RescueLink**, an end-to-end disaster relief coordination system connecting volunteers, relief managers, and administrative oversight in real time.

---

## 📋 Table of Contents

1. [System Architecture Overview](#1-system-architecture-overview)
2. [Authentication & Role-Based Access Control (RBAC)](#2-authentication--role-based-access-control-rbac)
3. [Page-by-Page Operational Guide (All 17 Pages)](#3-page-by-page-operational-guide-all-17-pages)
   - [Public Pages](#public-pages)
     - [1. Landing / Home Page (`/`)](#1-landing--home-page-)
     - [2. Explore Missions (`/explore`)](#2-explore-missions-explore)
     - [3. Mission Details (`/missions/[id]`)](#3-mission-details-missionsid)
     - [4. Login Page (`/login`)](#4-login-page-login)
     - [5. Register Page (`/register`)](#5-register-page-register)
     - [6. About Us (`/about`)](#6-about-us-about)
     - [7. Contact Us (`/contact`)](#7-contact-us-contact)
     - [8. Privacy Policy (`/privacy-policy`)](#8-privacy-policy-privacy-policy)
     - [9. Terms of Service (`/terms-of-service`)](#9-terms-of-service-terms-of-service)
     - [10. Disaster Preparedness Manuals (`/resources/disaster-manuals`)](#10-disaster-preparedness-manuals-resourcesdisaster-manuals)
     - [11. Impact Reports (`/resources/impact-reports`)](#11-impact-reports-resourcesimpact-reports)
     - [12. Press Kit (`/resources/press-kit`)](#12-press-kit-resourcespress-kit)
     - [13. Success Stories (`/resources/success-stories`)](#13-success-stories-resourcessuccess-stories)
   - [Protected Pages](#protected-pages)
     - [14. Dashboard (`/dashboard`)](#14-dashboard-dashboard)
     - [15. Add New Mission (`/missions/add`)](#15-add-new-mission-missionsadd)
     - [16. Manage Missions (`/missions/manage`)](#16-manage-missions-missionsmanage)
     - [17. User Profile (`/profile`)](#17-user-profile-profile)
4. [Backend API Reference & Routes](#4-backend-api-reference--routes)
5. [Database Schemas & Data Models](#5-database-schemas--data-models)
6. [Seeding & Deployment Procedures](#6-seeding--deployment-procedures)
7. [AI Recommendation Engine (Groq AI & Adzuna Integration)](#7-ai-recommendation-engine-groq-ai--adzuna-integration)

---

## 1. System Architecture Overview

RescueLink is built using a modern full-stack decoupled architecture:

```
                          ┌─────────────────────────────┐
                          │   Next.js 15 App Router     │
                          │   (TypeScript / Tailwind)   │
                          └──────────────┬──────────────┘
                                         │
                                         │ REST APIs (JSON / JWT / CORS)
                                         ▼
                          ┌─────────────────────────────┐
                          │     Express.js API Server   │
                          │   (TypeScript Controllers)  │
                          └──────────────┬──────────────┘
                                         │
                                         │ Mongoose ODM
                                         ▼
                          ┌─────────────────────────────┐
                          │       MongoDB Database      │
                          │   (Missions, Signups, etc)  │
                          └─────────────────────────────┘
```

- **Frontend Client (`rescuelink-client`)**: Next.js 15 using App Router, TypeScript, Tailwind CSS, custom UI components, and Better Auth client integration for user sessions.
- **Backend API Server (`rescuelink-server`)**: Express.js server providing RESTful endpoints, JWT verification middleware, role-based authorization, and MongoDB persistence via Mongoose.

---

## 2. Authentication & Role-Based Access Control (RBAC)

RescueLink implements three distinct user roles:

1. **User** (`role: user`):
   - Can view all public pages and missions.
   - Can join active relief missions.
   - Can post and manage their own relief missions.
   - Access to personal Dashboard and Profile.
2. **Admin** (`role: admin`):
   - All permissions of a User.
   - Access to platform-wide statistics on the Dashboard.
   - Ability to view and manage all posted missions platform-wide (`/missions/admin/all`).
   - Access to the organization moderation/verification queue.
3. **Tenant** (`role: tenant`):
   - Restricted browse-only role.
   - Redirected away from mission creation, joining, or management operations.

**Route Protection Mechanism**:
- Protected frontend pages reside under `src/app/(protected)/` wrapped with `ProtectedRouteLayout.tsx`, which validates the session via `authClient.useSession()`. Unauthenticated users are automatically redirected to `/login`.

---

## 3. Page-by-Page Operational Guide (All 17 Pages)

Below is an exhaustive breakdown of every page in the RescueLink client application.

---

### Public Pages

#### 1. Landing / Home Page (`/`)
- **File**: [`src/app/(public)/page.tsx`](file:///home/nilanjana/Web%20Development/RescueLink/rescuelink-client/src/app/%28public%29/page.tsx)
- **Access Level**: Public (All visitors)
- **Purpose**: Introduces RescueLink to visitors, highlights active emergency missions, platform impact metrics, and encourages volunteer signup.
- **Key UI Sections**:
  - `Hero`: Prominent title, mission summary, call-to-action buttons ("Explore Missions", "Post a Mission").
  - `HowItWorks`: 3-step visual guide (Discover -> Join/Post -> Deliver Relief).
  - `FeaturedMissions`: Dynamic preview grid of top urgent active missions fetched from `/missions?sort=urgent&pageSize=3`.
  - `DisasterCategories`: Filterable tiles for disaster types (Floods, Earthquakes, Fires, Cyclones).
  - `ImpactStats`: Live counter of rescued individuals, active volunteers, and completed operations fetched from `/stats`.
  - `Testimonials`: Carousel of real volunteer and beneficiary quotes fetched from `/testimonials`.
  - `Partners`: Logos of partner relief organizations and NGOs.
  - `Newsletter`: Email subscription form posting to `/subscriber`.
- **User Actions**: Click call-to-action links, search disaster categories, subscribe to newsletters, navigate to detail pages.

---

#### 2. Explore Missions (`/explore`)
- **File**: [`src/app/(public)/explore/page.tsx`](file:///home/nilanjana/Web%20Development/RescueLink/rescuelink-client/src/app/%28public%29/explore/page.tsx)
- **Access Level**: Public
- **Purpose**: Master search and filtering interface for finding relief missions based on disaster type, urgency, location, or status.
- **Key Features & UI**:
  - **Text Search Input**: Real-time search with a 400ms debounce timer targeting location, title, or keywords.
  - **Filter Selectors**: Disaster Type (`flood`, `earthquake`, `fire`, `cyclone`), Urgency (`critical`, `moderate`, `low`), Status (`active`, `resolved`).
  - **Sorting Options**: Most Urgent, Most Recent, Most Volunteers Needed.
  - **View Mode Switcher**: Toggle between **Grid View** (`MissionCard` grid) and **Map View** (`MissionsMap` component).
  - **Pagination**: Numbered pagination with previous/next buttons and page count indicators.
  - **Skeleton Loaders**: Smooth loading states while fetching data.
- **API Endpoint**: `GET /missions?search=&disasterType=&urgency=&status=&sort=&page=&pageSize=`
- **User Actions**: Type search terms, filter by disaster/urgency, switch view modes, navigate pages.

---

#### 3. Mission Details (`/missions/[id]`)
- **File**: [`src/app/(public)/missions/[id]/page.tsx`](file:///home/nilanjana/Web%20Development/RescueLink/rescuelink-client/src/app/%28public%29/missions/%5Bid%5D/page.tsx)
- **Access Level**: Public (Viewing), Protected (Joining)
- **Purpose**: Full breakdown of a specific disaster relief mission, recruitment progress, real-time updates feed, and volunteer join action.
- **Key Features & UI**:
  - **Hero Header & Gallery**: Mission title, status badge, emergency alert bar, location, disaster tag, and high-resolution image gallery.
  - **Overview & Logistics**: Comprehensive mission requirements, needed skills, contact details, poster organization info.
  - **Live Recruitment Progress Bar**: Animated progress bar displaying `volunteersJoined` vs `volunteersNeeded`.
  - **Join Mission Modal & Button**: Triggers volunteer signup dialog requesting volunteer notes and contact confirmation. Interacts with `POST /volunteer/join`.
  - **Live Updates Timeline**: Chronological stream of field updates posted by relief coordinators, fetched from `/updates?missionId=`.
  - **Related Missions Grid**: Card grid of other active missions matching the current mission's disaster type.
- **API Endpoints**: `GET /missions/:id`, `GET /updates?missionId=:id`, `POST /volunteer/join`, `GET /volunteer/my-signups`.

---

#### 4. Login Page (`/login`)
- **File**: [`src/app/(public)/login/page.tsx`](file:///home/nilanjana/Web%20Development/RescueLink/rescuelink-client/src/app/%28public%29/login/page.tsx)
- **Access Level**: Public (Redirects to `/dashboard` if already logged in)
- **Purpose**: Authenticate existing users and provide instant demo access for platform testing.
- **Key Features & UI**:
  - **Email & Password Form**: Standard credentials authentication with client validation.
  - **Google Social Login**: One-click Google sign-in button via Better Auth client.
  - **Instant Demo Login Buttons**: "Demo User" and "Demo Admin" buttons for immediate automated session creation without manual typing.
  - **Error Toast/Alerts**: Visual alerts for invalid credentials or connection errors.
- **API Interacted**: Better Auth `/api/auth/sign-in/email` and `/api/auth/sign-in/social`.

---

#### 5. Register Page (`/register`)
- **File**: [`src/app/(public)/register/page.tsx`](file:///home/nilanjana/Web%20Development/RescueLink/rescuelink-client/src/app/%28public%29/register/page.tsx)
- **Access Level**: Public (Redirects to `/dashboard` if already logged in)
- **Purpose**: Onboard new volunteers, organization posters, and administrators.
- **Key Features & UI**:
  - **Form Fields**: Full Name, Email, Password, Confirm Password.
  - **Role Selection**: Radio buttons selecting `User`, `Admin`, or `Tenant`.
  - **Skill Checklist**: Multiselect checkboxes for volunteer capabilities (e.g., Medical Aid, Search & Rescue, Logistics, Cooking, Driving).
  - **Password Strength & Matching Validation**: Instant error display if passwords mismatch or do not meet criteria.
- **API Interacted**: Better Auth `/api/auth/sign-up/email`.

---

#### 6. About Us (`/about`)
- **File**: [`src/app/(public)/about/page.tsx`](file:///home/nilanjana/Web%20Development/RescueLink/rescuelink-client/src/app/%28public%29/about/page.tsx)
- **Access Level**: Public
- **Purpose**: Educates users on RescueLink's core mission, historical origins, operational values, and leadership team.
- **Key Features & UI**:
  - **Mission & Vision Banner**: Core values (Rapid Response, Transparency, Security, Community-Driven).
  - **Historical Timeline**: Key milestones in RescueLink's development and emergency relief history.
  - **Team & Advisory Grid**: Profile cards of disaster management advisors and lead developers.
  - **Impact Summary**: Overall platform reach figures.

---

#### 7. Contact Us (`/contact`)
- **File**: [`src/app/(public)/contact/page.tsx`](file:///home/nilanjana/Web%20Development/RescueLink/rescuelink-client/src/app/%28public%29/contact/page.tsx)
- **Access Level**: Public
- **Purpose**: Direct line for emergency inquiries, press communications, partnerships, and general support.
- **Key Features & UI**:
  - **Category Selector**: Choice of General Inquiry, Partnership, Media, or Urgent Field Support.
  - **Interactive Form**: Name, Email, Subject, Inquiry Category, Message.
  - **Emergency Notice Box**: Highlights hotlines for life-threatening emergencies.
  - **Submission Response Modal**: Visual feedback upon successful submission.
- **API Endpoint**: `POST /contact`

---

#### 8. Privacy Policy (`/privacy-policy`)
- **File**: [`src/app/(public)/privacy-policy/page.tsx`](file:///home/nilanjana/Web%20Development/RescueLink/rescuelink-client/src/app/%28public%29/privacy-policy/page.tsx)
- **Access Level**: Public
- **Purpose**: Explains user data collection, security practices, cookie compliance, and volunteer privacy protections.
- **Key Content**: Data storage standards (MongoDB encryption), session handling via Better Auth, cookie policies, third-party disclosure rules, and user deletion rights.

---

#### 9. Terms of Service (`/terms-of-service`)
- **File**: [`src/app/(public)/terms-of-service/page.tsx`](file:///home/nilanjana/Web%20Development/RescueLink/rescuelink-client/src/app/%28public%29/terms-of-service/page.tsx)
- **Access Level**: Public
- **Purpose**: Defines platform guidelines, code of conduct for volunteers, mission poster accountability, and liability limits.
- **Key Content**: Account eligibility, guidelines for verified postings, safety disclaimers for on-ground disaster operations.

---

#### 10. Disaster Preparedness Manuals (`/resources/disaster-manuals`)
- **File**: [`src/app/(public)/resources/disaster-manuals/page.tsx`](file:///home/nilanjana/Web%20Development/RescueLink/rescuelink-client/src/app/%28public%29/resources/disaster-manuals/page.tsx)
- **Access Level**: Public
- **Purpose**: Downloadable guides and action protocols for emergency readiness.
- **Key Features & UI**: Categorized accordion sections for Floods, Earthquakes, Fires, and Cyclones; downloadable PDF guides; downloadable emergency survival checklists.

---

#### 11. Impact Reports (`/resources/impact-reports`)
- **File**: [`src/app/(public)/resources/impact-reports/page.tsx`](file:///home/nilanjana/Web%20Development/RescueLink/rescuelink-client/src/app/%28public%29/resources/impact-reports/page.tsx)
- **Access Level**: Public
- **Purpose**: Transparent audit logs of platform operations, quarterly statistics, and relief supply distributions.
- **Key Features & UI**: Interactive statistical graphs, downloadable annual financial/logistical audit reports, breakdown of regional relief efforts.

---

#### 12. Press Kit (`/resources/press-kit`)
- **File**: [`src/app/(public)/resources/press-kit/page.tsx`](file:///home/nilanjana/Web%20Development/RescueLink/rescuelink-client/src/app/%28public%29/resources/press-kit/page.tsx)
- **Access Level**: Public
- **Purpose**: Media hub for journalists, news outlets, and partner organizations.
- **Key Features & UI**: High-resolution logo downloads (SVG/PNG), brand guidelines, press release archive, direct media contact point.

---

#### 13. Success Stories (`/resources/success-stories`)
- **File**: [`src/app/(public)/resources/success-stories/page.tsx`](file:///home/nilanjana/Web%20Development/RescueLink/rescuelink-client/src/app/%28public%29/resources/success-stories/page.tsx)
- **Access Level**: Public
- **Purpose**: Case studies highlighting successful past relief operations and volunteer profiles.
- **Key Features & UI**: Story card grid, before-and-after photo sliders, volunteer quotes, relief outcome metrics.

---

### Protected Pages

#### 14. Dashboard (`/dashboard`)
- **File**: [`src/app/(protected)/dashboard/page.tsx`](file:///home/nilanjana/Web%20Development/RescueLink/rescuelink-client/src/app/%28protected%29/dashboard/page.tsx)
- **Access Level**: Protected (Authenticated Users, Admins, Tenants)
- **Purpose**: Command center providing metrics on missions posted, missions joined, and administrative queues.
- **Key Features & UI**:
  - **Personalized Header**: Greets the logged-in user by name and role badge.
  - **AI Recommendation Engine Banner (`AIRecommendations`)**: Real-time AI-matched relief missions matching volunteer skills & location using Groq AI (`llama-3.3-70b-versatile`) and Adzuna API listings. Displays match scores (e.g. `✨ 95% Match`), AI reasoning, and direct external/internal application links.
  - **Summary Stat Cards**: Display count of posted missions, joined missions, and (for Admins) total platform-wide active missions and volunteers.
  - **Quick Action Bar**: Buttons to "+ Post a Mission", "Manage Missions", "Explore", or view "Profile".
  - **Admin Verification Queue (`AdminVerificationQueue`)**: Visible exclusively to Admins to verify new relief organization accounts.
  - **Recent Posted Missions**: Compact list of missions created by the user with status badges.
  - **Recent Joined Missions**: Compact list of missions the user has signed up for.
- **API Endpoints**: `GET /dashboard`, `GET /recommendations`

---

#### 15. Add New Mission (`/missions/add`)
- **File**: [`src/app/(protected)/missions/add/page.tsx`](file:///home/nilanjana/Web%20Development/RescueLink/rescuelink-client/src/app/%28protected%29/missions/add/page.tsx)
- **Access Level**: Protected (Users and Admins; Tenants restricted)
- **Purpose**: Form interface for disaster managers and volunteers to launch new relief missions.
- **Key Features & UI**:
  - **Form Inputs**:
    - Mission Title & Short Tagline
    - Disaster Category (`flood`, `earthquake`, `fire`, `cyclone`, `other`)
    - Urgency Level (`critical`, `moderate`, `low`)
    - Location string (City, Region, Country)
    - Target Volunteer Count (`volunteersNeeded`)
    - High-Resolution Cover Image URL
    - Detailed Mission Description & Logistics Requirements
  - **Validation & Submit**: Validates required fields, sends payload to backend API, displays error feedback or redirects to the new mission page upon success.
- **API Endpoint**: `POST /missions`

---

#### 16. Manage Missions (`/missions/manage`)
- **File**: [`src/app/(protected)/missions/manage/page.tsx`](file:///home/nilanjana/Web%20Development/RescueLink/rescuelink-client/src/app/%28protected%29/missions/manage/page.tsx)
- **Access Level**: Protected (Users and Admins)
- **Purpose**: Administrative dashboard to edit, toggle status (Active <-> Resolved), or delete posted missions.
- **Key Features & UI**:
  - **Admin Mode Toggle**: Admins can switch between viewing **"My Missions"** (`/missions/mine`) and **"All Platform Missions"** (`/missions/admin/all`).
  - **Status Toggle Switch**: One-click action to change a mission from `active` to `resolved` or vice versa.
  - **Delete Confirmation Modal**: Safety pop-up modal preventing accidental mission deletion.
  - **Mission Table/Card Grid**: Shows mission thumbnail, title, disaster badge, current volunteer count, and quick management actions.
- **API Endpoints**: `GET /missions/mine`, `GET /missions/admin/all`, `PATCH /missions/:id/status`, `DELETE /missions/:id`.

---

#### 17. User Profile (`/profile`)
- **File**: [`src/app/(protected)/profile/page.tsx`](file:///home/nilanjana/Web%20Development/RescueLink/rescuelink-client/src/app/%28protected%29/profile/page.tsx)
- **Access Level**: Protected (All logged-in users)
- **Purpose**: Account overview displaying user details, joined mission history, and account settings.
- **Key Features & UI**:
  - **User Summary Card**: Avatar, Full Name, Email, Role badge (`User`, `Admin`, or `Tenant`), and account creation date.
  - **Joined Missions Timeline (`JoinedMissionsList`)**: Detailed view of all missions the user has signed up for with direct links.
  - **Sign Out Button**: Ends Better Auth session and redirects user to `/login`.
- **API Endpoint**: `GET /volunteer/my-signups`

---

## 4. Backend API Reference & Routes

The backend API server (`rescuelink-server`) provides the following RESTful routes:

| Route Path | Method | Access | Middleware | Controller / Action |
|---|---|---|---|---|
| `/missions` | `GET` | Public | None | List missions (supports search, disasterType, urgency, status, sort, pagination) |
| `/missions/:id` | `GET` | Public | None | Get detailed information for a single mission |
| `/missions` | `POST` | Protected | `verifyJWT` | Post a new relief mission |
| `/missions/mine` | `GET` | Protected | `verifyJWT` | List missions posted by current user |
| `/missions/admin/all` | `GET` | Admin | `verifyJWT`, `requireRole('admin')` | List all platform missions across all users |
| `/missions/:id/status` | `PATCH` | Protected | `verifyJWT` | Toggle active/resolved status of a mission |
| `/missions/:id` | `DELETE` | Protected | `verifyJWT` | Delete a mission |
| `/updates` | `GET` | Public | None | Fetch updates stream for a mission (`?missionId=`) |
| `/updates` | `POST` | Protected | `verifyJWT` | Post a new field update for a mission |
| `/volunteer/join` | `POST` | Protected | `verifyJWT` | Sign up as a volunteer for a mission |
| `/volunteer/my-signups` | `GET` | Protected | `verifyJWT` | Get all missions joined by current user |
| `/dashboard` | `GET` | Protected | `verifyJWT` | Fetch combined dashboard metrics and mission lists |
| `/recommendations` | `GET` | Protected | `verifyJWT` | Groq AI + Adzuna AI-matched mission recommendations |
| `/stats` | `GET` | Public | None | Retrieve aggregate platform statistics |
| `/contact` | `POST` | Public | None | Submit a contact message |
| `/subscriber` | `POST` | Public | None | Subscribe email to newsletter |
| `/testimonials` | `GET` | Public | None | Fetch homepage testimonials |

---

## 5. Database Schemas & Data Models

### Mission Schema (`Mission.ts`)
- `title`: String (Required)
- `description`: String (Required)
- `disasterType`: String (`flood`, `earthquake`, `fire`, `cyclone`, `other`)
- `urgency`: String (`critical`, `moderate`, `low`)
- `status`: String (`active`, `resolved`)
- `location`: String (Required)
- `imageUrl`: String
- `volunteersNeeded`: Number
- `volunteersJoined`: Number (Default: 0)
- `postedBy`: String / User ID Reference
- `requirements`: Array of Strings
- `createdAt`, `updatedAt`: Timestamps

### VolunteerSignup Schema (`VolunteerSignup.ts`)
- `missionId`: ObjectId -> Mission
- `userId`: String / User ID Reference
- `volunteerName`: String
- `volunteerEmail`: String
- `notes`: String
- `joinedAt`: Date

### Update Schema (`Update.ts`)
- `missionId`: ObjectId -> Mission
- `title`: String
- `content`: String
- `postedBy`: String
- `createdAt`: Date

---

## 6. Seeding & Deployment Procedures

### Seeding Scripts
1. **Seed Auth Accounts (`rescuelink-client`)**:
   ```bash
   npm run seed:auth
   ```
   Creates demo user (`demo.user@rescuelink.org`), demo admin (`demo.admin@rescuelink.org`), and organization posters.

2. **Seed Missions & Testimonials (`rescuelink-server`)**:
   ```bash
   npm run seed
   ```
   Populates MongoDB with sample disaster missions across categories, updates feed items, and testimonials.

### Deployment Targets
- **Client**: Deployed on Vercel (`https://rescuelink-client.vercel.app`)
- **Server**: Deployed on Render (`https://rescuelink-server.onrender.com`)
- **Database**: MongoDB Atlas Cluster

---

## 7. AI Recommendation Engine (Groq AI & Adzuna Integration)

RescueLink features an intelligent AI Mission Recommendation System that dynamically matches disaster relief missions to a volunteer's profile, location, and skill set.

```
 ┌─────────────────────────────────────────────────────────────┐
 │                      Volunteer Profile                      │
 │        (Name, Skills: Medical/Logistics, Location)          │
 └──────────────────────────────┬──────────────────────────────┘
                                │
                                ▼
 ┌─────────────────────────────────────────────────────────────┐
 │                GET /api/recommendations                     │
 ├──────────────────────────────┬──────────────────────────────┤
 │ 1. Query MongoDB             │ 2. Query Adzuna API          │
 │    (Active Local Missions)   │    (External Relief Jobs)    │
 └──────────────┬───────────────┴──────────────┬───────────────┘
                │                              │
                └───────────────┬──────────────┘
                                ▼
 ┌─────────────────────────────────────────────────────────────┐
 │                     Groq AI Inference                       │
 │               (Model: llama-3.3-70b-versatile)              │
 │                                                             │
 │  • Analyzes Volunteer Profile vs Combined Missions          │
 │  • Computes AI Match Score (0–100%)                         │
 │  • Generates Personalized 1-Sentence Reason                 │
 └──────────────────────────────┬──────────────────────────────┘
                                │
                                ▼
 ┌─────────────────────────────────────────────────────────────┐
 │                    <AIRecommendations />                     │
 │          (Rendered on User Dashboard with AI Badges)        │
 └─────────────────────────────────────────────────────────────┘
```

### Key Technical Components

1. **Adzuna Job API Integration** ([`aiRecommendation.service.ts`](file:///home/nilanjana/Web%20Development/RescueLink/rescuelink-server/src/services/aiRecommendation.service.ts)):
   - Queries `https://api.adzuna.com/v1/api/jobs/{country}/search/1` for external disaster relief opportunities matching the volunteer's skills and region.
   - Normalizes external job results into RescueLink mission formats with external source tags (`source: 'Adzuna'`) and direct application URLs (`redirectUrl`).

2. **Groq AI Semantic Matching Engine** ([`aiRecommendation.service.ts`](file:///home/nilanjana/Web%20Development/RescueLink/rescuelink-server/src/services/aiRecommendation.service.ts)):
   - Uses `groq-sdk` with model `llama-3.3-70b-versatile` (or `llama3-8b-8192`).
   - Evaluates internal MongoDB missions alongside Adzuna external listings.
   - Generates structured JSON responses containing `matchScore` (0-100%) and `matchReason` tailored to the volunteer's background.

3. **Resilient Fallback Mechanism**:
   - If API keys (`GROQ_API_KEY`, `ADZUNA_APP_ID`, `ADZUNA_APP_KEY`) are omitted or API calls fail, the service gracefully degrades to a keyword/skill-overlap heuristic matching algorithm, ensuring uninterrupted operational uptime.

4. **Frontend UI Integration** ([`AIRecommendations.tsx`](file:///home/nilanjana/Web%20Development/RescueLink/rescuelink-client/src/components/missions/AIRecommendations.tsx)):
   - Displayed prominently at the top of the user [Dashboard](file:///home/nilanjana/Web%20Development/RescueLink/rescuelink-client/src/app/(protected)/dashboard/page.tsx).
   - Features animated loading skeletons, visual match percentage badges (e.g. `✨ 95% Match`), AI reasoning callouts (`💡 Matches your medical & driving skills`), and distinguishes external Adzuna opportunities from native RescueLink missions.

