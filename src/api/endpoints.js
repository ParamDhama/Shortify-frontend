const endpoints = {
    // Example
    // Type: {
    //   GET_ALL: "/api/all/",
    //   CREATE: "/api/create/",
    //   UPDATE: (id) => `/api/update/${id}`, 
    //   DELETE: (id) => `/api/delete/${id}`, 
    // }
    auth: {
      // Post requests
      CREATE_USER : "/api/auth/register",
      LOGIN : "/api/auth/login",
      FORGOT_PASS : "/api/auth/forgot-password",
      RESEND_VERIFY : "/api/auth/resend-verification",
      CHANGE_PASS : "/api/auth/change-password",
      RESET_PASS : (token) => `/api/auth/reset-password/${token}`,

      // Get requests
      VERIFY_EMAIL : (token) => `/api/auth/verify/${token}`,
    },

    admin : {
      // GET REQUESTS FOR ADMIN
      GET_USERS : "/api/admin/users",
      GET_USER : (user) => `/api/admin/${user}/urls`,
      GET_CLICKS : "/api/admin/clicks",
      GET_SOFT_DELETES : "/api/admin/deletedUrls",

      // CHANGE REQUESTS FOR ADMIN
      PUT_ROLE : `/api/admin/users/role`,
      PUT_BAN : (id) => `/api/admin/users/ban/${id}`,
      PUT_RESTORE_URL : `/api/admin/urls/restore`,

      // DELETE REQUESTS FOR ADMIN
      DELETE_USER : (id) => `/api/admin/users/${id}`,
      DELETE_URL : `/api/admin/urls`
    },

    url : {
      // GET REQUESTS FOR URLS
      REDIRECT : (slug) => `/api/url/${slug}`,
      GET_URLS : "/api/url/user/urls",

      // POST REQUEST FOR URLS
      CREATE_URL : "/api/url/shorten",

      // DELETE REQUEST FOR URLS
      DELETE_URL : (slug) => `/api/url/user/urls/${slug}`
    },

    click : {
      // GET REQUESTS FOR CLICKS
      GET_CLICKS : (id) => `/api/clicks/${id}` 
    }

  };
  
  export default endpoints;