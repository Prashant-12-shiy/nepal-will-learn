export const BASE_URL = process.env.NEXT_PUBLIC_API_ENDPOINT;

export const endpoints = {
    register: "/api/auth/sign-up",
    login: "/api/auth/login",
    verifyEmail: "/api/auth/verify-email",
    forgotPassword: "/api/auth/forgot-password",
    resetPassword: "/api/auth/reset-password/",
    getCurrent: "/api/auth/get-current",

    registerAdmin: "/api/auth/admin/sign-up",
    loginAdmin: "/api/auth/admin/login",
    forgotPasswordAdmin: "/api/auth/admin/forgot-password",
    resetPasswordAdmin: "/api/auth/admin/reset-password/",
    getCurrentAdmin: "/api/auth/admin/get-current",

    createCollege: '/api/nwl/admin/create-college',
    getColleges: '/api/nwl/admin/get-colleges',
    getCollegeBySlug: '/api/nwl/admin/get-college/',
    updateCollege: '/api/nwl/admin/update-college/',
    addCollegeCourse: '/api/nwl/admin/add-college/',
    deleteCollege: '/api/nwl/admin/delete-college/',

    createUniversity: '/api/nwl/admin/create-university',
    getUniversities: '/api/nwl/admin/get-universities',
    getUniversityById: '/api/nwl/admin/get-university/',
    getUniversityBySlug: '/api/nwl/admin/get-university/slug/',
    updateUniversity: '/api/nwl/admin/update-university/',
    deleteUniversity: '/api/nwl/admin/delete-university/',

    createCourse: '/api/nwl/admin/create-course',
    getCourses: '/api/nwl/admin/get-courses',
    getCourseById: '/api/nwl/admin/get-course-id/',
    getCourseBySlug: '/api/nwl/admin/get-course-slug/',
    deleteCourse: '/api/nwl/admin/delete-course/',
    updateCourse: '/api/nwl/admin/update-course/',
}