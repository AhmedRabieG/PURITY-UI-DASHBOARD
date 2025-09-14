# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about IDE Support for Vue in the [Vue Docs Scaling up Guide](https://vuejs.org/guide/scaling-up/tooling.html#ide-support).

Tech Stack:
Vue 3 (using the Composition API with <script setup>)
Vite as the build tool (evident from vite.config.js)
Tailwind CSS for styling (shown by tailwind.config.js)
Vue Router for navigation
Vuetify for UI components (seen from v-dialog, v-card usage)
Vee-validate for form validation
i18n for internationalization (supports Arabic and English)
Project Structure:

src/├── components/          # Reusable components│   ├── Form/           # Form-related components│   ├── Shared/         # Shared/common components│   └── Structure/      # Layout and structural components├── views/              # Page components├── store/              # State management├── router/             # Route definitions├── utils/              # Utility functions├── assets/             # Static assets│   ├── fonts/         # Custom fonts (Poppins)│   ├── images/        # Images and icons│   └── style/         # SCSS and CSS files└── locales/           # Translation files
Key Features:
CRUD operations with modals
Data table management
Form handling with validation
Multi-language support (Arabic/English)
Role-based access control
Customer management
Dashboard analytics
Authentication system
Responsive design
Notable Components:
AddEditModal.vue: Reusable modal for create/edit operations
DataTabe.vue: Generic data table component
BaseModal.vue: Base modal component
Form components:
InputTextField.vue
TextAreaField.vue
SwitchField.vue
AutoCompleteField.vue
API Integration:
Uses Axios for HTTP requests
Multiple axios instances for different API configurations
Real project API integration (axiosRealProject.js)
State Management:
Uses Vue's provide/inject for component communication
Has dedicated stores for:
Authentication (auth.js)
Loading states (loading.js)
Security & Access Control:
Role-based permissions system
Protected routes
Authentication flow
This appears to be a comprehensive admin panel/dashboard application with a focus on:

Reusability (through common components)
Maintainability (through organized structure)
Internationalization (multi-language support)
User experience (through form validations and feedback)
Security (through role-based access)
The project follows modern Vue.js best practices and uses a component-based architecture with clear separation of concerns.
