# RBAC Admin Dashboard

## Project Overview
A Role-Based Access Control (RBAC) Admin Dashboard built with React, TypeScript, and Ant Design, providing comprehensive user and role management capabilities.

## Prerequisites
- Node.js (v16+ recommended)
- npm or Yarn
- React 18+
- TypeScript

## Dependencies
- `react`: Core library
- `antd`: UI Component Library
- `@ant-design/icons`: Icon set
- `typescript`: Type checking

## Project Setup

### Installation
```bash
# Clone the repository
git clone https://github.com/yourusername/rbac-admin-dashboard.git

# Navigate to project directory
cd rbac-admin-dashboard

# Install dependencies
npm install
# OR
yarn install
```

### Running the Project
```bash
# Start development server
npm start
# OR
yarn start
```

## Environment Configuration
Create a `.env` file in the project root with the following variables:
```
REACT_APP_API_URL=your_backend_api_url
REACT_APP_AUTH_TOKEN=your_authentication_token
```

## Deployment
### Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify
```bash
# Install Netlify CLI
npm install netlify-cli -g

# Deploy
netlify deploy
```

## Security Considerations
- Use environment variables for sensitive configurations
- Implement proper backend authentication
- Validate and sanitize all user inputs
- Use HTTPS for all communications

## Contributing
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License
MIT License