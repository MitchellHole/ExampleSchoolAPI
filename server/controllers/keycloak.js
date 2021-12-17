import KcAdminClient from 'keycloak-admin';
const kcAdminClient = new KcAdminClient( {
  baseUrl: "http://keycloak:8080/auth"
});


export default kcAdminClient;
