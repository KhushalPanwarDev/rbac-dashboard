# RBAC Dashboard

## Overview

This RBAC (Role-Based Access Control) Dashboard is a React-based web application that provides a comprehensive interface for managing users and roles within an organization. The dashboard allows administrators to create, edit, and delete users, as well as define and manage roles with specific permissions.

## Features

### User Management
- Add new users
- Edit existing user details
- Delete users
- Filter and search users
- Assign roles to users
- Toggle user status (active/inactive)

### Role Management
- Create custom roles
- Define granular permissions for each role
- Edit existing roles
- Search and filter roles

### Key Capabilities
- Responsive design (mobile and desktop-friendly)
- Intuitive user interface
- Search functionality for users and roles
- Pagination support
- Dropdown actions for quick user and role management
- Notification system for user feedback

## Technologies Used

- React
- Ant Design (antd)
- TypeScript
- Tailwind CSS

## Prerequisites

- Node.js (v14 or later)
- npm or Yarn

## Installation

1. Clone the repository:
   ```bash
   git clone https://your-repository-url.git
   cd rbac-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

## Project Structure

```
rbac-dashboard/
│
├── src/
│   ├── components/
│   │   └── RbacDashboard.tsx
│   ├── types/
│   │   └── index.ts
│   └── styles/
│       └── RbacDashboard.css
```

## Configuration

### Permissions
The dashboard supports the following default permissions:
- read
- write
- delete
- manage_users
- create_content
- approve_content

You can easily extend or modify these in the `PERMISSION_OPTIONS` array.

## Customization

### Adding New Permissions
1. Update the `PERMISSION_OPTIONS` array in the `RbacDashboard.tsx` file
2. Modify the role creation form to include new permissions

### Styling
The dashboard uses Tailwind CSS for responsive design. Customize the styles in the existing CSS file or by modifying Tailwind classes.

## Deployment

### Build for Production
```bash
npm run build
# or
yarn build
```

## Mock Data

The dashboard includes initial mock data for users and roles. Replace these with your actual data source or connect to a backend API.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Name - Khushal Panwar
Email - khushalpanwar0669@gmail.com

Project Link: [https://github.com/KhushalPanwarDev/rbac-dashboard]()