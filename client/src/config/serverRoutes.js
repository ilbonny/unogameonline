export function routes() {

    var baseUrl = "/api/";
  
   return {
      users : baseUrl + "users",
      game : baseUrl + "game"
   }; 
  }
  
  export default { routes };