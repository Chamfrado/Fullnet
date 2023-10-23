export const TOKEN_KEY = "@demo-Token";
export const USER = "demo-user";
export const USER_ROLE = "USER";

export const isAuthenticated = () => {
  if(localStorage.getItem(TOKEN_KEY) === null){
    return false;
  }else if(localStorage.getItem(TOKEN_KEY) === "@demo-Token"){
    return false;
  }
  return true;
} 



export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const getUser = () => {return localStorage.getItem(USER);}

export const getUserRole = () => {return localStorage.getItem(USER_ROLE);}


export const login = token => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const setUserRole = role => {
  localStorage.setItem(USER_ROLE, role);
}

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER);
  localStorage.removeItem(USER_ROLE);
};

export const setUser = user => {
  localStorage.setItem(USER, user);
};
